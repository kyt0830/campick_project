import Image from "next/image";
import Link from 'next/link';
import { useState } from "react";

import "./page.module.css";

export const metadata = {
  title: "Campick - 결제 방식 선택",
  description: "Welcome to Campick",
};


export default function SelectPaymentPage() {
  const [selected, setSelected] = useState(null);

  const selectPayment = (method) => {
    setSelected(method);
  };

  const processPayment = () => {
    if (!selected) {
      alert("결제 방법을 선택해주세요.");
      return;
    }
    console.log("선택된 결제 방식:", selected);
    // 여기서 라우터 이동 or 결제 로직 추가 가능
  };

  return (
    <div className="container">
      <div className="header">
        <a href="#" className="back_button">
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
          원하시는 결제방법을
          <br />
          선택해 주세요.
        </div>
      </div>

      <div className="content">
        <div
          className={`payment_option ${selected === "delivery" ? "active" : ""}`}
          onClick={() => selectPayment("delivery")}
          id="delivery"
        >
          <div className="radio_indicator"></div>
          <div className="payment_title">택배거래</div>
          <div className="payment_description small_tr">
            원하는 주소로 판매자에게 택배로 받을 수 있어요.
          </div>
        </div>

        <div
          className={`payment_option ${selected === "direct" ? "active" : ""}`}
          onClick={() => selectPayment("direct")}
          id="direct"
        >
          <div className="radio_indicator"></div>
          <div className="payment_title">직거래</div>
          <div className="payment_description small_tr">
            채팅으로 약속을 정하고 직접 만나 받을 수 있어요.
          </div>
        </div>
      </div>

      <div className="payment_footer">
        <div className="total_section">
          <span className="medium_tb">결제 금액</span>
          <span className="medium_tb">100,000 원</span>
        </div>
        <button className="pay_button btn_normal" onClick={processPayment}>
          다음
        </button>
      </div>
    </div>
  );
}