const vidContainer = document.querySelector(".video-player");
const vid = document.querySelector(".video-player video");
const btn = document.querySelector(".video-player-button");

function togglePlay() {
  if (vid.paused) {
    vid.play();
    vidContainer.classList.add("playing");
    btn.textContent = "Pause";
  } else {
    vid.pause();
    btn.textContent = "Play";
    vidContainer.classList.remove("playing");
  }
}

function videoEnded() {
  if (vidContainer.classList.contains("playing")) {
    vidContainer.classList.remove("playing");
  }
  btn.textContent = "Play";
}

btn.addEventListener("click", togglePlay);
vid.addEventListener("ended", videoEnded);
