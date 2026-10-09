//Menu

const sideMenu = document.querySelector('.js-side-menu'); //Side menu bar

//Opening side menu by clicking menu button at home
const menuButton = document.querySelector('.js-menu-btn'); //Menu buttton
menuButton.addEventListener('click', () => {
    setTimeout(() => {
        sideMenu.style.display = 'flex';
    },250);
    
});
//Closing menu button by clicking X at menu
const closeMenu = document.querySelector('.js-closeMenu'); //Close button for menu
closeMenu.addEventListener('click',() => {
    setTimeout(() => {
        sideMenu.style.display = 'none';
    },250);
});


//Menu buttons action

//Imports
import {postArray} from './posting.js';  //Get element

//const dialogClose = document.querySelector('.js-dialog-close');

const dialogBox = document.querySelector('.js-dialog-box');
const totalElement = document.querySelector('.js-totals');
const totalTextElement = document.querySelector('.js-total-text');

//Functions for calculation totals

//Closing dialog box by clicking close button
dialogBox.addEventListener('click', () => {
    setTimeout(() => {
        dialogBox.style.display = 'none';
    },250);
    
});

//function for calculating total income
function calculateAllCredits(){
    //Calculation
    let totalBalance = 0;
    postArray.forEach((post) => {
        if(post.amountNumber > 0){
            totalBalance += Number(post.amountNumber) || 0;
        }
    });
    totalTextElement.textContent = 'Total Income'; //update text
    totalElement.textContent = `+ ₹${Math.abs(totalBalance)}`; //update amount
    totalElement.style.color = '#1b9e4b'; //update color 
    //Make dialog box appear
    dialogBox.style.display = 'flex';
}
 
//Total income button clicking
const incomeButton = document.querySelector('.js-income-btn');
incomeButton.addEventListener('click',() => {
    setTimeout(() => {
        calculateAllCredits();//calling
    },250);
     
});

//function for calculating total expense
function calculateAllDebits(){
     //Calculation
    let totalBalance = 0;
    postArray.forEach((post) => {
        if(post.amountNumber < 0){
            totalBalance += Number(post.amountNumber) || 0;
        }
    });
    totalTextElement.textContent = 'Total Expence'; //update text
    totalElement.textContent = `- ₹${Math.abs(totalBalance)}`; //update amount
    totalElement.style.color = '#D32F2F'; //update color

    //Make dialog box appear
    dialogBox.style.display = 'flex';
}
//Total expense button clicking
const expenseButton = document.querySelector('.js-expense-btn');
expenseButton.addEventListener('click',() => {
    setTimeout(() => {
        calculateAllDebits(); //calling
    },250)
    
});

//function for calculating remaining amount
function calculateRemainingAmount(){
    let totalBalance = 0;
    postArray.forEach((post) => {
        totalBalance += Number(post.amountNumber) || 0;  
    });
    totalTextElement.textContent = 'Remaining amount'; //update text
    //Condition for color rendering
    if(totalBalance < 0){
        totalElement.style.color = '#D32F2F'; //update color
        totalElement.textContent = `₹0`; //update amount
    }else{
        totalElement.style.color = '#1b9e4b';
        totalElement.textContent = `+ ₹${Math.abs(totalBalance)}`; //update amount
    }
    
    //Make dialog box appear
   dialogBox.style.display = 'flex';  
}
//Remaining amount button clicking
const remainingButton = document.querySelector('.js-remaining-btn');
remainingButton.addEventListener('click',() => {
    setTimeout(() => {
        calculateRemainingAmount(); //calling
    },250)
    
});