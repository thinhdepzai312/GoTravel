// ===================================================
// FILE JAVASCRIPT HIỆU ỨNG TRANG CHỦ (banner.js)
// ===================================================

document.addEventListener("DOMContentLoaded", function () {
    // 1. Kích hoạt hiệu ứng xuất hiện trang khi vừa tải xong
    setTimeout(function () {
        document.body.classList.add("page-loaded");
    }, 100);

    // 2. Bắt sự kiện chuyển trang mượt cho tất cả liên kết <a>
    const navLinks = document.querySelectorAll("a[href], [onclick*='location.href']");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            // Chỉ áp dụng với đường dẫn chuyển trang nội bộ
            if (href && !href.startsWith("#") && !href.startsWith("javascript")) {
                e.preventDefault();
                navigateTo(href);
            }
        });
    });

    // 3. Xử lý đổi giao diện Header khi cuộn chuột (Scroll effect)
    const header = document.getElementById("mainHeader");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 4. Khởi tạo tài khoản đăng nhập (nếu có)
    checkLoggedInUser();
});

// Hàm điều hướng trang kèm hiệu ứng mượt
function navigateTo(targetUrl) {
    document.body.classList.remove("page-loaded");
    document.body.classList.add("page-exiting");

    setTimeout(function () {
        window.location.href = targetUrl;
    }, 500); // Đợi hiệu ứng đóng màn che hoàn thành
}

// Kiểm tra thông tin người dùng từ sessionStorage
function checkLoggedInUser() {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const userArea = document.getElementById("user-account-area");

    if (currentUser && userArea) {
        userArea.innerHTML = `
            <div class="user-menu-container" style="display:flex; align-items:center; gap:8px; cursor:pointer;" onclick="navigateTo('mytours.html')">
                <span style="font-size:20px;">👤</span>
                <span style="font-weight:700; font-size:14px; color:${window.scrollY > 50 ? '#1e293b' : '#ffffff'};">${currentUser.name || currentUser.email}</span>
            </div>
        `;
    }
}