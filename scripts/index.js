const nameProfile = document.querySelector(".profile__name");
const titleProfile = document.querySelector(".profile__title");
const editButton = document.querySelector(".profile__button-edit");
const addButton = document.querySelector(".profile__button-add");
const closeButtons = document.querySelectorAll(".popup__button-close");

const popupBigPhoto = document.querySelector(".popup_photo_big");
const bigPhoto = popupBigPhoto.querySelector(".popup__big-photo");
const bigPhotoCapture = popupBigPhoto.querySelector(
  ".popup__big-photo-capture"
);

const popupProfile = document.querySelector(".popup_profile_edit");
const formInputProfile = popupProfile.querySelector(".popup__form");
const nameInput = popupProfile.querySelector(".popup__input_type_name");
const titleInput = popupProfile.querySelector(".popup__input_type_title");

const popupAdd = document.querySelector(".popup_photo_card-add");
const formInputAdd = popupAdd.querySelector(".popup__form");
const placeNameInput = popupAdd.querySelector(".popup__input_type_place");
const linkInput = popupAdd.querySelector(".popup__input_type_link");

const photo = document.querySelector("#photoCard").content;
const photoCard = photo.querySelector(".photo__card");
const photoCardItem = document.querySelector(".photo__cards");

function activeLike(evt) {
  evt.target.classList.toggle("photo__card-like_active");
}

function deleteCard(el) {
  el.remove();
}

function openPopup(popupItem) {
  popupItem.classList.add("popup_open");
  document.addEventListener('keydown', closePopupByEsc);
  popupItem.addEventListener('mousedown', closePopupByOverplay);
}

function openPopupProfile() {
  nameInput.value = nameProfile.textContent;
  titleInput.value = titleProfile.textContent;
  openPopup(popupProfile);
}

function openPopupAdd() {
  formInputAdd.reset();
  openPopup(popupAdd);
}

function closePopup(popupItem) {
  popupItem.classList.remove("popup_open");
  document.removeEventListener('keydown', closePopupByEsc);
  popupItem.removeEventListener('mousedown', closePopupByOverplay);
}

function closePopupByOverplay(evt) {
  if (evt.target === evt.currentTarget) {
    const popupItem = evt.currentTarget;
    closePopup(popupItem);
  }
}

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupItem = document.querySelector('.popup_open');
    closePopup(popupItem);
  }
}


function submitFormProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  titleProfile.textContent = titleInput.value;
  closePopup(popupProfile);
}

function submitFormAdd(evt) {
  evt.preventDefault();
  const newInfo = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  const newCard = createCard(newInfo);
  photoCardItem.prepend(newCard);
  closePopup(popupAdd);
}

function createCard(el) {
  const card = photoCard.cloneNode(true);
  const cardPhoto = card.querySelector(".photo__card-image");
  card.querySelector(".photo__card-title").textContent = el.name;
  cardPhoto.src = el.link;
  cardPhoto.alt = el.name;
  card.querySelector(".photo__card-like").addEventListener("click", activeLike);
  card.querySelector(".photo__card-remove").addEventListener("click", () => {
    deleteCard(card);
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
  photoCardItem.append(placeEl);
});

editButton.addEventListener("click", openPopupProfile);
addButton.addEventListener("click", openPopupAdd);
formInputProfile.addEventListener("submit", submitFormProfile);
formInputAdd.addEventListener("submit", submitFormAdd);
closeButtons.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closePopup(popup));
});
