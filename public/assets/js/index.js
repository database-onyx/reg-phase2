document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#show").addEventListener("click", function () {
    const nameInput = document.getElementById("Enter_your_name").value.trim();
    const whatsappInput = document
      .getElementById("Whatsapp_Number")
      .value.trim();

    if (nameInput === "" || whatsappInput === "") {
      alert("Please fill in all the fields before proceeding.");
      return;
    }

    if (!/^\d{10}$/.test(whatsappInput)) {
      alert("Please enter a valid 10-digit WhatsApp number.");
      return;
    }

    showPopup();
  });

  function showPopup() {
    const constraints = {
      video: {
        facingMode: "user",
        width: 800,
        height: 800,
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        initializeCamera(stream);
        document.querySelector(".popup").style.display = "flex";
        document.getElementById("takePhotoBtn").style.display = "inline";
        document.getElementById("retakePhotoBtn").style.display = "none";
        document.getElementById("getPhotosBtn").style.display = "none";
      })
      .catch(function (err) {
        console.error("Error accessing the camera: ", err);
      });
  }

  function initializeCamera(stream) {
    const video = document.querySelector("#camera");
    video.srcObject = stream;
    video.play();
  }

  document
    .querySelector("#takePhotoBtn")
    .addEventListener("click", function () {
      overlayImage.style.display = "none";
      capturePhoto();
    });

  document
    .querySelector("#retakePhotoBtn")
    .addEventListener("click", function () {
      retakePhoto();
      overlayImage.style.display = "block";
    });

  document
    .querySelector("#closePopupBtn")
    .addEventListener("click", function () {
      closePopup();
    });

  function capturePhoto() {
    const video = document.querySelector("#camera");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = canvas.toDataURL("image/jpeg");

    document.querySelector("#capturedImageInput").value = image.src;
    document.getElementById("capturedImageMimeType").value = "image/jpeg";

    document.querySelector("#capturedImage").src = image.src;
    document.querySelector("#capturedImage").style.display = "inline";
    document.getElementById("getPhotosBtn").style.display = "inline";
    document.getElementById("takePhotoBtn").style.display = "none";
    document.getElementById("retakePhotoBtn").style.display = "inline";
  }

  function retakePhoto() {
    document.querySelector("#capturedImage").src = "";
    document.querySelector("#capturedImage").style.display = "none";
    document.getElementById("getPhotosBtn").style.display = "none";
    document.getElementById("takePhotoBtn").style.display = "inline";
    document.getElementById("retakePhotoBtn").style.display = "none";
  }

  function closePopup() {
    document.querySelector(".popup").style.display = "none";
    const video = document.querySelector("#camera");
    const stream = video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());

    document.querySelector("#capturedImage").src = "";
    document.querySelector("#capturedImage").style.display = "none";
  }

  document
    .querySelector("#getPhotosBtn")
    .addEventListener("click", function () {
      document.getElementById("home-get").click();
      savePhoto();
    });

  function savePhoto() {
    const imageDataURI = document.querySelector("#capturedImage").src;
    document.querySelector("#capturedImageInput").value = imageDataURI;
  }
});
