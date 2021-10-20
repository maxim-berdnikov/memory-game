const section = document.querySelector(".js-container");
const livesCount = document.querySelector(".js-lives");

const defaultLives = 6

let lives = defaultLives;
livesCount.textContent = lives;

const getData = () => [
  { img: "linear-gradient(to bottom, red, purple)", name: "first" },
  { img: "linear-gradient(to bottom, yellow, lime)", name: "second" },
  { img: "linear-gradient(to bottom, green, teal)", name: "third" },
  { img: "linear-gradient(to bottom, blue, purple)", name: "fourth" },
  { img: "linear-gradient(to bottom, red, yellow)", name: "fifth" },
  { img: "linear-gradient(to bottom, orange, lime)", name: "sixth" },
  { img: "linear-gradient(to bottom, green, blue)", name: "seventh" },
  { img: "linear-gradient(to bottom, teal, purple)", name: "eighth" },
  { img: "linear-gradient(to bottom, red, purple)", name: "first" },
  { img: "linear-gradient(to bottom, yellow, lime)", name: "second" },
  { img: "linear-gradient(to bottom, green, teal)", name: "third" },
  { img: "linear-gradient(to bottom, blue, purple)", name: "fourth" },
  { img: "linear-gradient(to bottom, red, yellow)", name: "fifth" },
  { img: "linear-gradient(to bottom, orange, lime)", name: "sixth" },
  { img: "linear-gradient(to bottom, green, blue)", name: "seventh" },
  { img: "linear-gradient(to bottom, teal, purple)", name: "eighth" },
];

const randomizeData = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

const cardGenerator = () => {

  section.innerHTML = "";

  const cardData = randomizeData();

  cardData.forEach((item) => {
    const card = document.createElement("div");
    const front = document.createElement("div");
    const back = document.createElement("div");
    card.classList.add("card");
    front.classList.add("front");
    back.classList.add("back");

    front.style.backgroundImage = item.img;
    card.setAttribute("data-name", item.name);

    section.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.add("card-active");
      checkCards(e);
    });
  });
};

const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add('flipped');
  const flippedCard = document.querySelectorAll('.flipped');
  if (flippedCard.length === 2) {
    if (flippedCard[0].dataset.name === flippedCard[1].dataset.name) {
        flippedCard.forEach((card) => {
            card.classList.remove('flipped');
        });
    } else {
        flippedCard.forEach((card) => {
            card.classList.remove('flipped');
            setTimeout(() => { card.classList.remove('card-active')}, 1000);
        });
        --lives;
        livesCount.textContent = lives;

        if (lives === 0) {
            const cards = document.querySelectorAll('.card');
            cards.forEach((card) => {
                if (card.classList.contains('card-active')) {
                    card.classList.remove('card-active')
                }
            });
            lives = defaultLives;
            livesCount.textContent = lives;
           
            setTimeout(() => { 
                cardGenerator();
            }, 1000);
           
        }
    }
  }
};

cardGenerator();