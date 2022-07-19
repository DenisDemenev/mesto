const nameProfile = document.querySelector(".profile__name");
const titleProfile = document.querySelector(".profile__title");
const editButton = document.querySelector(".profile__button-edit");
const addButton = document.querySelector(".profile__button-add");
const closeButton = document.querySelectorAll(".popup__button-close");

const popupBigPhoto = document.querySelector(".popup_photo_big");
const bigPhoto = popupBigPhoto.querySelector(".popup__big-photo");
const bigPhotoCapture = popupBigPhoto.querySelector(
  ".popup__big-photo-capture"
);

const popupProfile = document.querySelector(".popup_profile_edit");
const formInputProfile = popupProfile.querySelector(".popup__form");
const saveButtonProfile = popupProfile.querySelector(".popup__save-button");
const nameInput = popupProfile.querySelector(".popup__input_type_name");
const titleInput = popupProfile.querySelector(".popup__input_type_title");

const popupAdd = document.querySelector(".popup_photo_card-add");
const formInputAdd = popupAdd.querySelector(".popup__form");
const saveButtonAdd = popupAdd.querySelector(".popup__save-button");
const placeNameInput = popupAdd.querySelector(".popup__input_type_place");
const linkInput = popupAdd.querySelector(".popup__input_type_link");

const photo = document.querySelector("#photoCard").content;
const photo__card = photo.querySelector(".photo__card");
const photo__cards = document.querySelector(".photo__cards");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function likeActive(evt) {
  evt.target.classList.toggle("photo__card-like_active");
}

function cardDelete(el) {
  el.remove();
}

function openPopup(popupItem) {
  popupItem.classList.add("popup_open");
}


function openPopupProfile() {
  nameInput.value = nameProfile.textContent;
  titleInput.value = titleProfile.textContent;
  openPopup(popupProfile);
}

function openPopupAdd() {
  placeNameInput.value = "";
  linkInput.value = "";
  openPopup(popupAdd);
}

function closePopup(popupItem) {
  popupItem.classList.remove("popup_open");
}

function formSubmitProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  titleProfile.textContent = titleInput.value;
  closePopup(popupProfile);
}

function formSubmitAdd(evt) {
  evt.preventDefault();
  let newInfo = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  const newCard = createCard(newInfo);
  photo__cards.prepend(newCard);
  closePopup(popupAdd);
}

function createCard(el) {
  const card = photo__card.cloneNode(true);
  const cardPhoto = card.querySelector(".photo__card-image");
  card.querySelector(".photo__card-title").textContent = el.name;
  cardPhoto.src = el.link;
  cardPhoto.alt = el.name;
  card.querySelector(".photo__card-like").addEventListener("click", likeActive);
  card.querySelector(".photo__card-remove").addEventListener("click", () => {
    cardDelete(card);
  });
  cardPhoto.addEventListener("click", function () {
    bigPhoto.src = el.link;
    bigPhoto.alt = el.name;
    bigPhotoCapture.textContent = el.name;
    openPopup(popupBigPhoto);
  });
  return card;
}

initialCards.forEach(function (el) {
  const placeEl = createCard(el);
  photo__cards.append(placeEl);
});

editButton.addEventListener("click", openPopupProfile);
addButton.addEventListener("click", openPopupAdd);
formInputProfile.addEventListener("submit", formSubmitProfile);
formInputAdd.addEventListener("submit", formSubmitAdd);
closeButton.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closePopup(popup));
});
