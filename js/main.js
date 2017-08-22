////
//Canvas
const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
//Form
const topLineInput = document.getElementById("topLineText");
const bottomLineInput = document.getElementById("bottomLineText");
const uploadInput = document.getElementById("upload");
//
const image = new Image();
window.image = image;

//Functions
//
function redrawMeme(image, topLine, bottomLine) {
    // Get Canvas2DContext
    if (image != null) canvasContext.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Text attributes
    canvasContext.font = `${(50 * canvas.width) / 1000}pt Impact`;
    canvasContext.textAlign = 'center';
    canvasContext.strokeStyle = 'black';
    canvasContext.lineWidth = (canvas.width / 400);
    canvasContext.fillStyle = 'white';

    const drawMargin = canvas.height / 11;

    if (topLine != null && (topLine.length > 0)) {
        canvasContext.fillText(topLine, canvas.width / 2, drawMargin);
        canvasContext.strokeText(topLine, canvas.width / 2, drawMargin);
    }

    if (bottomLine != null && bottomLine.length > 0) {
        canvasContext.fillText(bottomLine, canvas.width / 2, canvas.height - drawMargin);
        canvasContext.strokeText(bottomLine, canvas.width / 2, canvas.height - drawMargin);
    }
}


//
function loadImage(src) {
    image.src = src;
    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        redrawMeme(image, window.topLineText, window.bottomLineText);
    }
}

loadImage("img/milo-mcdowell-3027.jpg");


//Event Listeners
//
topLineInput.addEventListener("input", textChangeListener);
bottomLineInput.addEventListener("input", textChangeListener);
uploadInput.addEventListener("change", handleFileSelect);

//Event callbacks
//
function textChangeListener(evt) {
    var id = evt.target.id;
    var text = evt.target.value;

    if (id == "topLineText") {
        window.topLineText = text;
    } else {
        window.bottomLineText = text;
    }

    redrawMeme(window.image, window.topLineText, window.bottomLineText);
}

//
function handleFileSelect(evt) {
    const file = evt.target.files[0];

    const reader = new FileReader();
    reader.onload = fileObject => {
        const data = fileObject.target.result;

        // Create an image object
        loadImage(data);
    };
    reader.readAsDataURL(file);
}