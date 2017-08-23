////Model
//
const memesList = [
    {
        name:"One does not Simply",
        img:"img/memes/One-Does-Not-Simply.jpg"
    },
    {
        name:"Philosoraptor",
        img:"img/memes/philosoraptor.jpg"
    },
    {
        name:"Success-kid",
        img:"img/memes/Success-kid.jpg"
    },
    {
        name:"Waiting-Skeleton",
        img:"img/memes/Waiting-Skeleton.jpg"
    },
]

//
const model = {
    isMemesAreaVisble : false,
    memesList
}

////
//Canvas
const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
//Form
const topLineInput = document.getElementById("topLineText");
const bottomLineInput = document.getElementById("bottomLineText");
const uploadInput = document.getElementById("upload");
const selectBtn = document.getElementById("selectBtn");
const form = document.getElementById("form");
const memesArea = document.getElementById("memesArea");
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

    const drawMargin = canvas.height / 10;

    if (topLine != null && (topLine.length > 0)) {
        canvasContext.fillText(topLine, canvas.width / 2, drawMargin);
        canvasContext.strokeText(topLine, canvas.width / 2, drawMargin);
    }

    if (bottomLine != null && bottomLine.length > 0) {
        canvasContext.fillText(bottomLine, canvas.width / 2, canvas.height - drawMargin / 2);
        canvasContext.strokeText(bottomLine, canvas.width / 2, canvas.height - drawMargin / 2);
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
selectBtn.addEventListener("click", formToggleListener);



//Event callbacks
//
function formToggleListener(evt) {
    if (!model.isMemesAreaVisble){
        memesArea.classList.remove("hidden");
        form.classList.add("hidden");
        selectBtn.innerText = "Type a Text"
        model.isMemesAreaVisble = true;
        return;
    }

    memesArea.classList.add("hidden");
    form.classList.remove("hidden");
    selectBtn.innerText = "Select a Meme"
    model.isMemesAreaVisble = false;
}

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

////View functions
//
function loadMemesArea(){

}