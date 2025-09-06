/*
 * 파일명: page.js (join_member.html)
 * 담당자: 박연미
 * 작성일: 2025-09-04
 * 최근 수정일: 2025-09-04
 * 설명: join_member.html의 next.js 버전
 * 수정이력:
 *  2025-09-04: join_member.html의 코드 next.js 문법으로 변경
*/

export const metadata = {
  title: "Campick - 회원가입 폼",
  description: "Welcome to Campick",
};


import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";


export default function JoinFormPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>회원가입</h1>
      <div className={styles.divider}></div>

      <form>
        <div className={styles.section}>
          <h2 className={styles.section_title}>1. 정보입력</h2>
          <p className={styles.section_description}>
            회원가입에 필요한 정보를 입력합니다.
          </p>

          <div className={styles.form_group}>
            <label className={styles.form_label}>
              이메일 <span className={styles.required}>*</span>
            </label>
            <input type="email" className={styles.form_input} placeholder="" />
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label}>
              닉네임 <span className={styles.required}>*</span>
            </label>
            <input type="text" className={styles.form_input} placeholder="" />
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label}>
              비밀번호 <span className={styles.required}>*</span>
            </label>
            <input type="password" className={styles.form_input} placeholder="" />
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label}>
              비밀번호 확인 <span className={styles.required}>*</span>
            </label>
            <input type="password" className={styles.form_input} placeholder="" />
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label}>
              휴대폰 번호 <span className={styles.required}>*</span>
            </label>
            <div className={styles.input_with_button}>
              <input type="tel" className={styles.form_input} placeholder="" />
              <button
                type="button"
                className={`${styles.verification_btn} btn_normal`}
              >
                인증번호 발송
              </button>
            </div>
          </div>

          <div className={styles.form_group}>
            <label className={styles.form_label}>
              인증번호 <span className={styles.required}>*</span>
            </label>
            <div className={styles.input_with_button}>
              <input type="text" className={styles.form_input} placeholder="" />
              <button
                type="button"
                className={`${styles.verification_btn} btn_normal`}
              >
                확인
              </button>
            </div>
          </div>
        </div>

        <div className={`${styles.section} ${styles.terms_section}`}>
          <h2 className={styles.section_title}>2. 약관 동의</h2>
          <p className={styles.section_description}>
            회원가입에 필요한 약관을 동의해 주세요.
          </p>

          <div className={`${styles.terms_item} ${styles.all_agree}`}>
            <div className={styles.checkbox_container}>
              <input type="checkbox" className={styles.checkbox} id="all_agree" />
              <label className={styles.checkbox_label} htmlFor="all_agree">
                전체 동의하기
              </label>
            </div>
          </div>

          <div className={styles.terms_detail}>
            <div className={styles.terms_detail_item}>
              <input type="checkbox" id="age-check" className={styles.checkbox_input} />
              <label htmlFor="age-check" className={styles.checkbox_icon}>
                <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px">
                  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg>
              </label>
              <span className={styles.required_term}>[필수]</span>
              <span>만 14세 이상입니다</span>
            </div>

            <div className={styles.terms_detail_item}>
              <input type="checkbox" id="terms-check" className={styles.checkbox_input} />
              <label htmlFor="terms-check" className={styles.checkbox_icon}>
                <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px">
                  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg>
              </label>
              <span className={styles.required_term}>[필수]</span>
              <span>이용약관 동의</span>
            </div>

            <div className={styles.terms_detail_item}>
              <input type="checkbox" id="privacy-check" className={styles.checkbox_input} />
              <label htmlFor="privacy-check" className={styles.checkbox_icon}>
                <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px">
                  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg>
              </label>
              <span className={styles.required_term}>[필수]</span>
              <span>개인 정보 수집 및 이용 동의</span>
            </div>

            <div className={styles.terms_detail_item}>
              <input type="checkbox" id="privacy-optional" className={styles.checkbox_input} />
              <label htmlFor="privacy-optional" className={styles.checkbox_icon}>
                <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px">
                  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg>
              </label>
              <span className={styles.optional_term}>[선택]</span>
              <span>개인 정보 수집 및 이용 동의</span>
            </div>

            <div className={styles.terms_detail_item}>
              <input type="checkbox" id="marketing-check" className={styles.checkbox_input} />
              <label htmlFor="marketing-check" className={styles.checkbox_icon}>
                <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px">
                  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg>
              </label>
              <span className={styles.optional_term}>[선택]</span>
              <span>광고성 정보 수신 모두 동의</span>
            </div>
          </div>
        </div>

        <button type="submit" className={`${styles.signup_btn} btn_normal`}>
          회원가입
        </button>
      </form>
    </div>
  );
}
