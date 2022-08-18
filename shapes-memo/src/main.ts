const shapes = [
  {
    name: "circle",
    color: "#ff00ff",
    img: "",
  },
  {
    name: "oval",
    color: "#ff00ff",
    img: "",
  },
  {
    name: "triangle",
    color: "#ff00ff",
    img: "",
  },
  {
    name: "rectangle",
    color: "#ff00ff",
    img: "",
  },
  {
    name: "square",
    color: "#ff00ff",
    img: "",
  },
  {
    name: "diamond",
    color: "#ff00ff",
    img: "",
  },
  {
    name: "heart",
    color: "#ff00ff",
    img: "",
  },
  {
    name: "star",
    color: "#ff00ff",
    img: "",
  },
];

let isPaused = false;
let firstPick: HTMLDivElement;

const displayShapes = () => {
  const gameHTML = [...shapes, ...shapes]
    .sort((_) => Math.random() - 0.5)
    .map((shape, i) => {
      return `
            <div class="card" onclick="clickCard(event)" data-shapename="${
              shape.name
            }">
                <div class="front">
                    ${i + 1}
                </div>
                <div class="back rotated" style="background-color: ${
                  shape.color
                }">
                    ${shape.name}
                </div>
            </div>
            `;
    })
    .join("");
  const game = document.getElementById("game")!;
  game.innerHTML = gameHTML;
};

const clickCard = (event: Event) => {
  const card = event.currentTarget as HTMLDivElement;
  const shapeName = card.dataset.shapename;
  const [front, back] = getFrontAndBackFromCard(card);

  if (front?.classList.contains("rotated") || isPaused) return;

  isPaused = true;
  front?.classList.toggle("rotated");
  back?.classList.toggle("rotated");

  if (!firstPick) {
    firstPick = card;
    isPaused = false;
  } else {
    const secondShapeName = card.dataset.shapename;
    const firstShapeName = firstPick.dataset.shapename;
    // if shapes not the same flip them /**
    if (firstShapeName !== secondShapeName) {
      const [firstFront, firstBack] = getFrontAndBackFromCard(firstPick);
      front?.classList.toggle("rotated");
      back?.classList.toggle("rotated");
      firstFront?.classList.toggle("rotated");
      firstBack?.classList.toggle("rotated");
    }
  }
};

const getFrontAndBackFromCard = (card: HTMLDivElement) => {
  const front = card.querySelector(".front");
  const back = card.querySelector(".back");
  return [front, back];
};

const rotate

const resetGame = () => {
  displayShapes();
};

const resetButton = document.getElementById("resetButton");
resetButton?.addEventListener("click", resetGame);

resetGame();
