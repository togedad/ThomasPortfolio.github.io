import '/src/style.css';
import '/src/Programs/Programs.css';

const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const totalWidth = Array.from(track.children).reduce((acc, child) => acc + child.offsetWidth, 0); // Sum of all element widths
  const maxDelta = totalWidth - window.innerWidth; // Total scrollable width minus the window width
  
  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
  
  // Dynamically adjust the scroll range based on total content width
  const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100 * (totalWidth / window.innerWidth - 1)); // Allow scroll range based on content
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });

  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}


/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);