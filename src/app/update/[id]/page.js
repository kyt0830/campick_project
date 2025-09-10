'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from "@supabase/supabase-js";
import Image from 'next/image';
import styles from '../../addprod/page.module.css';
import Head from 'next/head';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ProductUpdate() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const brands = [
    { title: "힐레베르그 Hilleberg", value: "A01" },
    { title: "몽벨 Montbell", value: "A02" },
    { title: "헬리녹스 Helinox", value: "A03" },
    { title: "노르디스트 Nordisk", value: "A04" },
    { title: "엠에스알 Msr", value: "A05" },
    { title: "니모 Nemo", value: "A06" },
  ];
  const categories = [
    { title: "텐트/타프", value: "A01" },
    { title: "침구/매트", value: "A02" },
    { title: "체어/테이블", value: "A03" },
    { title: "가구/가방/수납", value: "A04" },
    { title: "랜턴/조명", value: "A05" },
    { title: "키친", value: "A06" },
    { title: "버너/토치/화로", value: "A07" },
    { title: "쿨러/워터저그", value: "A08" },
    { title: "웨건/카드", value: "A09" },
    { title: "계절용품/기타", value: "A10" }
  ];

  const [prodData, setProdData] = useState({
    prod_title: '',
    prod_price: '',
    prod_category: '',
    prod_brand: '',
    prod_condition: '',
    warranty: '',
    prod_desc: '',
    trade_method: [], // 빈 배열로 시작
    tag: [],
    prod_images: []
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 기존 상품 데이터 불러오기
  useEffect(() => {
    if (!id) return;

    const fetchProductData = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from('Product')
          .select('*')
          .eq('prod_id', id)
          .single();
        console.log('수정할데이터 : ' + data);

        if (error) {
          console.error('상품 조회 실패:', error);
          alert('상품을 불러올 수 없습니다.');
          router.push('/sale_list');
          return;
        }

        if (!data) {
          alert('존재하지 않는 상품입니다.');
          router.push('/sale_list');
          return;
        }

        // 기존 데이터를 state에 설정
        setProdData({
          prod_title: data.prod_title || '',
          prod_price: data.prod_price?.toString() || '',
          prod_category: data.prod_category || '',
          prod_brand: data.prod_brand || '',
          prod_condition: data.prod_condition || '',
          warranty: data.warranty || '',
          prod_desc: data.prod_desc || '',
          trade_method: data.trade_method ?
            (typeof data.trade_method === 'string' ? data.trade_method.split(',') :
              Array.isArray(data.trade_method) ? data.trade_method : []) : [],
          tag: data.tag ? data.tag.split(',').map(t => t.trim()) : [],
          prod_images: data.prod_images ?
            (typeof data.prod_images === 'string' ? data.prod_images.split(',') :
              Array.isArray(data.prod_images) ? data.prod_images : []) : []
        });

      } catch (err) {
        console.error('데이터 불러오기 중 오류:', err);
        alert('오류가 발생했습니다.');
        router.push('/sale_list');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id, router]);

  // 기존 상품등록과 동일한 handleChange 함수 (더 효율적)
  const handleChange = (evt) => {
    const { name, value, type, checked } = evt.target;

    if (type === "checkbox") {
      setProdData((prev) => {
        let trade_method = [...prev.trade_method];
        if (checked) {
          trade_method.push(value);
        } else {
          trade_method = trade_method.filter((m) => m !== value);
        }
        return { ...prev, trade_method };
      });
    } else {
      setProdData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 파일 변경 처리 (기존과 동일)
  const handleFileChange = async (evt) => {
    const files = evt.target.files;
    if (!files || files.length === 0) return;

    // 기존 이미지와 새 이미지 합쳐서 10개 초과 방지
    if (prodData.prod_images.length + files.length > 10) {
      alert('이미지는 최대 10개까지 업로드 가능합니다.');
      return;
    }

    const uploadedUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = `${Date.now()}_${file.name}`;

      const { error } = await supabase.storage
        .from("prod_images")
        .upload(fileName, file);

      if (error) {
        console.error("이미지 업로드 실패:", error.message);
        continue;
      }

      const { data } = supabase.storage
        .from("prod_images")
        .getPublicUrl(fileName);

      if (data?.publicUrl) {
        uploadedUrls.push(data.publicUrl);
      }
    }

    setProdData((prev) => ({
      ...prev,
      prod_images: [...prev.prod_images, ...uploadedUrls],
    }));
  };

  // 이미지 제거 (기존과 동일)
  const removeImage = (indexToRemove) => {
    setProdData((prev) => ({
      ...prev,
      prod_images: prev.prod_images.filter((_, index) => index !== indexToRemove)
    }));
  };

  // 태그 관련 함수들 (기존과 동일)
  const addTags = () => {
    const tagInput = document.getElementById('tagInput');
    const inputValue = tagInput.value.trim();
    if (inputValue === '') return;

    if (prodData.tag.length >= 10) {
      alert('태그는 최대 10개까지 추가할 수 있습니다.');
      return;
    }

    if (prodData.tag.includes(inputValue)) {
      alert('이미 추가된 태그입니다.');
      return;
    }

    setProdData({
      ...prodData,
      tag: [...prodData.tag, inputValue]
    });
    tagInput.value = '';
  };

  const enterKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      addTags();
    }
  };

  const removeTag = (indexToRemove) => {
    setProdData({
      ...prodData,
      tag: prodData.tag.filter((_, index) => index !== indexToRemove)
    });
  };

  // 수정 제출 처리
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // 필수 필드 검증
      if (!prodData.prod_title.trim()) {
        alert('상품명을 입력해주세요.');
        return;
      }

      if (!prodData.prod_price.trim()) {
        alert('판매 가격을 입력해주세요.');
        return;
      }

      // 거래방식 검증
      if (prodData.trade_method.length === 0) {
        alert('거래 방식을 최소 1개 이상 선택해주세요.');
        return;
      }

      console.log('제출할 데이터:', {
        prod_condition: prodData.prod_condition,
        warranty: prodData.warranty,
        trade_method: prodData.trade_method
      }); // 디버깅용

      // 업데이트할 데이터 준비 (기존 등록과 동일한 형식)
      const updateData = {
        prod_title: prodData.prod_title,
        prod_price: Number(prodData.prod_price.replace(/[^0-9]/g, '')),
        prod_category: prodData.prod_category,
        prod_brand: prodData.prod_brand,
        prod_condition: prodData.prod_condition,
        warranty: prodData.warranty,
        prod_desc: prodData.prod_desc,
        trade_method: prodData.trade_method.join(","), // 배열 → 문자열 저장
        tag: prodData.tag.join(","),
        prod_images: prodData.prod_images.join(",") // 배열 → 문자열 저장
      };

      // Supabase 업데이트
      const { error } = await supabase
        .from('Product')
        .update(updateData)
        .eq('prod_id', id);

      if (error) {
        console.error('상품 수정 실패:', error);
        alert('상품 수정에 실패했습니다.');
        return;
      }

      alert('상품이 성공적으로 수정되었습니다.');
      router.push('/sale_list');

    } catch (err) {
      console.error('수정 중 오류:', err);
      alert('수정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 로딩 중일 때
  if (loading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <p>상품 정보 불러오는 중 🔥</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Campick - 상품 수정</title>
      </Head>
      {/* form  */}
      <div className={styles.form_content}>
        <h2 className={styles.form_title}>상품 수정하기</h2>
        <form className={styles.form_style} onSubmit={handleSubmit}>
          {/* 사진 업로드  */}
          <div className={styles.image_upload}>
            <label htmlFor="imageInput" className={styles.upload_box}>
              <span className={styles.upload_icon} aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px"
                  fill="#939393">
                  <path
                    d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Z" />
                </svg>
              </span>
              <span className={`small_tr ${styles.upload_img_count}`}>{prodData.prod_images.length}/10</span>
            </label>
            <input type="file" id="imageInput" multiple accept="image/*" onChange={handleFileChange} hidden />
          </div>

          {prodData.prod_images.length > 0 && (
            <div className={styles.uploaded_image_box}>
              {prodData.prod_images.slice(0, 10).map((imageUrl, index) => (
                <div key={index} className={styles.uploaded_image_item}>
                  {index === 0 && <span className={styles.thumbnail}>대표사진</span>}
                  <Image
                    src={imageUrl}
                    width={80}
                    height={80}
                    alt={`업로드된 이미지 ${index + 1}`}
                  />
                  <button
                    type="button"
                    className={styles.remove_image_btn}
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 상품명 */}
          <div className={styles.product_title}>
            <label className="ir_pm" htmlFor="prod_title">상품명</label>
            <input
              className={styles.label_box}
              type="text"
              id="prod_title"
              placeholder="상품명"
              name="prod_title"
              value={prodData.prod_title}
              onChange={handleChange}
              required
            />
          </div>

          {/* 판매 가격  */}
          <div className={styles.product_pirce}>
            <label className="ir_pm" htmlFor="prod_price">판매 가격</label>
            <input
              className={styles.label_box}
              type="text"
              id="prod_price"
              placeholder="판매 가격"
              name="prod_price"
              value={prodData.prod_price}
              onChange={handleChange}
              required
            />
          </div>

          {/* 카테고리 */}
          <div className={styles.product_category}>
            <select name="prod_category" value={prodData.prod_category} onChange={handleChange}>
              <option value="" disabled defaultValue="" >카테고리 선택</option>
              {categories.map((category, idx) => <option key={idx} value={category.value}>{category.title}</option>)}
            </select>
          </div>

          {/* 브랜드  */}
          <div className={styles.product_brand}>
            <select name="prod_brand" value={prodData.prod_brand} onChange={handleChange}>
              <option value="" disabled defaultValue="" >브랜드 선택</option>
              {brands.map((brand, idx) => <option key={idx} value={brand.value}>{brand.title}</option>)}
            </select>
          </div >

          {/* 제품 상태  */}
          <div className={styles.product_status}>
            <h3 className={`normal_tb ${styles.product_status_title} ${styles.title}`}>제품 상태</h3>
            <div className={styles.product_status_checkbox}>
              <input
                type="radio"
                name="prod_condition"
                value="new"
                id="new"
                checked={prodData.prod_condition === 'new'}
                title={prodData.prod_condition}
                onChange={handleChange}
              />
              <label className="small_tr" htmlFor="new">미개봉</label>

              <input
                type="radio"
                name="prod_condition"
                value="good"
                id="good"
                checked={prodData.prod_condition === 'good'}
                onChange={handleChange}
              />
              <label className="small_tr" htmlFor="good">양호</label>

              <input
                type="radio"
                name="prod_condition"
                value="normal"
                id="normal"
                checked={prodData.prod_condition === 'normal'}
                onChange={handleChange}
              />
              <label className="small_tr" htmlFor="normal">보통</label>

              <input
                type="radio"
                name="prod_condition"
                value="used"
                id="used"
                checked={prodData.prod_condition === 'used'}
                onChange={handleChange}
              />
              <label className="small_tr" htmlFor="used">사용감 있음</label>

              <input
                type="radio"
                name="prod_condition"
                value="repair"
                id="repair"
                checked={prodData.prod_condition === 'repair'}
                onChange={handleChange}
              />
              <label className="small_tr" htmlFor="repair">수리/수선 필요</label>
            </div>
          </div>

          {/* 보증서 유무  */}
          <div className={styles.warranty_status}>
            <h3 className={`normal_tb ${styles.warranty_status_title} ${styles.title}`}>보증서 유무</h3>
            <div className={styles.warranty_status_checkbox}>
              <input
                type="radio"
                name="warranty"
                value="yes"
                id="yes"
                checked={prodData.warranty === 'yes'}
                onChange={handleChange}
              />
              <label className="small_tr" htmlFor="yes">유</label>

              <input
                type="radio"
                name="warranty"
                value="no"
                id="no"
                checked={prodData.warranty === 'no'}
                onChange={handleChange}
              />
              <label className="small_tr" htmlFor="no">무</label>
            </div>
          </div>

          {/* 자세한 설명  */}
          <div className={styles.product_description}>
            <h3 className={`normal_tb ${styles.product_description_title} ${styles.title}`}>자세한 설명</h3>
            <textarea
              id="prod_desc"
              className={styles.product_extra}
              name="prod_desc"
              rows="6"
              value={prodData.prod_desc}
              onChange={handleChange}
              placeholder="구매자가 알아야 할 정보를 입력해주세요.&#10;- 사용감(스크래치, 얼룩, 하자부분 등)&#10;- 사용기간(구매 시기 등)&#10;- 고장, 파손, 염색 등 하자 정보는 꼭 기재해주세요!"
            />
          </div>

          {/* 거래 방식 (기존과 동일한 방식) */}
          <div className={styles.trade_status}>
            <h3 className={`normal_tb ${styles.trade_title} ${styles.title}`}>거래 방식</h3>
            <div className={styles.trade_checkbox}>
              <input
                type="checkbox"
                name="trade_method"
                value="delivery"
                id="delivery"
                checked={prodData.trade_method.includes('delivery')}
                onChange={handleChange}
              />
              <label className="small_tr" htmlFor="delivery">택배</label>

              <input
                type="checkbox"
                name="trade_method"
                value="direct"
                id="direct"
                checked={prodData.trade_method.includes('direct')}
                onChange={handleChange}
              />
              <label className="small_tr" htmlFor="direct">직거래</label>
            </div>
          </div>

          {/* 태그(선택 사항) */}
          <div className={styles.product_tag}>
            <h3 className={`normal_tb ${styles.product_tag_title} ${styles.title}`}>태그(선택 사항) <span className="xsmall_tr">최대 10개</span></h3>
            <div className={styles.product_tag_content}>
              <div className={styles.product_tag_input}>
                <input
                  type="text"
                  id="tagInput"
                  className={styles.tag_input}
                  placeholder="예시 '새상품', '미개봉'"
                  onKeyDown={enterKeyPress}
                />
                <button type="button" className={`small_tr ${styles.tag_add_btn}`} onClick={addTags}>추가</button>
              </div>
              <ul className={styles.tag_list}>
                {prodData.tag.map((tag, idx) => (
                  <li key={idx} className={`small_tr ${styles.tag_item}`}>
                    <span>{tag}</span>
                    <button type="button" className={styles.tag_delete_btn} onClick={() => removeTag(idx)}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px"
                        fill="#939393">
                        <path
                          d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button type="submit" className={styles.submit_button} disabled={isSubmitting}>
            상품 수정
          </button>
        </form>
      </div>
      {/* //form  */}
    </>
  );
}