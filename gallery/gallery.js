const container = document.getElementsByClassName("container");

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

  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const closeButton = document.getElementById("modal-close");
  const body = document.querySelector("body");

  function hideModal() {
    body.classList.remove("modal-open");
    modal.style.display = "none";
  }

  function showModal(tile) {
    const animalId = tile.dataset.animalId;
    const animal = animals.find((animal) => animal.id === parseInt(animalId));

    modalTitle.textContent = animal.name;
    modalDescription.textContent = animal.comment;

    body.classList.add("modal-open");
    modal.style.display = "block";
  }

  closeButton.addEventListener("click", hideModal);

  modal.addEventListener("click", hideModal);

  const tiles = document.querySelectorAll(".tile");
  console.log(tiles);
  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      showModal(tile);
    });
  });
};

function addGrid(animal) {
  const item = document.createElement("div");
  item.classList.add("item");
  item.classList.add("tile");
  item.setAttribute("data-animal-id", animal.id);

  const a = document.createElement("a");
  a.href = `#${animal.name}`;
  a.classList.add("details");

  const content = document.createElement("div");
  content.classList.add("content");

  let img = document.createElement("img");
  img.src = `./images/${animal.name}.jpg`;
  img.alt = animal.name;

  const p = document.createElement("p");
  p.classList.add("item-text");
  p.innerHTML = animal.name;

  const modal = document.createElement("div");
  modal.setAttribute("id", "modal");

  const modal_content = document.createElement("div");
  modal_content.classList.add("modal-content");

  const h2 = document.createElement("h2");
  h2.setAttribute("id", "modal-title");
  h2.innerHTML = animal.name;

  const close = document.createElement("div");
  close.setAttribute("id", "modal-close");

  const desc = document.createElement("p");
  desc.setAttribute("id", "modal-description");
  desc.innerHTML = animal.comment;

  content.appendChild(img);
  content.appendChild(p);
  a.appendChild(content);
  modal_content.appendChild(h2);
  modal_content.appendChild(desc);
  modal_content.appendChild(close);
  modal.append(modal_content);
  item.appendChild(a);
  container[0].appendChild(item);
  container[0].appendChild(modal);
}

window.onload = gridAnimals();
