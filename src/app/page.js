/*
 * 파일명: page.js
 * 담당자: 김영태
 * 작성일: 2025-09-04
 * 최근 수정일: 2025-09-04
 * 설명: 메인 index.html의 main content next.js 버전
 * 수정이력:
 *  2025-09-04: index.html의 main content-> next.js 문법으로 변경
 * 
*/
import { createClient } from "../utils/supabase/server";
import BannerSlide from './slideComponent';
import BrandSlide from './brandSlideComponent';
import ProductSection from "./ProductSection";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser(); // 유저 정보 조회
  const { data: product, error: product_error } = await supabase // 상품 정보 가져오기
    .from("product")
    .select()
    .eq("prod_status", 1)
    .order("created_at", { ascending: false }); // 내림차순 정렬

  return (
    <>
      {/* common_slide_content */}
      <div className={`common_slider_container ${styles.common_slider_container}`}>
        <div className="common_slider_wrapper">
          <BannerSlide />
        </div>
      </div>
      {/* //common_slide_content */}

      {/* barnd_slide_content  */}
      <div className={styles.brand_slide_content}>
        <h3 className={`medium_tb ${styles.brand_title}`}>추천 브랜드</h3>
        <div className={styles.brand_slider_container}>
          <BrandSlide />
        </div>
      </div>
      {/* //barnd_slide_content  */}

      {/* 상품 섹션을 클라이언트 컴포넌트로 분리 */}
      <ProductSection products={product || []} />

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
                src="/images/review_img01.jpg"
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
          {product?.slice(0, 3).map(item =>
            <li className="product_card" key={item.prod_id}>
              <Link href="#">
                <div className="product_image">
                  <Image
                    src={item.prod_images.split(",")[0]}
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
            </li>
          ) || []}
        </ul>
        <button className="more_btn">더 보기</button>
      </div>
      {/* //keyword_product_content */}

      {/* popular_product_content */}
      <div className={styles.popular_product_content}>
        <h3 className={`medium_tb ${styles.popular_product_title}`}>가장 인기있는 상품</h3>
        <ul className={`product_list_wrapper ${styles.product_list_wrapper}`}>
          {product?.slice(0, 3).map(item =>
            <li className="product_card" key={item.prod_id}>
              <Link href="#">
                <div className="product_image">
                  <Image
                    src={item.prod_images.split(",")[0]}
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
            </li>
          ) || []}
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
                src="/images/community_img01.jpg"
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
                    <Image src="/images/prod_detail_view.svg" width={14} height={14} alt="조회수" />
                    <span className="ir_pm">조회수</span>
                  </p>
                  <span className="xsmall_tr">12</span>
                </li>
                <li className={styles.message}>
                  <p className={styles.icon}>
                    <Image src="/images/prod_detail_chat.svg" width={12} height={12} alt="메세지" />
                    <span className="ir_pm">메세지</span>
                  </p>
                  <span className="xsmall_tr">1</span>
                </li>
                <li className={styles.like}>
                  <p className={styles.icon}>
                    <Image src="/images/prod_detail_bookmark.svg" width={14} height={14} alt="즐겨찾기" />
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
          {product?.slice(0, 3).map(item =>
            <li className="product_card" key={item.prod_id}>
              <Link href="#">
                <div className="product_image">
                  <Image
                    src={item.prod_images.split(",")[0]}
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
              </Link >
            </li>
          ) || []}
        </ul>
        <button className="more_btn">더 보기</button>
      </div>
      {/* //ramdom_category_content */}
    </>
  );
}
