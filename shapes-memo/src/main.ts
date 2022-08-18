enum Shape {
    Circle = "circle",
    Oval = "oval",
    Triangle = "triangle",
    Rectangle = "rectangle",
    Square = "square",
    Diamond = "diamond",
    Heart = "heart",
    Star = "star",
}

const displayShapes = () => {
    const shapes = Object.values(Shape);
    const gameHTML = [...shapes, ...shapes].sort(_ => Math.random() - 0.5).map((shape, i) => {
        return `
            <div class="card">
                <div class="front">
                    ${i + 1}
                </div>
                <div class="back rotated">
                    ${shape}
                </div>
            </div>
            `
    }).join('');
    const game = document.getElementById("game")!;
    game.innerHTML = gameHTML;
}

const resetGame = () => {
    displayShapes();
}

const resetButton = document.getElementById("resetButton");
resetButton?.addEventListener("click", resetGame);

resetGame();
