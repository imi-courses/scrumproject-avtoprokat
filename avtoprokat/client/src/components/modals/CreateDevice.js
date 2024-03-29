import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { fetchBrands, fetchCars, fetchTypes } from "../../http/carAPI";

const CreateDevice = observer(({ show, onHide }) => {
  const { device: deviceStore } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  useEffect(() => {
    fetchTypes().then((data) => deviceStore.setTypes(data));
    fetchBrands().then((data) => deviceStore.setBrands(data));
    fetchCars().then((data) => deviceStore.setDevice(data));
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

  const addCar = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", deviceStore.selectedBrand.id);
    formData.append("typeId", deviceStore.selectedType.id);
    formData.append("info", JSON.stringify(info));
    CreateDevice(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="my-2">
            <Dropdown.Toggle>
              {deviceStore.selectedType.name || "Выберите тип"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {deviceStore.types.map((type) => (
                <Dropdown.Item
                  onClick={() => deviceStore.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="my-2">
            <Dropdown.Toggle>
              {deviceStore.selectedBrand.name || "Выберите бренд"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {deviceStore.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => deviceStore.setSelectedBrand(brand)}
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
            placeholder="Введите название устройства"
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Введите стоимость устройства"
            type="number"
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
          {info.map((item, index) => (
            <div key={item.number}>
              <Form.Control
                placeholder="Введите название свойства"
                value={item.title}
                onChange={(e) =>
                  handleInfoChange(index, "title", e.target.value)
                }
                className="my-2"
              />
              <Form.Control
                placeholder="Введите описание свойства"
                value={item.description}
                onChange={(e) =>
                  handleInfoChange(index, "description", e.target.value)
                }
                className="my-2"
              />
              <Button variant="danger" onClick={() => handleDeleteInfo(index)}>
                Удалить
              </Button>
              <hr />
            </div>
          ))}
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

export default CreateDevice;
