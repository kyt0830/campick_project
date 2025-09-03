/* 요소 선택 */
const categoryLinks = document.querySelectorAll('.store_category .category_menu a.category');
const brandBtn = document.querySelector('.brand_filter button');
const brandPopup = document.querySelector('.brand_popup');
const overlay = document.querySelector('.overlay');
const checkboxes = brandPopup.querySelectorAll('input[type="checkbox"]');
const searchInput = document.querySelector('.brand_search input');
const brandList = document.querySelector('.brand_list');
const brands = Array.from(brandList.querySelectorAll('li')).filter(li => !li.classList.contains('no_result'));
const noResultList = brandList.querySelector('.no_result');
const applyBtn = brandPopup.querySelector('.apply_btn');
const brandSelected = document.querySelector('.brand_selected');
const brandTitle = document.querySelector('.brand_filter h3');
const wrapper = document.querySelector(".product_list_wrapper");

/* JSON 데이터 저장용 */
let allProducts = [];

/* 현재 선택된 카테고리와 브랜드 */
let currentCategory = document.querySelector('.category.selected').textContent;
let currentBrands = [];

/* 카테고리 클릭 이벤트 */
categoryLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    categoryLinks.forEach(l => l.classList.remove('selected'));
    this.classList.add('selected');

    // 현재 선택된 카테고리 갱신
    currentCategory = this.textContent;

    // 브랜드 선택 초기화
    brandTitle.textContent = this.textContent;
    brandSelected.innerHTML = '';
    checkboxes.forEach(cb => cb.checked = false);
    currentBrands = [];

    // 상품 다시 그리기
    renderProducts();
  });
});

/* 브랜드 선택 팝업 */
brandBtn.addEventListener('click', () => {
  brandPopup.classList.toggle('active');
  overlay.classList.toggle('active');
});

/* 팝업 닫기 */
function closeBrandPopup() {
  brandPopup.classList.remove('active');
  overlay.classList.remove('active');
  searchInput.value = '';
  brands.forEach(li => li.style.display = '');
  noResultList.style.display = 'none';
}

/* 팝업 외부 클릭 시 닫기 */
window.addEventListener('click', (e) => {
  if (!e.target.closest('.brand_filter button') && !e.target.closest('.brand_popup')) {
    closeBrandPopup();
  }
});

/* 실시간 검색 */
searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase().trim();
  if (!keyword) {
    brands.forEach(li => li.style.display = '');
    noResultList.style.display = 'none';
    return;
  }
  let hasResult = false;
  brands.forEach(li => {
    const title = li.querySelector('.brand_title').textContent.toLowerCase();
    if (title.includes(keyword)) {
      li.style.display = '';
      hasResult = true;
    } else {
      li.style.display = 'none';
    }
  });
  noResultList.style.display = hasResult ? 'none' : 'block';
});

/* 브랜드 적용 버튼 */
applyBtn.addEventListener('click', () => {
  currentBrands = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  brandSelected.innerHTML = ''; // 기존 뱃지 제거

  currentBrands.forEach(name => {
    const span = document.createElement('span');
    span.className = 'brand_badge';

    // 삭제 버튼 + SVG 이미지
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove';
    const img = document.createElement('img');
    img.src = 'images/store_close_primary.svg';
    img.alt = '삭제';
    removeBtn.appendChild(img);

    // 삭제 버튼 클릭 시
    removeBtn.addEventListener('click', () => {
      span.remove();
      checkboxes.forEach(cb => {
        if (cb.value === name) cb.checked = false;
      });
      currentBrands = currentBrands.filter(b => b !== name);
      renderProducts();
    });

    span.textContent = name + " ";
    span.appendChild(removeBtn);
    brandSelected.appendChild(span);
  });

  closeBrandPopup();

  // 상품 다시 그리기
  renderProducts();
});

/* JSON 불러오기 */
fetch('json/store.data.json')
  .then(response => response.json())
  .then(products => {
    allProducts = products; // 전체 데이터 저장
    renderProducts();       // 첫 렌더링
  })
  .catch(err => console.error("JSON 로딩 실패:", err));

/* 상품 렌더링 함수 */
function renderProducts() {
  wrapper.innerHTML = ''; // 기존 상품 제거

  const filtered = allProducts.filter(product => {
    const matchCategory = product.product_info.category === currentCategory;
    const matchBrand = currentBrands.length === 0 || currentBrands.includes(product.product_info.brand);
    return matchCategory && matchBrand;
  });

  filtered.forEach(product => {
    const li = document.createElement("li");
    li.className = "product_card";

    li.innerHTML = `
      <a href="#">
        <div class="product_image">
          <img src="${product.product_image.src}" alt="${product.product_image.alt}">
        </div>
        <div class="product_info">
          <h3 class="product_title small_tr">${product.product_info.title}</h3>
          <div class="product_meta">
            <span class="product_location">${product.product_info.meta.location}</span>
            <span class="product_date">${product.product_info.meta.date}</span>
          </div>
          <div class="product_footer">
            <span class="product_price normal_tb">${product.product_info.footer.price}</span>
            <ul class="product_stats">
              ${product.product_info.footer.stats.map(stat => `
                <li class="${stat.type}">
                  <p class="icon">
                    <img src="${stat.icon}" alt="${stat.label}">
                    <span class="ir_pm">${stat.label}</span>
                  </p>
                  <span>${stat.count}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        </div>
      </a>
    `;
    wrapper.appendChild(li);
  });
}
