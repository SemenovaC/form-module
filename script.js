const form = document.getElementById('form'),
      password1El = document.getElementById('password1'),
      password2El = document.getElementById('password2'),
      messageContainer = document.querySelector('.message-container'),
      message = document.getElementById('message');

let isValid = false;
let passwordsMatch = false;

function validateForm() {
  isValid = form.checkValidity();
  
  //Style main message for an error
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

function storeFormData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value
  };

  console.log(user);

}

function postData (form) {
  const formData = new FormData(form);

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

function processFormData(e) {
  e.preventDefault();
  // Validate Form
  validateForm();

  // Submit Data if Valid
  if (isValid && passwordsMatch) {
    storeFormData();
  }
}

// Event Listener
form.addEventListener('submit', processFormData); 