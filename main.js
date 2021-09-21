Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

webcam = document.getElementById("webcam");
Webcam.attach("#webcam");

function capture() {
    Webcam.snap(function (data) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data + '">';
    });
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/K-IUsENAn/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function identify() {
    image = document.getElementById("captured_image");
    classifier.classify(image, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        document.getElementById("result_emotion").innerHTML = result[0].label;
        document.getElementById("result_accuracy").innerHTML = result[0].confidence.toFixed(2) + "/1";
    }
}