const canvas = document.querySelector("#canvas");
const canvasContext = canvas.getContext("2d");

const image = new Image();

image.onload = () => {
    console.log("Image loaded!");
    canvas.width = image.width;
    canvas.height = image.height;
    canvasContext.drawImage(image, 0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = "#fff";
    canvasContext.strokeStyle = "#000";
    canvasContext.font = '48px serif';

    canvasContext.strokeText("Hello in deep Sea!", 48, 48);
    canvasContext.fillText("Hello in deep Sea!", 50, 50);
}

image.src = "img/milo-mcdowell-3027.jpg";


