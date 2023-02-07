let users = [];
// handle form
let form = document.getElementById("signUpForm");
function handleForm(event) {
  event.preventDefault();
}
document.addEventListener("submit", handleForm);
// reset error messages
function resetError() {
  let resetErrors = document.getElementsByClassName("error");
  for (let i = 0; i < resetErrors.length; i++) {
    resetErrors[i].classList.remove("visible");
    resetErrors[i].classList.add("hidden");
  }
}
document.addEventListener("change", resetError);

// view modal
function hiddenEl(id) {
  let el = document.getElementById(id);
  el.classList.add("flex");
  el.classList.remove("hidden");
}

// show error messages
function errorMessage(id) {
  let errors = document.getElementById(id);
  errors.classList.remove("hidden");
  errors.classList.add("visible");
}
// count password uppercase letter
function countLetter(data) {
  let count = 0;
  let pass = data;
  let arr = pass.split("");
  for (let i of arr) {
    if (i == i.toUpperCase()) {
      count++;
    }
  }
  return count;
}
//close modal
function closeModal() {
  signUpWrapper.classList.remove("visible");
  signUpWrapper.classList.add("hidden");
}
document.addEventListener("click", (event) => {
  if (event.target == signUpWrapper) {
    closeModal();
  }
});
//reset form
function resetForm(id) {
  let resetForm = document.getElementById(id);
  resetForm.reset();
}
// json server
let url = " http://localhost:3000";
// sign up
function signUpMain() {
  hiddenEl("signUpWrapper");
}
function getEmail() {
  fetch(`${url}/users`, { method: "get" })
    .then((res) => res.json())
    .then((data) => data);
}

async function signUpBtn() {
  let jsonUsers = await fetch(`${url}/users`, { method: "get" })
    .then((res) => res.json())
    .then((data) => data);
  let email = document.getElementById("email").value;
  let userNameSignUp = document.getElementById("usernameSignUp").value;
  let passwordSignUp = document.getElementById("passwordSignUp").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  let checkbox = document.getElementById("checkbox").checked;

  if (!email || !userNameSignUp || !passwordSignUp || !confirmPassword) {
    errorMessage("emptyFields");
  } else if (!email.includes("@")) {
    errorMessage("emailError");
  } else if (userNameSignUp && userNameSignUp.length < 3) {
    errorMessage("usernameError");
  } else if (passwordSignUp && passwordSignUp.length < 8) {
    errorMessage("passwordError");
  } else if (countLetter(passwordSignUp) < 2) {
    errorMessage("passwordErrorChar");
  } else if (passwordSignUp !== confirmPassword) {
    errorMessage("checkPasswords");
  } else if (!checkbox) {
    errorMessage("checkboxChecked");
  } else if (
    jsonUsers.some((el) => el.email.toLowerCase() === email.toLowerCase())
  ) {
    errorMessage("emailExists");
  } else if (
    jsonUsers.some(
      (el) => el.username.toLowerCase() === userNameSignUp.toLowerCase()
    )
  ) {
    errorMessage("userExists");
  } else {
    function usersPost() {
      (users = {
        id: Math.random(),
        email,
        username: userNameSignUp,
        password: passwordSignUp,
      }),
        fetch(`${url}/users`, {
          method: "POST",
          body: JSON.stringify(users),
          headers: { "Content-type": "application/json" },
        })
          .then((resp) => resp.json())
          .then((data) => {
            return data;
          });
    }
    usersPost();
    errorMessage("successReg");
    resetForm("signUpForm");
  }
}
// open log in form
function logInMain() {
  hiddenEl("logInWrapper");
}
// close Modal
function logInModal() {
  logInWrapper.classList.remove("visible");
  logInWrapper.classList.add("hidden");
}
document.addEventListener("click", (event) => {
  if (event.target == logInWrapper) {
    logInModal();
  }
});
// hide btns
function hideBtn(id) {
  let elem = document.getElementById(id);
  elem.classList.add("hidden");
}
//log in form
async function logIn() {
  let jsonUsers = await fetch(`${url}/users`, { method: "get" })
    .then((res) => res.json())
    .then((data) => data);
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (!username || !password) {
    errorMessage("emptyInputs");
  } else if (password && password.length < 8) {
    errorMessage("passErrorOne");
  } else if (countLetter(password) < 2) {
    errorMessage("passErrorTwo");
  } else if (
    !jsonUsers.some((el) => el.username.toLowerCase() == username.toLowerCase)
  ) {
    errorMessage("userNotExist");
  } else if (
    !jsonUsers.some((el) => el.password.toLowerCase() == password.toLowerCase())
  ) {
    errorMessage("passNotExist");
  } else {
    resetForm("logInForm");
    logInModal();
    hideBtn("logMainBtn");
    hideBtn("signMainBtn");
    let pUserName = document.getElementById("registrationUserName");
    let text = document.createTextNode(`${username}`);
    pUserName.appendChild(text);
    pUserName.classList.remove("hidden");
    pUserName.classList.add("visible");
  }
}
// see tours
let seeToursWrapper = document.getElementById("seeToursWrapper");
let tourWrapper = document.getElementById("tourWrapper");
function seeTours() {
  hiddenEl("seeToursWrapper");
}
fetch(`${url}/tours`, { method: "get" })
  .then((data) => {
    return data.json();
  })
  .then((jsonData) => {
    for (let i = 0; i < jsonData.length; i++) {
      let toursLi = document.createElement("li");
      let toursText = document.createTextNode(`Tour:  ${jsonData[i].tour}`);
      toursLi.appendChild(toursText);
      tourWrapper.appendChild(toursLi);
    }
  });

// close see tours modal
function seeToursModal() {
  seeToursWrapper.classList.remove("visible");
  seeToursWrapper.classList.add("hidden");
}
document.addEventListener("click", (event) => {
  if (event.target == seeToursWrapper) {
    seeToursModal();
  }
});
// why choose us
let ratingWrapper = document.getElementById("ratingWrapper");
fetch(`${url}/rating`, { method: "get" })
  .then((data) => data.json())
  .then((jsData) => {
    for (let i = 0; i < jsData.length; i++) {
      let liQuant = document.getElementById("firstQ");
      let liText = document.createTextNode(`${jsData[i].quantity}`);
      let spanTag = document.createElement("span");
      spanTag.appendChild(liText);
      liQuant.appendChild(spanTag);
      let liRating = document.getElementById("firstR");
      let liTextRating = document.createTextNode(`${jsData[i].text}`);
      let spanTextTag = document.createElement("span");
      spanTextTag.appendChild(liTextRating);
      liRating.appendChild(spanTextTag);
    }
  });
