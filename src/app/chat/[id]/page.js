/*
 * 파일명: page.js (chat.html)
 * 담당자: 김영태
 * 작성일: 2025-09-04
 * 최근 수정일: 2025-09-04
 * 설명: chat.html의 next.js 버전
 * 수정이력:
 *  2025-09-04: chat.html의 코드 next.js 문법으로 변경
*/
"use client"
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from '../../../utils/supabase/client';
import Image from "next/image"
import Link from "next/link"
import styles from "./page.module.css"

export default function Chat({ params }) {
  const supabase = createClient();
  const router = useRouter();
  const { id } = React.use(params);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [product, setProduct] = useState("");
  const messagesEndRef = useRef(null);
  const chatRoomId = id;
  useEffect(() => {
    const loadAll = async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        setUser(userData.user);

        const { data: chatData } = await supabase
          .from("ChatRoom")
          .select("*")
          .eq("chat_id", chatRoomId)
          .single();

        setChatRoom(chatData);

        const [{ data: messagesData }, { data: productData }] = await Promise.all([
          supabase.from("ChatMessage")
            .select("*")
            .eq("chat_id", chatRoomId)
            .order("created_at", { ascending: true }),
          supabase.from("Product")
            .select("*")
            .eq("prod_id", chatData.prod_id)
            .single(),
        ]);

        setMessages(messagesData);
        setProduct(productData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
    // eslint-disable-next-line
  }, [chatRoomId]);
  if (loading) return <p>불러오는 중...</p>;
  if (!user) return <p>로그인이 필요합니다.</p>;
  const currentUserId = user?.id;
  console.log(user);
  console.log(chatRoom);
  console.log(chatRoom?.prod_id);
  console.log(product);

  // 메시지 전송 (insert 후 반환된 행을 상태에 추가)
  const sendMessage = async () => {
    const text = newMessage.trim();
    if (!text || isSending || !currentUserId) return;
    setIsSending(true);
    try {
      // created_at은 DB default(now())로 처리되어 있다고 가정
      const { data, error } = await supabase
        .from('ChatMessage')
        .insert({
          chat_id: chatRoomId,
          sender_id: currentUserId,
          content: text,
          is_read: false,
        })
        .select("message_id, chat_id, sender_id, content, created_at, is_read")
        .single();
      if (error) throw error;
      // 서버에서 받은 실제 행을 messages에 추가
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    } catch (err) {
      console.error('메시지 전송 에러:', err);
      // 필요하면 사용자에게 에러 알림(토스트 등) 처리
    } finally {
      setIsSending(false);
    }
  };
  // Enter(단, IME 조합 중은 무시) -> 메시지 전송
  const handleKeyDown = (evt) => {
    if (evt.nativeEvent && evt.nativeEvent.isComposing) return; // IME 입력 중
    if (evt.key === 'Enter' && !evt.shiftKey) {
      evt.preventDefault();
      sendMessage();
    }
  };
  // 시간 포맷팅 (예: "오후 4시 05분")
  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const fmt = new Intl.DateTimeFormat('ko-KR', { hour: 'numeric', minute: '2-digit', hour12: true }).format(date); // ex: "오후 4:05"
    const [period, time] = fmt.split(' ');
    const [hour, minute] = time.split(':');
    return `${period} ${hour}시 ${minute}분`;
  };

  const prev = () => {
    router.back();
  }

  return (
    <>
      <div className={styles.chat_content}>
        {/* chat_header  */}
        <div className={styles.chat_header}>
          <div className={styles.chat_header_top}>
            <h3 className={`small_tb ${styles.chat_title}`}>user_id</h3>
            <button className={styles.prev} onClick={prev}>
              <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960"
                width="12.1758H4" fill="#666666">
                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
              </svg>
            </button>
          </div>
          <div className={styles.chat_product_info}>
            <Link className={styles.chat_thumbnail} href={""}>
              <Image
                src={product?.prod_images.split(",")[0] || ("로딩중")}
                width={60}
                height={60}
                alt=""
              />
            </Link>
            <div className={styles.chat_meta}>
              <h4 className={`xsmall_tr ${styles.chat_product_title}`}>{product?.prod_title || ("로딩중")}</h4>
              <p className={`small_tb ${styles.chat_product_price}`}>{product?.prod_price.toLocaleString() || ("로딩중")}원</p>
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

        {/* chat_body */}
        <div className={styles.chat_body}>
          <div className={`xsmall_tr ${styles.chat_date}`}>대화 내용</div>

          {messages.map((msg) => (
            <div
              key={msg.message_id ?? msg.id}
              className={`${styles.message} ${msg.sender_id === currentUserId ? styles.buyer : styles.seller}`}>
              <div className={`small_tr ${styles.message_bubble}`}>{msg.content}</div>
              <div className={styles.message_time}>{formatTime(msg.created_at)}</div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
        {/* //chat_body */}
      </div >

      {/* input_message  */}
      <div className={styles.chat_input} >
        <button className={styles.add_btn} >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            fill="#000000">
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </button >

        <input
          className={styles.input_field}
          type="text"
          placeholder="메시지를 입력하세요..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSending}
        />
        <button className={styles.send_btn}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            fill="#000000">
            <path
              d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
          </svg>
        </button >
      </div >
      {/* //input_message  */}

    </>
  )
}