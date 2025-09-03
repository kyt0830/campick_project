// 전체 동의 체크박스 기능
const allAgreeCheckbox = document.getElementById('all_agree');
const individualCheckboxes = document.querySelectorAll('.checkbox_input');

// 전체 동의 클릭 시
allAgreeCheckbox.addEventListener('change', function () {
	individualCheckboxes.forEach(checkbox => {
		checkbox.checked = this.checked;
	});
});

// 개별 체크박스 클릭 시
individualCheckboxes.forEach(checkbox => {
	checkbox.addEventListener('change', function () {
		const checkedCount = Array.from(individualCheckboxes).filter(cb => cb.checked).length;
		const totalCount = individualCheckboxes.length;

		// 모든 개별 약관이 체크되면 전체 동의도 체크
		allAgreeCheckbox.checked = checkedCount === totalCount;
	});
});

// 라벨 클릭으로도 동작하도록 (기본 동작이지만 명시적으로 구현)
document.querySelectorAll('.terms_detail_item').forEach(item => {
	item.addEventListener('click', function (e) {
		// 링크 클릭은 제외
		if (e.target.tagName === 'A') return;

		const checkbox = this.querySelector('.checkbox_input');
		if (checkbox) {
			checkbox.checked = !checkbox.checked;

			// change 이벤트 수동 트리거
			checkbox.dispatchEvent(new Event('change'));
		}
	});
});