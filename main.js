let userinput = document.getElementById("input-box");

let addbutton = document.getElementById("input-button");

let list = [];

let what = 0;

let underbar = document.getElementById("under-bar");

let jobline = document.querySelectorAll(".done-line div");

let job = Array.from(jobline);

addbutton.addEventListener("click", addtask);

job.forEach((menu) => menu.addEventListener("click", (e) => clickaction(e)));

function clickaction(e) {
  undermove(e);
  all(e);
}

function all(e) {
  if (
    e.currentTarget.textContent === document.getElementById("all").textContent
  ) {
    what = 0;
    render();

    console.log("모두", e.currentTarget.textContent);
  } else if (
    e.currentTarget.textContent === document.getElementById("done").textContent
  ) {
    what = 2;
    render();
    console.log("한거", e.currentTarget.textContent, what);
  } else {
    what = 1;
    render();
    console.log("진행중", e.currentTarget.textContent, what);
  }
}

function undermove(e) {
  underbar.style.left = e.currentTarget.offsetLeft + "px";
  underbar.style.bottom = e.currentTarget.offsetBottom + "px";
  underbar.style.width = e.currentTarget.offsetWidth + "px";
}

function generateid() {
  return Math.random().toString(36).substr(2, 16);
}

function addtask() {
  let task = {
    id: generateid(),
    taskcontent: userinput.value,
    iscomplete: false,
  };

  list.push(task);

  console.log(list);
  render();
}

function render() {
  let resulthtml = "";

  for (let i = 0; i < list.length; i++) {
    if (list[i].iscomplete == true && what != 2) {
      resulthtml += `<div class="task">
      <div class='task-normal task-done'>${list[i].taskcontent}</div>
      <div class='button-zone'>
        <button onclick="done('${list[i].id}')"><i class="fa-solid fa-arrows-rotate"></i></button>
        <button onclick="Delete('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>`;
    } else if (list[i].iscomplete == false && what != 1) {
      resulthtml += `<div class="task">
      <div class="task-normal">${list[i].taskcontent}</div>
      <div class= "button-zone">
        <button onclick="done('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
        <button onclick="Delete('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>`;
    }
  }

  document.getElementById("do-line").innerHTML = resulthtml;
}

function done(id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      list[i].iscomplete = !list[i].iscomplete;
      break;
    }
  }
  render();
  console.log(list);
}

function Delete(id) {
  for (let e = 0; e < list.length; e++) {
    if (list[e].id == id) {
      list.splice(e, 1);

      break;
    }
  }
  render();
  console.log(list);
}
