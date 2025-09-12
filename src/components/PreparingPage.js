import Image from "next/image";
import styles from "./PreparingPage.module.css";

export default function PreparingPage({ title }) {
  return (
    <div className={styles.container}>
        <Image
          src="/images/color_logo_small.png"
          alt="검색 결과 없음"
          width={48}
          height={76}
        />
        <br/>
        <div className={styles.preparingDesc}>
          <h1 className={styles.pagename}>{title}</h1>
          <p className={styles.preparing}> Comming Soon !</p>
        </div>
    </div>
  );
}