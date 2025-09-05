import Image from "next/image";
import Link from 'next/link';

import "./page.module.css";

export const metadata = {
  title: "Campick - 조회",
  description: "Welcome to Campick",
};

export default function Search() {
  return (
    <>
      <div className="container">
        <div className="header">
          <a href="" className="back_button">
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
          <div className="search_input_container">
            <div className="search_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#222222"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
            </div>
            <input
              type="text"
              className="search_input"
              placeholder="어떤 캠핑 장비를 찾으시나요?"
            />
          </div>
        </div>

        <div className="search_section">
          <div className="recent_searches">
            <div className="section_header">
              <div className="section_title">
                <span className="section_icon">
                  <Image
                    src="/images/Magnifier_perspective_matte.jpg"
                    alt="Magnifier icon"
                    width={24}
                    height={24}
                  />
                </span>
                최근 검색어
              </div>
              <span className="clear_all small_tr">모두 지우기</span>
            </div>
            <div className="search_tags small_tr">
              <div className="search_tag">
                코오롱 스포츠
                <span className="tag_remove">×</span>
              </div>
              <div className="search_tag">
                힐레베르그 알락
                <span className="tag_remove">×</span>
              </div>
              <div className="search_tag">
                니모 아톰 2p
                <span className="tag_remove">×</span>
              </div>
              <div className="clear_all">더보기</div>
            </div>
          </div>

          <div className="popular_searches">
            <div className="section_header">
              <div className="section_title">
                <span className="section_icon">
                  <Image
                    src="/images/Fire_perspective_matte.jpg"
                    alt="Fire icon"
                    width={24}
                    height={24}
                  />
                </span>
                추천 검색어
              </div>
            </div>
            <div className="popular_tags small_tr">
              <div className="popular_tag">헬리녹스</div>
              <div className="popular_tag">겨울템</div>
              <div className="popular_tag">백패킹</div>
              <div className="popular_tag">애어 매트리스</div>
              <div className="popular_tag">70L 배낭</div>
              <div className="popular_tag">겨울 침낭</div>
              <div className="popular_tag">크레모아</div>
            </div>
          </div>

          <div className="trending_searches">
            <div className="section_header">
              <div className="section_title">
                <span className="section_icon">
                  <Image
                    src="/images/Chart_perspective_matte.jpg"
                    alt="Chart icon"
                    width={24}
                    height={24}
                  />
                </span>
                인기 검색어
              </div>
            </div>
            <ul className="trending_list">
              <li className="trending_item">
                <div className="trending_rank">1</div>
                <div className="trending_keyword">니모</div>
              </li>
              <li className="trending_item">
                <div className="trending_rank">2</div>
                <div className="trending_keyword">동계 텐트</div>
              </li>
              <li className="trending_item">
                <div className="trending_rank">3</div>
                <div className="trending_keyword">스노우 피크</div>
              </li>
              <li className="trending_item">
                <div className="trending_rank">4</div>
                <div className="trending_keyword">애어 텐트</div>
              </li>
              <li className="trending_item">
                <div className="trending_rank">5</div>
                <div className="trending_keyword">차박</div>
              </li>
              <li className="trending_item">
                <div className="trending_rank">6</div>
                <div className="trending_keyword">패밀리 텐트</div>
              </li>
              <li className="trending_item">
                <div className="trending_rank">7</div>
                <div className="trending_keyword">동계 침낭</div>
              </li>
              <li className="trending_item">
                <div className="trending_rank">8</div>
                <div className="trending_keyword">헬리녹스</div>
              </li>
              <li className="trending_item">
                <div className="trending_rank">9</div>
                <div className="trending_keyword">캠핑장 추천</div>
              </li>
              <li className="trending_item">
                <div className="trending_rank">10</div>
                <div className="trending_keyword">터널형 텐트</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}