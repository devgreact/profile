import { Link, NavLink } from "react-router-dom";
/*
  NavLink 
  : 객체를 이용해서 포커스 스타일 적용
  : activeStyle="CSS객체" 이라는 props 에 적용
  : to="URI" props 는 필수
*/

const Header = () => {
  const active = { color: "hotpink" };
  return (
    <header>
      <div className="inner">
        <h1>
          <Link to="/">Logo</Link>
        </h1>
        <ul id="gnb">
          <li>
            <NavLink activeStyle={active} to="/department">
              Deparment
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={active} to="/community">
              Community
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={active} to="/gallery">
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={active} to="/youtube">
              Youtube
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={active} to="/location">
              Location
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={active} to="/join">
              Join
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
