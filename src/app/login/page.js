import Image from "next/image";
import Link from 'next/link';

import "./page.module.css";

export const metadata = {
  title: "Campick - 로그인",
  description: "Welcome to Campick",
};

export default function Login() {
  return (
    <div className="container">
      <div className="logo_section">
        <div className="logo">
          <Image
            src="/images/logo_black.png"
            alt="campick logo"
            width={120}
            height={49}
          />
        </div>
        <div className="subtitle">
          캠핑 <span className="font_primary">중고거래</span>는 캠픽
          <br />
          캠핑 <span className="font_primary">트렌드</span>도 캠픽
        </div>
      </div>

      <form>
        <div className="form_group">
          <label className="form_label">이메일</label>
          <input type="email" className="form_input" placeholder="" />
        </div>

        <div className="form_group">
          <label className="form_label">비밀번호</label>
          <input type="password" className="form_input" placeholder="" />
        </div>

        <button type="submit" className="login_btn btn_normal">
          로그인
        </button>

        <div className="links">
          <Link href="#">이메일 찾기</Link>
          <Link href="#">비밀번호 찾기</Link>
        </div>

        <div className="social_login">
          <div className="login_title">
            <div className="border"></div>
            <span>간편 로그인</span>
            <div className="border"></div>
          </div>
          <button type="button" className="social_btn naver_btn">
            네이버로 로그인
          </button>

          <button type="button" className="social_btn kakao_btn">
            카카오 로그인
          </button>
        </div>
      </form>

      <div className="signup_section">
        <div className="border"></div>
        <Link href="/join_form">회원가입</Link>
      </div>
    </div>
  );
}