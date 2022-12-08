import random

#var

global player1, computer

#def functions

def startGame():
	print("")
	print("Welcome to Rock, Paper, Scissors!")
	print("")

	return

def startGame2():
	print("")
	print("Welcome to Rock, Paper, Scissors!")
	print("")
	choose()

	return

def playAgain():
	promptPlayAgain = input("Yes or No?").lower()

	if playAgain == "yes":
		startGame2()
	elif playAgain == "no":
		print("Goodbye")
		print("")

	return

def promptTie():
	tie = input("Play again?").lower()

	if tie == "yes":
		startGame2()
	elif tie == "no":
		print("Goodbye")
		print("")

	return

def promptWin():
	win = input("Play again?").lower()

	if win == "yes":
		startGame2()
	elif win == "no":
		print("")
		print("Goodbye")
		print("")

	return

def choose():
	global player1, computer
	player1 = input("Choose Rock, Paper, or Scissor:").lower()
	computer = random.choice(["Rock","Paper","Scissor"]).lower()
	print("")
	print("Computer Selected:",computer)

	if player1 == "rock" and computer == "paper":
		#print("___________")
		#print("---'   ____)")
		#print("      (_____)")
		#print("      (_____)")
		#print("      (____)")
		#print("---.__(___)")
		#print("Computer Won. Try again?")
		playAgain()
	elif player1 == "paper" and computer == "scissor":
		print("Computer Won. Try again?")
		playAgain()
	elif player1 == "scissor" and computer == "rock":
	    print("Computer Won. Try again?")
	    playAgain()
	elif player1 == computer:
	    print("Tie!")
	    promptTie()
	else:
	    print("You Won!")
	    promptWin()

	return

startGame()
choose()

