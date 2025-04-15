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
let circles = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight * 0.7);
    canvas.parent("p5Canvas");  // HTML의 특정 div에 캔버스 연결
    for (let i = 0; i < 10; i++) {
        circles.push(new MovingCircle());
    }
}

function draw() {
    background(isDarkMode ? 30 : 240);
    for (let circle of circles) {
        circle.move();
        circle.display();
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

