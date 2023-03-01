const path = "../assets";
let cardWidth = 100;
let cardHeight = 150;
const padding = 20;
const defaultGap = 20;
const headerHeight = document.querySelector("header").getBoundingClientRect().height;
const frameThickness = 10;
let numOfAnimals = 5;
let patternIndex = "1";

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

const gameState = {
    isStart: false,
    selectedCards: [],
    matchedPair: 0,
    flipedCards: [],
    isEvaluating: false,
    pickedAnimals: []
}

window.addEventListener('DOMContentLoaded',function () {

    const rangeInput = document.querySelector("#numOfAnimals");
    const patternInput = document.querySelector("#backPattern");

    console.log();
    
    rangeInput.addEventListener("change", changeNumOfAnimals);
    patternInput.addEventListener("change", changeBackPattern);


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

        cardWidth = 80;
        cardHeight = 120;

        playField.style.columnGap = "5px";
        playField.style.rowGap = "5px";

        neededWidth = numOfCol * cardWidth + (numOfCol - 1) * defaultGap + padding;
        neededHeight = numOfRow * cardHeight + (numOfRow - 1) * defaultGap + padding;
    }

    if(neededHeight > window.innerHeight - headerHeight - cardHeight - 20) {
        const gap = (numOfRow - 1) * 5;

        cardWidth = 80;
        cardHeight = 120;

        playField.style.columnGap = "5px";
        playField.style.rowGap = "5px";

        neededWidth = numOfCol * cardWidth + (numOfCol - 1) * defaultGap + padding;
        neededHeight = numOfRow * cardHeight + (numOfRow - 1) * defaultGap + padding;
    }

    if(numOfAnimals < 8) {
        cardWidth = 100;
        cardHeight = 150;

        playField.style.columnGap = "15px";
        playField.style.rowGap = "15px";

        neededWidth = numOfCol * cardWidth + (numOfCol - 1) * defaultGap + padding;
        neededHeight = numOfRow * cardHeight + (numOfRow - 1) * defaultGap + padding;
    }

    playField.style.width = `${neededWidth}px`;
    playField.style.height = `${neededHeight}px`;

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

    const cardsPositions = [];

    const cardDealTimeline = gsap.timeline({
        paused: true,
        onComplete: () => {
            gameState.isStart = true;
        }
    });

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
        cardDealTimeline.fromTo(`#card${i + 1}`, 
        {
            left: window.innerWidth / 2 - cardWidth / 2,
            top: headerHeight + containerHeight / 2 - cardHeight / 4,
        },
        {
            left: cardsPositions[i].left,
            top: cardsPositions[i].top,
        }, i * 0.05);
    }

    function dealCard() {
        cardDealTimeline.resume();
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
            
            if(!gameState.isStart) {
                dealCard();
            } else {
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
                                        const resetButton = document.createElement("button");
                                        resetButton.innerText = "Restart";
                                        resetButton.style.display = "block";
                                        resetButton.style.position = 'absolute';
                                        resetButton.style.transform = 'translate(-50%, -50%)';
                                        resetButton.style.left = `${window.innerWidth / 2}px`;
                                        resetButton.style.top = `${headerHeight + containerHeight / 2 + resetButton.innerHeight}px`;
                                        resetButton.addEventListener('click', resetGame);

                                        playField.appendChild(resetButton);
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
        halfOfFactors = Math.floor(factors.length / 2);
        col = new Array(factors[halfOfFactors]).fill("1fr").join(" ");
        row = new Array(factors[halfOfFactors]).fill("1fr").join(" ");

        return [col, row, factors[halfOfFactors], factors[halfOfFactors]];
    }
}

function changeNumOfAnimals() {
    if(!gameState.isStart) {
        numOfAnimals = Number(this.value);
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