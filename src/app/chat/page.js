/*
 * 파일명: page.js (chat.html)
 * 담당자: 김영태
 * 작성일: 2025-09-04
 * 최근 수정일: 2025-09-04
 * 설명: chat.html의 next.js 버전
 * 수정이력:
 *  2025-09-04: chat.html의 코드 next.js 문법으로 변경
*/
import Image from "next/image"
import Link from "next/link"
import styles from "./page.module.css"

export const metadata = {
  title: "Campick - 상대방ID",
  description: "Welcome to Campick",
};

export default function Chat() {
  return (
    <>
      <div className={styles.chat_content}>
        {/* chat_header  */}
        <div className={styles.chat_header}>
          <div className={styles.chat_header_top}>
            <h3 className={`small_tb ${styles.chat_title}`}>user_id</h3>
            <button className={styles.prev}>
              <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960"
                width="12.1758H4" fill="#666666">
                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
              </svg>
            </button>
          </div>
          <div className={styles.chat_product_info}>
            <a className={styles.chat_thumbnail}>
              <Image
                src="/images/product_img01.jpg"
                width={60}
                height={60}
                alt=""
              />
            </a>
            <div className={styles.chat_meta}>
              <h4 className={`xsmall_tr ${styles.chat_product_title}`}>[힐레베르그] 알락 2 텐트 (Allak 2)</h4>
              <p className={`small_tb ${styles.chat_product_price}`}>1,893,000원</p>
            </div >
            <div className={styles.chat_button_group} >
              <button className={styles.wishlist} > 찜</button >
              <button className={styles.buy} > 구매하기</button >
            </div >
          </div >
          <div className={styles.chat_banner} >
            <a href="">
              안전결제 관련 안내
              <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px"
                fill="#fff">
                <path d="m288-96-68-68 316-316-316-316 68-68 384 384L288-96Z" />
              </svg>
            </a>
          </div >
        </div >
        {/* //chat_header  */}

        {/* chat_body  */}
        <div className={styles.chat_body}>
          <div className={`xsmall_tr ${styles.chat_date}`}>2025년 8월 18일</div>
          <div className={`${styles.message} ${styles.seller}`}>
            <div className={`small_tr ${styles.message_bubble}`}>안녕하세요! 텐트 구매 가능한가요?</div>
            <div className={styles.message_time}> 오후 4시 30분</div >
          </div >

          <div className={`${styles.message} ${styles.buyer}`}>
            <div className={`small_tr ${styles.message_bubble}`}> 네~구매 가능하세요!</div >
            <div className={styles.message_time}> 오후 4시 45분</div >
          </div >

          <div className={`${styles.message} ${styles.seller}`}>
            <div className={`small_tr ${styles.message_bubble}`}> 직거래 하고 싶은데...</div >
            <div className={styles.message_time} > 오후 4시 30분</div >
          </div >

          <div className={`${styles.message} ${styles.seller}`} >
            <div className={`small_tr ${styles.message_bubble}`}> 혹시 서울에 살고 계신가요 ?</div >
            <div className={styles.message_time} > 오후 4시 30분</div >
          </div >

          <div className={`${styles.message} ${styles.buyer}`} >
            <div className={`small_tr ${styles.message_bubble}`}> 저는 수원에 살고 있어요.</div >
            <div className={styles.message_time}> 오후 4시 45분</div >
          </div >

          <div className={`${styles.message} ${styles.seller}`}>
            <div className={`small_tr ${styles.message_bubble}`}>안녕하세요! 텐트 구매 가능한가요?</div>
            <div className={styles.message_time}> 오후 4시 30분</div >
          </div >

          <div className={`${styles.message} ${styles.buyer}`}>
            <div className={`small_tr ${styles.message_bubble}`}> 네~구매 가능하세요!</div >
            <div className={styles.message_time}> 오후 4시 45분</div >
          </div >

          <div className={`${styles.message} ${styles.seller}`}>
            <div className={`small_tr ${styles.message_bubble}`}> 직거래 하고 싶은데...</div >
            <div className={styles.message_time} > 오후 4시 30분</div >
          </div >

          <div className={`${styles.message} ${styles.seller}`} >
            <div className={`small_tr ${styles.message_bubble}`}> 혹시 서울에 살고 계신가요 ?</div >
            <div className={styles.message_time} > 오후 4시 30분</div >
          </div >

          <div className={`${styles.message} ${styles.buyer}`} >
            <div className={`small_tr ${styles.message_bubble}`}> 저는 수원에 살고 있어요.</div >
            <div className={styles.message_time}> 오후 4시 45분</div >
          </div >

          <div className={`${styles.message} ${styles.seller}`}>
            <div className={`small_tr ${styles.message_bubble}`}>안녕하세요! 텐트 구매 가능한가요?</div>
            <div className={styles.message_time}> 오후 4시 30분</div >
          </div >

          <div className={`${styles.message} ${styles.buyer}`}>
            <div className={`small_tr ${styles.message_bubble}`}> 네~구매 가능하세요!</div >
            <div className={styles.message_time}> 오후 4시 45분</div >
          </div >

          <div className={`${styles.message} ${styles.seller}`}>
            <div className={`small_tr ${styles.message_bubble}`}> 직거래 하고 싶은데...</div >
            <div className={styles.message_time} > 오후 4시 30분</div >
          </div >

          <div className={`${styles.message} ${styles.seller}`} >
            <div className={`small_tr ${styles.message_bubble}`}> 혹시 서울에 살고 계신가요 ?</div >
            <div className={styles.message_time} > 오후 4시 30분</div >
          </div >

          <div className={`${styles.message} ${styles.buyer}`} >
            <div className={`small_tr ${styles.message_bubble}`}> 저는 수원에 살고 있어요.</div >
            <div className={styles.message_time}> 오후 4시 45분</div >
          </div >
        </div >
        {/* //chat_body */}

        {/* input_message  */}
        <div className={styles.chat_input} >
          <button className={styles.add_btn} >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
              fill="#000000">
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </button >
          <input className={styles.input_field} type="text" placeholder="메시지를 입력하세요..." rows="1" />
          <button className={styles.send_btn}> 
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
              fill="#000000">
              <path
                d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
            </svg>
          </button >
        </div >
        {/* //input_message  */}

      </div >
    </>
  )
}