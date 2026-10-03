// Dữ liệu danh sách Tour liên kết trực tiếp tới từng file trong thư mục trangcondiemden/
const toursData = [
    {
        id: 1,
        title: "Tour Du Thuyền 5 Sao Khám Phá Vịnh Hạ Long - Đảo Ti Tốp",
        location: "Quảng Ninh",
        category: "đi biển giá rẻ",
        badge: "Tour HOt",
        duration: "3 Ngày 2 Đêm",
        rating: "4.9 (120 đánh giá)",
        price: 3490000,
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800",
        link: "trangcondiemden/halong.html"
    },
    {
        id: 2,
        title: "Thiên Đường Biển Đảo Phú Quốc - Grand WoArld - Hòn Thơm",
        location: "Kiên Giang",
        category: "đi biển ngắm sao",
        badge: "Hot",
        duration: "4 Ngày 3 Đêm",
        rating: "4.8 (95 đánh giá)",
        price: 4850000,
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
        link: "trangcondiemden/phuquoc.html"
    },
    {
        id: 3,
        title: "Hành Trình Di Sản: Đà Nẵng - Bà Nà Hills - Phố Cổ Hội An",
        location: "Đà Nẵng - Quảng Nam",
        category: "đi biển",
        badge: "",
        duration: "3 Ngày 2 Đêm",
        rating: "5.0 (210 đánh giá)",
        price: 2990000,
        image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=800",
        link: "trangcondiemden/danang.html"
    },
    {
        id: 4,
        title: "Sapa Mờ Sương - Chinh Phục Đỉnh Fansipan - Bản Cát Cát",
        location: "Lào Cai",
        category: "săn mây khám phá núi",
        badge: "Tour Mới",
        duration: "2 Ngày 1 Đêm",
        rating: "4.7 (88 đánh giá)",
        price: 1950000,
        image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=800",
        link: "trangcondiemden/sapa.html"
    },
    {
        id: 5,
        title: "Khám Phá Thành Phố Ngàn Hoa Đà Lạt - Thác Datanla",
        location: "Lâm Đồng",
        category: "săn mây ngắm sao giá rẻ",
        badge: "Giảm 15%",
        duration: "3 Ngày 3 Đêm",
        rating: "4.9 (150 đánh giá)",
        price: 2450000,
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800",
        link: "trangcondiemden/dalat.html"
    },
    {
        id: 6,
        title: "Tuyệt Tình Cốc Ninh Bình - Tràng An - Chùa Bái Đính",
        location: "Ninh Bình",
        category: "tour giá rẻ khám phá núi",
        badge: "Giảm 10%",
        duration: "1 Ngày",
        rating: "4.8 (64 đánh giá)",
        price: 850000,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800",
        link: "trangcondiemden/ninhbinh.html"
    }
];

function renderTours(tours) {
    const tourGrid = document.getElementById("tourGrid");
    const noResults = document.getElementById("noResults");
    if (!tourGrid) return;
    tourGrid.innerHTML = "";

    if (tours.length === 0) {
        if (noResults) noResults.style.display = "block";
        return;
    }

    if (noResults) noResults.style.display = "none";

    tours.forEach((tour) => {
        const badgeHTML = tour.badge ? `<span class="tour-badge">${tour.badge}</span>` : "";
        const formattedPrice = tour.price.toLocaleString('vi-VN') + 'đ';

        const card = document.createElement("div");
        card.className = "tour-card";
        card.innerHTML = `
            <div class="tour-img-wrap" onclick="location.href='${tour.link}'" style="cursor:pointer">
                <img src="${tour.image}" alt="${tour.title}">
                ${badgeHTML}
            </div>
            <div class="tour-content">
                <div class="tour-location">📍 ${tour.location}</div>
                <h4 class="tour-title" onclick="location.href='${tour.link}'" style="cursor:pointer">${tour.title}</h4>
                <div class="tour-info">
                    <span>⏱ ${tour.duration}</span>
                    <span>⭐ ${tour.rating}</span>
                </div>
                <div class="tour-footer">
                    <div class="tour-price">
                        <small>Giá từ</small>
                        <span>${formattedPrice}</span>
                    </div>
                    <a href="${tour.link}" class="btn-book">Xem Tour</a>
                </div>
            </div>
        `;
        tourGrid.appendChild(card);
    });
}

// Thêm tham số shouldScroll (mặc định = false)
function executeSearch(keyword, shouldScroll = false) {
    const cleanKw = keyword.toLowerCase().trim();
    const filtered = toursData.filter(t => 
        t.title.toLowerCase().includes(cleanKw) || 
        t.location.toLowerCase().includes(cleanKw) ||
        t.category.toLowerCase().includes(cleanKw)
    );
    renderTours(filtered);

    // Chỉ cuộn trang xuống khi shouldScroll = true (khi bấm nút Tìm kiếm / bấm thẻ gợi ý / ấn Enter)
    if (shouldScroll) {
        const resultsSection = document.getElementById("resultsSection");
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    renderTours(toursData);

    const searchInput = document.getElementById("searchInput");
    const btnSearch = document.getElementById("btnSearch");
    const tagBtns = document.querySelectorAll(".tag-btn");

    // 1. Khi GÕ CHỮ -> chỉ lọc kết quả, KHÔNG trượt trang (shouldScroll = false)
    if (searchInput) {
        searchInput.addEventListener("input", (e) => executeSearch(e.target.value, false));
        
        // Nhấn phím ENTER trong ô tìm kiếm -> Lọc VÀ cuộn xuống
        searchInput.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                executeSearch(searchInput.value, true);
            }
        });
    }

    // 2. Khi BẤM NÚT TÌM KIẾM -> Lọc VÀ cuộn xuống (shouldScroll = true)
    if (btnSearch) {
        btnSearch.addEventListener("click", () => executeSearch(searchInput.value, true));
    }

    // 3. Khi BẤM THẺ GỌI Ý -> Lọc VÀ cuộn xuống (shouldScroll = true)
    tagBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            const tagText = this.innerText.replace(/^[^\s]+\s*/, '');
            if (searchInput) searchInput.value = tagText;
            executeSearch(tagText, true);
        });
    });
});