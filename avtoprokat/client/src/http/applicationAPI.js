import { $authHost, $host } from ".";

export const createApplication = async (cars) => {
  const { data } = await $authHost.post("api/application", {
    cars: cars,
  });
  return data;
};

export const fetchApplications = async (page, limit = 5) => {
  const { data } = await $host.get("api/application", {
    params: {
      page,
      limit,
    },
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return data;
};

export const fetchAdminApplications = async (page, limit = 5) => {
  const { data } = await $host.get("api/application/admin", {
    params: {
      page,
      limit,
    },
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return data;
};

export const fetchApplication = async (id) => {
  const { data } = await $host.get("api/application/" + id);
  return data;
};

export const changeApplicationStatus = async (id, status) => {
  const { data } = await $authHost.patch("api/application/" + id, {
    status,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return data;
};
