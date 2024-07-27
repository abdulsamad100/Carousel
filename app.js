const cars = [
  { src: "car1.avif", heading: "LAMBORGHINI" },
  { src: "car2.jpg", heading: "FERARRI" },
  { src: "car3.jpg", heading: "PORSCHE" },
  { src: "car4.jpg", heading: "KOINEGSEGG" },
  { src: "car5.jpg", heading: "BUGATTI" }
];

const loader = document.querySelector("#loader");

let currind = 0;
let mainImage = document.querySelector("#mainimg");
let nextImage = document.querySelector("#nextimg");
let heading = document.querySelector("#heading");
let isFirstImageChange = true;
let textChangePromise;

function updateImage(index) {
  if (textChangePromise) {
    textChangePromise.then(() => {
      performImageUpdate(index);
    });
  } else {
    performImageUpdate(index);
  }
}

function performImageUpdate(index) {
  mainImage.classList.add("fade-out");
  nextImage.src = cars[index].src;
  nextImage.classList.add("fade-in");
  
  textChangePromise = new Promise((resolve) => {
    setTimeout(() => {
      if (isFirstImageChange) {
        typeText(cars[index].heading, resolve);
        isFirstImageChange = false;
      } else {
        detypeText(cars[index].heading, resolve);
      }
    }, 1000);
  });

  mainImage.src = cars[index].src;
  mainImage.classList.remove("fade-out");
  nextImage.classList.remove("fade-in");
}

function typeText(text, callback) {
  heading.textContent = "";
  let i = 0;
  let interval = setInterval(() => {
    if (i < text.length) {
      heading.textContent += text[i];
      i++;
    } else {
      clearInterval(interval);
      callback();
    }
  }, 50);
}

function detypeText(text, callback) {
  let i = text.length - 1;
  let interval = setInterval(() => {
    if (i >= 0) {
      heading.textContent = heading.textContent.substring(0, i);
      i--;
    } else {
      clearInterval(interval);
      typeText(text, callback);
    }
  }, 50);
}

mainImage.src = cars[currind].src;
typeText(cars[currind].heading, () => {});

const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

previous.addEventListener('click', () => {
  currind = (currind > 0) ? currind - 1 : cars.length - 1;
  updateImage(currind);
});

next.addEventListener('click', () => {
  currind = (currind < cars.length - 1) ? currind + 1 : 0;
  updateImage(currind);
});
