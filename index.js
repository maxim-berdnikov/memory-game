const section = document.querySelector(".js-container");
const livesCount = document.querySelector(".js-lives");

const defaultLives = 6;

let lives = defaultLives;
livesCount.textContent = lives;

const getData = () => [
  { img: `url("./img/img1.jpeg")`, name: "first" },
  { img: `url("./img/img2.jpeg")`, name: "second" },
  { img: `url("./img/img3.jpg")`, name: "third" },
  { img: `url("./img/img4.jpeg")`, name: "fourth" },
  { img: `url("./img/img5.jpeg")`, name: "fifth" },
  { img: `url("./img/img6.jpg")`, name: "sixth" },
  { img: `url("./img/img7.jpeg")`, name: "seventh" },
  { img: `url("./img/img8.jpeg")`, name: "eighth" },
  { img: `url("./img/img1.jpeg")`, name: "first" },
  { img: `url("./img/img2.jpeg")`, name: "second" },
  { img: `url("./img/img3.jpg")`, name: "third" },
  { img: `url("./img/img4.jpeg")`, name: "fourth" },
  { img: `url("./img/img5.jpeg")`, name: "fifth" },
  { img: `url("./img/img6.jpg")`, name: "sixth" },
  { img: `url("./img/img7.jpeg")`, name: "seventh" },
  { img: `url("./img/img8.jpeg")`, name: "eighth" },
];

const firstShow = () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    setTimeout(() => {
      card.classList.add("card-active");
    }, 500);

    setTimeout(() => {
      card.classList.remove("card-active");
    }, 10000);
  });
};

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

  firstShow();
};

const notification = (status) => {
  confirm(status);
};

const restart = (status) => {
  confirm(status);
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    if (card.classList.contains("card-active")) {
      card.classList.remove("card-active");
    }
  });
  
  lives = defaultLives;
  livesCount.textContent = lives;

  setTimeout(() => {
    cardGenerator();
    firstShow();
  }, 1000);
};

const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCard = document.querySelectorAll(".flipped");
  if (flippedCard.length === 2) {
    if (flippedCard[0].dataset.name === flippedCard[1].dataset.name) {
      flippedCard.forEach((card) => {
        card.classList.remove("flipped");
      });

      const activeCards = document.querySelectorAll(".card-active");
      if (activeCards.length === 16) {
        setTimeout(() => restart("Yay!"), 800);
        // restart();
      }
    } else {
      flippedCard.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => {
          card.classList.remove("card-active");
        }, 1000);
      });
      --lives;
      livesCount.textContent = lives;

      if (lives === 0) {
        // notification("You are failed(");
        restart("You are failed(");
      }
    }
  }
};

cardGenerator();
