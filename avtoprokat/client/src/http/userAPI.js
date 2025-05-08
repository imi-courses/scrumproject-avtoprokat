import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    role: "USER",
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  if (data) {
    localStorage.setItem("token", data.token);
  }
};

export const checkAdmin = async () => {
  const { data } = await $authHost.get("api/user/admin", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  if (data) {
    localStorage.setItem("token", data.token);
  }
};

export const fetchUser = async () => {
  const { data } = await $host.get("api/user/data", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return data;
};

export const createUserData = async (user) => {
  const { data } = await $host.post("api/user", user);
  return data;
};
