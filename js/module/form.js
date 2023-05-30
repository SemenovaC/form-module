import { postData } from "../services/services";

const form = (formSelector, passwordOneSelector, passwordTwoSelector, msgContainerSelector, msgSelector) => {
  
  const form = document.querySelector(formSelector),
  password1El = document.querySelector(passwordOneSelector),
  password2El = document.querySelector(passwordTwoSelector),
  messageContainer = document.querySelector(msgContainerSelector),
  message = document.querySelector(msgSelector);

  let isValid = false;
  let passwordsMatch = false;
  let formData;

  function validateForm() {
  isValid = form.checkValidity();

  // Style main message for an error
  if (!isValid) {
    message.textContent = 'Please fill out all fields';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    return;
    } 

  // Check to see if passwords match
  if (password1El.value === password2El.value) {
    passwordsMatch = true;
    password1El.style.borderColor = 'green';
    password2El.style.borderColor = 'green';
  } else {
    passwordsMatch = false;
    message.textContent = 'Make sure passwords match';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    password1El.style.borderColor = 'red';
    password2El.style.borderColor = 'red';
    return;
    }

  // If form is valid and passwords match
  if (isValid && passwordsMatch) {
    message.textContent = 'Successfully registered!';
    message.style.color = 'green';
    messageContainer.style.borderColor = 'green';
    }
  }


  function processFormData(form) {
    formData = new FormData(form);

    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    postData('http://localhost:3000/requests', json)
      .then(data => {
      console.log(data);
      }).catch(() => {
      console.log(data.error);
      }).finally(() => {
      form.reset();
      });
  }

  function saveData(e) {
    e.preventDefault();
    validateForm();

    if (isValid && passwordsMatch) {
      processFormData(form);
    }
  }

  form.addEventListener('submit', saveData); 
}

export default form; 