const buttonForAddingNotes = document.querySelector("#but_1");
const colorOptions = document.querySelector(".color-container");
const colorButtons = document.querySelectorAll(".Cbox");

buttonForAddingNotes.addEventListener("click", () => {
  colorOptions.classList.toggle("show");
  buttonForAddingNotes.classList.toggle("but-rotate");
});

colorButtons.forEach((e) => {
  e.addEventListener("click", () => {
    const boxColor = e.getAttribute("data-color");
    boxColorDecider(boxColor);
  });
});

function boxColorDecider(boxColor) {
  let note = document.createElement("textarea");
  note.classList.add("note");
  note.classList.add("adding-new-note");
  note.style.backgroundColor = boxColor;
  note.style.borderColor = boxColor;

  // let deleteBtn = document.createElement("img");
  // deleteBtn.setAttribute("src", "./images/remove.png");
  // deleteBtn.classList.add("delete-btn");
  // // deleteBtn.innerHTML = `<img src="./images/remove.png" alt="" class=".delete-btn>`;
  // note.appendChild(deleteBtn);

  let lastTouch = 0;
  let Tap_count=0;
  note.addEventListener("click", (e) => {
    let newDate = new Date();
    let currentTime = newDate.getTime();
    let currentTap = currentTime - lastTouch;
    lastTouch = currentTime;

    if (currentTap < 600 && currentTap > 0) {
      Tap_count++;
    } else{
      Tap_count=1;
    }

    if (Tap_count === 3){
      note.remove();
      saveData();
    }
  });

  let container = document.querySelector("#notes-container");

  container.appendChild(note);

  // let container= document.querySelector("#notes-container");
  // const textArea= container.innerHTML=`<textarea name="note" class="note" style="background-color: ${boxColor} !important; border-color: ${boxColor} !important"></textarea>`

  // container.appendChild(textArea)

  // console.log(boxColor);

  saveData();
  note.addEventListener("input", saveData);
}

// saving data done
function saveData() {
  let oldData = [];
  let dataFetch = document.querySelectorAll(".note");

  dataFetch.forEach((k) => {
    oldData.push({
      color: k.style.backgroundColor,
      content: k.value,
    });
  });
  localStorage.setItem("notesStore", JSON.stringify(oldData));
}

// fetch data from local storage

function savedNotes() {
  let savedData = JSON.parse(localStorage.getItem("notesStore")) || [];
  savedData.forEach((loadData) => {
    let createdNote = document.createElement("textarea");
    createdNote.classList.add("note");
    createdNote.style.backgroundColor = loadData.color;
    createdNote.style.borderColor = loadData.color;
    createdNote.value = loadData.content;

    let lastTouch = 0;
    let tapCount=0;
    createdNote.addEventListener("click", (e) => {
      let newDate = new Date();
      let currentTime = newDate.getTime();
      let currentTap = currentTime - lastTouch;
      lastTouch = currentTime;

      if (currentTap < 600 && currentTap > 0) {
        tapCount++;
      } else{
        tapCount=1;
      }

      if (tapCount === 3){
        createdNote.remove();
        saveData();
      }
    });

    // let deleteBtn = document.createElement("img");
    // deleteBtn.setAttribute("src", "./images/remove.png");
    // deleteBtn.classList.add("delete-btn");
    // // deleteBtn.innerHTML = `<img src="./images/remove.png" alt="" class=".delete-btn>`;
    // createdNote.appendChild(deleteBtn);

    // deleteBtn.addEventListener("click", () => {
    //   createdNote.remove();
    //   saveData();
    // });

    let container = document.querySelector("#notes-container");
    container.appendChild(createdNote);
    createdNote.addEventListener("input", saveData);
  });
}

document.addEventListener("DOMContentLoaded", savedNotes);
