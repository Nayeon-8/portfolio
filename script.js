let isDarkMode = false;

document.getElementById("modeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    isDarkMode = !isDarkMode;
});

// 페이지 이동 효과
function showSection(sectionId) {
    document.querySelectorAll("section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}

// 기본적으로 UI/UX 페이지부터 표시
document.addEventListener("DOMContentLoaded", function () {
    showSection("uiux");
});


// p5.js 인터랙션
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(40);
  noStroke();
}

function draw() {
  background(0, 10);
  // Add new particle each frame
addParticle(random(width), 0);
  // Reverse the loop so that particles are "loaded" back to front
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    moveParticle(p, i);
    drawParticle(p);
  }

  //showText();
}

function addParticle(x_pos, y_pos) {
  let h =random(20);
  let c = color(h, random(50,100), 100);
  let sz = 8;
  let s = random(2, 5);
  particles.push({
    x: x_pos,
    y: y_pos,
    color: c,
    sz: sz,
    speed: s,
  });
}

function moveParticle(p, i) {
  p.y += p.speed;
  p.x += random(-2, 2);
  if (p.y < 0 || p.y > height) {
    particles.splice(i, 1);
  }
}

function drawParticle(p) {
  fill(p.color);
  ellipse(p.x, p.y, random(p.sz), random(p.sz));
  
  p.hue += 1;
  p.color = color(p.hue, random(50, 100), 100)
  if(p.color > 360) {
    p.color = 0;
  }
}

function mouseDragged() {
  let pushStrength = 5; 
  let maxDist = 100; 

  for (let p of particles) {
    let d = dist(mouseX, mouseY, p.x, p.y);
    if (d < maxDist) {
      let angle = atan2(p.y - mouseY, p.x - mouseX); 
      p.x += cos(angle) * pushStrength; 
      p.y += sin(angle) * pushStrength; 
    }
  }
}



class MovingCircle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(20, 50);
        this.speedX = random(-2, 2);
        this.speedY = random(-2, 2);
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
    }

    display() {
        fill(isDarkMode ? 255 : 0);
        ellipse(this.x, this.y, this.size);
    }
}
function loadUIUX() {
    fetch("uiux.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data; // 기존 콘텐츠 변경
            document.body.classList.add("uiux-mode"); // UI/UX 디자인 스타일 적용
        })
        .catch(error => console.error("UI/UX 페이지를 불러오는 데 실패했습니다.", error));
}

function loadGRAPHIC() {
    fetch("graphic.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data; // 기존 콘텐츠 변경
            document.body.classList.add("graphic-mode"); // UI/UX 디자인 스타일 적용
        })
        .catch(error => console.error("GRAPHIC 페이지를 불러오는 데 실패했습니다.", error));
}

function loadOTHER() {
    fetch("other")
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data; // 기존 콘텐츠 변경
            document.body.classList.add("other-mode"); // UI/UX 디자인 스타일 적용
        })
        .catch(error => console.error("OTHER 페이지를 불러오는 데 실패했습니다.", error));
}

