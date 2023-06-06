function animateScale(element, startScale, targetScale, duration) {
    let startTime = null;
  
    function step(timestamp) {
        if (!startTime) {
            startTime = timestamp;
        }
        let progress = timestamp - startTime;
        let scaleFactor = progress / duration;

        if (scaleFactor >= 1) {
            scaleFactor = 1;
        } else {
            requestAnimationFrame(step);
        }

        let currentScale = startScale + (targetScale - startScale) * scaleFactor;
        element.style.transform = `scale(${currentScale})`;
    }
  
    requestAnimationFrame(step);
}
  
function animateSaturation(element, startSaturation, targetSaturation, duration) {
    let startTime = null;

    function step(timestamp) {
        if (!startTime) {
            startTime = timestamp;
        }
        let progress = timestamp - startTime;
        let saturationFactor = progress / duration;

        if (saturationFactor >= 1) {
            saturationFactor = 1;
        } else {
            requestAnimationFrame(step);
        }

        let currentSaturation = startSaturation + (targetSaturation - startSaturation) * saturationFactor;
        element.style.filter = `saturate(${currentSaturation}%)`;
    }

    requestAnimationFrame(step);
}

function getCurrentScale(element) { //folosit pentru a nu fi brusca animatia daca mouse-ul paraseste elementul inainte sa se termina animatia de zoom in
    let transformValue = window.getComputedStyle(element).getPropertyValue('transform');
    let matrix = new DOMMatrixReadOnly(transformValue);
    return matrix.a; // valoare pentru scale din matricea de transformare
}

function getCurrentSaturation(element) {
    let filterValue = window.getComputedStyle(element).getPropertyValue('filter');
    let saturateIndex = filterValue.indexOf('saturate'); //indexOf metoda din String
    if (saturateIndex !== -1) {
        let substr = filterValue.substring(saturateIndex); //substring metoda din String
        let endIndex = substr.indexOf(')');
        if (endIndex !== -1) {
            let saturationString = substr.substring(9, endIndex); 
            return 100*saturationString;
        }
    }
    return 100; // default
}


function newsHover(event){
    animateScale(event.target, getCurrentScale(event.target), 1.05, 500);
    animateSaturation(event.target, getCurrentSaturation(event.target), 150, 500);
}

function newsHoverLeave(event){
    animateScale(event.target, getCurrentScale(event.target), 1.00, 500);
    animateSaturation(event.target, getCurrentSaturation(event.target), 100, 500);
}

window.onload=()=>{
    newsImages=document.getElementsByClassName("newsImage");
    for(let i=0; i<newsImages.length; i++){
        newsImages[i].addEventListener("mouseover", newsHover);
        newsImages[i].addEventListener("mouseleave", newsHoverLeave);
        
    }
}