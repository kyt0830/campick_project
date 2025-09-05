import Image from "next/image";
import Link from 'next/link';

import "./page.module.css";

export const metadata = {
	title: "Campick - 회원가입",
	description: "Welcome to Campick",
};


export default function JoinForm() {
  return (
    <div className="container">
      <div className="logo">
        <div className="flame_icon">
          <div className="flame">
            <Image
              src="/images/join_logo.svg"
              alt=""
              width={42}
              height={64}
            />
          </div>
        </div>
        <h1 className="app_title">회원가입</h1>
      </div>

      <div className="signup_section">
        <div className="general_signup">
          <p className="section_title medium_tr">일반 회원가입</p>
          <Link href="/join_member" className="signup_button btn_normal">
            이메일 회원가입
          </Link>
        </div>

        <div className="social_signup">
          <p className="section_title medium_tr">간편 회원가입</p>
          <div className="social_buttons">
            <button className="social_button kakao">
              <Image
                src="/images/kakao_logo.png"
                alt="카카오 회원가입"
                width={30}
                height={30}
              />
            </button>
            <button className="social_button naver">
              <Image
                src="/images/naver_logo.png"
                alt="네이버 회원가입"
                width={30}
                height={30}
              />
            </button>
            <button className="social_button google">
              <Image
                src="/images/google_logo.png"
                alt="구글 회원가입"
                width={30}
                height={30}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
