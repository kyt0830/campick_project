import Image from 'next/image'
import Link from 'next/link'
import styles from "./not-found.module.css";


export default function NotFound() {
  return (
      <div className={styles.wrap}>
        <div className={styles.errorcode}>
          <Image src="/images/404_image.png" alt="캠핑 픽셀 아이콘" width={245} height={189}/>
          
          <h1>404</h1>
        </div>
        <div className={styles.errorinfo}>
          <h2 className={styles.title}>
            페이지를 찾을 수 없습니다
          </h2>
          <p className={styles.desc}>
            입력하신 주소가 잘못되었거나 <br/>
            페이지가 삭제/이동되었을 수 있습니다.
          </p>
        </div>
        <div className={styles.go}>
          <Link href="/" className={styles.go_btn}>
            🏠 홈페이지 가기
          </Link>
        </div>
      </div>
  )
}
