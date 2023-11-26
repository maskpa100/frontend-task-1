let nameInput = document.getElementById("name");
let phoneInput = document.getElementById("phone");
let emailInput = document.getElementById("email");
let errorElement = document.querySelector(".error");
let states = {
  "item-name": false,
  "item-phone": false,
  "item-email": false,
};
function addError(element, element2, text) {
  const item = document.getElementById(element);
  item.classList.add("item-error");
  item.classList.remove("item-success");
  const errorName = document.getElementById(element2);
  if (!errorName) {
    var spanElement = document.createElement("span");
    spanElement.id = element2;
    spanElement.textContent = text;
    errorElement.appendChild(spanElement);
  }
}

function removeError(element, element2) {
  states[element] = true;
  const item = document.getElementById(element);
  item.classList.remove("item-error");
  item.classList.add("item-success");
  var spanElement = errorElement.querySelector(element2);
  if (spanElement) {
    spanElement.remove();
  }
}

nameInput.addEventListener("blur", function () {
  if (nameInput.value.trim() === "") {
    addError("item-name", "error-name", "* ФИО обязателен ");
  } else {
    removeError("item-name", "#error-name");
  }
});

phoneInput.addEventListener("blur", function () {
  var regex = /^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;

  if (regex.test(phoneInput.value)) {
    removeError("item-phone", "#error-phone");
  } else {
    addError("item-phone", "error-phone", "* Телефон обязателен ");
  }
});

emailInput.addEventListener("blur", function () {
  var emailValue = emailInput.value.trim();
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    addError("item-email", "error-email", "* E-mail введен некорректно");
  } else {
    removeError("item-email", "#error-email");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("submitBtn")
    .addEventListener("click", function (event) {
      event.preventDefault();

        var form = document.querySelector("form");
        var formData = new FormData(form);
        var xhr = new XMLHttpRequest();

        xhr.open("POST", "https://jsonplaceholder.typicode.com/posts", true);

        xhr.send(formData);

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 201) {
            alert("Вы успешно отправили сообщение.");
          }
          if (xhr.readyState === 4 && xhr.status === 404) {
            alert("Страница не найдена");
          }
        };

    });
});
