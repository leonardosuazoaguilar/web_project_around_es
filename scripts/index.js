import { enableValidation, resetValidation } from "./validate.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "[https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg](https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg)",
  },
  {
    name: "Lago Louise",
    link: "[https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg](https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg)",
  },
  {
    name: "Montañas Calvas",
    link: "[https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg](https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg)",
  },
  {
    name: "Latemar",
    link: "[https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg](https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg)",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "[https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg](https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg)",
  },
  {
    name: "Lago di Braies",
    link: "[https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg](https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg)",
  },
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfileModal = document.querySelector("#edit-popup");
const editProfileForm = editProfileModal.querySelector(".popup__form");
const nameInput = editProfileModal.querySelector(".popup__input_type_name");
const jobInput = editProfileModal.querySelector(
  ".popup__input_type_description",
);

const addCardModal = document.querySelector("#new-card-popup");
const addCardForm = addCardModal.querySelector(".popup__form");
const cardNameInput = addCardModal.querySelector(
  ".popup__input_type_card-name",
);
const cardLinkInput = addCardModal.querySelector(".popup__input_type_url");

const imageModal = document.querySelector("#image-popup");
const modalImage = imageModal.querySelector(".popup__image");
const modalCaption = imageModal.querySelector(".popup__caption");

const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;
const popups = document.querySelectorAll(".popup");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscUp);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscUp);
}

function handleEscUp(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    if (activePopup) {
      closeModal(activePopup);
    }
  }
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_is-opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(popup);
    }
  });
});

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  resetValidation(editProfileForm, validationConfig);
  openModal(editProfileModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfileModal);
}

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = `Imagen de ${name}`;
  cardTitle.textContent = name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    modalImage.src = link;
    modalImage.alt = `Vista ampliada de ${name}`;
    modalCaption.textContent = name;
    openModal(imageModal);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const newCard = createCard(name, link);
  container.prepend(newCard);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(cardNameInput.value, cardLinkInput.value, cardsContainer);
  addCardForm.reset();
  closeModal(addCardModal);
}

initialCards.forEach((cardData) => {
  renderCard(cardData.name, cardData.link, cardsContainer);
});

profileEditButton.addEventListener("click", handleOpenEditModal);
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

profileAddButton.addEventListener("click", () => {
  addCardForm.reset();
  resetValidation(addCardForm, validationConfig);
  openModal(addCardModal);
});
addCardForm.addEventListener("submit", handleCardFormSubmit);

enableValidation(validationConfig);
