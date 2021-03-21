const toDoForm = document.getElementById("todoForm"),
    toDoInput = toDoForm.querySelector("input"),
    pendingList = document.getElementById("js-pending"),
    finishedList = document.getElementById("js-finished"),
    pendingClear = document.getElementById("js-pendingClear"),
    finishedClear = document.getElementById("js-finishedClear");

const LS_PTODOS = "PENDINGTODOS",
    LS_FTODOS = "FINISHEDTODOS";
let pendingTodos = [],
    finishedTodos = [];
let selID = 0,
    selText = "";

function emptyPending(){
    console.log("clicked pending clear");
    pendingList.innerHTML = "";
    pendingTodos = [];
    saveTodo();
}

function emptyFinished(){
    finishedList.innerHTML = "";
    finishedTodos = [];
    saveTodo();
}

function pDeleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    const cleanToDos = pendingTodos.filter(function(toDo){ 
    return toDo.id !== parseInt(li.id);         
    });
    pendingTodos = cleanToDos;
    saveTodo();
}

function fDeleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);
    const cleanToDos = finishedTodos.filter(function(toDo){ 
    return toDo.id !== parseInt(li.id);         
    });
    finishedTodos = cleanToDos;                             
    saveTodo();
}

function saveTodo(){
    localStorage.setItem(LS_FTODOS, JSON.stringify(finishedTodos));
    localStorage.setItem(LS_PTODOS, JSON.stringify(pendingTodos));
}


function finishedTodo(text){
    const finished = document.createElement("li");
    const retBtn = document.createElement("button");
    const span = document.createElement("span");
    const delBtn = document.createElement("button")
    const newID = finishedTodos.length + 1;;
    delBtn.innerText = "✘";
    delBtn.addEventListener("click", fDeleteTodo);
    retBtn.innerText = "⇤";
    retBtn.addEventListener("click", function(event){
        selText = text;
        pendingTodo(selText);
        fDeleteTodo(event);
    });
    span.innerText = text;
    finished.appendChild(span);
    finished.appendChild(retBtn);
    finished.appendChild(delBtn);
    finished.id = newID;
    finishedList.appendChild(finished);
    const todoObj = {
        text:text,
        id:newID
    };
    finishedTodos.push(todoObj);
    saveTodo();
}


function pendingTodo(text){
    const pending = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const finiBtn = document.createElement("button");
    const newID = pendingTodos.length + 1;
    delBtn.innerText = "✘";
    delBtn.addEventListener("click", pDeleteTodo);
    finiBtn.innerText = "✓";
    finiBtn.addEventListener("click", function(event){
        selText = text;
        finishedTodo(selText);
        pDeleteTodo(event);
        saveTodo();
    });
    span.innerText = " " + text;
    pending.appendChild(span);
    pending.appendChild(finiBtn);
    pending.appendChild(delBtn);
    pending.id = newID;
    pendingList.appendChild(pending);
    const todoObj = {
        text:text,
        id:newID
    };
    pendingTodos.push(todoObj);
    saveTodo();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    pendingTodo(currentValue);
    toDoInput.value = "";
}

function loadTodo(){
    const pendingTodos = localStorage.getItem(LS_PTODOS);
    const finishedTodos = localStorage.getItem(LS_FTODOS);
    if (pendingTodos !== null || finishedTodos !== null){
        const parsedPTodos = JSON.parse(pendingTodos);
        parsedPTodos.forEach(function(toDo){
            pendingTodo(toDo.text);
        });
        const parsedFTodos = JSON.parse(finishedTodos);
        parsedFTodos.forEach(function(toDo){
            finishedTodo(toDo.text);
        });
    }
}

function init(){
    loadTodo();
    toDoForm.addEventListener("submit", handleSubmit);
    pendingClear.addEventListener("click", emptyPending);
    finishedClear.addEventListener("click", emptyFinished);
}
init();
