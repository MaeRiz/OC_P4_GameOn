function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalForm = document.querySelector("#modal-form")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal
function closeModal() {
  modalbg.style.display = "none";
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

modalForm.addEventListener('submit', function(event){
  event.preventDefault();
  if (checkField('name', modalForm.first) && checkField('name', modalForm.last) && checkField('email', modalForm.email) && checkField('date', modalForm.birthdate) && checkField('num', modalForm.quantity) && checkRadio() && checkCheckBox()) {
    modalForm.submit();
  };
});