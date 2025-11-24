'use client';

import { useEffect, useState } from 'react';

export default function ModalPopup({ content }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.notice}>안내의 말씀</h2>
        <div style={styles.body}>
            <p>
                현재 페이지는 <span style={styles.strong}>Supabase의 인증 정책</span>을 완화해 두었습니다.<br/>
                따라서 <span style={styles.strong}>회원가입, 로그인 과정 없이</span> 포트폴리오 기능을 체험할 수 있으며<br/>
                개인 정보는 별도로 수집하지 않습니다!
            </p>
        </div>
        <button style={styles.button} onClick={() => setOpen(false)}>
          닫기
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  notice:{
    fontSize : '24px',
    textAlign : 'center',
    fontWeight : 'bold'
  },
  modal: {
    background: '#fff',
    width: '90%',
    maxWidth: '560px',
    padding: '40px',
    borderRadius: '10px',
    maxHeight: '70vh',
    overflowY: 'auto',
  },
  body: {
    margin: '15px 0',
    lineHeight: 1.5,
  },
  button: {
    marginTop: '15px',
    width: '100%',
    padding: '10px',
    background: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  strong:{
    fontWeight : 'bold',
    color : "#b00303ff"
  }
};