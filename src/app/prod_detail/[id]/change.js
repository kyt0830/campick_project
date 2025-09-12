'use client';
import { useState } from "react";
import { createClient } from '../../../utils/supabase/client';
import styles from "./page.module.css"

export default function Change({ option }) {
  const supabase = createClient();
  const [product, setProduct] = useState(option);
  const handle = async (evt) => {
    if (confirm("상품의 상태를 변경 할까요?")) {
      const newStatus = evt.target.value;
      const { data, error } = await supabase
        .from("Product")
        .update({ prod_status: newStatus })
        .eq("prod_id", product.prod_id)
        .single()
        .select()
      if (error) {
        console.error("업데이트 실패:", error.message);
        return;
      }
      // 상태 업데이트(중요!)
      setProduct((prev) => ({
        ...prev,
        prod_status: newStatus
      }));
      console.log(data);
    } else {
      return;
    }
  }
  return (
    <>
      <select
        className={styles.brand_btn}
        value={product.prod_status}
        onChange={handle}
      >
        <option value={1} >판매중</option>
        <option value={0} >판매완료</option>
      </select>
    </>
  );
}