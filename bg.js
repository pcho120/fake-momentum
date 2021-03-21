const body = document.querySelector("body");

const IMG_NUMBER = 9;

/*                              //if the image comes from the API, it does not needed
function handleImgLoaded(){
    console.log('finished loading');
}
*/

function paintImage (imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    //image.addEventListener("loadend", handleImgLoaded);   //if the image comes from the API, it does not needed
    image.classList.add('bgImage');
    body.prepend(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber  = genRandom();
    paintImage(randomNumber);
}
init();