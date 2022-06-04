const nameProfile = document.querySelector(".profile__name");
const titleProfile = document.querySelector(".profile__title");
const editButton = document.querySelector(".profile__button-edit");
const popup = document.querySelector(".popup");
const formInput = popup.querySelector(".popup__form");
const closeButton = popup.querySelector(".popup__button-close");
const saveButton = popup.querySelector(".popup__save-button");
const nameInput = popup.querySelector(".popup__input_type_name");
const titleInput = popup.querySelector(".popup__input_type_title");

function openPopup() {
  popup.classList.add("popup_open");
  nameInput.value = nameProfile.textContent;
  titleInput.value = titleProfile.textContent;
}

function closePopup() {
  popup.classList.remove("popup_open");
}

function formSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  titleProfile.textContent = titleInput.value;
  closePopup();
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
formInput.addEventListener("submit", formSubmit);
