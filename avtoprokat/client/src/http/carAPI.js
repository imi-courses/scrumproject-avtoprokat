import { $authHost, $host } from ".";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const createCar = async (car) => {
  const { data } = await $authHost.post("api/car", car);
  return data;
};

export const fetchCars = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get("api/car", {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};

export const fetchOneCar = async (id) => {
  const { data } = await $host.get("api/car/" + id);
  return data;
};

export const deleteOneCar = async (id) => {
  const { data } = await $host.delete("api/car/" + id);
  return data;
};

export const updateCar = async (car) => {
  const { data } = await $host.post("api/car/update", car);
  return data;
};