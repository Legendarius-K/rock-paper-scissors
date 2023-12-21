/*
- Bygg frontend
- 

- user chooses weapon
- user weapon is highlighted and the unchosen weapns fade out
- a short delay, then comp randomizes a weapon
- comp weapon is highlighted and the unchosen weapns fade out
- the winner weapon get extra highlighted and animates into the middle, 

*/

$(() => {


let weapons = ["comp-rock", "comp-paper", "comp-scissors"];
let userTurn = true;
let userChoice;
let compChoice;
let userWinner;
let newRound;
let compScore = 0;
let userScore = 0;
let userWinMessage = () => {
    console.log("Human Wins!");
    userScore++;
    setTimeout(() => {
        $(".scoreboard").text(`${userScore} - ${compScore}`);
     }, 2200);
}
let compWinMessage =  () => {
    console.log("Comp Wins!");
    compScore++;
    setTimeout(() => {
       $(".scoreboard").text(`${userScore} - ${compScore}`);
    }, 2200);
    
}    
let tieMessage =  () => console.log("It's a tie!");

$(".scoreboard").text(`${userScore} - ${compScore}`);

const checkWinner = () => {
    if (userChoice === "user-rock active") {
        if (compChoice === "comp-paper") {
            compWinMessage();
            userWinner = false;
        } else if (compChoice === "comp-scissors") {
            userWinMessage();
            userWinner = true;
        } else {
            tieMessage();
        }
    } else if (userChoice === "user-paper active") {
        if (compChoice === "comp-paper") {
            tieMessage();
        } else if (compChoice === "comp-scissors") {
            compWinMessage();
            userWinner = false;
        } else {
            userWinMessage();
            userWinner = true;
        }
    } else {
        if (compChoice === "comp-paper") {
            userWinMessage();
            userWinner = true;
        } else if (compChoice === "comp-scissors") {
            tieMessage();
        } else {
            compWinMessage();
            userWinner = false;
        }
    }

    if (userWinner) {
        $(".user button").each((index, e) => {
            if ($(e).attr('class') === userChoice) {
                $(e).delay(2000).animate({width: "55%"}, 500);
                // $(e).delay(2000).toggleClass("winner");
            }
            setTimeout(() => {
                $(".player-message").text("HUMAN WINS!");
            }, 2000);
        });
    } else if (userWinner === false) {
        $(".comp button").each((index, e) => {
            if ($(e).attr('class') === compChoice) {
                $(e).delay(2000).animate({width: "55%"}, 500);
                // $(e).delay(2000).toggleClass("winner");
            }
            setTimeout(() => {
                $(".player-message").text("COMPUTER WINS!");
            }, 2000);
        })
    } else {
        setTimeout(() => {
            $(".player-message").text("TIE GAME!");
            $(".vs-pic").toggle();
            $(".tie-pic").toggle();
        }, 2000);
    }

}

if (newRound) {
    $(".main-content").on("click", () => {
        $(".vs-pic").toggle();
        $(".tie-pic").toggle();
    })
}


const nextRound = () => {
    $(".player-message").text("Choose your weapon")
    userWinner = undefined;

    $(".grid-box.user button").each((index, button) => {
        button.disabled = false;
        $(button).animate({opacity: "100%"},500);
        if ($(button).hasClass(userChoice)) {
            $(button).animate({width: "35%"},200).toggleClass("active");
        }
    })

    $(".comp button").each((index, image) => {
        $(image).animate({opacity: "100%"},500);
        if ($(image).hasClass(compChoice)) {
            $(image).animate({width: "35%"},200);
        }
    })
    
    $(".tie-pic").fadeOut(1);
    $(".vs-pic").fadeIn();

    
}


$(".grid-box.user button").on("click", e => {
    $(e.target).toggleClass("active");
    $(e.target).siblings().fadeTo("slow", 0.25);
    userChoice = e.target.className;
    userTurn = false;
    console.log(userChoice);
    $(".player-message").text("Computer's turn —>");
    e.target.disabled = true;
    $(e.target).siblings().addBack().prop('disabled', true);

    if (userTurn === false) {
        compChoice = weapons[Math.floor(Math.random() * weapons.length)];
        console.log(compChoice);
        $(".comp button").each((index, element) => {
            if ($(element).hasClass(compChoice)) {

            } else {
                $(element).delay(1000).fadeTo("slow", 0.25);
            }
        })
    }

    checkWinner();

    newRound = true;
    
})

$(".next-round").on("click", () => nextRound());
$(".new-game").on("click", () => {
    nextRound();
    userScore = 0;
    compScore = 0;
    $(".scoreboard").text(`${userScore} - ${compScore}`);
});


})