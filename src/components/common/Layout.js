import React, { useEffect, useRef } from "react";

const Layout = (props) => {
  const frame = useRef(null);

  useEffect(() => {
    frame.current.classList.remove("on");
    frame.current.classList.add("on");
    return () => {};
  }, []);

  return (
    <section className={`content ${props.title}`} ref={frame}>
      <figure></figure>
      <div className="inner">
        <h1>{props.title}</h1>
        {props.children}
      </div>
    </section>
  );
};

export default Layout;
