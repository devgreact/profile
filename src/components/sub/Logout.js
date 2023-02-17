import React from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  // 화면 이동
  const history = useHistory();
  // 카카오 기능
  // 카카오 로그 아웃
  const kakaoLogOut = () => {
    if (!window.Kakao.Auth.getAccessToken()) {
      console.log("Not logged in.");
      return;
    }
    window.Kakao.Auth.logout(function (response) {
      alert(response + " logout");
      // window.location.href='/'
      history.push("/");
    });
  };
  // 카카오 서비스 탈퇴
  const memberOut = () => {
    window.Kakao.API.request({
      url: "/v1/user/unlink",
      success: function (response) {
        console.log(response);
        //callback(); //연결끊기(탈퇴)성공시 서버에서 처리할 함수
        // window.location.href='/'
        history.push("/");
      },
      fail: function (error) {
        console.log("탈퇴 미완료");
        console.log(error);
      },
    });
  };
  //   네이버 로그아웃
  const naverLogout = () => {
    localStorage.removeItem("com.naver.nid.access_token");
    localStorage.removeItem("com.naver.nid.oauth.state_token");
    history.push("/");
  };
  const googleLogout = () => {
    console.log("구글 로그아웃 ", window.gapi);
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2 !== null) {
        auth2
          .signOut()
          .then(auth2.disconnect().then(() => onLogoutSuccess()))
          .catch((e) => console.log(e));
      }
    }
  };
  const onLogoutSuccess = () => {
    console.log("로그아웃 되었어요.");
  };
  return (
    <div>
      <button onClick={kakaoLogOut}>카카오 로그아웃</button>
      <button onClick={memberOut}>카카오 서비스 탈퇴</button>
      <button onClick={naverLogout}>네이버 로그아웃</button>
      <button onClick={googleLogout}>구글 로그아웃</button>
    </div>
  );
};

export default Logout;
