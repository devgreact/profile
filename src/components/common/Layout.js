import React from "react";

// Layout.js : 공통 요소를 적용하기 위한 처리 컴포넌트
const Layout = (props) => {
  return (
    // 백틱을 이용해서 Props 로 전달된 값을
    // 이용해서 ClassName 으로 활용
    <section className={`content ${props.title}`}>
      <figure></figure>
      <div className="inner">
        <h1>{props.title}</h1>
        {/* 
            실제 컴포넌트내용 
            props.children 을 이용해서
            원하는 영역에 컴포넌트를 배치가능
        */}
        {props.children}
      </div>
    </section>
  );
};

export default Layout;
