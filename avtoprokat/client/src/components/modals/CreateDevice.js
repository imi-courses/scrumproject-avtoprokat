import React, { useContext, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Context } from "../..";

const CreateDevice = ({ show, onHide }) => {
  const { device: deviceStore } = useContext(Context);
  const [info, setInfo] = useState([]);
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
            <Dropdown.Toggle>Выберите тип</Dropdown.Toggle>
            <Dropdown.Menu>
              {deviceStore.types.map((type) => (
                <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="my-2">
            <Dropdown.Toggle>Выберите бренд</Dropdown.Toggle>
            <Dropdown.Menu>
              {deviceStore.brands.map((brand) => (
                <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className="mt-3"
            placeholder="Введите название устройства"
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите стоимость устройства"
            type="number"
          />
          <Form.Control className="mt-3" type="file" />
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
        <Button variant="outline-success" onClick={onHide}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDevice;
