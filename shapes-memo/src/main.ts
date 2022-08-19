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

const game = document.getElementById("game")!;
let isPaused = false;
let firstPick: HTMLDivElement | null;
let matches = 0;

const displayShapes = () => {
    const gameHTML = [...shapes, ...shapes]
        .sort((_) => Math.random() - 0.5)
        .map((shape, i) => {
            return `
            <div class="card" onclick="clickCard(event)" data-shapename="${shape.name
                }">
                <div class="front">
                    ${i + 1}
                </div>
                <div class="back rotated" style="background-color: ${shape.color
                }; background-image: url(/${shape.name}.svg)">
                    ${shape.name}
                </div>
            </div>
            `;
        })
        .join("");
    game.innerHTML = gameHTML;
};

const clickCard = (event: Event) => {
    const card = event.currentTarget as HTMLDivElement;
    const [front, back] = getFrontAndBackFromCard(card);

    if (front?.classList.contains("rotated") || isPaused) return;

    isPaused = true;
    rotateElements([front, back])

    if (!firstPick) {
        firstPick = card;
        isPaused = false;
    } else {
        const secondShapeName = card.dataset.shapename;
        const firstShapeName = firstPick.dataset.shapename;
        // if shapes not the same flip them
        if (firstShapeName !== secondShapeName) {
            const [firstFront, firstBack] = getFrontAndBackFromCard(firstPick);
            firstPick = null;
            setTimeout(() => {
                rotateElements([firstFront, firstBack, front, back]);
                isPaused = false;
            },
                1000
            )
        } else {
            matches++;
            if (matches === 8) {
                alert("You win!");
            }
            firstPick = null;
            isPaused = false;
        }
    }
};

const getFrontAndBackFromCard = (card: HTMLDivElement): HTMLDivElement[] => {
    const front = card.querySelector(".front") as HTMLDivElement;
    const back = card.querySelector(".back") as HTMLDivElement;
    return [front, back];
};

const rotateElements = (elements: HTMLDivElement[]) => {
    elements.forEach(element => element.classList.toggle("rotated"))
}

const resetGame = () => {
    game.innerHTML = '';
    isPaused = true;
    firstPick = null;
    matches = 0;
    setTimeout(() => {
        displayShapes();
        isPaused = false;
    }, 200
    )
};

const resetButton = document.getElementById("resetButton");
resetButton?.addEventListener("click", resetGame);

resetGame();
