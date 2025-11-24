"use client";

import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";
import Image from "next/image";
import Link from "next/link";

const supabase = createClient();

export default function HeaderClient({ serverUser }) {
  const [user, setUser] = useState(serverUser);

  useEffect(() => {
    // 초기 유저 정보 동기화
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // 로그인/로그아웃 상태 변화 감지
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <header>
      <div className="header_top">
        <h1 className="logo">
          <Link href="/">
            <Image
              src="/images/logo_black.png"
              alt="campick logo"
              width={120}
              height={49}
            />
            <span className="ir_pm">campick</span>
          </Link>
        </h1>
        <Link href="/search" className="search_area">
          <input type="text" placeholder="어떤 캠핑 정보를 찾으시나요?" />
          <button type="button"></button>
        </Link>
        <nav className="user_menu">
          <ul>
            <li>
              <Link href="/messages">
                <Image
                  src="/images/header_chat.svg"
                  alt="메세지"
                  width={14}
                  height={14}
                />
                <span className="ir_pm">메세지</span>
              </Link>
            </li>
            <li>
              <Link href="/notifications">
                <Image
                  src="/images/header_notifications.svg"
                  alt="알림"
                  width={14}
                  height={14}
                />
                <span className="ir_pm">알림</span>
              </Link>
            </li>
            <li>
              {user ? (
                <Link href="/mypage">
                  <Image
                    src="/images/header_person.svg"
                    alt="로그인"
                    width={14}
                    height={14}
                  />
                  <span className="ir_pm">마이페이지</span>
                </Link>
              ) : (
                <Link href="/login">
                  <Image
                    src="/images/header_person.svg"
                    alt="로그인"
                    width={14}
                    height={14}
                  />
                  <span className="ir_pm">로그인</span>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <nav className="gnb">
        <ul>
          <li><Link className="small_tr" href="/">전체</Link></li>
          <li><Link className="small_tr" href="/store">중고거래</Link></li>
          <li><Link className="small_tr" href="/brands">브랜드</Link></li>
          <li><Link className="small_tr" href="/community">커뮤니티</Link></li>
        </ul>
      </nav>
    </header>
  );
}
