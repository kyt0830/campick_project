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
            <span style={styles.strong}>방문해 주셔서 감사합니다!</span><br />
            보다 원활한 서비스 이용을 위해 아래 테스트 계정으로 로그인 후 이용해 주시길 바랍니다.<br />
            <br />
            테스트 아이디: user01@test.com<br/>
            테스트 비밀번호: 1234
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
  notice: {
    fontSize: '24px',
    textAlign: 'center',
    fontWeight: 'bold'
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
  strong: {
    fontWeight: 'bold',
    color: "#333"
  }
};