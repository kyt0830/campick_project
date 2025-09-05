/*
 * 파일명: page.js (messages.html)
 * 담당자: 김영태
 * 작성일: 2025-09-04
 * 최근 수정일: 2025-09-04
 * 설명: messages.html의 next.js 버전
 * 수정이력:
 *  2025-09-04: messages.html의 코드 next.js 문법으로 변경
*/

export const metadata = {
    title: "Campick - 메세지",
    description: "Welcome to Campick",
};

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css"

export default function messages() {

    return (
        <>
            {/* user_profile mypage.ver  */}
            <div className="user_profile_wrapper">
                <div className="profile_card">
                    <div className="profile_img_wrapper">
                        <Image
                            src="/images/user_profile_img.jpg"
                            width={72}
                            height={72}
                            alt=""
                        />
                    </div>
                    <div className="user_info">
                        <h2 id="user_id">User_ID</h2>
                        <ul className="stats_wrapper">
                            <li className="stat_item">
                                <h4 className="stat_title">게시글</h4>
                                <p className="stat_number">23</p>
                            </li>
                            <li className="stat_item">
                                <h4 className="stat_title">팔로워</h4>
                                <p className="stat_number">500</p>
                            </li>
                            <li className="stat_item">
                                <h4 className="stat_title">팔로잉</h4>
                                <p className="stat_number">234</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="point_card">
                    <h3 className="point_title">캠픽페이</h3>
                    <p className="point_value">5,000,000 원</p>
                    <div className="button_group">
                        <button className="point_btn">충전</button>
                        <button className="point_btn">이체</button>
                    </div>
                </div>
            </div>
            {/* //user_profile mypage.ver */}

            {/* tab_menu_title */}
            <ul className={styles.tab_menu}>
                <li className={`medium_tr active ${styles.tab_menu_title}`}>
                    <h3><a href="">전체</a></h3>
                </li >
                <li className={`medium_tr ${styles.tab_menu_title}`}>
                    <h3><a href="">판매</a></h3>
                </li >
                <li className={`medium_tr ${styles.tab_menu_title}`}>
                    <h3><a href="">거래</a></h3>
                </li >
            </ul >
            {/* //tab_menu_title  */}

            {/*  tab_menu_content  */}
            <ul className={styles.chat_list}>
                <li className={`${styles.chat_item} ${styles.message}`}>
                    <a className={styles.chat_link} href="" >
                        <div className={styles.chat_thumbnail}>
                            <Image
                                className={styles.product_thumb}
                                src="/images/product_img01.jpg"
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

                        </div >
                        <div className={styles.chat_info}>
                            <h4 className={`small_tr ${styles.chat_userid}`} > 캠핑이조아랑</h4 >
                            <p className={`xsmall_tr ${styles.chat_message}`}> 안녕하세요! 오늘 직거래 가능 한가요 ?</p >
                            <span className={styles.chat_time} > 30분 전</span >
                            {/* <!-- ::after --> */}

                        </div >
                    </a >
                    <button className={styles.chat_menu} >
                        ...
                    </button >
                </li >
                <li className={`${styles.chat_item} ${styles.message}`}>
                    <a className={styles.chat_link} href="" >
                        <div className={styles.chat_thumbnail}>
                            <Image
                                className={styles.product_thumb}
                                src="/images/product_img01.jpg"
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

                        </div >
                        <div className={styles.chat_info}>
                            <h4 className={`small_tr ${styles.chat_userid}`} > 캠핑이조아랑</h4 >
                            <p className={`xsmall_tr ${styles.chat_message}`}> 안녕하세요! 오늘 직거래 가능 한가요 ?</p >
                            <span className={styles.chat_time} > 30분 전</span >
                            {/* <!-- ::after --> */}

                        </div >
                    </a >
                    <button className={styles.chat_menu} >
                        ...
                    </button >
                </li >
                <li className={`${styles.chat_item}`}>
                    <a className={styles.chat_link} href="" >
                        <div className={styles.chat_thumbnail}>
                            <Image
                                className={styles.product_thumb}
                                src="/images/product_img01.jpg"
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

                        </div >
                        <div className={styles.chat_info}>
                            <h4 className={`small_tr ${styles.chat_userid}`} > 캠핑이조아랑</h4 >
                            <p className={`xsmall_tr ${styles.chat_message}`}> 안녕하세요! 오늘 직거래 가능 한가요 ?</p >
                            <span className={styles.chat_time} > 30분 전</span >
                            {/* <!-- ::after --> */}

                        </div >
                    </a >
                    <button className={styles.chat_menu} >
                        ...
                    </button >
                </li >
                <li className={`${styles.chat_item}`}>
                    <a className={styles.chat_link} href="" >
                        <div className={styles.chat_thumbnail}>
                            <Image
                                className={styles.product_thumb}
                                src="/images/product_img01.jpg"
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

                        </div >
                        <div className={styles.chat_info}>
                            <h4 className={`small_tr ${styles.chat_userid}`} > 캠핑이조아랑</h4 >
                            <p className={`xsmall_tr ${styles.chat_message}`}> 안녕하세요! 오늘 직거래 가능 한가요 ?</p >
                            <span className={styles.chat_time} > 30분 전</span >
                            {/* <!-- ::after --> */}

                        </div >
                    </a >
                    <button className={styles.chat_menu} >
                        ...
                    </button >
                </li >
                <li className={`${styles.chat_item}`}>
                    <a className={styles.chat_link} href="" >
                        <div className={styles.chat_thumbnail}>
                            <Image
                                className={styles.product_thumb}
                                src="/images/product_img01.jpg"
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

                        </div >
                        <div className={styles.chat_info}>
                            <h4 className={`small_tr ${styles.chat_userid}`} > 캠핑이조아랑</h4 >
                            <p className={`xsmall_tr ${styles.chat_message}`}> 안녕하세요! 오늘 직거래 가능 한가요 ?</p >
                            <span className={styles.chat_time} > 30분 전</span >
                            {/* <!-- ::after --> */}

                        </div >
                    </a >
                    <button className={styles.chat_menu} >
                        ...
                    </button >
                </li >
                <li className={`${styles.chat_item}`}>
                    <a className={styles.chat_link} href="" >
                        <div className={styles.chat_thumbnail}>
                            <Image
                                className={styles.product_thumb}
                                src="/images/product_img01.jpg"
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

                        </div >
                        <div className={styles.chat_info}>
                            <h4 className={`small_tr ${styles.chat_userid}`} > 캠핑이조아랑</h4 >
                            <p className={`xsmall_tr ${styles.chat_message}`}> 안녕하세요! 오늘 직거래 가능 한가요 ?</p >
                            <span className={styles.chat_time} > 30분 전</span >
                            {/* <!-- ::after --> */}

                        </div >
                    </a >
                    <button className={styles.chat_menu} >
                        ...
                    </button >
                </li >
                <li className={`${styles.chat_item}`}>
                    <a className={styles.chat_link} href="" >
                        <div className={styles.chat_thumbnail}>
                            <Image
                                className={styles.product_thumb}
                                src="/images/product_img01.jpg"
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

                        </div >
                        <div className={styles.chat_info}>
                            <h4 className={`small_tr ${styles.chat_userid}`} > 캠핑이조아랑</h4 >
                            <p className={`xsmall_tr ${styles.chat_message}`}> 안녕하세요! 오늘 직거래 가능 한가요 ?</p >
                            <span className={styles.chat_time} > 30분 전</span >
                            {/* <!-- ::after --> */}

                        </div >
                    </a >
                    <button className={styles.chat_menu} >
                        ...
                    </button >
                </li >
            </ul>
            {/* //tab_menu_content  */}
        </>
    )
}