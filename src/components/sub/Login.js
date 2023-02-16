import React from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  // 화면이동
  const history = useHistory();
  // 카카오 로그인
  const kakaoLogin = () => {
    window.Kakao.Auth.login({
      scope: "profile_nickname, profile_image, account_email", //동의항목 페이지에 있는 개인정보 보호 테이블의 활성화된 ID값을 넣습니다.
      success: function (response) {
        console.log("결과값", response); // 로그인 성공하면 받아오는 데이터
        window.Kakao.API.request({
          // 사용자 정보 가져오기
          url: "/v2/user/me",
          _success: (res) => {
            const kakao_account = res.kakao_account;
            console.log("사용자 정보", kakao_account);
            // 사용자 정보를 받은 경우
            // localStorage 저장 또는 redux 저장
            history.push("/logout");
          },
          get success() {
            return this._success;
          },
          set success(value) {
            this._success = value;
          },
        });
      },
      fail: function (error) {
        console.log("에러가났니?", error);
      },
    });
  };
  return (
    <div>
      {/* 카카오 로그인 */}
      <button onClick={kakaoLogin}>카카오 로그인</button>
    </div>
  );
};

export default Login;
