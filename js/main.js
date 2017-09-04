////Model
//
const memesList = [
    {
        name: "One does not Simply",
        image: "img/memes/One-Does-Not-Simply.jpg"
    },
    {
        name: "Philosoraptor",
        image: "img/memes/philosoraptor.jpg"
    },
    {
        name: "Success-kid",
        image: "img/memes/Success-Kid.jpg"
    },
    {
        name: "Waiting-Skeleton",
        image: "https://imgflip.com/s/meme/Leonardo-Dicaprio-Cheers.jpg"
    },
    {
        name: "Waiting-Skeleton",
        image: "https://media2.giphy.com/media/3og0IvBim73ZRmR4ti/200_s.gif"
    },
    {
        name: "Roll Safe",
        image: "https://www.wykop.pl/cdn/c3201142/comment_rV3spwj5LGbPbZ5m0CWnqKLWPPCRkt8m.jpg"
    }
]

//
const model = {
    isMemesAreaVisble: false,
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
const selectBtnBottom = document.getElementById("selectBtnBottom");
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
selectBtnBottom.addEventListener("click", formToggleListener);


//Event callbacks
//
function formToggleListener() {
    if (!model.isMemesAreaVisble) {
        memesArea.classList.remove("hidden");
        form.classList.add("hidden");
        selectBtn.innerText = selectBtnBottom.innerText = "Type a Text"
        model.isMemesAreaVisble = true;
        return;
    }

    memesArea.classList.add("hidden");
    form.classList.remove("hidden");
    selectBtn.innerText = selectBtnBottom.innerText = "Select a Meme"
    model.isMemesAreaVisble = false;
}

//
function textChangeListener(evt) {
    const id = evt.target.id;
    const text = evt.target.value;

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

//
function memeClickListener(evt){
    const image = evt.target.src;
    loadImage(image);
    formToggleListener();
    topLineInput.focus();
    topLineInput.select();
}

////View functions
//
(function loadMemesArea() {
    model.memesList.forEach(meme => {
        const memeElementTemplate = `<li><img src="${meme.image}" alt="${meme.name} image" title="${meme.name}"></li>`;
        // memesArea.insertAdjacentHTML("beforeend", memeElement);
        const memeElementDOM = new DOMParser().parseFromString(memeElementTemplate, "text/html").documentElement.lastChild.firstElementChild;
        memeElementDOM.addEventListener("click",memeClickListener);
        memesArea.appendChild(memeElementDOM);
    })
})()