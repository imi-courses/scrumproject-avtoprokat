import React, { useContext } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
  USERPAGE_ROUTE,
} from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../http/userAPI";

const NavBar = observer(() => {
  const { user: userStore } = useContext(Context);
  const navigate = useNavigate();

  const logOut = async () => {
    let data = await fetchUser();
    if (data.role == "ADMIN") {
      userStore.setIsAuth(false);
      userStore.setIsUser(false);
    } else {
      userStore.setIsUser(false);
    }
    userStore.setUser({});
    localStorage.clear("token");
    navigate(LOGIN_ROUTE);
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
          Автопрокат №1
        </NavLink>
        {userStore.isUser ? (
          userStore.isAuth ? (
            <Nav className="ml-auto" style={{ color: "white" }}>
              <Button
                variant={"outline-light"}
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                Админ панель
              </Button>
              <Button
                variant={"outline-light"}
                onClick={() => navigate(USERPAGE_ROUTE)}
                className="ms-2"
              >
                Профиль
              </Button>
              <Button
                variant={"outline-light"}
                onClick={() => logOut()}
                className="ms-2"
              >
                Выйти
              </Button>
            </Nav>
          ) : (
            <Nav className="ml-auto" style={{ color: "white" }}>
              <Button
                variant={"outline-light"}
                onClick={() => navigate(USERPAGE_ROUTE)}
                className="ms-2"
              >
                Профиль
              </Button>
              <Button
                variant={"outline-light"}
                onClick={() => logOut()}
                className="ms-2"
              >
                Выйти
              </Button>
            </Nav>
          )
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});
export default NavBar;
