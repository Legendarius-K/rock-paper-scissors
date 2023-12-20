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
let userWinMessage = () => console.log("Human Wins!");
let compWinMessage =  () => console.log("Comp Wins!");
let tieMessage =  () => console.log("It's a tie!");

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
                $(e).delay(1000).animate({
                    width: "70%"
                }, 500);
            }
        });
    } else if (userWinner === false) {
        $(".comp img").each((index, e) => {
            if ($(e).attr('class') === compChoice) {
                $(e).delay(1000).animate({
                    width: "70%"
                }, 500);
            }
        })
    }
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
        setTimeout(1000);
        compChoice = weapons[Math.floor(Math.random() * weapons.length)];
        console.log(compChoice);
        $(".comp img").each((index, element) => {
            if ($(element).hasClass(compChoice)) {

            } else {
                $(element).fadeTo("slow", 0.25);
            }
        })
    }

    checkWinner();
    

})





})