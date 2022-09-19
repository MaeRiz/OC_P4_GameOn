function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector("#modalpage");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalForm = document.querySelector("#modal-form");
const popup = document.querySelector("#popup");


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  document.body.classList.add('overflow-control');
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

// launch popup form
function launchPopUp(text) {
  document.querySelector('#popup-text').innerHTML = text;
  popup.style.display = "block";
  document.body.classList.add('overflow-control');
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

// Close modal
function closeModal() {
  modalbg.style.display = "none";
  document.body.classList.remove('overflow-control');
}

// Close popup
function closePopUp() {
  popup.style.display = "none";
  document.body.classList.remove('overflow-control');

}

// Check form

modalForm.email.addEventListener('change', function() {
  checkField('email', this)
});

modalForm.first.addEventListener('change', function() {
  checkField('name', this)
});

modalForm.last.addEventListener('change', function() {
  checkField('name', this)
});

modalForm.birthdate.addEventListener('change', function() {
  checkField('date', this)
});

modalForm.quantity.addEventListener('change', function() {
  checkField('num', this)
});

const checkField = function(type, data) {
  let emailRegEx = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', 'g');
  let nameRegEx = new RegExp("^[a-z ,.'-]{2,}$" ,'i');
  let dateRegEx = new RegExp('^\\d{4}-\\d{2}-\\d{2}$', 'g');
  let tournaCountRegEx = new RegExp('[0-9]$')

  let small = data.nextElementSibling;

  if (type == 'email') {

    if (!emailRegEx.test(data.value)){
      small.innerHTML = 'Veuillez entrer une adresse email valide !';
      return false;
    }
    else {
      small.innerHTML = '';
      return true;
    };
  }

  if (type == 'name') {

    if (!nameRegEx.test(data.value)){
      small.innerHTML = 'Veuillez entrer un nom de plus de 2 carractères !';
      return false
    }
    else {
      small.innerHTML = '';
      return true
    };
  }

  if (type == 'date') {

    if (!dateRegEx.test(data.value)){
      small.innerHTML = 'Vous devez entrer une date de naissance valide !';
      return false
    }
    else {
      small.innerHTML = '';
      return true
    };
  }

  if (type == 'num') {

    if (!tournaCountRegEx.test(data.value)){
      small.innerHTML = 'Vous devez indiquer un chiffre !';
      return false
    }
    else {
      small.innerHTML = '';
      return true
    };
  }

};

// Check radio field of form

const checkRadio = function(){
  const radioButtons = document.querySelectorAll('input[name="location"]');
  let small = document.querySelector("#radio-location");
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      small.innerHTML = '';
      return true;
    }
    else {
      small.innerHTML = 'Vous devez choisir une ville !';
    }
  }
}

//check checkbox field of form

const checkCheckBox = function() {
  const checkBoxBtn = document.querySelector('input[id="checkbox1"]');
  let small = document.querySelector("#error-checkbox");

  if (checkBoxBtn.checked) {
    small.innerHTML = '';
    return true;
  }
  else {
    small.innerHTML = 'Vous devez accepter les CGU !';
  };

};


// Check fields, send popup, submit 
modalForm.addEventListener('submit', function(event){
  event.preventDefault();
  let firstField = checkField('name', modalForm.first);
  let lastField = checkField('name', modalForm.last);
  let emailField = checkField('email', modalForm.email);
  let birthdateField = checkField('date', modalForm.birthdate);
  let quantiryField = checkField('num', modalForm.quantity);
  let locationField = checkRadio();
  let checkCGUField = checkCheckBox();

  if (firstField && lastField && emailField && birthdateField && quantiryField && locationField && checkCGUField) {
    closeModal();
    launchPopUp('Merci !</br>Votre réservation a été reçue.');
    setTimeout(function() {modalForm.submit();},5000);
  };
});
