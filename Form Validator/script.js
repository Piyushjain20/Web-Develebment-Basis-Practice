const form = document.getElementById("form");
const passwordEle = document.getElementById("password");
const confirmPassEle = document.getElementById("confirm-pass");
const messageContainer = document.querySelector(".output");

class User {
  constructor(name, number, email, website, password) {
    this.name = name;
    this.number = number;
    this.email = email;
    this.website = website;
    this.password = password;
  }
}

function validateForm() {
  let isValid = form.checkValidity();
  let passwordMatch;
  if (passwordEle.value === confirmPassEle.value) {
    passwordEle.style.borderColor = "green";
    confirmPassEle.style.borderColor = "green";
    passwordMatch = true;
  } else {
    messageContainer.textContent = "Make sure password match";
    messageContainer.style.color = "red";
    messageContainer.style.borderColor = "red";
    passwordEle.style.borderColor = "red";
    confirmPassEle.style.borderColor = "red";
    passwordMatch = false;
    return false;
  }
  if (isValid && passwordMatch) {
    messageContainer.textContent = "Successfully Registered!";
    messageContainer.style.color = "green";
    messageContainer.style.borderColor = "green";
    return true;
  }
  return false;
}
function processFormData(e) {
  e.preventDefault();
  if (validateForm()) {
    let newUser = new User(form.name.value, form.phone.value, form.email.value, form.website.value, form.password.value);
    console.log(newUser);
  }
}

form.addEventListener("submit", processFormData);
