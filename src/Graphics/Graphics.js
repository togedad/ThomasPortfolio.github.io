import '/src/Graphics/Graphics.css';
import '/src/style.css';

const blob = document.getElementById("blob");
const range = 300; // The range within which the element should be considered "in the center"

function updateBlob() {
    const { clientX, clientY } = event;
    
    // Add window scroll offset to clientY to account for scrolling
    const scrollY = window.scrollY;
    const adjustedClientY = clientY + scrollY;
    
    blob.animate({
      left: `${clientX}px`,
      top: `${adjustedClientY}px`
    }, { duration: 3000, fill: "forwards" });
  };

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let interval = null;
  
document.querySelector("h1").onmouseover = event => {  
    let iteration = 0;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return event.target.dataset.value[index];
          }
        
          return letters[Math.floor(Math.random() * 26)]
        })
        .join("");
      
      if(iteration >= event.target.dataset.value.length){ 
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
}

function checkImagePosition() {
    const images = document.getElementsByClassName("imageSetBack");
    console.log(images)
    Array.from(images).forEach(image => {
        const rect  = image.getBoundingClientRect(); // Get the image's position relative to the viewport
  
        // Calculate the center of the viewport
        const viewportCenterX = window.innerWidth / 2;
        const viewportCenterY = window.innerHeight / 2;
      
        // Check if the image is in the middle of the screen (e.g., within a 10px tolerance)
        const isInMiddle = Math.abs(rect.left + rect.width / 2 - viewportCenterX) < range &&
                   Math.abs(rect.top + rect.height / 2 - viewportCenterY) < range;    
    
        if (!isInMiddle) {
          // Remove background if image is centered
          image.style.transform = "scale(0.8)";
          image.style.opacity = '20%';
        } else {
          // Set a background image when the image is not centered
          image.style.opacity = '100%';
          image.style.transform = "scale(1)";
        }        
    });
  }
  
// Check position when the page is loaded and on scroll or resize events
window.addEventListener('load', checkImagePosition);
window.addEventListener('scroll', checkImagePosition);
window.addEventListener('mousemove', updateBlob);
window.addEventListener('resize', checkImagePosition);
  