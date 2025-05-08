import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { adminRoutes, authRoutes, publicRoutes } from "../routes";
import { Context } from "../index";

const AppRouter = observer(() => {
  const { user: userStore } = useContext(Context);
  return (
    <Routes>
      {userStore.isUser === true &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} Component={Component} exact />
        ))}
      {userStore.isAdmin === true &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} Component={Component} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} Component={Component} exact />
      ))}
      <Route path="*" element={<Navigate to="/" />} exact />
    </Routes>
  );
});

export default AppRouter;
