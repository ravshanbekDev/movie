let elForm = document.querySelector(".form");
let elInput = document.querySelector(".form-input");
let elSelect = document.querySelector(".form-select");
let elWrapper = document.querySelector(".card-wrapper");
let elModalWrap = document.querySelector(".card-modal-wrap");
let elCardModal = document.querySelector(".card-modal");

let arr = [];

function renderFilms(arr, el) {
  el.innerHTML = "";
  arr.forEach((value) => {
    let elCard = document.createElement("div");
    let elImg = document.createElement("img");
    let elName = document.createElement("h1");
    let elBtn = document.createElement("button");

    elCard.classList.add("card");
    elImg.classList.add("card-img");
    elName.classList.add("card-title");
    elBtn.classList.add("card-btn");

    elBtn.dataset.filmId = value.id;
    elImg.src = value.poster;
    elName.textContent = value.title;
    elBtn.textContent = "More";

    elCard.append(elImg, elName, elBtn);
    el.appendChild(elCard);
  });
}
renderFilms(films, elWrapper);

films.filter((value) => {
  value.genres.forEach((genre) => {
    if (!arr.includes(genre)) {
      arr.push(genre);
    }
  });
});

arr.map((value) => {
  let elOptions = document.createElement("option");
  elOptions.textContent = value;
  elOptions.value = value;
  elSelect.appendChild(elOptions);
});

elInput.addEventListener("keypress", (e) => {
  const elInputVal = e.target.value;
  const searchedFilms = films.filter((value) => {
    return value.title.toLowerCase().includes(elInputVal);
  });
  renderFilms(searchedFilms, elWrapper);
});

elInput.addEventListener("keydown", (e) => {
  const elInputVal = e.target.value;
  const searchedFilms = films.filter((value) => {
    return value.title.toLowerCase().includes(elInputVal);
  });
  renderFilms(searchedFilms, elWrapper);
});

elSelect.addEventListener("change", (e) => {
  const elSelectVal = e.target.value;
  const selectedFilm =
    elSelectVal === "all"
      ? films
      : films.filter((value) => value.genres.includes(elSelectVal));
  renderFilms(selectedFilm, elWrapper);
});

elModalWrap.addEventListener("click", (e) => {
  if (e.target.id === "") {
    elModalWrap.classList.remove("show-modal-wrapper");
    elCardModal.classList.remove("show-modal");
  }
});

elWrapper.addEventListener("click", (e) => {
  if (e.target.matches(".card-btn")) {
    elModalWrap.classList.add("show-modal-wrapper");
    elCardModal.classList.add("show-modal");
    const btnId = e.target.dataset.filmId;
    const uniteFilm = films.find((value) => value.id === btnId);

    let elImg = document.createElement("img");
    let elName = document.createElement("strong");

    elImg.src = uniteFilm.poster
    elImg.classList.add("card-img-modal");
    elName.textContent = uniteFilm.title;
    elName.classList.add("card-caption-modal");

    elCardModal.innerHTML = "";
    elCardModal.append(elImg, elName)
  }
});

'use strict';