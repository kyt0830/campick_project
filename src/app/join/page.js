/*
 * 파일명: page.js (join.html)
 * 담당자: 박연미
 * 작성일: 2025-09-04
 * 최근 수정일: 2025-09-04
 * 설명: join.html의 next.js 버전
 * 수정이력:
 *  2025-09-04: join.html의 코드 next.js 문법으로 변경
*/


export const metadata = {
	title: "Campick - 회원가입",
	description: "Welcome to Campick",
};

import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css"

export default function JoinForm() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <div className={styles.flame_icon}>
          <div className={styles.flame}>
            <Image
              src="/images/join_logo.svg"
              alt=""
              width={42}
              height={64}
            />
          </div>
        </div>
        <h1 className={styles.app_title}>회원가입</h1>
      </div>

      <div className={styles.signup_section}>
        <div className={styles.general_signup}>
          <p className={`${styles.section_title} ${styles.medium_tr}`}>일반 회원가입</p>
          <Link href="/join_member" className={`${styles.signup_button} btn_normal`}>
            이메일 회원가입
          </Link>
        </div>

        <div className={styles.social_signup}>
          <p className={`${styles.section_title} ${styles.medium_tr}`}>간편 회원가입</p>
          <div className={styles.social_buttons}>
            <button className={`${styles.social_button} ${styles.kakao}`}>
              <Image
                src="/images/logo_kakao.png"
                alt="카카오 회원가입"
                width={30}
                height={30}
              />
            </button>
            <button className={`${styles.social_button} ${styles.naver}`}>
              <Image
                src="/images/logo_naver.png"
                alt="네이버 회원가입"
                width={30}
                height={30}
              />
            </button>
            <button className={`${styles.social_button} ${styles.google}`}>
              <Image
                src="/images/logo_google.png"
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
