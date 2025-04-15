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



document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-item");
    const sections = document.querySelectorAll(".content-section");
    const topbar = document.querySelector(".topbar"); // 탑바 선택
    
    

    menuItems.forEach(item => {
        item.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");

            // 모든 섹션을 숨기기
            sections.forEach(section => {
                section.classList.remove("active");
                section.style.display = "none";  
            });

            // 선택한 섹션 보이기
            const targetSection = document.getElementById(targetId);
            targetSection.classList.add("active");
            targetSection.style.display = "block";  

            // 메뉴 활성화 스타일 변경
            menuItems.forEach(menu => menu.classList.remove("active"));
            this.classList.add("active");

            // 메인 콘텐츠 스크롤 초기화
            document.querySelector(".main-content").scrollTo(0, 0);

            // 🚀 **탑바가 사라지지 않도록 강제 유지**
            if (topbar) {
                topbar.style.display = "flex";  // ✅ flex로 설정 (보이도록)
                topbar.style.position = "fixed"; // ✅ 항상 고정
                topbar.style.top = "0"; // ✅ 최상단 고정
            }
        });
    });
});
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

