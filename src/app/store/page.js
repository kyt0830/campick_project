'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import styles from "./page.module.css";
import BannerSlide from '../slideComponent';

// 환경 변수 검증
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function timeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now - past;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  return "방금 전";
}

export default function Store() {
  const [allProducts, setAllProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("A01"); // 코드값으로 변경
  const [currentBrands, setCurrentBrands] = useState([]);
  const [brandPopupActive, setBrandPopupActive] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");
  const [tempSelectedBrands, setTempSelectedBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 카테고리 매핑 (코드값과 표시명)
  const categories = [
    { title: "텐트/타프", value: "A01" },
    { title: "침구/매트", value: "A02" },
    { title: "체어/테이블", value: "A03" },
    { title: "가구/가방/수납", value: "A04" },
    { title: "랜턴/조명", value: "A05" },
    { title: "키친", value: "A06" },
    { title: "버너/토치/화로", value: "A07" },
    { title: "쿨러/워터저그", value: "A08" },
    { title: "웨건/카드", value: "A09" },
    { title: "계절용품/기타", value: "A10" }
  ];

  // 브랜드 매핑 (코드값과 표시명)
  const brands = [
    { title: "힐레베르그 Hilleberg", value: "A01" },
    { title: "몽벨 Montbell", value: "A02" },
    { title: "헬리녹스 Helinox", value: "A03" },
    { title: "노르디스트 Nordisk", value: "A04" },
    { title: "엠에스알 Msr", value: "A05" },
    { title: "니모 Nemo", value: "A06" },
  ];

  // 헬퍼 함수: 코드값을 표시명으로 변환
  const getCategoryTitle = (value) => {
    const category = categories.find(cat => cat.value === value);
    return category ? category.title : value;
  };

  const getBrandTitle = (value) => {
    const brand = brands.find(br => br.value === value);
    return brand ? brand.title : value;
  };

  /* DB > 상품 불러오기 */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let { data, error } = await supabase
          .from("product")
          .select("*")
          .eq("prod_status", 1)
          .order("created_at", { ascending: false });
        
        if (error) {
          console.error("상품 불러오기 실패:", error.message, error.status, error.details);
          setError(error.message);
          setAllProducts([]);
          return;
        }

        console.log("불러온 상품 데이터:", data); // 디버깅용

const mapped = data.map((p) => {
  // DB에서 받은 이미지 문자열을 배열로 변환, 없으면 기본 이미지
  const imagesArray = p.prod_images
    ? p.prod_images.split(",").map((img) => img.trim())
    : ["/images/default-product.jpg"];

  return {
    id: p.prod_id || p.id,
    product_image: imagesArray.map((src) => ({
      src,
      alt: p.prod_title || "상품 이미지",
    })),
    product_info: {
      title: p.prod_title || "제목 없음",
      category: p.prod_category || "A01",
      brand: p.prod_brand || "A01",
      meta: {
        location: p.location || "종로 1가",
        date: timeAgo(p.created_at),
      },
      footer: {
        price: `${(p.prod_price || 0).toLocaleString()} 원`,
        stats: [
          {
            type: "view",
            label: "조회수",
            icon: "/images/prod_detail_view.svg",
            count: p.view || 0,
          },
          {
            type: "message",
            label: "메시지",
            icon: "/images/prod_detail_chat.svg",
            count: Math.floor(Math.random() * 5),
          },
          {
            type: "like",
            label: "즐겨찾기",
            icon: "/images/prod_detail_bookmark.svg",
            count: p.like || 0,
          },
        ],
      },
    },
  };
});

        console.log("매핑된 상품 데이터:", mapped); // 디버깅용
        setAllProducts(mapped);
      } catch (err) {
        console.error("상품 불러오기 중 오류:", err);
        setError("상품을 불러오는 중 오류가 발생했습니다.");
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryClick = (categoryValue) => {
    setCurrentCategory(categoryValue);
    setCurrentBrands([]);
  };

  const toggleBrandPopup = () => {
    if (!brandPopupActive) {
      setTempSelectedBrands([...currentBrands]);
    }
    setBrandPopupActive((prev) => !prev);
  };

  const closeBrandPopup = () => {
    setBrandPopupActive(false);
    setBrandSearch("");
    setTempSelectedBrands([]); 
  };

  const applyBrands = () => {
    setCurrentBrands([...tempSelectedBrands]);
    setBrandPopupActive(false);
    setBrandSearch("");
    setTempSelectedBrands([]); 
  };

  /* 브랜드 검색 필터링 */
  const filteredBrandList = brands.filter((b) =>
    b.title.toLowerCase().includes(brandSearch.toLowerCase())
  );

  /* 상품 필터링 */
  console.log("=== 필터링 디버깅 ===");
  console.log("현재 선택된 카테고리:", currentCategory);
  console.log("현재 선택된 브랜드들:", currentBrands);
  console.log("전체 상품 수:", allProducts.length);
  
  // 각 상품의 카테고리와 브랜드 값들을 확인
  allProducts.forEach((product, index) => {
    if (index < 3) { // 처음 3개만 출력
      console.log(`상품 ${index + 1}:`, {
        title: product.product_info.title,
        category: product.product_info.category,
        brand: product.product_info.brand
      });
    }
  });

  const filteredProducts = allProducts.filter((product) => {
    const matchCategory = product.product_info.category === currentCategory;
    const matchBrand =
      currentBrands.length === 0 ||
      currentBrands.includes(product.product_info.brand);
    
    return matchCategory && matchBrand;
  });

  console.log("필터된 상품 수:", filteredProducts.length);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>상품을 불러오는 중 🔥</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>오류: {error}</p>
        <button onClick={() => window.location.reload()}>다시 시도</button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.store_category}>
        <h3 className="medium_tb">캠핑</h3>
        <nav className={styles.category_menu}>
          <ul className="small_tr">
            {categories.map((cat) => (
              <li key={cat.value}>
                <button
                  className={`category ${
                    currentCategory === cat.value ? "selected" : ""
                  }`}
                  onClick={() => handleCategoryClick(cat.value)}
                >
                  {cat.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* common_slide_content */}
      <div className={`common_slider_container ${styles.common_slider_container}`}>
        <div className="common_slider_wrapper">
          <BannerSlide />
        </div>
      </div>
      {/* common_slide_content */}

      <div className={styles.brand_filter}>
        <h3 className="medium_tb">{getCategoryTitle(currentCategory)}</h3>
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
                {getBrandTitle(brand)}{" "}
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

      <ul
        className={
          filteredProducts.length === 0
            ? styles.no_result_wrapper
            : styles.product_list_wrapper
        }
      >
        {filteredProducts.length === 0 ? (
          <li className={styles.no_result}>
            <Image
              src="/images/store_logo_small.svg"
              alt="검색 결과 없음"
              width={35}
              height={54}
            />
            <p className="small_tb">해당 카테고리의 상품이 없습니다.</p>
          </li>
          ) : (
          filteredProducts.map((product) => (
            <li key={product.id} className="product_card">
              <Link href={`/prod_detail/${product.id}`}>
                <div className="product_image">
                <Image
                  src={product.product_image[0].src}
                  alt={product.product_image[0].alt}
                  width={357}
                  height={357}
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
                            <Image 
                              src={stat.icon} 
                              alt={stat.label} 
                              width={14} 
                              height={14}
                            />
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
          ))
        )}
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
          {tempSelectedBrands.length}개 상품보기
        </button>
      </div>
    </>
  );
}