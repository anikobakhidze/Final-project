// handle form
let form=document.getElementById("signUpForm");
function handleForm(event){
  event.preventDefault();
}
document.addEventListener("submit",handleForm);
// reset error messages
function resetError(){
  let resetErrors=document.getElementsByClassName("error");
  for(let i=0; i<resetErrors.length;i++){
    resetErrors[i].classList.remove("visible");
    resetErrors[i].classList.add("hidden")
  }
}
document.addEventListener("change", resetError)

// view modal 
function hiddenEl(id){
  let el=document.getElementById(id);
  el.classList.add("flex");
  el.classList.remove("hidden")
}

// show error messages
function errorMessage(id){
  let errors=document.getElementById(id);
  errors.classList.remove("hidden");
  errors.classList.add("visible")
}
// count password uppercase letter
function countLetter(data){
  let count=0;
  let pass=data;
  let arr=pass.split('');
  for(let i of arr){
    if(i==i.toUpperCase()){
      count++
    }
  }
  return count;
}
// sign up 
function signUpMain(){
  hiddenEl("signUpWrapper");
}
function signUpBtn(){
  let email=document.getElementById("email").value;
  let userNameSignUp=document.getElementById("usernameSignUp").value;
  let passwordSignUp=document.getElementById("passwordSignUp").value;
  let confirmPassword=document.getElementById("confirmPassword").value;
  let checkbox=document.getElementById("checkbox").checked;
  if(!email ||!userNameSignUp||!passwordSignUp|| !confirmPassword||!checkbox){
    errorMessage("emptyFields");
  }else if(userNameSignUp &&userNameSignUp.length<3){
    errorMessage("usernameError");
  }else if(passwordSignUp&& passwordSignUp.length<8){
    errorMessage("passwordError")
  } else if(countLetter(passwordSignUp)<2){
    errorMessage("passwordErrorChar")
  }
}
