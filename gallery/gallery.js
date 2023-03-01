console.log("reading js");
const container = document.getElementsByClassName("container");

console.log(container);

const getAnimalData = async () => {
  const requestUrl =
    "https://script.google.com/macros/s/AKfycbwYMgmwPiCbMVn6U06EaAK3w69MJ6n__HgQPz9xTq7ZIwiDn43H-UcJ0pMnBEEP2OQX/exec";

  const res = await fetch(requestUrl);
  const animals = await res.json();
  return animals;
};

const gridAnimals = async () => {
  const animals = await getAnimalData();
  animals.forEach(addGrid);
};

function addGrid(animal) {
  console.log(animal);
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  let img = document.createElement("img");
  const p = document.createElement("p");
  // img.src = animal.image;
  // img.src = "./images/rakko-umineko.jpeg";
  img.src = `./images/${animal.name}.jpg`;
  img.alt = animal.name;
  div1.classList.add("item");
  div2.classList.add("content");
  p.classList.add("item-text");
  p.innerHTML = animal.name;
  div1.appendChild(div2);
  div2.appendChild(img);
  div2.appendChild(p);
  container[0].appendChild(div1);
}

gridAnimals();
