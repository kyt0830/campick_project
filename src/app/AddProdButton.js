/*
 * 파일명: AddProdButton.js
 * 담당자: 김영태
 * 작성일: 2025-09-11
 * 최근 수정일: 2025-09-11
 * 설명: 상품 등록 페이지로 이동하는 컴포넌트
 * 수정이력:
 * 
*/
'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AddProdButton() {
  const pathname = usePathname();
  if (pathname === '/addprod') return null;
  return (
    <div className="btn_group">
      <Link className="addprod_btn small_tr" href="/addprod">
        상품등록 +
      </Link>
    </div>
  );
}