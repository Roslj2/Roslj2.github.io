from flask import Flask, request, render_template, send_file, redirect, url_for
import os
import re
import pytesseract
from pdf2image import convert_from_path
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.util import Inches, Pt
from openai import OpenAI
from PIL import Image

app = Flask(__name__)

# Convert PDF to images
def pdf_to_images(pdf_path, dpi=300):
    return convert_from_path(pdf_path, dpi, fmt="png")


# Preprocess image for better OCR
def preprocess_image(image):
    return image.convert("L")  # Convert to grayscale

# Extract text from images using OCR
def extract_text_from_images(images):
    extracted_text = []
    for img in images:
        img = preprocess_image(img)
        text = pytesseract.image_to_string(img, config="--psm 6")
        extracted_text.append(text.strip())

    raw_text = "\n".join(extracted_text)

    return raw_text

# Use OpenAI API to clean and structure the script
def clean_and_structure_script(text, api_key):
    client = OpenAI(api_key=api_key)
    prompt = f"""
    Extract only character names and their dialogues from the script.
    Format output as:

    CHARACTER NAME: Dialogue text

    Handle cases where two characters speak at once (formatted as NAME / NAME: Dialogue)
    Identify and retain song lyrics when a character is singing (denoted by ALL CAPS).
    Identify new scenes (denoted by a black line with the scene number and name) and include them in the structured output.
    Ignore stage directions and non-dialogue content.
    If any inappropriate or offensive language is present, replace those words with '****'.
    Do not omit or skip any part of the text — just sanitize it appropriately:
    
    Here is the raw text:
    {text}
    """

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5
    )
    structured_text = response.choices[0].message.content.strip()

    if not structured_text:
        print("ERROR: Structured text is empty!")

    return structured_text

# Parse structured script into a list of character-dialogue pairs
def parse_script(text):

    script_data = []
    scene = None
    dialogue_block = ""
    character = ""

    for line in text.split("\n"):
        line = line.strip()
        if "SCENE" in line.upper():  # Detect scene headers
            if dialogue_block:
                script_data.append((character, dialogue_block.strip()))
                dialogue_block = ""
            scene = line
            script_data.append(("SCENE", scene))
        elif ":" in line:
            if dialogue_block:
                script_data.append((character, dialogue_block.strip()))
            parts = line.split(":", 1)
            character, dialogue_block = parts[0].strip(), parts[1].strip()
        else:
            dialogue_block += " " + line  # Append additional lines to the same character's dialogue

    if dialogue_block:
        script_data.append((character, dialogue_block.strip()))

    return script_data

# Split long dialogue into multiple slides
def split_dialogue(dialogue, max_sentences=5):
    sentences = re.split(r'(?<=[.!?]) +', dialogue)
    chunks = [" ".join(sentences[i:i+max_sentences]) for i in range(0, len(sentences), max_sentences)]
    return chunks

def create_presentation(script_data, output_pptx):
    prs = Presentation()
    previous_line = None

    for item in script_data:
        if len(item) == 2 and item[0] == "SCENE":
            slide = prs.slides.add_slide(prs.slide_layouts[5])
            slide.background.fill.solid()
            slide.background.fill.fore_color.rgb = RGBColor(0, 0, 0)
            title = slide.shapes.title
            title.text = item[1]
            title.text_frame.paragraphs[0].font.bold = True
            title.text_frame.paragraphs[0].font.size = Pt(44)
        elif len(item) == 2:
            character, dialogue = item
            for chunk in split_dialogue(dialogue):
                slide = prs.slides.add_slide(prs.slide_layouts[5])
                slide.background.fill.solid()
                slide.background.fill.fore_color.rgb = RGBColor(0, 0, 0)
                if previous_line:
                    prev_textbox = slide.shapes.add_textbox(Inches(1), Inches(0.5), Inches(8), Inches(2))
                    prev_textframe = prev_textbox.text_frame
                    prev_textframe.text = f"{previous_line[0]}: {previous_line[1]}"
                    prev_textframe.paragraphs[0].font.color.rgb = RGBColor(169, 169, 169)
                    prev_textframe.paragraphs[0].font.size = Pt(26)
                    prev_textframe.paragraphs[0].font.bold = True
                    prev_textframe.word_wrap = True
                current_textbox = slide.shapes.add_textbox(Inches(1), Inches(3.5), Inches(8), Inches(2))
                current_textframe = current_textbox.text_frame
                current_textframe.text = f"{character}: {chunk}"
                current_textframe.paragraphs[0].font.size = Pt(28)
                current_textframe.paragraphs[0].font.bold = True
                current_textframe.paragraphs[0].font.color.rgb = RGBColor(255, 255, 255)
                current_textframe.word_wrap = True
                previous_line = (character, chunk)

    prs.save(output_pptx)

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        pdf_file = request.files['pdf_file']
        api_key = request.form['api_key']

        if pdf_file and api_key:
            pdf_path = "uploaded.pdf"
            output_pptx = "script.pptx"

            pdf_file.save(pdf_path)
            images = pdf_to_images(pdf_path)
            text = extract_text_from_images(images)
            structured_text = clean_and_structure_script(text, api_key)

            script_data = parse_script(structured_text)  # Parse into tuples

            if not script_data:
                print("ERROR: Parsed script data is empty!")
                return "Error: Could not extract dialogue data", 400

            create_presentation(script_data, output_pptx)

            return redirect(url_for('download_page'))

    return render_template('upload.html')
@app.route('/download_page')
def download_page():
    return render_template('download.html')

@app.route('/download', methods=['GET'])
def download_file():
    output_pptx = "script.pptx"
    if os.path.exists(output_pptx):
        return send_file(output_pptx, as_attachment=True)
    return "File not found", 404

# Main Execution
if __name__ == "__main__":
    app.run(debug=True)
