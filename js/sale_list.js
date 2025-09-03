const tabs = document.querySelectorAll('.tab_menu a');
const lists = document.querySelectorAll('[data-list]');
const moreBtns = document.querySelectorAll('.more_btn');
const bottomSheet = document.querySelector('.more_popup');
const overlay = document.querySelector('.overlay');
const soldoutBtn = document.querySelector('.soldout_btn'); 
const soldoutTab = document.querySelector('.tab_menu a[data-filter="soldout"]');

let currentProductItem = null;

document.addEventListener('DOMContentLoaded', function() {
  restoreSoldoutProducts();
});

/* 상품 이미지 파일명 가져오기 */
function getProductId(productItem) {
  const imgElement = productItem.querySelector('.product_image img');
  
  if (imgElement && imgElement.src) {
    // 전체 URL에서 파일명만 추출
    const fileName = imgElement.src.split('/').pop();
    console.log('상품 ID (파일명):', fileName);
    return fileName;
  }
  
  /* 이미지를 못 찾은 경우: 상품의 DOM 위치로 구별 */
  const allItems = Array.from(document.querySelectorAll('.product_card_2col'));
  const index = allItems.indexOf(productItem);
  const fallbackId = `product_${index}`;
  console.log('상품 ID (인덱스):', fallbackId);
  return fallbackId;
}

/* 판매완료 상품들을 복원하는 함수 */
function restoreSoldoutProducts() {
  
  const sellingList = document.querySelector('[data-list="selling"]');
  const soldoutList = document.querySelector('[data-list="soldout"]');
  
  if (!sellingList || !soldoutList) {
    console.log('리스트를 찾을 수 없음');
    return;
  }
  
  const sellingItems = sellingList.querySelectorAll('.product_card_2col');
  const soldoutProducts = getSoldoutProducts();
  
  console.log('selling 아이템 개수:', sellingItems.length);
  console.log('저장된 판매완료 상품들:', soldoutProducts);
  
  sellingItems.forEach(item => {
    const productId = getProductId(item);
    
    if (soldoutProducts.includes(productId)) {
      console.log('판매완료 상품 복원:', productId);
      
      // disable 클래스 추가
      item.classList.add('disable');
      
      // soldout_badge 추가
      const productLink = item.querySelector('a');
      if (productLink) {
        const existingBadge = productLink.querySelector('.soldout_badge');
        if (!existingBadge) {
          const soldoutBadge = document.createElement('div');
          soldoutBadge.className = 'soldout_badge';
          soldoutBadge.textContent = '판매 완료';
          productLink.insertBefore(soldoutBadge, productLink.firstChild);
        }
      }
      
      // soldout 리스트로 이동
      item.remove();
      soldoutList.appendChild(item);
    }
  });
}

/* 판매완료 상태 확인 */
function isSoldout(productId) {
  const soldoutProducts = getSoldoutProducts();
  return soldoutProducts.includes(productId);
}

// 저장된 판매완료 상품 목록 가져오기
function getSoldoutProducts() {
  const stored = localStorage.getItem('soldoutProducts');
  return stored ? JSON.parse(stored) : [];
}

// 판매완료 상품 저장
function saveSoldoutProduct(productId) {
  const soldoutProducts = getSoldoutProducts();
  if (!soldoutProducts.includes(productId)) {
    soldoutProducts.push(productId);
    localStorage.setItem('soldoutProducts', JSON.stringify(soldoutProducts));
    console.log('판매완료 상품 저장됨:', productId);
  }
}

// 판매완료 상품 제거 (삭제 시 사용)
function removeSoldoutProduct(productId) {
  const soldoutProducts = getSoldoutProducts();
  const filteredProducts = soldoutProducts.filter(id => id !== productId);
  localStorage.setItem('soldoutProducts', JSON.stringify(filteredProducts));
  console.log('판매완료 목록에서 제거됨:', productId);
}

// 판매중/결제완료 list tab
tabs.forEach(tab => {
  tab.addEventListener('click', function(e) {
    e.preventDefault();

    // 탭 active 변경
    tabs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');

    const filter = this.dataset.filter;

    lists.forEach(list => {
      if (list.dataset.list === filter) {
        list.classList.remove('hidden');
      } else {
        list.classList.add('hidden');
      }
    });
  });
});

/* 더보기 btn */
moreBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    currentProductItem = e.target.closest('.product_card_2col');
    
    bottomSheet.classList.toggle('active');
    overlay.classList.toggle('active');
  });
});

/* 판매 완료 버튼 클릭 이벤트 */
soldoutBtn.addEventListener('click', function() {
  if (currentProductItem) {
    const productId = getProductId(currentProductItem);
    console.log('판매완료 처리할 상품 ID:', productId);
    
    const sellingList = document.querySelector('[data-list="selling"]');
    const soldoutList = document.querySelector('[data-list="soldout"]');
    
    if (sellingList && soldoutList) {
      saveSoldoutProduct(productId);
      
      currentProductItem.classList.add('disable');
      
      const productLink = currentProductItem.querySelector('a');
      if (productLink) {
        const existingBadge = productLink.querySelector('.soldout_badge');
        if (!existingBadge) {
          const soldoutBadge = document.createElement('div');
          soldoutBadge.className = 'soldout_badge';
          soldoutBadge.textContent = '판매 완료';
          productLink.insertBefore(soldoutBadge, productLink.firstChild);
        }
      }

      currentProductItem.remove();
      soldoutList.appendChild(currentProductItem);

      tabs.forEach(t => t.classList.remove('active'));
      if (soldoutTab) {
        soldoutTab.classList.add('active');
      }
      
      lists.forEach(list => {
        if (list.dataset.list === 'soldout') {
          list.classList.remove('hidden');
        } else {
          list.classList.add('hidden');
        }
      });
    }
    
    bottomSheet.classList.remove('active');
    overlay.classList.remove('active');
    currentProductItem = null;
  }
});

/* 팝업 외부 클릭 시 닫기 */
window.addEventListener('click', (e) => {
  if (!e.target.closest('.more_btn') && !e.target.closest('.more_popup')) {
    bottomSheet.classList.remove('active');
    overlay.classList.remove('active');
    currentProductItem = null;
  }
});

/*
// 수정 버튼 이벤트
const modifyBtn = document.querySelector('.modify_btn');
if (modifyBtn) {
  modifyBtn.addEventListener('click', function() {
    console.log('수정 버튼 클릭됨', currentProductItem);
    
    bottomSheet.classList.remove('active');
    overlay.classList.remove('active');
  });
}

// 삭제 버튼 이벤트
const deleteBtn = document.querySelector('.delete_btn');
if (deleteBtn) {
  deleteBtn.addEventListener('click', function() {
    if (currentProductItem && confirm('정말 삭제하시겠습니까?')) {
      const productId = getProductId(currentProductItem);
      removeSoldoutProduct(productId);
      
      currentProductItem.remove();
      
      bottomSheet.classList.remove('active');
      overlay.classList.remove('active');
      currentProductItem = null;
    }
  });

 
}
 */