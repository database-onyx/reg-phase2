document.addEventListener("DOMContentLoaded", function () {
  const descArrow = document.querySelector(".desc_arrow");
  const formArrow = document.querySelector(".form_arrow");
  const qrButton = document.getElementById("qrbutton");
  const descSection = document.querySelector(".desc_section");
  const formSection = document.querySelector(".form-section");
  const camSection = document.querySelector(".cam_section");
  const closePopupBtn = document.getElementById("closePopupBtn");
  const openCameraBtn = document.getElementById("show");
  const overlayImage = document.getElementById("overlayImage");

  formSection.style.display = "none";
  camSection.style.display = "none";

  descArrow.addEventListener("click", function () {
    gsap.to(descSection, { opacity: 0, duration: 0.5, display: "none" });
    gsap.to(formSection, { opacity: 1, duration: 0.5, display: "flex" });
  });

  formArrow.addEventListener("click", function () {
    gsap.to(formSection, { opacity: 0, duration: 0.5, display: "none" });
    gsap.to(descSection, { opacity: 1, duration: 0.5, display: "flex" });
  });

  closePopupBtn.addEventListener("click", function () {
    gsap.to(camSection, { opacity: 0, duration: 0.5, display: "none" });
    gsap.to(formSection, { opacity: 1, duration: 0.5, display: "flex" });
    overlayImage.style.display = "none";
  });

  openCameraBtn.addEventListener("click", function () {
    const nameInput = document.getElementById("Enter_your_name").value.trim();
    const whatsappInput = document
      .getElementById("Whatsapp_Number")
      .value.trim();

    if (!/^\d{10}$/.test(whatsappInput)) {
      console.log("Please enter a valid 10-digit WhatsApp number.");
      return;
    }

    gsap.to(formSection, { opacity: 0, duration: 0.5, display: "none" });
    gsap.to(camSection, { opacity: 1, duration: 0.5, display: "flex" });
    overlayImage.style.display = "block";

    const pastel_nav_logo = gsap.timeline({
      ease: "bounce.out",
    });

    pastel_nav_logo.fromTo(
      "#loadingcircle",
      {
        strokeDasharray: "1530px",
        strokeDashoffset: "1530px",
      },
      {
        duration: 3.5,
        strokeDashoffset: 0,
        strokeDasharray: 0,
      }
    );
  });
});
