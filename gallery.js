window.onload=function() {
    let currentImage = 0;
    let images = document.getElementsByClassName("image");
    let prevButton = document.getElementById("prevButton");
    let nextButton = document.getElementById("nextButton");

    showImage(currentImage);

    function showImage(index) {
        for (let i = 0; i < images.length; i++) {
            images[i].classList.remove("active");
        }
        images[index].classList.add("active");
    }

    function prevImage(){
        currentImage = (currentImage - 1 + images.length) % images.length;
        showImage(currentImage);
    }

    function nextImage(){
        currentImage = (currentImage + 1) % images.length;
        console.log(currentImage);
        showImage(currentImage);
    }
    prevButton.addEventListener("click", prevImage);
    

    nextButton.addEventListener("click", nextImage);

    addEventListener("keydown", (event)=>{
        if(event.key==='ArrowLeft'){
            prevImage();
        } else if(event.key==='ArrowRight'){
            nextImage();
        }
    });
    setInterval(nextImage, 5000); //se modifica automat pozele la 5s
}
  