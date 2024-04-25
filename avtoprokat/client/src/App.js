import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check, checkAdmin } from "./http/userAPI";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
  const { user: userStore } = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    check()
      .then((_) => {
        userStore.setUser(userStore.user);
        userStore.setIsUser(true);
        userStore.setisAdmin(false);
      })
      .catch(() => {});
    checkAdmin()
      .then((_) => {
        userStore.setUser(userStore.user);
        userStore.setIsUser(true);
        userStore.setisAdmin(true);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
