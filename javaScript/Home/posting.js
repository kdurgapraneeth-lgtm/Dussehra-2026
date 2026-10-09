import { renderDateAndAmount } from "./returnHome.js";

//Containers amount
let containerForAmount = '';
let containerForPurpose = '';

//Creating empty array
export let postArray = [];

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
    setTimeout(() => {
        switchToggle() //Calling toggle function
    },250);
});

//function for get date
function getDate(){
    //Getting date with format 8/oct/26
    const today = new Date();
    const options = { 
    day: 'numeric', 
    month: 'short', 
    year: '2-digit' 
    };
    let formattedDate = today.toLocaleDateString('en-GB', options);
    formattedDate = formattedDate.replace(/ /g, '/');
    return formattedDate;
}
//date
const currentDate = getDate();

//function for update values in object
function updateObject(){
    //Checking toggle state
    const finalAmount = toggleState === 'negative' ? -Math.abs(containerForAmount) : Math.abs(containerForAmount);
    //Creat object with new values every time
    const newPost = {
        purposeText : containerForPurpose,
        amountNumber : finalAmount,
        usernameText : localStorage.getItem('userName') || 'User',
        CurrentTime : currentDate
    }
    postArray.push(newPost);  //object into array
}

//Send button click event
sendButton.addEventListener('click', () => {
    //Getting values from function returns
    const successMessage = document.querySelector('.js-success-message')
    const isValidPurpose = validatenPurpose();
    const isValidAmount = validatenAmount();

    //Check both inputs are valid or not
    if(isValidPurpose && isValidAmount){
        updateObject(); //calling function
        setTimeout(() => {
            successMessage.style.display = 'flex';
            renderPost();
        },500);
        setTimeout(() =>{
            successMessage.style.display = 'none';
        },2000);

        //Reset Input fields once posting
        setTimeout(() =>{
        inputElem1.value = '';
        testElement.value = '';
        },250);    
    }else{
        //Alert to user
        setTimeout(() => {
             alert('Error: Please check the details, try again:(');
        },250);
    }
});

//Render Section

// Grab the main outer container where cards will be rendered
const postsContainer = document.getElementById('card_container');

export function renderPost() {
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
            <p class="js-userdesc">@${post.usernameText}</p>
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

     // Automatically scroll to the latest post
    requestAnimationFrame(() => {
    postsContainer.scrollTop = postsContainer.scrollHeight;
  });
  });
}