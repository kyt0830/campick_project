'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AddProductButton() {
  const pathname = usePathname();
  if (pathname === '/addprod') return null;

  return (
    <div className='btn_group'>
      <Link className="addprod_btn small_tr" href="/addprod">
        상품등록 +
      </Link>
    </div>
  );
}