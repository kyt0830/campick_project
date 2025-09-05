'use client';

import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from "react";

import styles from "./page.module.css";

/*
export const metadata = {
  title: "Campick - 판매목록",
  description: "Welcome to Campick",
};
*/

export default function Salelist() {
  const [activeTab, setActiveTab] = useState('selling');
  const [popupState, setPopupState] = useState('hidden'); // 'hidden', 'mounting', 'active', 'closing'
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [products, setProducts] = useState([
    {
      id: 1,
      title: '[힐레베르그] 알락 1 텐트 (Allak 1)',
      price: '1,893,000 원',
      location: '종로1가동',
      date: '4시간 전',
      image: '/images/product_img01.jpg',
      views: 12,
      messages: 1,
      likes: 12,
      isSoldout: false
    },
    {
      id: 2,
      title: '[힐레베르그] 알락 2 텐트 (Allak 2)',
      price: '2,100,000 원',
      location: '강남구',
      date: '6시간 전',
      image: '/images/product_img02.jpg',
      views: 25,
      messages: 3,
      likes: 18,
      isSoldout: false
    },
    {
      id: 3,
      title: '[힐레베르그] 나마츠 2 텐트 (Nammatj 2)',
      price: '1,240,0000 원',
      location: '서초구',
      date: '1일 전',
      image: '/images/product_img03.jpg',
      views: 8,
      messages: 0,
      likes: 5,
      isSoldout: false
    }
  ]);

  /* 저장된 판매완료 상품들 불러오기 */
  useEffect(() => {
    const saved = localStorage.getItem('soldoutProducts');
    if (saved) {
      const soldoutIds = JSON.parse(saved);
      setProducts(products.map(product => ({
        ...product,
        isSoldout: soldoutIds.includes(product.id)
      })));
    }
  }, []);

  /* 탭 클릭 */
  function handleTabClick(tabName) {
    setActiveTab(tabName);
  }

  /* 더보기 클릭 */
  function handleMoreClick(product) {
    setSelectedProduct(product);
    
    if (popupState === 'active') {
      // 이미 열려있으면 닫고 다시 열기
      setPopupState('closing');
      setTimeout(() => {
        setPopupState('mounting');
        setTimeout(() => setPopupState('active'), 10);
      }, 300);
    } else {
      setPopupState('mounting');
      setTimeout(() => setPopupState('active'), 10);
    }
  }

  /* 팝업 닫기 */
  function closePopup() {
    setPopupState('closing');
    setTimeout(() => {
      setPopupState('hidden');
      setSelectedProduct(null);
    }, 300);
  }

  /* 판매완료 클릭 */
  function handleSoldout() {
    if (selectedProduct) {
      const updatedProducts = products.map(product => {
        if (product.id === selectedProduct.id) {
          return { ...product, isSoldout: true };
        }
        return product;
      });
      setProducts(updatedProducts);

      /* 판매완료된 상품 ID들을 localStorage에 저장 */
      const soldoutIds = updatedProducts
        .filter(p => p.isSoldout)
        .map(p => p.id);
      localStorage.setItem('soldoutProducts', JSON.stringify(soldoutIds));
      
      setActiveTab('soldout');
      closePopup();
    }
  }

  /* 재판매 클릭 */
  function handleResale() {
    if (selectedProduct) {
      const updatedProducts = products.map(product => {
        if (product.id === selectedProduct.id) {
          return { ...product, isSoldout: false };
        }
        return product;
      });
      setProducts(updatedProducts);
  
      /* 판매완료된 상품 ID를 다시 localStorage에 반영 */
      const soldoutIds = updatedProducts
        .filter(p => p.isSoldout)
        .map(p => p.id);
      localStorage.setItem('soldoutProducts', JSON.stringify(soldoutIds));
  
      setActiveTab('selling');
      closePopup();
    }
  }

  /* 삭제 클릭 */
  function handleDelete() {
    if (selectedProduct && confirm('정말 삭제하시겠습니까?')) {
      const updatedProducts = products.filter(p => p.id !== selectedProduct.id);
      setProducts(updatedProducts);

      const soldoutIds = updatedProducts
        .filter(p => p.isSoldout)
        .map(p => p.id);
      localStorage.setItem('soldoutProducts', JSON.stringify(soldoutIds));

      closePopup();
    }
  }

  const displayProducts = products.filter(product => {
    if (activeTab === 'selling') {
      return !product.isSoldout;
    } else {
      return product.isSoldout; 
    }
  });

  // 디버깅용 콘솔 로그
  console.log('activeTab:', activeTab);
  console.log('products:', products);
  console.log('displayProducts:', displayProducts);
  console.log('displayProducts.length:', displayProducts.length);

  return (
    <div className="salelist_page">
      <div className="user_profile_wrapper">
        <div className="profile_card">
          <div className="profile_img_wrapper">
            <Image src="/images/user_profile_img.jpg" width={72} height={72} alt="사용자 프로필" />
          </div>
          <div className="user_info">
            <h2 id="user_id">User_ID</h2>
            <ul className="stats_wrapper">
              <li className="stat_item">
                <h4 className="stat_title">게시글</h4>
                <p className="stat_number">23</p>
              </li>
              <li className="stat_item">
                <h4 className="stat_title">팔로워</h4>
                <p className="stat_number">500</p>
              </li>
              <li className="stat_item">
                <h4 className="stat_title">팔로잉</h4>
                <p className="stat_number">234</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="point_card">
          <h3 className="point_title">캠픽페이</h3>
          <p className="point_value">5,000,000 원</p>
          <div className="button_group">
            <button className="point_btn">충전</button>
            <button className="point_btn">이체</button>
          </div>
        </div>
      </div>
      <div className={styles.tab_menu}>
        <Link 
          href="#" 
          className={activeTab === 'selling' ? styles.active : ''} 
          onClick={(e) => {
            e.preventDefault();
            handleTabClick('selling');
          }}>
          판매중
        </Link>
        <Link 
          href="#" 
          className={activeTab === 'soldout' ? styles.active : ''} 
          onClick={(e) => {
            e.preventDefault();
            handleTabClick('soldout');
          }}>
        결제완료
        </Link>
      </div>
      <ul className={styles.product_list_wrapper_2col}>
        {displayProducts.length === 0 && activeTab === 'soldout' ? (
          <li className="no_result">
            <Image
              src="/images/store_logo_small.svg"
              alt="검색 결과 없음"
              width={35}
              height={54}
            />
            <p className="small_tb">판매 완료된 상품이 없습니다.</p>
          </li>
        ) : (
          displayProducts.map((product) => (
            <li 
              key={product.id} 
              className={`${styles.product_card_2col} ${product.isSoldout ? styles.disable : ''}`}
            >
              <Link href="#">
                {product.isSoldout && 
                <div className={styles.soldout_badge}>판매 완료</div>}
                <div className={styles.product_image}>
                  <Image 
                    src={product.image} 
                    width={357} 
                    height={357} 
                    alt={product.title} 
                  />
                </div>
                <div className="product_info">
                  <h3 className="product_title small_tr">{product.title}</h3>
                  <div className="product_meta">
                    <span className="product_location">{product.location}</span>
                    <span className="product_date">{product.date}</span>
                  </div>
                  <div className="product_footer">
                    <span className="product_price normal_tb">{product.price}</span>
                    <ul className="product_stats">
                      <li className="view">
                        <p className="icon">
                          <Image src="/images/prod_detail_view.svg" width={14} height={14} alt="조회수" />
                        </p>
                        <span>{product.views}</span>
                      </li>
                      <li className="message">
                        <p className="icon">
                          <Image src="/images/prod_detail_chat.svg" width={12} height={12} alt="메세지" />
                        </p>
                        <span>{product.messages}</span>
                      </li>
                      <li className="like">
                        <p className="icon">
                          <Image src="/images/prod_detail_bookmark.svg" width={14} height={14} alt="즐겨찾기" />
                        </p>
                        <span>{product.likes}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Link>
              
              {/* 더보기 버튼 */}
              <button 
                className={styles.more_btn}
                onClick={() => handleMoreClick(product)}
              >
                ⋯
              </button>
            </li>
          ))
        )}
      </ul>
      
      {/* 팝업 - hidden 상태일 때만 DOM에서 제거 */}
      {(popupState !== 'hidden') && (
        <>
          <div className="overlay active" onClick={closePopup}></div>
          
          <div className={`more_popup ${popupState === 'active' ? 'active' : ''}`}>
            <ul>
              <li>
                <button className="modify_btn small_tb" onClick={closePopup}>
                  수정
                </button>
              </li>
              <li>
                <button className="delete_btn small_tb" onClick={handleDelete}>
                  삭제
                </button>
              </li>
              {selectedProduct && !selectedProduct.isSoldout ? (
                <li>
                  <button className="soldout_btn small_tb" onClick={handleSoldout}>
                    판매완료
                  </button>
                </li>
              ) : selectedProduct && (
                <li>
                  <button className="resale_btn small_tb" onClick={handleResale}>
                    재판매
                  </button>
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}