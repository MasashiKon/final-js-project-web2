const path = "./assets";
let cardWidth = 100;
let cardHeight = 150;
const padding = 20;
const defaultGap = 20;
const frameThickness = 10;
let numOfAnimals = 5;
let patternIndex = "1";
let cardDealTimeline = null;
let easy = "#317714";
let medium = "#967D00";
let hard = "#BB3318";
let headerHeight = null;
let regendHeight = null;
let playFieldHeight = null;
let colNum = 5;
let rowNum = 2;
let betweenCard = 20;

const cardsPositions = [];

const animals = [
    {
        name: 'elephant',
        image: `https://source.unsplash.com/ylL764BIYgk`
    },
    {
        name: 'lion',
        image: `https://source.unsplash.com/7HKdb6i3afk`
    },
    {
        name: 'orange-chinned parakeet',
        image: `https://source.unsplash.com/OlKkCmToXEs`
    },
    {
        name: 'wombat',
        image: `https://source.unsplash.com/BFErhnRu188`
    },
    {
        name: 'tule elk',
        image: `https://source.unsplash.com/aJuv14zf-ZY`
    },
    {
        name: 'crocodile',
        image: `https://source.unsplash.com/qdg2Hxyjz4M`
    },
    {
        name: 'turtle',
        image: `https://source.unsplash.com/N5ByCirHVqw`
    },
    {
        name: 'baboon',
        image: `https://source.unsplash.com/daC7ji1EMHM`
    },
    {
        name: 'carpet python',
        image: `https://source.unsplash.com/Ws6Tb1cI0co`
    },
    {
        name: 'red wolf',
        image: `https://source.unsplash.com/iUA1cea8QiY`
    },
]

const cardBacks = ["/card-jacket1.png", "/card-jacket2.png"]

class Card {
    constructor(name, face, backId) {
        this.name = name;
        this.face = face;
        this.jacket = `${path}/card-jacket${backId}.png`;
    }
}

const playField = document.querySelector("#play-field");
const matchedCardsField = document.querySelector("#matched-cards-field");
const startBtn = document.querySelector("#startBtn");
const timebar = document.querySelector("#timebar");
const rangeInputWrapper = document.querySelector("#numOfAnimalsWrapper");
const rangeInput = document.querySelector("#numOfAnimals");
const patternInput = document.querySelector("#backPattern");
const startTimebar = document.querySelector("#start-timebar");

playField.style.backgroundImage = `url("${path}/whitescreen50.png"), url("${path}/chris-abney-qLW70Aoo8BE-unsplash.jpg")`;
matchedCardsField.style.backgroundImage = `url("${path}/whitescreen50.png"), url("${path}/ermelinda-martin-Bu_9GlQe8uI-unsplash.jpg")`;

const gameState = {
    isStart: false,
    selectedCards: [],
    matchedPair: 0,
    flipedCards: [],
    isEvaluating: false,
    pickedAnimals: [],
    timer: 100,
    addedGameOverAnim: false
}

let timerFunc;

window.addEventListener('DOMContentLoaded',function () {

    const header = document.querySelector(".navbar-container");
    headerHeight = header.offsetHeight;
    regendHeight = document.querySelector("#game-regend").offsetHeight;
    playFieldHeight = playField.offsetHeight
  
    let scrollTrigger = 100;
    window.onscroll = function () {
      if (
        scrollTrigger >= window.scrollY ||
        scrollTrigger >= window.pageYOffset
      ) {
        header.style.backgroundColor = "rgba(255, 255,255, 0.5)";
      } else {
        header.style.backgroundColor = "rgba(255, 255, 255)";
      }
    };

    window.addEventListener("resize", function() {
        if(!gameState.isStart) {
            resetGame();
        }   
        
    });
    
    rangeInput.addEventListener("change", changeNumOfAnimals);
    patternInput.addEventListener("change", changeBackPattern);

    startBtn.addEventListener("click", startBtnFunc);


    pickupAnimals();
    setGame();
});

function setGame() {

    const [col, row, numOfCol, numOfRow] = calcGrid();
    playField.style.gridTemplateColumns = col;
    playField.style.gridTemplateRows = row;

    let neededWidth = numOfCol * cardWidth + (numOfCol - 1) * defaultGap + padding;
    let neededHeight = numOfRow * cardHeight + (numOfRow - 1) * defaultGap + padding;

    if(neededWidth > window.innerWidth) {
        const gap = (numOfCol - 1) * 5;

        cardWidth = 60;
        cardHeight = 90;

        matchedCardsField.style.height = `${cardHeight}px`;

        playField.style.columnGap = "5px";
        playField.style.rowGap = "5px";
        betweenCard = 15;

        neededWidth = numOfCol * cardWidth + (numOfCol - 1) * defaultGap + padding;
        neededHeight = numOfRow * cardHeight + (numOfRow - 1) * defaultGap + padding;
    } else {
        
        if(numOfAnimals === 6) {
            cardWidth = 80;
            cardHeight = 120;
            matchedCardsField.style.height = `${cardHeight}px`;
            betweenCard = 18;
        } else {
            cardWidth = 100;
            cardHeight = 150;
            matchedCardsField.style.height = `${cardHeight}px`;
            betweenCard = 15;
        }
 
        playField.style.columnGap = "15px";
        playField.style.rowGap = "15px";

        neededWidth = numOfCol * cardWidth + (numOfCol - 1) * defaultGap + padding;
        neededHeight = numOfRow * cardHeight + (numOfRow - 1) * defaultGap + padding;
    }

    if(neededHeight > window.innerHeight - headerHeight - cardHeight - 20) {
        const gap = (numOfRow - 1) * 5;

        cardWidth = 60;
        cardHeight = 90;

        matchedCardsField.style.height = `${cardHeight}px`;

        playField.style.columnGap = "5px";
        playField.style.rowGap = "5px";
        betweenCard = 20;

        neededWidth = numOfCol * cardWidth + (numOfCol - 1) * defaultGap + padding;
        neededHeight = numOfRow * cardHeight + (numOfRow - 1) * defaultGap + padding;
    } else {
        if(numOfAnimals === 6) {
            cardWidth = 80;
            cardHeight = 120;
            matchedCardsField.style.height = `${cardHeight}px`;
            betweenCard = 17;
        } else {
            cardWidth = 100;
            cardHeight = 150;
            matchedCardsField.style.height = `${cardHeight}px`;
            betweenCard = 17;
        }
 
        playField.style.columnGap = "15px";
        playField.style.rowGap = "15px";

        neededWidth = numOfCol * cardWidth + (numOfCol - 1) * defaultGap + padding;
        neededHeight = numOfRow * cardHeight + (numOfRow - 1) * defaultGap + padding;
    }

    if(numOfAnimals < 8) {

        if(numOfAnimals === 6) {
            cardWidth = 80;
            cardHeight = 120;
            matchedCardsField.style.height = `${cardHeight}px`;
        } else {
            cardWidth = 100;
            cardHeight = 150;
            matchedCardsField.style.height = `${cardHeight}px`;
        }
 
        playField.style.columnGap = "15px";
        playField.style.rowGap = "15px";
        betweenCard = 17;

        neededWidth = numOfCol * cardWidth + (numOfCol - 1) * defaultGap + padding;
        neededHeight = numOfRow * cardHeight + (numOfRow - 1) * defaultGap + padding;
    }

    playField.style.width = `${neededWidth}px`;
    playField.style.height = `${neededHeight}px`;
    playFieldHeight = neededHeight

    cardDealTimeline = gsap.timeline({
        paused: true,
        onComplete: () => {
            gameState.isStart = true;
        }
    });

    const deck = [];
        
    for(let i = 0; i < gameState.pickedAnimals.length; i ++) {
        for(let j = 0; j < 2; j++) {
            const index = Math.floor(Math.random() * deck.length);
            deck.splice(index, 0, new Card(gameState.pickedAnimals[i].name, `${gameState.pickedAnimals[i].image}/${cardWidth}x${cardHeight}`, patternIndex));
        }

        const dummyImg = document.createElement("div");
        dummyImg.style.width = `${cardWidth}px`;
        dummyImg.style.height = `${cardHeight}px`;
        dummyImg.style.className = 'dummy'
        // dummyImg.style.border = 'solid black';
        dummyImg.style.backgroundColor = "rgba(255, 255, 255, 0.5)";

        matchedCardsField.appendChild(dummyImg);
    }

    for(let i = 0; i < deck.length; i++) {
        deck[i].id = i + 1;
    }

    for(let card of deck) {

        const cardContainer = document.createElement("div");
        const frame = document.createElement("div");
        const jacketImg = document.createElement("img");
        const faseImg = document.createElement("img");
        cardContainer.id = `card${card.id}`;
        cardContainer.className = `card ${card.name}`;
        cardContainer.style.width = `${cardWidth}px`;
        cardContainer.style.height = `${cardHeight}px`;
        cardContainer.style.border = 'solid black';
        jacketImg.src = card.jacket;
        jacketImg.style.position = 'absolute';
        jacketImg.className = 'jacket';
        jacketImg.style.width = `${cardWidth}px`;
        jacketImg.style.height = `${cardHeight}px`;
        jacketImg.setAttribute('draggable', false);
        faseImg.src = card.face;
        faseImg.style.position = 'absolute';
        faseImg.className = 'face';
        faseImg.setAttribute('draggable', false);

        cardContainer.appendChild(frame);
        cardContainer.appendChild(faseImg);
        cardContainer.appendChild(jacketImg);

        playField.appendChild(cardContainer);
    }

    const cardElements = document.getElementsByClassName('card');
    const containerWidth = playField.clientWidth;
    const containerHeight = playField.clientHeight;

    // console.log(playField.offsetHeight, containerHeight);

    while(cardsPositions.length > 0) {
        cardsPositions.pop();
    }

    for(let ele of cardElements) {
        const cardPosition = ele.getBoundingClientRect();
        cardsPositions.push({left: cardPosition.left, top: cardPosition.top});
        ele.selectedAnim = gsap.to(ele, {boxShadow: "0px 0px 10px", duration: 1, repeat: -1, yoyo: true, paused: true})
        ele.addEventListener("click", cardFlip);
    }

    for(let ele of cardElements) {
        ele.style.position = 'absolute';
    }

    for(let i = 0; i < cardElements.length; i++) {
        const rowCardOn = Math.floor(i / numOfCol);
        cardDealTimeline.fromTo(`#card${i + 1}`, 
        {
            left: window.innerWidth / 2 - cardWidth / 2,
            top: headerHeight + containerHeight / 2 ,
        },
        {
            left: cardsPositions[i].left,
            top: numOfAnimals === 9 || numOfAnimals === 10 ? headerHeight + regendHeight + rowCardOn  * cardHeight + rowCardOn * betweenCard + cardHeight / 4 + 15: headerHeight + regendHeight + rowCardOn  * cardHeight + rowCardOn * betweenCard + cardHeight / 4,
        }, i * 0.05);
    }

    function cardFlip(e) {

        e.stopPropagation();
        e.preventDefault();

        if(e.target.className === 'jacket') {
            for(let ele of cardElements) {
                const cardPosition = ele.getBoundingClientRect();
                cardsPositions.shift();
                cardsPositions.push({left: cardPosition.left, top: cardPosition.top});
            }
            
            if(gameState.isStart) {
                const targetDiv = e.target.parentElement;

                if(!gameState.flipedCards.some(cardId => cardId === targetDiv.id) && !gameState.isEvaluating) {
                    const id = targetDiv.id;
                    gameState.flipedCards.push(id);

                    targetDiv.selectedAnim.resume();

                    const flipTimeline = gsap.timeline();
                    flipTimeline
                        .to(targetDiv, {transform: 'rotateY(90deg)'})
                        .to(e.target, {duration: 0, autoAlpha: 0})
                        .to(targetDiv, {transform: 'rotateY(0deg)'});

                    gameState.selectedCards.push({name: targetDiv.className.slice(5), id})

                    if(gameState.selectedCards.length >= 2) {
                        gameState.isEvaluating = true;

                        if(gameState.selectedCards[0].name === gameState.selectedCards[1].name) {

                            const distDummy = matchedCardsField.children[gameState.matchedPair++].getBoundingClientRect();
                            const distDummyLeft = distDummy.left;
                            const distDummyTop = distDummy.top;

                            const targetLeft = targetDiv.style.left;
                            const targetTop = targetDiv.style.top;

                            const firstCard = document.querySelector(`#${gameState.selectedCards[0].id}`);

                            const matchTimeLine = gsap.timeline({duration: 1, delay: 1});
                            matchTimeLine
                                .to(targetDiv, {boxShadow: "0px 0px 10px 10px green", duration: 1, onStart: () => {
                                    targetDiv.selectedAnim.kill();
                                }}, 0)
                                .to(firstCard, {boxShadow: "0px 0px 10px 10px green", duration: 1, onStart: () => {
                                    firstCard.selectedAnim.kill();
                                }}, 0)
                                .to(targetDiv, {boxShadow: "", duration: 0}, 1)
                                .to(firstCard, {boxShadow: "", duration: 0}, 1)
                                .to(firstCard, {
                                    left: targetLeft,
                                    top: targetTop,
                                    onComplete: () => {
                                        firstCard.remove();
                                        gameState.isEvaluating = false;
                                        matchedCardsField.appendChild(targetDiv);
                                        e.target.parentElement.removeEventListener('click', cardFlip);
                                    }
                                })
                                .to(targetDiv, {
                                    left: distDummyLeft,
                                    top: distDummyTop
                                })
                                .then(() => {
                                    if(gameState.matchedPair === gameState.pickedAnimals.length) {
                                        gameState.isStart = false;
                                        const compText = document.createElement("div");
                                        compText.innerText = "COMPLETE!";
                                        compText.style.position = 'absolute';
                                        compText.style.transform = 'translate(-50%, -50%)';
                                        compText.style.left = `${window.innerWidth / 2}px`;
                                        compText.style.top = `${headerHeight + containerHeight / 2 + compText.innerHeight}px`;
                                        compText.id = "compText"

                                        playField.appendChild(compText);

                                        gsap.from(playField.querySelector("#compText"), {
                                            autoAlpha: 0,
                                        });

                                        startBtn.innerText = "Reset";
                                        startBtn.removeEventListener('click', startBtnFunc);
                                        startBtn.addEventListener('click', resetBtnFunc);
                        
                                        timebar.style.display = "none";
                                        startBtn.style.display = "block";
                                        rangeInputWrapper.style.display = "block";
                                        patternInput.style.display = "block";
                                        startTimebar.style.display = "grid";
                        
                                        gameState.isStart = false;
                        
                                        clearInterval(timerFunc);
                                        timerFunc = null;
                                    }
                                })

                            
                        } else {
                            const firstCard = document.querySelector(`#${gameState.selectedCards[0].id}`);
                            const firstCardJacket = firstCard.querySelector(".jacket");

                            const card1 = gameState.selectedCards[0].id, card2 = gameState.selectedCards[1].id;

                            const flipBackTimeline = gsap.timeline({duration: 1.5, delay: 1, onComplete: () => {
                                gameState.flipedCards = gameState.flipedCards.filter(cardId => cardId !== card1 && cardId !== card2);
                                gameState.isEvaluating = false;
                            }});

                            flipBackTimeline
                                .to(targetDiv, {boxShadow: "0px 0px 10px 10px red", duration: 1, onStart: () => {
                                    targetDiv.selectedAnim.kill();
                                }}, 0)
                                .to(firstCard, {boxShadow: "0px 0px 10px 10px red", duration: 1, onStart: () => {
                                    firstCard.selectedAnim.kill();
                                }}, 0)
                                .to(targetDiv, {boxShadow: "", duration: 0}, 1)
                                .to(firstCard, {boxShadow: "", duration: 0}, 1)
                                .to(targetDiv, {transform: 'rotateY(90deg)'}, 1)
                                .to(firstCard, {transform: 'rotateY(90deg)'}, 1)
                                .to(e.target, {duration: 0, autoAlpha: 1, onComplete: () => {
                                    targetDiv.selectedAnim = gsap.to(targetDiv, {boxShadow: "0px 0px 10px", duration: 1, repeat: -1, yoyo: true, paused: true});
                                }}, 1.5)
                                .to(firstCardJacket, {duration: 0, autoAlpha: 1, onComplete: () => {
                                    firstCard.selectedAnim = gsap.to(firstCard, {boxShadow: "0px 0px 10px", duration: 1, repeat: -1, yoyo: true, paused: true});
                                }}, 1.5)
                                .to(targetDiv, {transform: 'rotateY(0deg)'}, 1.5)
                                .to(firstCard, {transform: 'rotateY(0deg)'}, 1.5);

                        }

                        gameState.selectedCards.pop();
                        gameState.selectedCards.pop();

                    } 
                }
            }
        }
    }
}

function dealCard() {
    cardDealTimeline.resume();
}

function resetGame() {
    while (playField.firstChild) {
        playField.removeChild(playField.lastChild);
    }
    while (matchedCardsField.firstChild) {
        matchedCardsField.removeChild(matchedCardsField.lastChild);
    }

    gameState.isStart = false;
    gameState.selectedCards = [];
    gameState.matchedPair = 0;
    gameState.flipedCards = [];
    gameState.isEvaluating = false;
    gameState.pickedAnimals = [];
    gameState.timer = 100,
    gameState.addedGameOverAnim = false;

    timebar.style.width = "100%";

    pickupAnimals();
    setGame();
}

function calcGrid() {
    const numOfCards = gameState.pickedAnimals.length * 2;
    const factors = [];
    let col, row;

    for(let i = 1; i <= numOfCards; i++) {
        if(numOfCards % i === 0) {
            factors.push(i);
        }
    }

    let halfOfFactors;

    if(factors.length % 2 === 0) {
        halfOfFactors = factors.length / 2;
        col = new Array(factors[halfOfFactors]).fill("1fr").join(" ");
        row = new Array(factors[halfOfFactors - 1]).fill("1fr").join(" ");

        return [col, row, factors[halfOfFactors], factors[halfOfFactors - 1]];
    } else {
        if(numOfCards === 4) {
            halfOfFactors = Math.floor(factors.length / 2);
            col = new Array(factors[halfOfFactors]).fill("1fr").join(" ");
            row = new Array(factors[halfOfFactors]).fill("1fr").join(" ");
    
            return [col, row, factors[halfOfFactors], factors[halfOfFactors]];
        }
        halfOfFactors = Math.floor(factors.length / 2);
        col = new Array(factors[halfOfFactors + 1]).fill("1fr").join(" ");
        row = new Array(factors[halfOfFactors - 1]).fill("1fr").join(" ");

        return [col, row, factors[halfOfFactors + 1], factors[halfOfFactors - 1]];
    }
}

function changeNumOfAnimals() {
    if(!gameState.isStart) {
        numOfAnimals = Number(this.value);
        if(numOfAnimals < 5) {
            this.style.accentColor = easy;
        } else if (numOfAnimals < 8) {
            this.style.accentColor = medium;
        } else {
            this.style.accentColor = hard;
        }
        resetGame();
    }
}

function changeBackPattern() {
    if(!gameState.isStart) {
        patternIndex = document.querySelector('input[name="pattern"]:checked').value;
        resetGame();
    }
}

function pickupAnimals() {
    const maxNum = animals.length;
    const numArr = [];

    for(let i = 0; i < maxNum; i++) {
        numArr.push(i);
    }

    for(let i = 0; i < numOfAnimals; i++) {
        const randomNum = Math.floor(Math.random() * numArr.length);
        const removedNum = numArr.splice(randomNum, 1);

        gameState.pickedAnimals.push(animals[removedNum]);
    }
}

function startBtnFunc() {
    if(!gameState.isStart) {
        startBtn.style.display = "none";
        rangeInputWrapper.style.display = "none";
        patternInput.style.display = "none";
        startTimebar.style.display = "block";
        timebar.style.backgroundColor = easy;
        timebar.style.display = "block";
        gameState.isStart = "pending";
        // document.querySelectorAll(".card").forEach(ele => console.log(ele.getBoundingClientRect()));
        resetGame();
        dealCard();

        timerFunc = setInterval(() => {
            gameState.timer -= 0.005;
            timebar.style.width = `${gameState.timer}%`

            if(gameState.timer < 5) {
                timebar.style.backgroundColor = hard;
            } else if(gameState.timer < 20) {
                timebar.style.backgroundColor = medium;
            }

            if(gameState.timer <= 0) {
                gameState.isStart = false;

                const cardElements = document.getElementsByClassName('card');

                for(let card of cardElements) {
                    if(gameState.flipedCards.every(cardId => cardId !== card.id) && !gameState.addedGameOverAnim) {

                        const flipTimeline = gsap.timeline();
                        flipTimeline
                            .to(card, {transform: 'rotateY(90deg)'})
                            .to(card.querySelector(".jacket"), {duration: 0, autoAlpha: 0})
                            .to(card, {transform: 'rotateY(0deg)'});
                    }
                }

                gameState.addedGameOverAnim = true;

                startBtn.innerText = "Reset";
                startBtn.removeEventListener('click', startBtnFunc);
                startBtn.addEventListener('click', resetBtnFunc);

                timebar.style.display = "none";
                startBtn.style.display = "block";
                rangeInputWrapper.style.display = "block";
                patternInput.style.display = "block";
                startTimebar.style.display = "grid";

                gameState.isStart = false;

                clearInterval(timerFunc);
                timerFunc = null;
            }
        }, 1)
    }
}

function resetBtnFunc() {
    resetGame();

    startBtn.innerText = "Start";
    startBtn.removeEventListener('click', resetBtnFunc);
    startBtn.addEventListener('click', startBtnFunc);
}