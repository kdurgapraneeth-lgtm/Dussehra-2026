//Detele post

import { postArray, renderPost } from "./posting.js";

const deleteContainer = document.querySelector('.js-delete-post');
const deleteButtonElem = document.getElementById('delete_btn');

let is_ValidUser = false;

//Validate current user for deleting a post
function validateUser(){
    const currentUser = localStorage.getItem('userName');
    is_ValidUser = currentUser === postArray[0].usernameText ? true : false;
}

let selectedIndex = null;
//Open Double click for desktop
document.addEventListener("click", (e) => {
    const card = e.target.closest(".card_item");
    if (!card) return;
    validateUser()
    if(is_ValidUser){
        setTimeout(() => {
            deleteContainer.style.display = "flex";
        },250);
    }
    // Get all currently rendered cards
    const allCards = [...document.querySelectorAll(".card_item")];
    // Get index of the card that was double-clicked
    selectedIndex = allCards.indexOf(card);
});
//function for deleting an Amount
function deleteAmount(){
    if (selectedIndex === null) alert('Something went worng!');
    //Making amount to be a 0
    postArray[selectedIndex].amountNumber = 0;
    renderPost();
    setTimeout(() => {
        deleteContainer.style.display = 'none';
    },250);
    console.log("Delete index:", selectedIndex);
}
//Detele click event
deleteButtonElem.addEventListener('click', () => {
    deleteAmount()
});
//Closing delete dialog
const closeDelete = document.querySelector('.js-delete-close');
closeDelete.addEventListener('click', () => {
    setTimeout(() => {
        deleteContainer.style.display = 'none';
    },250);
});