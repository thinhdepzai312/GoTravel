function navigateTo(targetUrl) {
    if (!targetUrl || targetUrl.startsWith("#") || targetUrl.startsWith("javascript")) return;
    
    document.body.classList.remove("page-loaded");
    document.body.classList.add("page-exiting");

    setTimeout(function () {
        window.location.href = targetUrl;
    }, 400); // Đợi 0.4s cho màn che kéo xuống hết rồi mới chuyển trang
}

document.addEventListener("DOMContentLoaded", function () {
    // Tự động chèn màn che vào giao diện
    if (!document.querySelector(".page-transition-overlay")) {
        const overlay = document.createElement("div");
        overlay.className = "page-transition-overlay";
        document.body.prepend(overlay);
    }

    // Hiển thị trang mượt mà
    setTimeout(function () {
        document.body.classList.add("page-loaded");
    }, 50);

    // Tự động bắt sự kiện bấm các thẻ <a href="..."> để tạo hiệu ứng
    document.addEventListener("click", function (e) {
        const link = e.target.closest("a[href]");
        if (link) {
            const href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !href.startsWith("javascript") && !href.startsWith("http")) {
                e.preventDefault();
                navigateTo(href);
            }
        }
    });
});