/*
 * 파일명: page.js
 * 담당자: 김영태
 * 작성일: 2025-09-04
 * 최근 수정일: 2025-09-04
 * 설명: 메인 index.html의 main content next.js 버전
 * 수정이력:
 *  2025-09-04: index.html의 main content-> next.js 문법으로 변경
*/

import { createClient } from '../utils/supabase/client';
import Image from "next/image";
import Link from "next/link"
import styles from "./page.module.css";

export default async function Home() {
  const supabase = await createClient()
  const { data: product, error: product_error } = await supabase.from("Product").select();
  const { data: Member, error: member_error } = await supabase.from("Member").select();
  console.log(product);
  console.log(Member);
  if (product_error) {
    console.log('상품 데이터 호출 실패', Product_error)
  }
  if (member_error) {
    console.log('회원 데이터 호출 실패', Member_error)
  }
  return (
    <>
      {/* common_slide_content */}
      <div className={`common_slider_container ${styles.common_slider_container}`}>
        <div className="common_slider_wrapper">
          <div className="common_slide_track" id="slideTrack">
            <div className="common_slide">
              <div className="slide_content">
                <h3 className="slide_title">필수 겨울템</h3>
                <p className="slide_desc">눈 내려도 따뜻하게 미리 준비하는 동계캠핑</p>
              </div>
            </div>
            <div className="common_slide">
              <div className="slide-content">
                <h3 className="slide-title">슬라이드 1</h3>
                <p className="slide-main-text">첫 번째 콘텐츠</p>
              </div>
            </div>
          </div>
        </div>
        {/* Navigation Arrows */}
        <button className="nav_arrow prev" onClick="prevSlide()"><span className="ir_pm">이전</span></button>
        <button className="nav_arrow next" onClick="nextSlide()"><span className="ir_pm">다음</span></button>
      </div>
      {/* //common_slide_content */}

      {/* barnd_slide_content  */}
      <div className={styles.brand_slide_content}>
        <h3 className={`medium_tb ${styles.brand_title}`}>추천 브랜드</h3>
        <div className={styles.brand_slider_container}>

          <ul className={styles.brand_slide_track}>
            <li className={styles.brand_slide}>
              <Link href="">
                <Image
                  src="/images/main_brand1.png"
                  width={71}
                  height={47}
                  alt=""
                />
              </Link>
            </li>
            <li className={styles.brand_slide}>
              <Link href="">
                <Image
                  src="/images/main_brand2.png"
                  width={83}
                  height={18}
                  alt=""
                />
              </Link>
            </li>
            <li className={styles.brand_slide}>
              <Link href="">
                <Image
                  src="/images/main_brand3.png"
                  width={79}
                  height={21}
                  alt=""
                />
              </Link>
            </li>
            <li className={styles.brand_slide}>
              <Link href="">
                <Image
                  src="/images/main_brand4.png"
                  width={79}
                  height={21}
                  alt=""
                />
              </Link>
            </li>
            <li className={styles.brand_slide}>
              <Link href="">
                <Image
                  src="/images/main_brand5.png"
                  width={74}
                  height={21}
                  alt=""
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* //barnd_slide_content  */}

      {/* new_product_content  */}
      <div className={styles.new_product_content}>
        <h3 className={`medium_tb ${styles.new_product_title}`} >오늘 등록된 상품</h3>
        <ul className={`product_list_wrapper ${styles.product_list_wrapper}`}>
          {/* 상품 카드 1  */}
          {product.slice(0, 6).map(item =>
            <li className="product_card" key={item.prod_id}>
              <Link href={`/prod_detail/${item.prod_id}`}>
                <div className="product_image">
                  <Image
                    src={item.prod_images}
                    width={250}
                    height={250}
                    alt=""
                  />
                </div>
                <div className="product_info">
                  <h3 className="product_title">{item.prod_title}</h3>
                  <div className="product_meta">
                    <span className="product_location">종로1가동</span>
                    <span className="product_date">4시간 전</span>
                  </div>
                  <div className="product_footer">
                    <span className="product_price normal_tb">{item.prod_price.toLocaleString()} 원</span>
                    <ul className="product_stats">
                      {item.view > 0 && (<li className="view">
                        <p className="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                            fill="00000">
                            <path
                              d="M480.09-328.92q62.99 0 106.99-44.09 44-44.09 44-107.08 0-62.99-44.09-106.99-44.09-44-107.08-44-62.99 0-106.99 44.09-44 44.09-44 107.08 0 62.99 44.09 106.99 44.09 44 107.08 44ZM480-384q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm.05 172q-134.57 0-245.23-73.12Q124.16-358.23 69.54-480q54.62-121.77 165.22-194.88Q345.37-748 479.95-748q134.57 0 245.23 73.12Q835.84-601.77 890.46-480q-54.62 121.77-165.22 194.88Q614.63-212 480.05-212ZM480-480Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z" />
                          </svg>
                          <span className="ir_pm">조회수</span>
                        </p>
                        <span>{item.view}</span>
                      </li>)}
                      <li className="message">
                        <p className="icon">
                          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="path-1-outside-1_686_255" maskUnits="userSpaceOnUse" x="0" y="0.5" width="14"
                              height="16" fill="black">
                              <rect fill="white" y="0.5" width="14" height="16" />
                              <path
                                d="M10.5 5.17578V4H3.5V5.17578H10.5ZM8.17578 8.67578V7.5H3.5V8.67578H8.17578ZM3.5 5.75V6.92578H10.5V5.75H3.5ZM11.6758 1.67578C11.9857 1.67578 12.25 1.79427 12.4688 2.03125C12.7057 2.25 12.8242 2.51432 12.8242 2.82422V9.82422C12.8242 10.1341 12.7057 10.4076 12.4688 10.6445C12.25 10.8815 11.9857 11 11.6758 11H3.5L1.17578 13.3242V2.82422C1.17578 2.51432 1.28516 2.25 1.50391 2.03125C1.74089 1.79427 2.01432 1.67578 2.32422 1.67578H11.6758Z" />
                            </mask>
                            <path
                              d="M10.5 5.17578V6.17578H11.5V5.17578H10.5ZM10.5 4H11.5V3H10.5V4ZM3.5 4V3H2.5V4H3.5ZM3.5 5.17578H2.5V6.17578H3.5V5.17578ZM8.17578 8.67578V9.67578H9.17578V8.67578H8.17578ZM8.17578 7.5H9.17578V6.5H8.17578V7.5ZM3.5 7.5V6.5H2.5V7.5H3.5ZM3.5 8.67578H2.5V9.67578H3.5V8.67578ZM3.5 5.75V4.75H2.5V5.75H3.5ZM3.5 6.92578H2.5V7.92578H3.5V6.92578ZM10.5 6.92578V7.92578H11.5V6.92578H10.5ZM10.5 5.75H11.5V4.75H10.5V5.75ZM12.4688 2.03125L11.7339 2.70953L11.7611 2.73892L11.7905 2.76605L12.4688 2.03125ZM12.4688 10.6445L11.7616 9.93742L11.7475 9.95156L11.7339 9.96625L12.4688 10.6445ZM3.5 11V10H3.08579L2.79289 10.2929L3.5 11ZM1.17578 13.3242H0.175781V15.7384L1.88289 14.0313L1.17578 13.3242ZM1.50391 2.03125L2.21101 2.73836L1.50391 2.03125ZM10.5 5.17578H11.5V4H10.5H9.5V5.17578H10.5ZM10.5 4V3H3.5V4V5H10.5V4ZM3.5 4H2.5V5.17578H3.5H4.5V4H3.5ZM3.5 5.17578V6.17578H10.5V5.17578V4.17578H3.5V5.17578ZM8.17578 8.67578H9.17578V7.5H8.17578H7.17578V8.67578H8.17578ZM8.17578 7.5V6.5H3.5V7.5V8.5H8.17578V7.5ZM3.5 7.5H2.5V8.67578H3.5H4.5V7.5H3.5ZM3.5 8.67578V9.67578H8.17578V8.67578V7.67578H3.5V8.67578ZM3.5 5.75H2.5V6.92578H3.5H4.5V5.75H3.5ZM3.5 6.92578V7.92578H10.5V6.92578V5.92578H3.5V6.92578ZM10.5 6.92578H11.5V5.75H10.5H9.5V6.92578H10.5ZM10.5 5.75V4.75H3.5V5.75V6.75H10.5V5.75ZM11.6758 1.67578V2.67578C11.6892 2.67578 11.6959 2.67703 11.6976 2.67736C11.699 2.67766 11.6985 2.67764 11.6974 2.67716C11.6964 2.67671 11.6983 2.67736 11.7035 2.68117C11.7088 2.68513 11.7193 2.69361 11.7339 2.70953L12.4688 2.03125L13.2036 1.35297C12.8042 0.920339 12.2774 0.675781 11.6758 0.675781V1.67578ZM12.4688 2.03125L11.7905 2.76605C11.8064 2.78075 11.8149 2.79116 11.8188 2.79654C11.8226 2.80171 11.8233 2.80361 11.8228 2.80261C11.8224 2.80154 11.8223 2.80101 11.8226 2.80243C11.823 2.80405 11.8242 2.81078 11.8242 2.82422H12.8242H13.8242C13.8242 2.22264 13.5797 1.6958 13.147 1.29645L12.4688 2.03125ZM12.8242 2.82422H11.8242V9.82422H12.8242H13.8242V2.82422H12.8242ZM12.8242 9.82422H11.8242C11.8242 9.84796 11.8205 9.85791 11.8178 9.86411C11.8144 9.87183 11.8022 9.8969 11.7616 9.93742L12.4688 10.6445L13.1759 11.3516C13.5835 10.944 13.8242 10.4223 13.8242 9.82422H12.8242ZM12.4688 10.6445L11.7339 9.96625C11.7193 9.98217 11.7088 9.99065 11.7035 9.99461C11.6983 9.99842 11.6964 9.99907 11.6974 9.99862C11.6985 9.99814 11.699 9.99812 11.6976 9.99842C11.6959 9.99875 11.6892 10 11.6758 10V11V12C12.2774 12 12.8042 11.7554 13.2036 11.3228L12.4688 10.6445ZM11.6758 11V10H3.5V11V12H11.6758V11ZM3.5 11L2.79289 10.2929L0.468674 12.6171L1.17578 13.3242L1.88289 14.0313L4.20711 11.7071L3.5 11ZM1.17578 13.3242H2.17578V2.82422H1.17578H0.175781V13.3242H1.17578ZM1.17578 2.82422H2.17578C2.17578 2.78945 2.18136 2.77705 2.18183 2.77591C2.18229 2.7748 2.18695 2.76242 2.21101 2.73836L1.50391 2.03125L0.796799 1.32414C0.390147 1.7308 0.175781 2.24962 0.175781 2.82422H1.17578ZM1.50391 2.03125L2.21101 2.73836C2.25154 2.69783 2.2766 2.68555 2.28433 2.6822C2.29052 2.67952 2.30047 2.67578 2.32422 2.67578V1.67578V0.675781C1.72617 0.675781 1.20445 0.916491 0.796799 1.32414L1.50391 2.03125ZM2.32422 1.67578V2.67578H11.6758V1.67578V0.675781H2.32422V1.67578Z"
                              fill="black" mask="url(#path-1-outside-1_686_255)" />
                          </svg>
                          <span className="ir_pm">메세지</span>
                        </p>
                        <span>1</span>
                      </li>
                      {item.like > 0 && (<li className="like">
                        <p className="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                            fill="00000">
                            <path
                              d="M260-174v-557.69q0-27.01 18.65-45.66Q297.3-796 324.31-796h311.38q27.01 0 45.66 18.65Q700-758.7 700-731.69V-174l-220-87.54L260-174Zm52-77 168-67 168 67v-480.69q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H324.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46V-251Zm0-493h336-336Z" />
                          </svg>
                          <span className="ir_pm">즐겨찾기</span>
                        </p>
                        <span>{item.like}</span>
                      </li>)}
                    </ul>
                  </div>
                </div>
              </Link>
            </li>
          )}
        </ul >
        <button className="more_btn">더 보기</button>
      </div >
      {/* //new_product_content */}

      {/* review_content */}
      <div className={styles.review_content}>
        <div className={styles.review_header}>
          <h3 className={`medium_tb ${styles.review_title}`} >칭찬해요!</h3>
          <span className={`small_tr ${styles.review_desc}`} >검증된 따끈따끈한 구매후기에요!</span>
        </div>
        <div className={styles.other_review}>
          <div className={styles.other_review_img}>
            <Image
              src="/images/product_img01.jpg"
              width={50}
              height={50}
              alt=""
            />
          </div>
          <div className={styles.other_review_header}>
            <div>
              <h4 className={styles.other_review_title}>텐트가 너무 좋아랑</h4>
              <span>⭐ 4.5</span>
            </div>
            <p className={styles.other_review_comment}>좋은 가격에 좋은 상품 샀어요! 😎 이번주 주말에 캠핑할 때 첫 사용해보려고 합니다~~!</p >
          </div >
        </div >
        <div className={styles.review_card}>
          <div className={styles.review_card_thumbnail}>
            <Link href="">
              <Image
                src="/images/product_img01.jpg"
                width={180}
                height={180}
                alt=""
              />
            </Link>
          </div >
          <div className={styles.review_card_body}>
            <h3 className={`small_tb ${styles.review_card_title}`} >
              [헬리녹스] 테이블
            </h3 >
            <div className={styles.review_card_info}>
              <div className={styles.review_card_header}>
                <h4 className={`small_tr ${styles.review_card_userid}`}> 식집사에요</h4 >
                <div className={styles.review_card_meta}>
                  <span className={styles.review_card_location}> 종로1가동</span >
                  <span className={styles.review_card_date}> 4시간 전</span >
                </div >
              </div >

              <p className={styles.review_card_commnet}>
                조립, 분해 팁도 잘 알려주시고, 너무 친절하셨어요! < br />
                앞으로 좋은 일만 가득하시길 바라요~!
              </p >
            </div >
          </div >
        </div >
      </div >
      {/* //review_content */}

      {/* keyword_product_content  */}
      <div className={styles.keyword_product_content}>
        <h3 className={`medium_tb ${styles.keyword_product_title}`}>식집사에요 님이 주목하는 키워드 상품</h3>
        <ul className={`product_list_wrapper ${styles.product_list_wrapper}`}>
          {product.slice(0, 3).map(item =>
            <li className="product_card" key={item.prod_id}>
              <Link href="#">
                <div className="product_image">
                  <Image
                    src={item.prod_images}
                    width={250}
                    height={250}
                    alt=""
                  />
                </div>
                <div className="product_info">
                  <h3 className="product_title">{item.prod_title}</h3>
                  <div className="product_meta">
                    <span className="product_location">종로1가동</span>
                    <span className="product_date">4시간 전</span>
                  </div>
                  <div className="product_footer">
                    <span className="product_price normal_tb">{item.prod_price.toLocaleString()} 원</span>
                    <ul className="product_stats">
                      {item.view > 0 && (<li className="view">
                        <p className="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                            fill="00000">
                            <path
                              d="M480.09-328.92q62.99 0 106.99-44.09 44-44.09 44-107.08 0-62.99-44.09-106.99-44.09-44-107.08-44-62.99 0-106.99 44.09-44 44.09-44 107.08 0 62.99 44.09 106.99 44.09 44 107.08 44ZM480-384q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm.05 172q-134.57 0-245.23-73.12Q124.16-358.23 69.54-480q54.62-121.77 165.22-194.88Q345.37-748 479.95-748q134.57 0 245.23 73.12Q835.84-601.77 890.46-480q-54.62 121.77-165.22 194.88Q614.63-212 480.05-212ZM480-480Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z" />
                          </svg>
                          <span className="ir_pm">조회수</span>
                        </p>
                        <span>{item.view}</span>
                      </li>)}
                      <li className="message">
                        <p className="icon">
                          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="path-1-outside-1_686_255" maskUnits="userSpaceOnUse" x="0" y="0.5" width="14"
                              height="16" fill="black">
                              <rect fill="white" y="0.5" width="14" height="16" />
                              <path
                                d="M10.5 5.17578V4H3.5V5.17578H10.5ZM8.17578 8.67578V7.5H3.5V8.67578H8.17578ZM3.5 5.75V6.92578H10.5V5.75H3.5ZM11.6758 1.67578C11.9857 1.67578 12.25 1.79427 12.4688 2.03125C12.7057 2.25 12.8242 2.51432 12.8242 2.82422V9.82422C12.8242 10.1341 12.7057 10.4076 12.4688 10.6445C12.25 10.8815 11.9857 11 11.6758 11H3.5L1.17578 13.3242V2.82422C1.17578 2.51432 1.28516 2.25 1.50391 2.03125C1.74089 1.79427 2.01432 1.67578 2.32422 1.67578H11.6758Z" />
                            </mask>
                            <path
                              d="M10.5 5.17578V6.17578H11.5V5.17578H10.5ZM10.5 4H11.5V3H10.5V4ZM3.5 4V3H2.5V4H3.5ZM3.5 5.17578H2.5V6.17578H3.5V5.17578ZM8.17578 8.67578V9.67578H9.17578V8.67578H8.17578ZM8.17578 7.5H9.17578V6.5H8.17578V7.5ZM3.5 7.5V6.5H2.5V7.5H3.5ZM3.5 8.67578H2.5V9.67578H3.5V8.67578ZM3.5 5.75V4.75H2.5V5.75H3.5ZM3.5 6.92578H2.5V7.92578H3.5V6.92578ZM10.5 6.92578V7.92578H11.5V6.92578H10.5ZM10.5 5.75H11.5V4.75H10.5V5.75ZM12.4688 2.03125L11.7339 2.70953L11.7611 2.73892L11.7905 2.76605L12.4688 2.03125ZM12.4688 10.6445L11.7616 9.93742L11.7475 9.95156L11.7339 9.96625L12.4688 10.6445ZM3.5 11V10H3.08579L2.79289 10.2929L3.5 11ZM1.17578 13.3242H0.175781V15.7384L1.88289 14.0313L1.17578 13.3242ZM1.50391 2.03125L2.21101 2.73836L1.50391 2.03125ZM10.5 5.17578H11.5V4H10.5H9.5V5.17578H10.5ZM10.5 4V3H3.5V4V5H10.5V4ZM3.5 4H2.5V5.17578H3.5H4.5V4H3.5ZM3.5 5.17578V6.17578H10.5V5.17578V4.17578H3.5V5.17578ZM8.17578 8.67578H9.17578V7.5H8.17578H7.17578V8.67578H8.17578ZM8.17578 7.5V6.5H3.5V7.5V8.5H8.17578V7.5ZM3.5 7.5H2.5V8.67578H3.5H4.5V7.5H3.5ZM3.5 8.67578V9.67578H8.17578V8.67578V7.67578H3.5V8.67578ZM3.5 5.75H2.5V6.92578H3.5H4.5V5.75H3.5ZM3.5 6.92578V7.92578H10.5V6.92578V5.92578H3.5V6.92578ZM10.5 6.92578H11.5V5.75H10.5H9.5V6.92578H10.5ZM10.5 5.75V4.75H3.5V5.75V6.75H10.5V5.75ZM11.6758 1.67578V2.67578C11.6892 2.67578 11.6959 2.67703 11.6976 2.67736C11.699 2.67766 11.6985 2.67764 11.6974 2.67716C11.6964 2.67671 11.6983 2.67736 11.7035 2.68117C11.7088 2.68513 11.7193 2.69361 11.7339 2.70953L12.4688 2.03125L13.2036 1.35297C12.8042 0.920339 12.2774 0.675781 11.6758 0.675781V1.67578ZM12.4688 2.03125L11.7905 2.76605C11.8064 2.78075 11.8149 2.79116 11.8188 2.79654C11.8226 2.80171 11.8233 2.80361 11.8228 2.80261C11.8224 2.80154 11.8223 2.80101 11.8226 2.80243C11.823 2.80405 11.8242 2.81078 11.8242 2.82422H12.8242H13.8242C13.8242 2.22264 13.5797 1.6958 13.147 1.29645L12.4688 2.03125ZM12.8242 2.82422H11.8242V9.82422H12.8242H13.8242V2.82422H12.8242ZM12.8242 9.82422H11.8242C11.8242 9.84796 11.8205 9.85791 11.8178 9.86411C11.8144 9.87183 11.8022 9.8969 11.7616 9.93742L12.4688 10.6445L13.1759 11.3516C13.5835 10.944 13.8242 10.4223 13.8242 9.82422H12.8242ZM12.4688 10.6445L11.7339 9.96625C11.7193 9.98217 11.7088 9.99065 11.7035 9.99461C11.6983 9.99842 11.6964 9.99907 11.6974 9.99862C11.6985 9.99814 11.699 9.99812 11.6976 9.99842C11.6959 9.99875 11.6892 10 11.6758 10V11V12C12.2774 12 12.8042 11.7554 13.2036 11.3228L12.4688 10.6445ZM11.6758 11V10H3.5V11V12H11.6758V11ZM3.5 11L2.79289 10.2929L0.468674 12.6171L1.17578 13.3242L1.88289 14.0313L4.20711 11.7071L3.5 11ZM1.17578 13.3242H2.17578V2.82422H1.17578H0.175781V13.3242H1.17578ZM1.17578 2.82422H2.17578C2.17578 2.78945 2.18136 2.77705 2.18183 2.77591C2.18229 2.7748 2.18695 2.76242 2.21101 2.73836L1.50391 2.03125L0.796799 1.32414C0.390147 1.7308 0.175781 2.24962 0.175781 2.82422H1.17578ZM1.50391 2.03125L2.21101 2.73836C2.25154 2.69783 2.2766 2.68555 2.28433 2.6822C2.29052 2.67952 2.30047 2.67578 2.32422 2.67578V1.67578V0.675781C1.72617 0.675781 1.20445 0.916491 0.796799 1.32414L1.50391 2.03125ZM2.32422 1.67578V2.67578H11.6758V1.67578V0.675781H2.32422V1.67578Z"
                              fill="black" mask="url(#path-1-outside-1_686_255)" />
                          </svg>
                          <span className="ir_pm">메세지</span>
                        </p>
                        <span>1</span>
                      </li>
                      {item.like > 0 && (<li className="like">
                        <p className="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                            fill="00000">
                            <path
                              d="M260-174v-557.69q0-27.01 18.65-45.66Q297.3-796 324.31-796h311.38q27.01 0 45.66 18.65Q700-758.7 700-731.69V-174l-220-87.54L260-174Zm52-77 168-67 168 67v-480.69q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H324.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46V-251Zm0-493h336-336Z" />
                          </svg>
                          <span className="ir_pm">즐겨찾기</span>
                        </p>
                        <span>{item.like}</span>
                      </li>)}
                    </ul>
                  </div>
                </div>
              </Link>
            </li>
          )}
        </ul>
        <button className="more_btn">더 보기</button>
      </div>
      {/* //keyword_product_content */}

      {/* popular_product_content */}
      <div className={styles.popular_product_content}>
        <h3 className={`medium_tb ${styles.popular_product_title}`}>가장 인기있는 상품</h3>
        <ul className={`product_list_wrapper ${styles.product_list_wrapper}`}>
          {product.slice(0, 3).map(item =>
            <li className="product_card" key={item.prod_id}>
              <Link href="#">
                <div className="product_image">
                  <Image
                    src={item.prod_images}
                    width={250}
                    height={250}
                    alt=""
                  />
                </div>
                <div className="product_info">
                  <h3 className="product_title">{item.prod_title}</h3>
                  <div className="product_meta">
                    <span className="product_location">종로1가동</span>
                    <span className="product_date">4시간 전</span>
                  </div>
                  <div className="product_footer">
                    <span className="product_price normal_tb">{item.prod_price.toLocaleString()} 원</span>
                    <ul className="product_stats">
                      {item.view > 0 && (<li className="view">
                        <p className="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                            fill="00000">
                            <path
                              d="M480.09-328.92q62.99 0 106.99-44.09 44-44.09 44-107.08 0-62.99-44.09-106.99-44.09-44-107.08-44-62.99 0-106.99 44.09-44 44.09-44 107.08 0 62.99 44.09 106.99 44.09 44 107.08 44ZM480-384q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm.05 172q-134.57 0-245.23-73.12Q124.16-358.23 69.54-480q54.62-121.77 165.22-194.88Q345.37-748 479.95-748q134.57 0 245.23 73.12Q835.84-601.77 890.46-480q-54.62 121.77-165.22 194.88Q614.63-212 480.05-212ZM480-480Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z" />
                          </svg>
                          <span className="ir_pm">조회수</span>
                        </p>
                        <span>{item.view}</span>
                      </li>)}
                      <li className="message">
                        <p className="icon">
                          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="path-1-outside-1_686_255" maskUnits="userSpaceOnUse" x="0" y="0.5" width="14"
                              height="16" fill="black">
                              <rect fill="white" y="0.5" width="14" height="16" />
                              <path
                                d="M10.5 5.17578V4H3.5V5.17578H10.5ZM8.17578 8.67578V7.5H3.5V8.67578H8.17578ZM3.5 5.75V6.92578H10.5V5.75H3.5ZM11.6758 1.67578C11.9857 1.67578 12.25 1.79427 12.4688 2.03125C12.7057 2.25 12.8242 2.51432 12.8242 2.82422V9.82422C12.8242 10.1341 12.7057 10.4076 12.4688 10.6445C12.25 10.8815 11.9857 11 11.6758 11H3.5L1.17578 13.3242V2.82422C1.17578 2.51432 1.28516 2.25 1.50391 2.03125C1.74089 1.79427 2.01432 1.67578 2.32422 1.67578H11.6758Z" />
                            </mask>
                            <path
                              d="M10.5 5.17578V6.17578H11.5V5.17578H10.5ZM10.5 4H11.5V3H10.5V4ZM3.5 4V3H2.5V4H3.5ZM3.5 5.17578H2.5V6.17578H3.5V5.17578ZM8.17578 8.67578V9.67578H9.17578V8.67578H8.17578ZM8.17578 7.5H9.17578V6.5H8.17578V7.5ZM3.5 7.5V6.5H2.5V7.5H3.5ZM3.5 8.67578H2.5V9.67578H3.5V8.67578ZM3.5 5.75V4.75H2.5V5.75H3.5ZM3.5 6.92578H2.5V7.92578H3.5V6.92578ZM10.5 6.92578V7.92578H11.5V6.92578H10.5ZM10.5 5.75H11.5V4.75H10.5V5.75ZM12.4688 2.03125L11.7339 2.70953L11.7611 2.73892L11.7905 2.76605L12.4688 2.03125ZM12.4688 10.6445L11.7616 9.93742L11.7475 9.95156L11.7339 9.96625L12.4688 10.6445ZM3.5 11V10H3.08579L2.79289 10.2929L3.5 11ZM1.17578 13.3242H0.175781V15.7384L1.88289 14.0313L1.17578 13.3242ZM1.50391 2.03125L2.21101 2.73836L1.50391 2.03125ZM10.5 5.17578H11.5V4H10.5H9.5V5.17578H10.5ZM10.5 4V3H3.5V4V5H10.5V4ZM3.5 4H2.5V5.17578H3.5H4.5V4H3.5ZM3.5 5.17578V6.17578H10.5V5.17578V4.17578H3.5V5.17578ZM8.17578 8.67578H9.17578V7.5H8.17578H7.17578V8.67578H8.17578ZM8.17578 7.5V6.5H3.5V7.5V8.5H8.17578V7.5ZM3.5 7.5H2.5V8.67578H3.5H4.5V7.5H3.5ZM3.5 8.67578V9.67578H8.17578V8.67578V7.67578H3.5V8.67578ZM3.5 5.75H2.5V6.92578H3.5H4.5V5.75H3.5ZM3.5 6.92578V7.92578H10.5V6.92578V5.92578H3.5V6.92578ZM10.5 6.92578H11.5V5.75H10.5H9.5V6.92578H10.5ZM10.5 5.75V4.75H3.5V5.75V6.75H10.5V5.75ZM11.6758 1.67578V2.67578C11.6892 2.67578 11.6959 2.67703 11.6976 2.67736C11.699 2.67766 11.6985 2.67764 11.6974 2.67716C11.6964 2.67671 11.6983 2.67736 11.7035 2.68117C11.7088 2.68513 11.7193 2.69361 11.7339 2.70953L12.4688 2.03125L13.2036 1.35297C12.8042 0.920339 12.2774 0.675781 11.6758 0.675781V1.67578ZM12.4688 2.03125L11.7905 2.76605C11.8064 2.78075 11.8149 2.79116 11.8188 2.79654C11.8226 2.80171 11.8233 2.80361 11.8228 2.80261C11.8224 2.80154 11.8223 2.80101 11.8226 2.80243C11.823 2.80405 11.8242 2.81078 11.8242 2.82422H12.8242H13.8242C13.8242 2.22264 13.5797 1.6958 13.147 1.29645L12.4688 2.03125ZM12.8242 2.82422H11.8242V9.82422H12.8242H13.8242V2.82422H12.8242ZM12.8242 9.82422H11.8242C11.8242 9.84796 11.8205 9.85791 11.8178 9.86411C11.8144 9.87183 11.8022 9.8969 11.7616 9.93742L12.4688 10.6445L13.1759 11.3516C13.5835 10.944 13.8242 10.4223 13.8242 9.82422H12.8242ZM12.4688 10.6445L11.7339 9.96625C11.7193 9.98217 11.7088 9.99065 11.7035 9.99461C11.6983 9.99842 11.6964 9.99907 11.6974 9.99862C11.6985 9.99814 11.699 9.99812 11.6976 9.99842C11.6959 9.99875 11.6892 10 11.6758 10V11V12C12.2774 12 12.8042 11.7554 13.2036 11.3228L12.4688 10.6445ZM11.6758 11V10H3.5V11V12H11.6758V11ZM3.5 11L2.79289 10.2929L0.468674 12.6171L1.17578 13.3242L1.88289 14.0313L4.20711 11.7071L3.5 11ZM1.17578 13.3242H2.17578V2.82422H1.17578H0.175781V13.3242H1.17578ZM1.17578 2.82422H2.17578C2.17578 2.78945 2.18136 2.77705 2.18183 2.77591C2.18229 2.7748 2.18695 2.76242 2.21101 2.73836L1.50391 2.03125L0.796799 1.32414C0.390147 1.7308 0.175781 2.24962 0.175781 2.82422H1.17578ZM1.50391 2.03125L2.21101 2.73836C2.25154 2.69783 2.2766 2.68555 2.28433 2.6822C2.29052 2.67952 2.30047 2.67578 2.32422 2.67578V1.67578V0.675781C1.72617 0.675781 1.20445 0.916491 0.796799 1.32414L1.50391 2.03125ZM2.32422 1.67578V2.67578H11.6758V1.67578V0.675781H2.32422V1.67578Z"
                              fill="black" mask="url(#path-1-outside-1_686_255)" />
                          </svg>
                          <span className="ir_pm">메세지</span>
                        </p>
                        <span>1</span>
                      </li>
                      {item.like > 0 && (<li className="like">
                        <p className="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                            fill="00000">
                            <path
                              d="M260-174v-557.69q0-27.01 18.65-45.66Q297.3-796 324.31-796h311.38q27.01 0 45.66 18.65Q700-758.7 700-731.69V-174l-220-87.54L260-174Zm52-77 168-67 168 67v-480.69q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H324.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46V-251Zm0-493h336-336Z" />
                          </svg>
                          <span className="ir_pm">즐겨찾기</span>
                        </p>
                        <span>{item.like}</span>
                      </li>)}
                    </ul>
                  </div>
                </div>
              </Link>
            </li>
          )}
        </ul>
        <button className="more_btn">더 보기</button>
      </div>
      {/* //popular_product_content */}

      {/* community_content  */}
      <div className={styles.community_content}>
        <h3 className={`medium_tb ${styles.community_title}`}>캠픽 커뮤니티</h3>
        <div className={styles.community_wrapper}>
          <div className={styles.community_thumbnail}>
            <Link href="">
              <Image
                src="/images/product_img01.jpg"
                width={312}
                height={240}
                alt=""
              />
            </Link>
          </div>
          <div className={styles.community_body}>
            <h4 className={styles.community_userid}>식집사에요</h4>
            <div className={styles.community_info}>
              <div className={styles.community_meta}>
                <span className={styles.community_location}>종로1가동</span>
                <span className={styles.community_date}>4시간 전</span>
              </div>
              <ul className={styles.community_stats}>
                <li className={styles.view}>
                  <p className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                      fill="00000">
                      <path
                        d="M480.09-328.92q62.99 0 106.99-44.09 44-44.09 44-107.08 0-62.99-44.09-106.99-44.09-44-107.08-44-62.99 0-106.99 44.09-44 44.09-44 107.08 0 62.99 44.09 106.99 44.09 44 107.08 44ZM480-384q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm.05 172q-134.57 0-245.23-73.12Q124.16-358.23 69.54-480q54.62-121.77 165.22-194.88Q345.37-748 479.95-748q134.57 0 245.23 73.12Q835.84-601.77 890.46-480q-54.62 121.77-165.22 194.88Q614.63-212 480.05-212ZM480-480Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z" />
                    </svg>
                    <span className="ir_pm">조회수</span>
                  </p>
                  <span className="xsmall_tr">12</span>
                </li>
                <li className={styles.message}>
                  <p className={styles.icon}>
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="path-1-outside-1_686_255" maskUnits="userSpaceOnUse" x="0" y="0.5" width="14"
                        height="16" fill="black">
                        <rect fill="white" y="0.5" width="14" height="16" />
                        <path
                          d="M10.5 5.17578V4H3.5V5.17578H10.5ZM8.17578 8.67578V7.5H3.5V8.67578H8.17578ZM3.5 5.75V6.92578H10.5V5.75H3.5ZM11.6758 1.67578C11.9857 1.67578 12.25 1.79427 12.4688 2.03125C12.7057 2.25 12.8242 2.51432 12.8242 2.82422V9.82422C12.8242 10.1341 12.7057 10.4076 12.4688 10.6445C12.25 10.8815 11.9857 11 11.6758 11H3.5L1.17578 13.3242V2.82422C1.17578 2.51432 1.28516 2.25 1.50391 2.03125C1.74089 1.79427 2.01432 1.67578 2.32422 1.67578H11.6758Z" />
                      </mask>
                      <path
                        d="M10.5 5.17578V6.17578H11.5V5.17578H10.5ZM10.5 4H11.5V3H10.5V4ZM3.5 4V3H2.5V4H3.5ZM3.5 5.17578H2.5V6.17578H3.5V5.17578ZM8.17578 8.67578V9.67578H9.17578V8.67578H8.17578ZM8.17578 7.5H9.17578V6.5H8.17578V7.5ZM3.5 7.5V6.5H2.5V7.5H3.5ZM3.5 8.67578H2.5V9.67578H3.5V8.67578ZM3.5 5.75V4.75H2.5V5.75H3.5ZM3.5 6.92578H2.5V7.92578H3.5V6.92578ZM10.5 6.92578V7.92578H11.5V6.92578H10.5ZM10.5 5.75H11.5V4.75H10.5V5.75ZM12.4688 2.03125L11.7339 2.70953L11.7611 2.73892L11.7905 2.76605L12.4688 2.03125ZM12.4688 10.6445L11.7616 9.93742L11.7475 9.95156L11.7339 9.96625L12.4688 10.6445ZM3.5 11V10H3.08579L2.79289 10.2929L3.5 11ZM1.17578 13.3242H0.175781V15.7384L1.88289 14.0313L1.17578 13.3242ZM1.50391 2.03125L2.21101 2.73836L1.50391 2.03125ZM10.5 5.17578H11.5V4H10.5H9.5V5.17578H10.5ZM10.5 4V3H3.5V4V5H10.5V4ZM3.5 4H2.5V5.17578H3.5H4.5V4H3.5ZM3.5 5.17578V6.17578H10.5V5.17578V4.17578H3.5V5.17578ZM8.17578 8.67578H9.17578V7.5H8.17578H7.17578V8.67578H8.17578ZM8.17578 7.5V6.5H3.5V7.5V8.5H8.17578V7.5ZM3.5 7.5H2.5V8.67578H3.5H4.5V7.5H3.5ZM3.5 8.67578V9.67578H8.17578V8.67578V7.67578H3.5V8.67578ZM3.5 5.75H2.5V6.92578H3.5H4.5V5.75H3.5ZM3.5 6.92578V7.92578H10.5V6.92578V5.92578H3.5V6.92578ZM10.5 6.92578H11.5V5.75H10.5H9.5V6.92578H10.5ZM10.5 5.75V4.75H3.5V5.75V6.75H10.5V5.75ZM11.6758 1.67578V2.67578C11.6892 2.67578 11.6959 2.67703 11.6976 2.67736C11.699 2.67766 11.6985 2.67764 11.6974 2.67716C11.6964 2.67671 11.6983 2.67736 11.7035 2.68117C11.7088 2.68513 11.7193 2.69361 11.7339 2.70953L12.4688 2.03125L13.2036 1.35297C12.8042 0.920339 12.2774 0.675781 11.6758 0.675781V1.67578ZM12.4688 2.03125L11.7905 2.76605C11.8064 2.78075 11.8149 2.79116 11.8188 2.79654C11.8226 2.80171 11.8233 2.80361 11.8228 2.80261C11.8224 2.80154 11.8223 2.80101 11.8226 2.80243C11.823 2.80405 11.8242 2.81078 11.8242 2.82422H12.8242H13.8242C13.8242 2.22264 13.5797 1.6958 13.147 1.29645L12.4688 2.03125ZM12.8242 2.82422H11.8242V9.82422H12.8242H13.8242V2.82422H12.8242ZM12.8242 9.82422H11.8242C11.8242 9.84796 11.8205 9.85791 11.8178 9.86411C11.8144 9.87183 11.8022 9.8969 11.7616 9.93742L12.4688 10.6445L13.1759 11.3516C13.5835 10.944 13.8242 10.4223 13.8242 9.82422H12.8242ZM12.4688 10.6445L11.7339 9.96625C11.7193 9.98217 11.7088 9.99065 11.7035 9.99461C11.6983 9.99842 11.6964 9.99907 11.6974 9.99862C11.6985 9.99814 11.699 9.99812 11.6976 9.99842C11.6959 9.99875 11.6892 10 11.6758 10V11V12C12.2774 12 12.8042 11.7554 13.2036 11.3228L12.4688 10.6445ZM11.6758 11V10H3.5V11V12H11.6758V11ZM3.5 11L2.79289 10.2929L0.468674 12.6171L1.17578 13.3242L1.88289 14.0313L4.20711 11.7071L3.5 11ZM1.17578 13.3242H2.17578V2.82422H1.17578H0.175781V13.3242H1.17578ZM1.17578 2.82422H2.17578C2.17578 2.78945 2.18136 2.77705 2.18183 2.77591C2.18229 2.7748 2.18695 2.76242 2.21101 2.73836L1.50391 2.03125L0.796799 1.32414C0.390147 1.7308 0.175781 2.24962 0.175781 2.82422H1.17578ZM1.50391 2.03125L2.21101 2.73836C2.25154 2.69783 2.2766 2.68555 2.28433 2.6822C2.29052 2.67952 2.30047 2.67578 2.32422 2.67578V1.67578V0.675781C1.72617 0.675781 1.20445 0.916491 0.796799 1.32414L1.50391 2.03125ZM2.32422 1.67578V2.67578H11.6758V1.67578V0.675781H2.32422V1.67578Z"
                        fill="black" mask="url(#path-1-outside-1_686_255)" />
                    </svg>
                    <span className="ir_pm">메세지</span>
                  </p>
                  <span className="xsmall_tr">1</span>
                </li>
                <li className={styles.like}>
                  <p className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                      fill="00000">
                      <path
                        d="M260-174v-557.69q0-27.01 18.65-45.66Q297.3-796 324.31-796h311.38q27.01 0 45.66 18.65Q700-758.7 700-731.69V-174l-220-87.54L260-174Zm52-77 168-67 168 67v-480.69q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H324.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46V-251Zm0-493h336-336Z" />
                    </svg>
                    <span className="ir_pm">즐겨찾기</span>
                  </p>
                  <span className="xsmall_tr">12</span>
                </li>
              </ul>
            </div>
            <div className={styles.community_article}>
              <div className={`small_tr ${styles.article_body}`}>
                <h5 className={`small_tb ${styles.article_title}`}>간만에 캠핑 다녀왔어요~</h5>
                날이 너무 더워서 땀이 삐질삐질<br />
                무선 선풍기가 있어서 살아 남았네요ㅋㅋ<br />
                <br />
                모기 차단을 위해 사방팔방 모기향 거치대 설치했는데 가격도 저렴하고 설치도 간편해서 좋았어요~<br />
                <br />
                점심은 그리들에 곱창대창 왕창 구워먹고 저녁은 구이바다에 라면으로 마무리
              </div>
            </div>
          </div>
        </div>
      </div >
      {/* //community_content */}

      {/* ramdom_category_content  */}
      <div className={styles.ramdom_product_content}>
        <h3 className={`medium_tb ${styles.ramdom_product_title}`}>이런건 어때요?</h3>
        <ul className={`product_list_wrapper ${styles.product_list_wrapper}`}>
          {product.slice(0, 3).map(item =>
            <li className="product_card" key={item.prod_id}>
              <Link href="#">
                <div className="product_image">
                  <Image
                    src={item.prod_images}
                    width={250}
                    height={250}
                    alt=""
                  />
                </div>
                <div className="product_info">
                  <h3 className="product_title">{item.prod_title}</h3>
                  <div className="product_meta">
                    <span className="product_location">종로1가동</span>
                    <span className="product_date">4시간 전</span>
                  </div>
                  <div className="product_footer">
                    <span className="product_price normal_tb">{item.prod_price.toLocaleString()} 원</span>
                    <ul className="product_stats">
                      {item.view > 0 && (<li className="view">
                        <p className="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                            fill="00000">
                            <path
                              d="M480.09-328.92q62.99 0 106.99-44.09 44-44.09 44-107.08 0-62.99-44.09-106.99-44.09-44-107.08-44-62.99 0-106.99 44.09-44 44.09-44 107.08 0 62.99 44.09 106.99 44.09 44 107.08 44ZM480-384q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm.05 172q-134.57 0-245.23-73.12Q124.16-358.23 69.54-480q54.62-121.77 165.22-194.88Q345.37-748 479.95-748q134.57 0 245.23 73.12Q835.84-601.77 890.46-480q-54.62 121.77-165.22 194.88Q614.63-212 480.05-212ZM480-480Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z" />
                          </svg>
                          <span className="ir_pm">조회수</span>
                        </p>
                        <span>{item.view}</span>
                      </li>)}
                      <li className="message">
                        <p className="icon">
                          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="path-1-outside-1_686_255" maskUnits="userSpaceOnUse" x="0" y="0.5" width="14"
                              height="16" fill="black">
                              <rect fill="white" y="0.5" width="14" height="16" />
                              <path
                                d="M10.5 5.17578V4H3.5V5.17578H10.5ZM8.17578 8.67578V7.5H3.5V8.67578H8.17578ZM3.5 5.75V6.92578H10.5V5.75H3.5ZM11.6758 1.67578C11.9857 1.67578 12.25 1.79427 12.4688 2.03125C12.7057 2.25 12.8242 2.51432 12.8242 2.82422V9.82422C12.8242 10.1341 12.7057 10.4076 12.4688 10.6445C12.25 10.8815 11.9857 11 11.6758 11H3.5L1.17578 13.3242V2.82422C1.17578 2.51432 1.28516 2.25 1.50391 2.03125C1.74089 1.79427 2.01432 1.67578 2.32422 1.67578H11.6758Z" />
                            </mask>
                            <path
                              d="M10.5 5.17578V6.17578H11.5V5.17578H10.5ZM10.5 4H11.5V3H10.5V4ZM3.5 4V3H2.5V4H3.5ZM3.5 5.17578H2.5V6.17578H3.5V5.17578ZM8.17578 8.67578V9.67578H9.17578V8.67578H8.17578ZM8.17578 7.5H9.17578V6.5H8.17578V7.5ZM3.5 7.5V6.5H2.5V7.5H3.5ZM3.5 8.67578H2.5V9.67578H3.5V8.67578ZM3.5 5.75V4.75H2.5V5.75H3.5ZM3.5 6.92578H2.5V7.92578H3.5V6.92578ZM10.5 6.92578V7.92578H11.5V6.92578H10.5ZM10.5 5.75H11.5V4.75H10.5V5.75ZM12.4688 2.03125L11.7339 2.70953L11.7611 2.73892L11.7905 2.76605L12.4688 2.03125ZM12.4688 10.6445L11.7616 9.93742L11.7475 9.95156L11.7339 9.96625L12.4688 10.6445ZM3.5 11V10H3.08579L2.79289 10.2929L3.5 11ZM1.17578 13.3242H0.175781V15.7384L1.88289 14.0313L1.17578 13.3242ZM1.50391 2.03125L2.21101 2.73836L1.50391 2.03125ZM10.5 5.17578H11.5V4H10.5H9.5V5.17578H10.5ZM10.5 4V3H3.5V4V5H10.5V4ZM3.5 4H2.5V5.17578H3.5H4.5V4H3.5ZM3.5 5.17578V6.17578H10.5V5.17578V4.17578H3.5V5.17578ZM8.17578 8.67578H9.17578V7.5H8.17578H7.17578V8.67578H8.17578ZM8.17578 7.5V6.5H3.5V7.5V8.5H8.17578V7.5ZM3.5 7.5H2.5V8.67578H3.5H4.5V7.5H3.5ZM3.5 8.67578V9.67578H8.17578V8.67578V7.67578H3.5V8.67578ZM3.5 5.75H2.5V6.92578H3.5H4.5V5.75H3.5ZM3.5 6.92578V7.92578H10.5V6.92578V5.92578H3.5V6.92578ZM10.5 6.92578H11.5V5.75H10.5H9.5V6.92578H10.5ZM10.5 5.75V4.75H3.5V5.75V6.75H10.5V5.75ZM11.6758 1.67578V2.67578C11.6892 2.67578 11.6959 2.67703 11.6976 2.67736C11.699 2.67766 11.6985 2.67764 11.6974 2.67716C11.6964 2.67671 11.6983 2.67736 11.7035 2.68117C11.7088 2.68513 11.7193 2.69361 11.7339 2.70953L12.4688 2.03125L13.2036 1.35297C12.8042 0.920339 12.2774 0.675781 11.6758 0.675781V1.67578ZM12.4688 2.03125L11.7905 2.76605C11.8064 2.78075 11.8149 2.79116 11.8188 2.79654C11.8226 2.80171 11.8233 2.80361 11.8228 2.80261C11.8224 2.80154 11.8223 2.80101 11.8226 2.80243C11.823 2.80405 11.8242 2.81078 11.8242 2.82422H12.8242H13.8242C13.8242 2.22264 13.5797 1.6958 13.147 1.29645L12.4688 2.03125ZM12.8242 2.82422H11.8242V9.82422H12.8242H13.8242V2.82422H12.8242ZM12.8242 9.82422H11.8242C11.8242 9.84796 11.8205 9.85791 11.8178 9.86411C11.8144 9.87183 11.8022 9.8969 11.7616 9.93742L12.4688 10.6445L13.1759 11.3516C13.5835 10.944 13.8242 10.4223 13.8242 9.82422H12.8242ZM12.4688 10.6445L11.7339 9.96625C11.7193 9.98217 11.7088 9.99065 11.7035 9.99461C11.6983 9.99842 11.6964 9.99907 11.6974 9.99862C11.6985 9.99814 11.699 9.99812 11.6976 9.99842C11.6959 9.99875 11.6892 10 11.6758 10V11V12C12.2774 12 12.8042 11.7554 13.2036 11.3228L12.4688 10.6445ZM11.6758 11V10H3.5V11V12H11.6758V11ZM3.5 11L2.79289 10.2929L0.468674 12.6171L1.17578 13.3242L1.88289 14.0313L4.20711 11.7071L3.5 11ZM1.17578 13.3242H2.17578V2.82422H1.17578H0.175781V13.3242H1.17578ZM1.17578 2.82422H2.17578C2.17578 2.78945 2.18136 2.77705 2.18183 2.77591C2.18229 2.7748 2.18695 2.76242 2.21101 2.73836L1.50391 2.03125L0.796799 1.32414C0.390147 1.7308 0.175781 2.24962 0.175781 2.82422H1.17578ZM1.50391 2.03125L2.21101 2.73836C2.25154 2.69783 2.2766 2.68555 2.28433 2.6822C2.29052 2.67952 2.30047 2.67578 2.32422 2.67578V1.67578V0.675781C1.72617 0.675781 1.20445 0.916491 0.796799 1.32414L1.50391 2.03125ZM2.32422 1.67578V2.67578H11.6758V1.67578V0.675781H2.32422V1.67578Z"
                              fill="black" mask="url(#path-1-outside-1_686_255)" />
                          </svg>
                          <span className="ir_pm">메세지</span>
                        </p>
                        <span>1</span>
                      </li>
                      {item.like > 0 && (<li className="like">
                        <p className="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                            fill="00000">
                            <path
                              d="M260-174v-557.69q0-27.01 18.65-45.66Q297.3-796 324.31-796h311.38q27.01 0 45.66 18.65Q700-758.7 700-731.69V-174l-220-87.54L260-174Zm52-77 168-67 168 67v-480.69q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H324.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46V-251Zm0-493h336-336Z" />
                          </svg>
                          <span className="ir_pm">즐겨찾기</span>
                        </p>
                        <span>{item.like}</span>
                      </li>)}
                    </ul>
                  </div>
                </div>
              </Link >
            </li>
          )}
        </ul>
        <button className="more_btn">더 보기</button>
      </div>
      {/* //ramdom_category_content */}
    </>
  );
}
