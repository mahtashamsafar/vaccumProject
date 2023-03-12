let i = 0;
let j = 0;
let reverse = false;
function randomize(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function reloadPage() {
  location.reload();
}
async function happy(vacuum) {
  setTimeout(() => {
    vacuum.style.backgroundColor = "rgb(0,180,0)";
  }, 1000);
}
async function move(vacuum, cleaningTimer) {
  setTimeout(() => {
    vacuum.style.backgroundColor = "#dddddd";
    vacuum.innerHTML = "...";
    const vacuumRect = vacuum.getBoundingClientRect();
    j = reverse === false ? j + 1 : j - 1;
    if (j === 16 || j === -1) {
      reverse = reverse === false ? true : false;
      vacuum.style.top =
        i + 1 !== 16 ? vacuumRect.top + 34 + "px" : vacuumRect.top + "px";
      i++;
      if (i === 16) {
        clearInterval(cleaningTimer);
      }
    } else if (j < 16) {
      vacuum.style.left =
        reverse === false
          ? vacuumRect.left + 34 + "px"
          : vacuumRect.left - 34 + "px";
    }
  }, 2000);
}
async function clean(vacuum, theBox) {
  vacuum.style.backgroundColor = "rgb(180,0,0)";
  setTimeout(() => {
    theBox.style.backgroundColor = "rgb(255,255,255)";
  }, 1000);
}
async function examine(theBox) {
  return theBox.style.backgroundColor === "rgb(119, 119, 119)";
}
async function initializeCanvas() {
  const canvas = document.getElementById("canvas");
  const startBtn = document.getElementById("start-btn");
  let boxes = null;
  canvas.style.width = "544px";
  canvas.style.height = "544px";
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      boxes = document.createElement("div");
      boxes.className = "box";
      boxes.id = i + "-" + j;
      boxes.style.backgroundColor =
        randomize(0, 1) === 1 ? "#777777" : "#ffffff";
      canvas.appendChild(boxes);
    }
  }
  const vacuum = document.createElement("div");
  vacuum.className = "vacuum";
  vacuum.innerHTML = "...";
  document.body.appendChild(vacuum);
  startBtn.remove();
  const cleaningTimer = setInterval(async () => {
    j = j === 16 ? 15 : j === -1 ? 0 : j;
    const theBox = document.getElementById(i + "-" + j);
    const status = await examine(theBox);
    if (status) {
      await clean(vacuum, theBox);
      await happy(vacuum);
      await move(vacuum, cleaningTimer);
    } else {
      await happy(vacuum);
      await move(vacuum, cleaningTimer);
    }
  }, 4000);
}

