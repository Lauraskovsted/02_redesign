// Lav en variabel, der refererer til body

const body = document.querySelector("body");

// Lav en variabel, der refererer til ".mode"

const mode = document.querySelector(".mode");

// Lav funktionen "darkMode", som

function darkMode() {
  body.classList.toggle("dark");
  if (mode.innerHTML == "Original") {
    mode.innerHTML = "Farver";
  } else {
    mode.innerHTML = "Original";
  }
}

mode.addEventListener("click", darkMode);
