import React, { useState, useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createType, fetchTypes } from "../../http/carAPI";
import { Context } from "../..";

const CreateType = ({ show, onHide }) => {
  const { car: carStore } = useContext(Context);
  const [value, setValue] = useState("");
  const addType = () => {
    createType({ name: value }).then((data) => {
      setValue("");
      onHide();
      fetchTypes().then((data) => carStore.setTypes(data));
    });
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form value={value} onChange={(e) => setValue(e.target.value)}>
          <Form.Control placeholder="Введите название типа" />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addType}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;
