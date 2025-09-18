/*
 * 파일명: page.js (messages.html)
 * 담당자: 김영태
 * 작성일: 2025-09-04
 * 최근 수정일: 2025-09-04
 * 설명: messages.html의 next.js 버전
 * 수정이력:
 *  2025-09-04: messages.html의 코드 next.js 문법으로 변경
*/
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css"
import { createClient } from "../../utils/supabase/server";
import ChatTabs from "./tabs"

export const metadata = {
  title: "Campick - 메세지",
  description: "Welcome to Campick",
};

export default async function messages() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser(); // 유저 정보 조회
  const { data: seller_chat, error: seller_error } = await supabase // 내가 판매자인 채팅
    .from("chatRoom")
    .select()
    .eq("seller_id", user.id);
  const { data: buyer_chat, error: buyer_error } = await supabase // 내가 구매자인 채팅
    .from("chatRoom")
    .select()  // select()를 먼저
    .eq("buyer_id", user.id);  // 그 다음 조건
  const { data: product, error: product_error } = await supabase // 상품 정보 가져오기
    .from("product")
    .select()
  console.log("내가 판매하는 채팅", seller_chat);
  console.log("내가 구매하는 채팅", buyer_chat);
  console.log("상품의 전체 정보", product);
  return (
    <>
      {/* user_profile mypage.ver  */}
      <div className="user_profile_wrapper">
        <div className="profile_card">
          <div className="profile_img_wrapper">
            <Image
              src="/images/user_profile_img.jpg"
              width={72}
              height={72}
              alt=""
            />
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
      {/* //user_profile mypage.ver */}

  

      {/* 클라이언트 컴포넌트로 탭 기능 분리 */}
      <ChatTabs
        seller_chat={seller_chat}
        buyer_chat={buyer_chat}
        product={product}
      />
    </>
  )
}