const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfileModal = document.querySelector("#edit-popup");
const closeEditModalButton = editProfileModal.querySelector(".popup__close");
const formElement = editProfileModal.querySelector(".popup__form");
const nameInput = editProfileModal.querySelector(".popup__input_type_name");
const jobInput = editProfileModal.querySelector(
  ".popup__input_type_description",
);

const addCardModal = document.querySelector("#new-card-popup");
const closeAddCardModalButton = addCardModal.querySelector(".popup__close");
const addCardForm = addCardModal.querySelector(".popup__form");
const cardNameInput = addCardModal.querySelector(
  ".popup__input_type_card-name",
);
const cardLinkInput = addCardModal.querySelector(".popup__input_type_url");

const imageModal = document.querySelector("#image-popup");
const closeImageModalButton = imageModal.querySelector(".popup__close");
const modalImage = imageModal.querySelector(".popup__image");
const modalCaption = imageModal.querySelector(".popup__caption");

const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editProfileModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfileModal);
}

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    modalImage.src = link;
    modalImage.alt = name;
    modalCaption.textContent = name;
    openModal(imageModal);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const newCard = getCardElement(name, link);
  container.prepend(newCard);
}

initialCards.forEach((cardData) => {
  renderCard(cardData.name, cardData.link, cardsContainer);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(cardNameInput.value, cardLinkInput.value, cardsContainer);
  addCardForm.reset();
  closeModal(addCardModal);
}

profileEditButton.addEventListener("click", handleOpenEditModal);
closeEditModalButton.addEventListener("click", () =>
  closeModal(editProfileModal),
);
formElement.addEventListener("submit", handleProfileFormSubmit);

profileAddButton.addEventListener("click", () => openModal(addCardModal));
closeAddCardModalButton.addEventListener("click", () =>
  closeModal(addCardModal),
);
addCardForm.addEventListener("submit", handleCardFormSubmit);

closeImageModalButton.addEventListener("click", () => closeModal(imageModal));
