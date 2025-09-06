/*
 * 파일명: page.js (login.html)
 * 담당자: 박연미
 * 작성일: 2025-09-04
 * 최근 수정일: 2025-09-04
 * 설명: login.html의 next.js 버전
 * 수정이력:
 *  2025-09-04: login.html의 코드 next.js 문법으로 변경
*/

export const metadata = {
  title: "Campick - 로그인",
  description: "Welcome to Campick",
};


import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css"



export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.logo_section}>
        <div className={styles.logo}>
          <Image
            src="/images/logo_black.png"
            alt="campick logo"
            width={120}
            height={49}
          />
        </div>
        <div className={styles.subtitle}>
          캠핑 <span className={styles.font_primary}>중고거래</span>는 캠픽
          <br />
          캠핑 <span className={styles.font_primary}>트렌드</span>도 캠픽
        </div>
      </div>

      <form>
        <div className={styles.form_group}>
          <label className={styles.form_label}>이메일</label>
          <input type="email" className={styles.form_input} placeholder="" />
        </div>

        <div className={styles.form_group}>
          <label className={styles.form_label}>비밀번호</label>
          <input type="password" className={styles.form_input} placeholder="" />
        </div>

        <button type="submit" className={`${styles.login_btn} btn_normal`}>
          로그인
        </button>

        <div className={styles.links}>
          <Link href="#">이메일 찾기</Link>
          <Link href="#">비밀번호 찾기</Link>
        </div>

        <div className={styles.social_login}>
          <div className={styles.login_title}>
            <div className={styles.border}></div>
            <span>간편 로그인</span>
            <div className={styles.border}></div>
          </div>
          <button type="button" className={`${styles.social_btn} ${styles.naver_btn}`}>
            네이버로 로그인
          </button>

          <button type="button" className={`${styles.social_btn} ${styles.kakao_btn}`}>
            카카오 로그인
          </button>
        </div>
      </form>

      <div className={styles.signup_section}>
        <div className={styles.border}></div>
        <Link href="/join">회원가입</Link>
      </div>
    </div>
  );
}