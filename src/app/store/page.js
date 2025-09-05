'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Store() {
  const [allProducts, setAllProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("텐트/타프");
  const [currentBrands, setCurrentBrands] = useState([]);
  const [brandPopupActive, setBrandPopupActive] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");
  const [tempSelectedBrands, setTempSelectedBrands] = useState([]);

  const categoryList = [
    "텐트/타프",
    "침구/매트",
    "체어/테이블",
    "가구/가방/수납",
    "랜턴/조명",
    "키친",
    "버너/토치/화로",
    "쿨러/워터저그",
    "웨건/카드",
    "계절용품/기타",
  ];

  const brands = [
    { title: "힐레베르그 Hilleberg", value: "힐레베르그" },
    { title: "몽벨 Montbell", value: "몽벨" },
    { title: "헬리녹스 Helinox", value: "헬리녹스" },
    { title: "노르디스트 Nordisk", value: "노르디스트" },
    { title: "엠에스알 Msr", value: "엠에스알" },
    { title: "니모 Nemo", value: "니모" },
  ];

  /* 카테고리 선택 */
  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    setCurrentBrands([]);
  };

  /* 브랜드 팝업 열기 */
  const toggleBrandPopup = () => {
    if (!brandPopupActive) {
      // 팝업 열 때: 현재 선택된 브랜드를 임시 상태에 복사
      setTempSelectedBrands([...currentBrands]);
    }
    setBrandPopupActive((prev) => !prev);
  };

  /* 팝업 닫기 (오버레이 클릭 시) */
  const closeBrandPopup = () => {
    setBrandPopupActive(false);
    setBrandSearch(""); // 검색값 초기화
    setTempSelectedBrands([]); // 임시 선택 초기화
  };

  /* 브랜드 적용 */
  const applyBrands = () => {
    setCurrentBrands([...tempSelectedBrands]); // 임시 선택을 실제로 적용
    setBrandPopupActive(false);
    setBrandSearch(""); // 검색값 초기화
    setTempSelectedBrands([]); // 임시 선택 초기화
  };

  /* 브랜드 검색 필터링 */
  const filteredBrandList = brands.filter((b) =>
    b.title.toLowerCase().includes(brandSearch.toLowerCase())
  );

  /* 상품 필터링 */
  const filteredProducts = allProducts.filter((product) => {
    const matchCategory = product.product_info.category === currentCategory;
    const matchBrand =
      currentBrands.length === 0 ||
      currentBrands.includes(product.product_info.brand);
    return matchCategory && matchBrand;
  });

  return (
    <>
      <div className={styles.store_category}>
        <h3 className="medium_tb">캠핑</h3>
        <nav className={styles.category_menu}>
          <ul className="small_tr">
            {categoryList.map((cat) => (
              <li key={cat}>
                <button
                  className={`category ${
                    currentCategory === cat ? "selected" : ""
                  }`}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.brand_filter}>
        <h3 className="medium_tb">{currentCategory}</h3>
        <div>
          <div className={styles.brand_header}>
            <span className={styles.brand_label} onClick={toggleBrandPopup}>
              브랜드
            </span>
            <button onClick={toggleBrandPopup}>
              <Image
                src="/images/banner_small_arrow.svg"
                alt="화살표"
                width={10}
                height={10}
              />
            </button>
          </div>
          <div className={styles.brand_selected}>
            {currentBrands.map((brand) => (
              <span key={brand} className={styles.brand_badge}>
                {brand}{" "}
                <button
                  className="remove"
                  onClick={() =>
                    setCurrentBrands(currentBrands.filter((b) => b !== brand))
                  }
                >
                  <Image
                    src="/images/store_close_primary.svg"
                    alt="삭제"
                    width={7}
                    height={7}
                  />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <ul className={`product_list_wrapper ${styles.product_list_wrapper}`}>
        {filteredProducts.map((product) => (
          <li key={product.id} className="product_card">
            <Link href="#">
              <div className="product_image">
                <img
                  src={product.product_image.src}
                  alt={product.product_image.alt}
                />
              </div>
              <div className="product_info">
                <h3 className={`product_title small_tr ${styles.product_title}`}>
                  {product.product_info.title}
                </h3>
                <div className="product_meta">
                  <span className="product_location">
                    {product.product_info.meta.location}
                  </span>
                  <span className="product_date">
                    {product.product_info.meta.date}
                  </span>
                </div>
                <div className="product_footer">
                  <span className="product_price normal_tb">
                    {product.product_info.footer.price}
                  </span>
                  <ul className={`product_stats ${styles.product_stats}`}>
                    {product.product_info.footer.stats.map((stat) => (
                      <li key={stat.label} className={stat.type}>
                        <p className="icon">
                          <img src={stat.icon} alt={stat.label} />
                          <span className="ir_pm">{stat.label}</span>
                        </p>
                        <span>{stat.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div
        className={`${styles.overlay} ${brandPopupActive ? styles.active : ""}`}
        onClick={closeBrandPopup}
      ></div>
      
      <div className={`${styles.brand_popup} ${brandPopupActive ? styles.active : ""}`}>
        <div className="search_input">
          <h4 className="normal_tb">브랜드 검색</h4>
          <div className={styles.brand_search}>
            <input
              type="text"
              placeholder="어떤 상품을 찾으시나요?"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
            />
            <button type="button"></button>
          </div>
        </div>
        <ul className={styles.brand_list}>
          {filteredBrandList.length > 0 ? (
            filteredBrandList.map((brand) => (
              <li key={brand.value}>
                <label className={styles.brand_item}>
                  <span className="brand_title">{brand.title}</span>
                  <input
                    type="checkbox"
                    value={brand.value}
                    checked={tempSelectedBrands.includes(brand.value)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setTempSelectedBrands((prev) =>
                        checked
                          ? [...prev, brand.value]
                          : prev.filter((b) => b !== brand.value)
                      );
                    }}
                  />
                  <span className={styles.custom_checkbox}></span>
                </label>
              </li>
            ))
          ) : (
            <li className={styles.no_result}>
              <Image
                src="/images/store_logo_small.svg"
                alt="검색 결과 없음"
                width={35}
                height={54}
              />
              <p className="small_tb">검색 결과가 없습니다.</p>
              <p className="small_tb">새로 검색해 보세요</p>
            </li>
          )}
        </ul>
        <button className={styles.apply_btn} onClick={applyBrands}>
          적용하기
        </button>
      </div>
    </>
  );
}