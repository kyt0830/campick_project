import Image from "next/image";
import Link from 'next/link';
import { useState } from "react";

import "./page.module.css";

export const metadata = {
	title: "Campick - 결제 모달",
	description: "Welcome to Campick",
};


export default function PaymentModalPage() {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div>
      {/* 오버레이 */}
      <div className="overlay" onClick={closeModal}></div>

      {/* 모달 */}
      <div className="modal">
        <div className="modal_header">
          <button className="close_button" onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#222222"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>

          <div className="chat_icon">
            <div className="chat-bubble">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#222222"
              >
                <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="modal_content">
          <h2 className="modal_title">잠깐 판매자와 채팅 하셨나요?</h2>

          <p className="modal_description">
            제품을 하지 않고 결제하면 취소될 확률이 높아요.
            <br />
            채팅을 통해 판매자와 소통해 보세요.
          </p>

          <div className="button_group">
            <a href="#" className="btn_normal primary_button">
              채팅하고 거래할래요.
            </a>
            <a href="#" className="secondary_button">
              채팅없이 거래할래요.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}