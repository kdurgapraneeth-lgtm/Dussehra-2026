//Script for Home screen

//==========================Return to home==============================

//Disable signUp button, once signUp
const singUpButton = document.querySelector('.js-sign-btn');
const addButton = document.querySelector('.js-add-btn');

//Checking sing in or not 
if (localStorage.getItem('hasSignedUp') === 'true') {
  singUpButton.style.display = 'none'; // Make the button disappear
  addButton.style.display = 'flex';     //Make the add button appear
}

//==========================Menu button==================================

const menuButton = document.querySelector('.js-menu-btn'); //Menu buttton
const sideMenu = document.querySelector('.js-side-menu'); //Side menu bar
const closeMenu = document.querySelector('.js-closeMenu'); //Close menu button

//Opening side menu by clicking menu button at home
menuButton.addEventListener('click', () => {
    sideMenu.style.display = 'flex';
});
//Closing menu button by clicking X at menu
closeMenu.addEventListener('click',() => {
    sideMenu.style.display = 'none';
});

//==========================Add button=================================

const postBox = document.querySelector('.js-post_container');
const inputFields = document.querySelector('.js-input-fields');

//Opening Posting box by clicking 
addButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevents immediate closing
    postBox.style.display = 'flex';
    inputFields.focus(); //Opening keybord
});
//Closing posting box clicking outside
document.addEventListener('click', (event) => {
    const isOpen = postBox.style.display = 'flex';
    if(isOpen){
        const isClickInside = postBox.contains(event.target) || addButton.contains(event.target);
        if(!isClickInside){
            postBox.style.display = 'none';
        }
    }
})

//=========================Storing userPost data===================

//Containers amount
let containerForAmount = '';
let containerForPurpose = '';

//Creating empty array
let postArray = [];

//==========================Posting validation======================

const inputElem1 = document.getElementById('field1');
const testElement = document.getElementById('test_ele');
const sendButton = document.getElementById('send_btn');
const toggleElem = document.querySelector('.js-click-toggle'); //toggle

//Validate purpose Text
function validatenPurpose(){
    const purpose = inputElem1.value;
    if(purpose !== ''){
        containerForPurpose = purpose;
        return true;    
    }
}
//Validate amount
function validatenAmount(){
    const testElemen = Number(testElement.value);   //Convert string to number
    if(testElemen > 0){
        containerForAmount = testElemen;
        return true;
    }
}

//=====Toggle=====

let toggleState = 'positive'; //Toggle state
 
//function for toggle
function switchToggle(){
    //Checking is positive or not
    const isPositive = toggleElem.innerText;
    //Condition for toggle -> vice versa
    if( isPositive == '+'){
        //Changing button appearance
        toggleElem.textContent = '-';
        toggleElem.style.backgroundColor = '#ef4444';
        //Update toggle state to -
        toggleState = 'negative';
    }else{
        //Changing button appearance
        toggleElem.textContent = '+';
        toggleElem.style.backgroundColor = '#1FB155';
        //Update toggle state to +
        toggleState = 'positive';
    }
}
//Toggle click event
toggleElem.addEventListener('click', () => {
    switchToggle() //Calling toggle function
});

//function for update values in object
function updateObject(){
    //Checking toggle state
    const finalAmount = toggleState === 'negative' ? -Math.abs(containerForAmount) : Math.abs(containerForAmount);
    //Creat object with new values every time
    const newPost = {
        purposeText : containerForPurpose,
        amountNumber : finalAmount,
        usernameText : localStorage.getItem('userName') || 'User',
        CurrentTime : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    postArray.push(newPost);  //object into array
}

//Send button click event
sendButton.addEventListener('click', () => {
    //Getting values from function returns
    const isValidPurpose = validatenPurpose();
    const isValidAmount = validatenAmount();

    //Check both inputs are valid or not
    if(isValidPurpose && isValidAmount){
        updateObject(); //calling function
        console.log("Posted successfully") //Success message
        renderPost()
        //Reset Input fields once posting
        inputElem1.value = '';
        testElement.value = '';
    }else{
        //Alert to user
        alert('Error: Please check the details, try again:(');
    }
});


//=======================RenderUI=============================

//Date and remaining amount at top
function renderDateAndAmount(){
    const dateElement = document.getElementById('date');
    const balanceElement = document.getElementById('day_remaining');
    
    //Getting date with format 8/oct/26
    const today = new Date();
    const options = { 
    day: 'numeric', 
    month: 'short', 
    year: '2-digit' 
    };
    let formattedDate = today.toLocaleDateString('en-GB', options);
    formattedDate = formattedDate.replace(/ /g, '/');
    //Render date
    if (dateElement) {
    dateElement.textContent = formattedDate;
    }

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

//===========UI Card===========

// Grab the main outer container where cards will be rendered
const postsContainer = document.getElementById('card_container');

function renderPost() {
  if (!postsContainer) return;

  //Clear the main container before rendering fresh list
  postsContainer.innerHTML = ''; 

  //Loop through each post object in postArray
  postArray.forEach((post) => {
    const postHTML = `
      <div class="card_item">
        <div class="sub_card">
          <h4 class="js-purposedesc">${post.purposeText}</h4>
          <div style="display: flex; gap: 8px;">
            <p class="js-userdesc">/${post.usernameText}</p>
            <p class="js-timedesc">${post.CurrentTime}</p>
          </div>
        </div>
        <div>
          <h4 class="js-amountdesc">${post.amountNumber} /-</h4>
          <p id="is_deleted"></p>
        </div>
      </div>
    `;

    //Append the card item to the main container
    postsContainer.innerHTML += postHTML;

    //Render remaining amount at top
    renderDateAndAmount();
  });
}

//========================Menu buttons action==================

const incomeButton = document.querySelector('.js-income-btn');
const expenseButton = document.querySelector('.js-expense-btn');
const remainingButton = document.querySelector('.js-remaining-btn');
const dialogBox = document.querySelector('.js-dialog-box');
const dialogClose = document.querySelector('.js-dialog-close');
const totalElement = document.querySelector('.js-totals');
const totalTextElement = document.querySelector('.js-total-text');

//Functions for calculation totals

//Closing dialog box by clicking close button
dialogBox.addEventListener('click', () => {
    dialogBox.style.display = 'none';
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
incomeButton.addEventListener('click',() => {
    calculateAllCredits();//calling 
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
expenseButton.addEventListener('click',() => {
    calculateAllDebits(); //calling
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
remainingButton.addEventListener('click',() => {
    calculateRemainingAmount(); //calling
});

//==================Detele post====================

const deleteContainer = document.querySelector('.js-delete-post');
const deleteButtonElem = document.getElementById('delete_btn');

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
        deleteContainer.style.display = "flex";
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
    deleteContainer.style.display = 'none';
    console.log("Delete index:", selectedIndex);
}
//Detele click event
deleteButtonElem.addEventListener('click', () => {
    deleteAmount();
});
//Closing delete dialog
const closeDelete = document.querySelector('.js-delete-close');
closeDelete.addEventListener('click', () => {
    deleteContainer.style.display = 'none';
});
//=====END======