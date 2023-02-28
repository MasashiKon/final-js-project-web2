const path = "../assets";
const cardWidth = 100;
const cardHeight = 150;

const gameState = {
    isStart: false,
    selectedCards: [],
    matchedPair: 0,
    flipedCards: [],
    isEvaluating: false
}

const animals = [
    {
        name: 'elephant',
        image: `https://source.unsplash.com/ylL764BIYgk/${cardWidth}x${cardHeight}`
    },
    {
        name: 'lion',
        image: `https://source.unsplash.com/7HKdb6i3afk/${cardWidth}x${cardHeight}`
    }
]

class Card {
    constructor(name, face) {
        this.name = name;
        this.jacket = `${path}/temp-jacket.png`;
        this.face = face;
    }
}

const deck = [];

const playField = document.querySelector("#play-field");
const matchedCardsField = document.querySelector("#matched-cards-field");
    
for(let i = 0; i < animals.length; i ++) {
    for(let j = 0; j < 2; j++) {
        const index = Math.floor(Math.random() * deck.length);
        deck.splice(index, 0, new Card(animals[i].name, animals[i].image));
    }

    const dummyImg = document.createElement("div");
    dummyImg.style.width = `${cardWidth}px`;
    dummyImg.style.height = `${cardHeight}px`;
    dummyImg.style.className = 'dummy'
    dummyImg.style.border = 'solid black';

    matchedCardsField.appendChild(dummyImg);
}

for(let i = 0; i < deck.length; i++) {
    deck[i].id = i + 1;
}

for(let card of deck) {

    const cardContainer = document.createElement("div");
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
    ele.addEventListener("click", cardFlip);
}

for(let ele of cardElements) {
    ele.style.position = 'absolute';
}

for(let i = 0; i < cardElements.length; i++) {
    cardDealTimeline.fromTo(`#card${i + 1}`, 
    {
        left: containerWidth / 2 - cardWidth / 2,
        top: containerHeight / 2 - cardHeight / 2,
    },
    {
        left: cardsPositions[i].left,
        top: cardsPositions[i].top,
    }, `<${i * 0.05}`);
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

                        const matchTimeLine = gsap.timeline({duration: 1});
                        matchTimeLine
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

                        
                    } else {
                        const firstCard = document.querySelector(`#${gameState.selectedCards[0].id}`);
                        const firstCardJacket = firstCard.querySelector(".jacket");

                        const card1 = gameState.selectedCards[0].id, card2 = gameState.selectedCards[1].id;

                        const flipBackTimeline = gsap.timeline({duration: 1.5, onComplete: () => {
                            gameState.flipedCards = gameState.flipedCards.filter(cardId => cardId !== card1 && cardId !== card2);
                            gameState.isEvaluating = false;
                        }});

                        flipBackTimeline
                            .to(targetDiv, {transform: 'rotateY(90deg)'})
                            .to(e.target, {duration: 0, autoAlpha: 1})
                            .to(targetDiv, {transform: 'rotateY(0deg)'})
                            .to(firstCard, {transform: 'rotateY(90deg)'})
                            .to(firstCardJacket, {duration: 0, autoAlpha: 1})
                            .to(firstCard, {transform: 'rotateY(0deg)'})
                    }

                    gameState.selectedCards.pop();
                    gameState.selectedCards.pop();
                }
            }
        }
    }

}