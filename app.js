const cars = [
    { src: "car1.webp", heading: "Car 1" },
    { src: "car2.webp", heading: "Car 2" },
    { src: "car3.jpg", heading: "Car 3" },
    { src: "car4.jpg", heading: "Car 4" },
    { src: "car5.avif", heading: "Car 5" }
  ];
  
  const loader = document.querySelector("#loader");
    
  document.addEventListener("DOMContentLoaded", () => {
    loader.style.display = "none";
  });
  
  let currind = 0;
  let mainImage = document.querySelector("#mainimg");
  let nextImage = document.querySelector("#nextimg");
  let heading = document.querySelector("#heading");
  
  function updateImage(index) {
      mainImage.classList.add("fade-out");
      nextImage.src = cars[index].src;
      nextImage.classList.add("fade-in");
    
    setTimeout(() => {
      mainImage.src = cars[index].src;
      mainImage.classList.remove("fade-out");
      nextImage.classList.remove("fade-in");
      heading.textContent = cars[index].heading;
    }, 700);
  }
  
  mainImage.src = cars[currind].src;
  heading.textContent = cars[currind].heading;
  
  const previous = document.querySelector("#previous");
  const next = document.querySelector("#next");
  
  previous.addEventListener('click', () => {
    if (currind > 0) {
      currind--;
    } else {
      currind = cars.length - 1;
    }
    updateImage(currind);
  });
  
  next.addEventListener('click', () => {
    if (currind < cars.length - 1) {
      currind++;
    } else {
      currind = 0;
    }
    updateImage(currind);
  });
  