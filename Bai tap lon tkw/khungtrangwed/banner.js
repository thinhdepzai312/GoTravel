// ===================================================
// FILE JAVASCRIPT CHUNG (banner.js)
// ===================================================

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        document.body.classList.add("page-loaded");
    }, 100);

    const header = document.getElementById("mainHeader") || document.querySelector("header");
    if (header) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    checkLoggedInUser();
    initTourSearch();
});

function navigateTo(targetUrl) {
    document.body.classList.remove("page-loaded");
    document.body.classList.add("page-exiting");
    setTimeout(function () {
        window.location.href = targetUrl;
    }, 300);
}

// Hàm Tìm kiếm từ thanh Search Box
function executeSearch() {
    const searchInput = document.querySelector(".search-box input[type='text']");
    const keyword = searchInput ? searchInput.value.trim() : "";
    const isSubFolder = window.location.pathname.toLowerCase().includes("trangcondiemden");
    const targetPage = isSubFolder ? "../diemden.html" : "diemden.html";

    if (keyword) {
        window.location.href = `${targetPage}?search=${encodeURIComponent(keyword)}`;
    } else {
        window.location.href = targetPage;
    }
}

// Logic Lọc danh sách Tour theo từ khóa
function initTourSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchKeyword = urlParams.get("search");
    const tourCards = document.querySelectorAll(".tour-card");
    const toursGrid = document.querySelector(".tours-grid");

    if (!toursGrid || tourCards.length === 0) return;

    let noResultEl = document.getElementById("no-search-results");
    if (!noResultEl) {
        noResultEl = document.createElement("div");
        noResultEl.id = "no-search-results";
        noResultEl.style.cssText = "display: none; text-align: center; padding: 50px 20px; width: 100%; grid-column: 1 / -1;";
        toursGrid.parentNode.insertBefore(noResultEl, toursGrid.nextSibling);
    }

    if (searchKeyword) {
        const keyword = searchKeyword.toLowerCase().trim();
        let matchCount = 0;

        tourCards.forEach(card => {
            const textContent = card.innerText.toLowerCase();
            if (textContent.includes(keyword)) {
                card.style.display = "";
                matchCount++;
            } else {
                card.style.display = "none";
            }
        });

        // Nếu KHÔNG TÌM THẤY tour nào phù hợp
        if (matchCount === 0) {
            toursGrid.style.display = "none";
            noResultEl.style.display = "block";
            noResultEl.innerHTML = `
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px 20px; max-width: 500px; margin: 0 auto;">
                    <div style="font-size: 48px; margin-bottom: 12px;">🔍</div>
                    <h3 style="font-size: 20px; color: #0f172a; margin-bottom: 8px;">Không tìm thấy tour phù hợp</h3>
                    <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">Rất tiếc, không có tour nào phù hợp với từ khóa "<strong>${escapeHtml(searchKeyword)}</strong>".</p>
                    <button onclick="resetSearchFilter()" style="background: #0284c7; color: #fff; border: none; padding: 10px 24px; border-radius: 25px; font-weight: 600; cursor: pointer;">
                        🔄 Xem tất cả các tour
                    </button>
                </div>
            `;
        } else {
            toursGrid.style.display = "grid";
            noResultEl.style.display = "none";
        }
    } else {
        tourCards.forEach(card => card.style.display = "");
        toursGrid.style.display = "grid";
        noResultEl.style.display = "none";
    }
}

function resetSearchFilter() {
    window.location.href = window.location.pathname;
}

function escapeHtml(string) {
    return String(string).replace(/[&<>"']/g, function (s) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s];
    });
}

// Render Nút Tài khoản bo tròn
function checkLoggedInUser() {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const userArea = document.getElementById("user-account-area");

    if (currentUser && userArea) {
        const isSubFolder = window.location.pathname.toLowerCase().includes("trangcondiemden");
        const myToursPath = isSubFolder ? "../mytours.html" : "mytours.html";

        userArea.innerHTML = `
            <div class="user-menu-container" style="position: relative; display: inline-block;">
                <div class="user-btn" onclick="toggleUserDropdown(event)" style="
                    display: flex; align-items: center; gap: 8px; background-color: #f1f5f9;
                    border: 1px solid #e2e8f0; padding: 6px 14px; border-radius: 30px; cursor: pointer;
                ">
                    <span style="font-size: 18px; line-height: 1;">👤</span>
                    <span style="
                        font-weight: 700; font-size: 14px; color: #0f172a; max-width: 110px;
                        white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inline-block;
                    " title="${currentUser.name || currentUser.email}">
                        ${currentUser.name || currentUser.email}
                    </span>
                    <span style="font-size: 10px; color: #0f172a; margin-left: 2px;">▼</span>
                </div>

                <div id="user-dropdown" class="user-dropdown" style="
                    display: none; position: absolute; right: 0; top: 130%; background: #ffffff;
                    border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); padding: 16px;
                    min-width: 220px; z-index: 9999; text-align: left; border: 1px solid #f1f5f9;
                ">
                    <div class="dropdown-header">
                        <strong style="font-size: 15px; color: #0f172a; display: block;">${currentUser.name || "Khách hàng"}</strong>
                        <small style="font-size: 13px; color: #64748b; display: block; margin-top: 2px;">${currentUser.phone || currentUser.email}</small>
                    </div>
                    <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 10px 0;">
                    <a href="${myToursPath}" style="display: block; padding: 8px 0; color: #334155; text-decoration: none; font-weight: 600; font-size: 14px;">
                        📋 Tour của tôi
                    </a>
                    <a href="javascript:void(0)" class="logout-btn" onclick="handleLogout()" style="display: block; padding: 8px 0; color: #ef4444; text-decoration: none; font-weight: 600; font-size: 14px;">
                        🚪 Đăng xuất
                    </a>
                </div>
            </div>
        `;
    }
}

function toggleUserDropdown(event) {
    if (event) event.stopPropagation();
    const dropdown = document.getElementById("user-dropdown");
    if (dropdown) {
        dropdown.style.display = (dropdown.style.display === "none" || dropdown.style.display === "") ? "block" : "none";
    }
}

function handleLogout() {
    sessionStorage.removeItem("currentUser");
    const isSubFolder = window.location.pathname.toLowerCase().includes("trangcondiemden");
    const homePath = isSubFolder ? "../banner.html" : "banner.html";
    navigateTo(homePath);
}

document.addEventListener("click", function (e) {
    const container = document.querySelector(".user-menu-container");
    const dropdown = document.getElementById("user-dropdown");
    if (container && dropdown && !container.contains(e.target)) {
        dropdown.style.display = "none";
    }
});