"use client"
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css"


export default function ChatTabs({ seller_chat, buyer_chat, product }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'sell', 'buy'

  // 현재 탭에 따른 데이터 선택
  const getCurrentChatList = () => {
    switch (activeTab) {
      case 'sell':
        return seller_chat || [];
      case 'buy':
        return buyer_chat || [];
      case 'all':
      default:
        return [...(seller_chat || []), ...(buyer_chat || [])];
    }
  };

  console.log(seller_chat?.chat_id);
  console.log(buyer_chat);
  console.log(product);
  return (
    <>
      {/* tab_menu_title */}
      <ul className={styles.tab_menu}>
        <li className={`medium_tr ${activeTab === 'all' ? `${styles.active}` : ''} ${styles.tab_menu_title}`}>
          <h3><Link href="#" onClick={(e) => { e.preventDefault(); setActiveTab('all'); }}>전체</Link></h3>
        </li>
        <li className={`medium_tr ${activeTab === 'sell' ? `${styles.active}` : ''} ${styles.tab_menu_title}`}>
          <h3><Link href="#" onClick={(e) => { e.preventDefault(); setActiveTab('sell'); }}>판매</Link></h3>
        </li>
        <li className={`medium_tr ${activeTab === 'buy' ? `${styles.active}` : ''} ${styles.tab_menu_title}`}>
          <h3><Link href="#" onClick={(e) => { e.preventDefault(); setActiveTab('buy'); }}>구매</Link></h3>
        </li>
      </ul>
      {/* //tab_menu_title */}

      {/* tab_menu_content */}
      <ul className={styles.chat_list}>
        {getCurrentChatList().map((item, idx) => {
          const fd = product.filter(p => p.prod_id === item.prod_id);
          return (
            <li key={idx} className={`${styles.chat_item} ${styles.message}`}>
              <Link className={styles.chat_link} href={`/chat/${item.chat_id}`}>
                <div className={styles.chat_thumbnail}>
                  <Image
                    className={styles.product_thumb}
                    src={fd[0]?.prod_images?.split(",")[0] || '/placeholder.jpg'}
                    width={64}
                    height={64}
                    alt=""
                  />
                  <Image
                    className={styles.user_thumb}
                    src="/images/user_profile_img.jpg"
                    width={48}
                    height={48}
                    alt=""
                  />
                </div>
                <div className={styles.chat_info}>
                  <h4 className={`small_tr ${styles.chat_userid}`}>캠핑이조아랑</h4>
                  <p className={`xsmall_tr ${styles.chat_message}`}>안녕하세요! 오늘 직거래 가능 한가요?</p>
                  <span className={styles.chat_time}>30분 전</span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
      {/* //tab_menu_content */}
    </>
  );
}