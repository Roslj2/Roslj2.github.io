/*WELCOME TO MY GAME!!!!
This game is based off candy box
If you look at the code, you can see that after 10 candies, you can upgrade how fast they are
After 100 candies, you can get a sword, and every 400 candies, you get one more sword level.
You can go on quests, and if your sword level is more than a random number generated, you get some candies.
Every time you play, the random number possibility goes up by 5.
In the inventory page, it shows your sword.
After 1000 candies, some candies start falling from the screen.
HAVE FUN!!!!!!!!!*/

let candyCount = 0;
let count = 1;
let timer;
let button_hidden = true;
let multiplier = 2;
let upgrade_cost = count * multiplier;
let sword_cost = 10 * multiplier
let sword_level = 0;
let candies_eaten = 0;
let storedCandyCount = localStorage.getItem('candyCount');
let storedCandiesEaten = localStorage.getItem('candies_eaten');
let storedMultiplier = localStorage.getItem('multiplier');
let storedCount = localStorage.getItem('count');
let storedCost = localStorage.getItem('upgrade_cost');
let storedSwordCost = localStorage.getItem('sword_cost');
let storedSwordLevel = localStorage.getItem('sword_level');

function eat_candies() {
    candies_eaten = candyCount + candies_eaten;
    localStorage.setItem('candies_eaten', candies_eaten);
    candyCount = 0;
    localStorage.setItem('candyCount', candyCount);
    document.getElementById('ate').innerText = "You have eaten " + candies_eaten + " candies!";
    replace_candy(candyCount);
    check_multiplier();
}

function replace_candy(num) {
    document.getElementById('candies').innerText = "You have " + num + " candies!";
}

$(function(){
    $("#navbar").load("navbar.html", function() {
      var currentPage = window.location.pathname.split("/").pop().split(".")[0];
      $("#" + currentPage).addClass("active");
    });

    if (storedCandyCount !== null) {
        candyCount = parseInt(storedCandyCount);
    }
    replace_candy(candyCount);

    if (storedCandiesEaten !== null) {
        candies_eaten = parseInt(storedCandiesEaten);
    }
    document.getElementById('ate').innerText = "You have eaten " + candies_eaten + " candies!";

    if (storedMultiplier !== null) {
        multiplier = parseInt(storedMultiplier);
    }

    if (storedCount !== null) {
        count = parseInt(storedCount);
    }

    if (storedCost !== null) {
        cost = parseInt(storedCost);
    }

    if (storedSwordCost !== null) {
        sword_cost = parseInt(storedSwordCost);
    }


    if (storedSwordLevel !== null) {
        console.log("Getting stored sword level");
        sword_level = parseInt(storedSwordLevel); // Load sword_level from localStorage
        console.log(`Level: ${sword_level}`);
    } else {

        console.log("NO SWORD LEVEL STORED!");
    }
});

function clear_candies() {
    button_hidden = true;
    candyCount = 0;
    candies_eaten = 0;
    count = 1;
    multiplier = 2;
    upgrade_cost = count * multiplier;
    sword_level = 0;
    sword_cost = 10 * multiplier;

    localStorage.clear(); // Clear all localStorage items

    document.getElementById('sword').style.display = 'none';
    document.getElementById('sword_level').style.display = 'none';
    document.getElementById('explain_sword').style.display = 'none';

    // Remove all candy images
    let candyImages = document.querySelectorAll('.candyImage');
    candyImages.forEach(img => img.remove());

    replace_candy(candyCount);
    document.getElementById('ate').innerText = "You have eaten " + candies_eaten + " candies!";
    document.getElementById('multiplier').style.display = 'none';
    console.log(upgrade_cost);
}

function faster_candies() {
    if (candyCount > upgrade_cost) {
        candyCount = candyCount - upgrade_cost;
        count = count + 1;
        multiplier = multiplier * 2;
        upgrade_cost = count * multiplier;

        localStorage.setItem('count', count);
        localStorage.setItem('multiplier', multiplier);
        localStorage.setItem('upgrade_cost', upgrade_cost);

        document.getElementById('multiplier').style.display = 'block';
        document.getElementById('multiplier').innerText = "Cost of next upgrade: " + upgrade_cost;
        console.log(upgrade_cost);
    } else {
        console.log("Not enough :(");
    }
}

function check_multiplier() {
    if (candyCount >= 10) {
        button_hidden = false;
    }

    if (button_hidden === false) {
        document.getElementById('more_candies').style.display = 'block';
    } else {
        document.getElementById('more_candies').style.display = 'none';
    }

    if (candyCount >= 100) {
        sword_level = Math.floor(candyCount / 400);
        localStorage.setItem('sword_level', sword_level); // Save sword_level to localStorage
        console.log(sword_level);

        document.getElementById('sword').style.display = 'block';
        document.getElementById('sword').innerText = 'You got a sword! You can use it for quests, and the more candies you have, the higher level.';
        document.getElementById('explain_sword').style.display = 'block';
        document.getElementById('explain_sword').innerText = 'You get a sword level every 400 candies :)';
        document.getElementById('sword_level').style.display = 'block';
        document.getElementById('sword_level').innerText = 'Your sword level is ' + sword_level;
    }

    if (candyCount >= 1000) {
        document.getElementById('fallingImage').style.display = 'block';
        for (let i = 0; i < 5; i++) { // Adjust the number of images
            let newImg = cloneImage();
            fall(newImg);
        }
    } else {
        document.getElementById('fallingImage').style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("Cleared flag:", localStorage.getItem('cleared'));
    console.log("DOM CONTENT LOADED");
    console.log(localStorage);
    if (localStorage.getItem('cleared') === 'true') {
        localStorage.removeItem('candyCount');
        localStorage.removeItem('candies_eaten');
        localStorage.removeItem('multiplier');
        localStorage.removeItem('count');
        localStorage.removeItem('upgrade_cost');
        //localStorage.removeItem('sword_level');
        //localStorage.removeItem('sword_cost');
        localStorage.setItem('cleared', 'false');
    }

    if (localStorage.getItem('candyCount') !== null) {
        candyCount = parseInt(localStorage.getItem('candyCount'));
    } else {
        candyCount = 0;
    }

    replace_candy(candyCount);

    if (localStorage.getItem('candies_eaten') !== null) {
        candies_eaten = parseInt(localStorage.getItem('candies_eaten'));
    } else {
        candies_eaten = 0;
    }

    if (localStorage.getItem('multiplier') !== null) {
        multiplier = parseInt(localStorage.getItem('multiplier'));
    } else {
        multiplier = 2;
    }

    if (localStorage.getItem('count') !== null) {
        count = parseInt(localStorage.getItem('count'));
    } else {
        count = 1;
    }

    if (localStorage.getItem('upgrade_cost') !== null) {
        upgrade_cost = parseInt(localStorage.getItem('upgrade_cost'));
    } else {
        upgrade_cost = count * multiplier;
    }

    if (localStorage.getItem('sword_level') !== null) {
        sword_level = parseInt(localStorage.getItem('sword_level'));
    } else {
        sword_level = 0;
    }

    if (localStorage.getItem('sword_cost') !== null) {
        sword_cost = parseInt(localStorage.getItem('sword_cost'));
    } else {
        sword_cost = 10 * multiplier;
    }

    document.getElementById('multiplier').style.display = 'block';
    document.getElementById('multiplier').innerText = "Cost of next upgrade: " + upgrade_cost;

    document.getElementById('ate').innerText = "You have eaten " + candies_eaten + " candies!";

    document.getElementById('more_candies').addEventListener('click', faster_candies);
    check_multiplier();
});

function setCandyCount(num) {
    candyCount = num;
    localStorage.setItem('candyCount', candyCount);
    replace_candy(candyCount);
    check_multiplier();
}

//QUEST PART
function triggerQuest() {
    sword_level = parseInt(localStorage.getItem('sword_level'));
    console.log(sword_level);
    if (sword_level === 0 || sword_level === null) {

        document.getElementById('sword_level_enough').style.display = 'block';
        document.getElementById('sword_level_enough').innerText = "Sorry, you don't have a sword. Come back later."

    } else {
        console.log("Else");
        document.getElementById('start_quest').style.display = 'block';
        document.getElementById('start_quest').innerText = "Lets get started!! You go on a quest..."
        console.log("Going on a quest");

        var increment = parseInt(localStorage.getItem('increment')) || 0;
        var a = Math.floor(Math.random() * (5 + increment)) + 1;

        console.log(a);
        if (a > sword_level || a === sword_level) {
            console.log("Going on a quest and lost");
            document.getElementById('did_loose').style.display = 'block';
            document.getElementById('did_loose').innerText = 'Sorry, you lost :(';
            document.getElementById('did_win').style.display = 'none';
        } else {
            console.log("Going on a quest and won");
            document.getElementById('did_loose').style.display = 'none';
            document.getElementById('did_win').style.display = 'block';
            document.getElementById('did_win').innerText = 'YOU WON!!! HERE IS 1,000,000 CANDIES!!!';
            candyCount = candyCount + 1000000;
        }
        increment += 5;
        localStorage.setItem('increment', increment);
    }
}

//SWORD
function show_sword() {
    if (candyCount >= 100) {
        document.getElementById('show_img').style.display = 'block';
        document.getElementById('sword').style.display = 'block';
        document.getElementById('sword').innerText = 'You got a sword! You can use it for quests, and the more candies you have, the higher level.';
        sword_level = sword_level + 1;
        document.getElementById('sword_level').style.display = 'block';
        document.getElementById('sword_level').innerText = 'Your sword level is ' + sword_level;
    } else {
        document.getElementById('show_img').style.display = 'none';
    }
}

//FALLING IMAGES
function cloneImage() {
    let originalImg = document.getElementById('fallingImage');
    let clone = originalImg.cloneNode(true);
    clone.classList.add('candyImage'); // Add this line
    clone.style.position = 'absolute';
    clone.style.left = Math.random() * window.innerWidth + 'px';
    clone.style.top = '0px';
    document.body.appendChild(clone);
    return clone;
}

function fall(img) {
    let top = 0;
    setInterval(function() {
        top += 5; // Adjust the speed
        img.style.top = top + 'px';
        if (top > window.innerHeight) {
            top = 0; // Reset to the top
        }
    }, 50); // Adjust the interval
}

//GAIN CANDY
setInterval(() => {
    setCandyCount(candyCount + count);
}, 1000);
