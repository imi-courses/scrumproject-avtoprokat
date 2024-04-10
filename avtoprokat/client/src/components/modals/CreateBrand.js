import React, { useState, useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createBrand, fetchBrands } from "../../http/carAPI";
import { Context } from "../..";

const CreateBrand = ({ show, onHide }) => {
  const { car: carStore } = useContext(Context);
  const [value, setValue] = useState("");
  const addBrand = () => {
    createBrand({ name: value }).then((data) => {
      setValue("");
      onHide();
      fetchBrands().then((data) => carStore.setBrands(data));
    });
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить бренд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form value={value} onChange={(e) => setValue(e.target.value)}>
          <Form.Control placeholder="Введите название бренда" />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addBrand}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBrand;
