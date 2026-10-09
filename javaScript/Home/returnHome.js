import { postArray } from "./posting.js";
import { postBox } from "./inputCon.js";

//Return to home

//Checking sing in or not 
if (localStorage.getItem('hasSignedUp') === 'true') {
    const singUpButton = document.querySelector('.js-sign-btn');  //Get Element

    singUpButton.style.display = 'none'; // Make the button disappear
    postBox.style.display = 'flex';     //Make the add button appear
}

//Date and remaining amount at top
export function renderDateAndAmount(){
    const balanceElement = document.getElementById('day_remaining'); //Get Element

    //Calculating balance 
    let totalBalance = 0;
    postArray.forEach((post) => {
        totalBalance += Number(post.amountNumber) || 0;
    });

    //Format remaining balance display
    if (balanceElement) {
        if (totalBalance < 0) {
        balanceElement.textContent = `- ₹${Math.abs(totalBalance)}`;
        balanceElement.style.color = '#D32F2F'; // Red for negative net balance
        } else if (totalBalance > 0) {
        balanceElement.textContent = `+ ₹${totalBalance}`;
        balanceElement.style.color = '#1b9e4b'; // Green for positive net balance
        } else {
        balanceElement.textContent = `+ ₹0`; // Default state when zero
        balanceElement.style.color = '#1b9e4b';
        }
    }
}