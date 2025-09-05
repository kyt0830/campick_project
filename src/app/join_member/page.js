import Image from "next/image";
import Link from 'next/link';

import "./page.module.css";

export const metadata = {
	title: "Campick - 회원가입 폼",
	description: "Welcome to Campick",
};

export default function JoinFormPage() {
	return (
		<div className="container">
			<h1 className="title">회원가입</h1>
			<div className="divider"></div>

			<form>
				<div className="section">
					<h2 className="section_title">1. 정보입력</h2>
					<p className="section_description">
						회원가입에 필요한 정보를 입력합니다.
					</p>

					<div className="form_group">
						<label className="form_label">
							이메일 <span className="required">*</span>
						</label>
						<input type="email" className="form_input" placeholder="" />
					</div>

					<div className="form_group">
						<label className="form_label">
							닉네임 <span className="required">*</span>
						</label>
						<input type="text" className="form_input" placeholder="" />
					</div>

					<div className="form_group">
						<label className="form_label">
							비밀번호 <span className="required">*</span>
						</label>
						<input type="password" className="form_input" placeholder="" />
					</div>

					<div className="form_group">
						<label className="form_label">
							비밀번호 확인 <span className="required">*</span>
						</label>
						<input type="password" className="form_input" placeholder="" />
					</div>

					<div className="form_group">
						<label className="form_label">
							휴대폰 번호 <span className="required">*</span>
						</label>
						<div className="input_with_button">
							<input type="tel" className="form_input" placeholder="" />
							<button type="button" className="verification_btn btn_normal">
								인증번호 발송
							</button>
						</div>
					</div>

					<div className="form_group">
						<label className="form_label">
							인증번호 <span className="required">*</span>
						</label>
						<div className="input_with_button">
							<input type="text" className="form_input" placeholder="" />
							<button type="button" className="verification_btn btn_normal">
								확인
							</button>
						</div>
					</div>
				</div>

				<div className="section terms_section">
					<h2 className="section_title">2. 약관 동의</h2>
					<p className="section_description">
						회원가입에 필요한 약관을 동의해 주세요.
					</p>

					<div className="terms_item all_agree">
						<div className="checkbox_container">
							<input type="checkbox" className="checkbox" id="all_agree" />
							<label className="checkbox_label" htmlFor="all_agree">
								전체 동의하기
							</label>
						</div>
					</div>

					<div className="terms_detail">
						<div className="terms_detail_item">
							<input type="checkbox" id="age-check" className="checkbox_input" />
							<label htmlFor="age-check" className="checkbox_icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="14px"
									viewBox="0 -960 960 960"
									width="14px"
								>
									<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
								</svg>
							</label>
							<span className="required_term">[필수]</span>
							<span>만 14세 이상입니다</span>
						</div>

						<div className="terms_detail_item">
							<input
								type="checkbox"
								id="terms-check"
								className="checkbox_input"
							/>
							<label htmlFor="terms-check" className="checkbox_icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="14px"
									viewBox="0 -960 960 960"
									width="14px"
								>
									<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
								</svg>
							</label>
							<span className="required_term">[필수]</span>
							<span>이용약관 동의</span>
						</div>

						<div className="terms_detail_item">
							<input
								type="checkbox"
								id="privacy-check"
								className="checkbox_input"
							/>
							<label htmlFor="privacy-check" className="checkbox_icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="14px"
									viewBox="0 -960 960 960"
									width="14px"
								>
									<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
								</svg>
							</label>
							<span className="required_term">[필수]</span>
							<span>개인 정보 수집 및 이용 동의</span>
						</div>

						<div className="terms_detail_item">
							<input
								type="checkbox"
								id="privacy-optional"
								className="checkbox_input"
							/>
							<label htmlFor="privacy-optional" className="checkbox_icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="14px"
									viewBox="0 -960 960 960"
									width="14px"
								>
									<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
								</svg>
							</label>
							<span className="optional_term">[선택]</span>
							<span>개인 정보 수집 및 이용 동의</span>
						</div>

						<div className="terms_detail_item">
							<input
								type="checkbox"
								id="marketing-check"
								className="checkbox_input"
							/>
							<label htmlFor="marketing-check" className="checkbox_icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="14px"
									viewBox="0 -960 960 960"
									width="14px"
								>
									<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
								</svg>
							</label>
							<span className="optional_term">[선택]</span>
							<span>광고성 정보 수신 모두 동의</span>
						</div>
					</div>
				</div>

				<button type="submit" className="signup_btn btn_normal">
					회원가입
				</button>
			</form>
		</div>
	);
}