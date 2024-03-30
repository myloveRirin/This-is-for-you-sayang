let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  touchMoveX = 0;
  touchMoveY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;

    const startEvent = isTouchDevice ? 'touchstart' : 'mousedown';
    const moveEvent = isTouchDevice ? 'touchmove' : 'mousemove';
    const endEvent = isTouchDevice ? 'touchend' : 'mouseup';

    paper.addEventListener(moveEvent, (e) => {
      e.preventDefault();
      if (!this.rotating && this.holdingPaper) {
        if (isTouchDevice) {
          this.touchMoveX = e.touches[0].clientX;
          this.touchMoveY = e.touches[0].clientY;

          this.velX = this.touchMoveX - this.prevTouchX;
          this.velY = this.touchMoveY - this.prevTouchY;

          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;

          this.prevTouchX = this.touchMoveX;
          this.prevTouchY = this.touchMoveY;
        } else {
          this.mouseX = e.clientX;
          this.mouseY = e.clientY;

          this.velX = this.mouseX - this.prevMouseX;
          this.velY = this.mouseY - this.prevMouseY;

          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;

          this.prevMouseX = this.mouseX;
          this.prevMouseY = this.mouseY;
        }

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener(startEvent, (e) => {
      this.holdingPaper = true;

      if (isTouchDevice) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
        this.prevTouchX = this.touchStartX;
        this.prevTouchY = this.touchStartY;
      } else {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        if (e.button === 2) {
          this.rotating = true;
        }
      }

      paper.style.zIndex = highestZ;
      highestZ += 1;
    });

    window.addEventListener(endEvent, () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
