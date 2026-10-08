//Script for SignUp screen

//Getting elements
const nameInputElem = document.querySelector('.js-name-field');
const passwordInputElem= document.querySelector('.js-password-field');
const errorName = document.querySelector('.js-error-name');
const errorPassword = document.querySelector('.js-error-password');

//=========================Set password==================================

//function for password getting
function getPassword(){
    return "@Dussehra-2026";
}
//Original Password
const org_Password = getPassword();

//===========================Validate details===========================

//funtion for name validation
function validateName(){
    const name = nameInputElem.value.trim();
    //Validate
    if(name.length < 4){
        errorName.textContent = "name must be above 4 charaters :(";
    }else{
        //Store User name in local storage
        localStorage.setItem('userName', name);
        return true; //Name validation completed  
    }
}

//function for password validation
function validatePassword(){
    const password = passwordInputElem.value;
    if(password !== org_Password){
      errorPassword.textContent = 'invalid password :(';
    }else{
        return true;
    }
}

//==========================Clearing input==========================

//Clear the  name error message, while start continued typing
nameInputElem.addEventListener('input', () => {
  errorName.textContent = "";
});

//Clear the  password error message, while start continued typing
passwordInputElem.addEventListener('input', () => {
  errorPassword.textContent = "";
});

//===============================Done button=========================

//Done button click event
done_btn.addEventListener('click', () => {
    //Getting values, which returning from functions
    const is_validName = validateName();
    const is_validPass = validatePassword();

    //Returning to home page
    if(is_validName && is_validPass){
        window.location.href = "Home.html";
        //Store -is_Sign up user- in local storage
        localStorage.setItem('hasSignedUp', 'true');
    }
});

//---END---

