import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import {
  createCar,
  fetchBrands,
  fetchCars,
  fetchTypes,
  fetchOneCar
} from "../../http/carAPI";

const EditCar = observer(({carData, setCarData, show, onHide }) => {
  const { car: carStore } = useContext(Context);


  const [name, setName] = useState(carData.name);
  const [price, setPrice] = useState(carData.price);
  const [info, setInfo] = useState(carData.info);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchTypes().then((data) => carStore.setTypes(data));
    fetchBrands().then((data) => carStore.setBrands(data));
    fetchCars(null, null, 1, 3).then((data) => {
      carStore.setCars(data.rows);
      carStore.setTotalCount(data.count);
    });
  }, []);
  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const handleInfoChange = (index, key, value) => {
    let newInfo = [...info];
    info[index][key] = value;
    setInfo(newInfo);
  };
  const handleDeleteInfo = (index) => {
    let newInfo = [...info.filter((_, filterIndex) => filterIndex !== index)];
    setInfo(newInfo);
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

   useEffect(() => {
    setName(carData.name);
    setPrice(carData.price);
    setInfo(carData.info);
    setFile(null);
  }, [carData]);
  

  const addCar = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", carStore.selectedBrand.id);
    formData.append("typeId", carStore.selectedType.id);
    formData.append("info", JSON.stringify(info));
    createCar(formData).then((data) => {
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          df
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="my-2">
            <Dropdown.Toggle>
              {carStore.selectedType?.name || "Выберите тип"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {carStore.types.map((type) => (
                <Dropdown.Item
                  onClick={() => carStore.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="my-2">
            <Dropdown.Toggle>
              {carStore.selectedBrand?.name || "Выберите бренд"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {carStore.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => carStore.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
          
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
          
            type="number"
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
          
          <Button onClick={addInfo}>Добавить свойство</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addCar}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default EditCar;
