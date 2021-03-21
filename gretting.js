const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings"),
    changeName = document.getElementById("js-changeUserName");

const USER_LS = "currentUser", //LS = local storage
    SHOWING_CN = "showing"; //CN = class name

function clearUser(){
    console.log("clear");
    localStorage.removeItem(USER_LS);
    location.reload();
}

//local storage에 입력된 값을 저장
function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

//placeholder에 입력이 되면 그 값을 저장
function handleSubmit(event) {
    event.preventDefault();     //placeholder에 타입된것을 사라지지 않게 하는것
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

//current user라고 등록된게 없을떄 placeholder에 입력할수있게, 엔터로 저장
function asfkForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

//placeholder를 지우고 'Hello (text)'가 나오게
function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

//placeholder자리와 'Hello (text)'가 나올수있게 
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        //he is not
        asfkForName();
    } else {
        //he is
        paintGreeting(currentUser);
    }
}
function init() {
    loadName();
    changeName.addEventListener("click", clearUser);
}
init();
