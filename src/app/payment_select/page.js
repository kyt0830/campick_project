/*
 * 파일명: page.js (payment_select.html)
 * 담당자: 박연미
 * 작성일: 2025-09-04
 * 최근 수정일: 2025-09-04
 * 설명: payment_select.html의 next.js 버전
 * 수정이력:
 *  2025-09-04: payment_select.html의 코드 next.js 문법으로 변경
*/


import Image from "next/image";
import Link from 'next/link';

import styles from "./page.module.css"

export default function SelectPayment() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <a href="" className={styles.back_button}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#222222"
            >
              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
          </a>
          <div className="medium_tb">
            원하시는 결제방법을 선택해 주세요.
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.payment_option} id="delivery">
            <div className={styles.radio_indicator}></div>
            <div className={styles.payment_title}>택배거래</div>
            <div className={`${styles.payment_description} small_tr`}>원하는 주소로 편메지에게 택배로 받을 수 있어요.</div>
          </div>

          <div className={styles.payment_option} id="direct">
            <div className={styles.radio_indicator}></div>
            <div className={styles.payment_title}>직거래</div>
            <div className={`${styles.payment_description} small_tr`}>채팅으로 약속을 정하고 직접 만나 받을 수 있어요.</div>
          </div>
        </div>

        <div className={styles.payment_footer}>
          <div className={styles.total_section}>
            <span className="medium_tb">결제 금액</span>
            <span className="medium_tb">100,000 원</span>
          </div>
          <button className={`${styles.pay_button} btn_normal`}>다음</button>
        </div>
      </div>
    </>
  );
}