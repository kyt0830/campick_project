import Image from "next/image";
import Link from 'next/link'
import styles from "./page.module.css";

export const metadata = {
  title: "Campick - 마이페이지",
  description: "Welcome to Campick",
};

export default function Mypage() {
  return (
    <>
    <div className="user_profile_wrapper">
      <div className="profile_card">
        <div className="profile_img_wrapper">
          <img src="/images/user_profile_img.jpg" alt="사용자 프로필" />
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
    <div className={styles.mypage}>
      <div className={styles.mypage_activity}>
        <h2>나의거래</h2>
        <ul>
          <li><Link href="/sale_list"><Image src="/images/mypage_sale_list.svg" width={40} height={40} alt="판매목록"/><span>판매목록</span></Link></li>
          <li><Link href="#"><Image src="/images/mypage_shopping_list.svg" width={40} height={40} alt="구매목록"/><span>구매목록</span></Link></li>
          <li><Link href="#"><Image src="/images/mypage_like.svg" width={40} height={40} alt="찜한상품"/><span>찜한상품</span></Link></li>
          <li><Link href="#"><Image src="/images/mypage_recently_viewed.svg" width={40} height={40} alt="최근본글"/><span>최근본글</span></Link></li>
          <li><Link href="#"><Image src="/images/mypage_key.svg" width={40} height={40} alt="키워드"/><span>키워드</span></Link></li>
        </ul>
      </div>
      <div className={styles.mypage_community}>
        <h2>커뮤니티</h2>
        <ul>
          <li><Link href="#"><Image src="/images/mypage_community.svg" width={40} height={40} alt="커뮤니티"/><span>커뮤니티</span></Link></li>
          <li><Link href="#"><Image src="/images/mypage_magazine.svg" width={40} height={40} alt="매거진"/><span>매거진</span></Link></li>
        </ul>
      </div>
      <div className={styles.mypage_service}>
        <h2>고객편의</h2>
        <ul>
          <li><Link href="#"><Image src="/images/mypage_notice.svg" width={40} height={40} alt="공지사항"/><span>공지사항</span></Link></li>
          <li><Link href="#"><Image src="/images/mypage_FAQ.svg" width={40} height={40} alt="고객센터"/><span>고객센터</span></Link></li>
          <li><Link href="#"><Image src="/images/mypage_reporting.svg" width={40} height={40} alt="신고센터"/><span>신고센터</span></Link></li>
        </ul>
      </div>
    </div>
    </>
  );
}
