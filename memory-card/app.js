const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// keep track of current card
let currentActiveCard = 0;

// store DOM card
const cardsEl = [];

// store card data

const cardsData = getCardsData();

// const cardsData = [
//   { question: "What do you like?", answer: "pizza and chicken" },
//   { question: "What is JavaScript?", answer: "My fav lang" },
// ];

// get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

// add card to local storage
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

// create a card
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
      <p>${data.answer}</p>
    </div>
  </div>
  `;

  card.addEventListener("click", () => {
    card.classList.toggle("show-answer");
  });

  // add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

createCards();

// event listener
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

// show add event
showBtn.addEventListener("click", () => {
  addContainer.classList.add("show");
});

// add new card
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;
});

// hide add container
hideBtn.addEventListener("click", () => {
  addContainer.classList.remove("show");
});

// add new card
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// clear cards from local storage
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
