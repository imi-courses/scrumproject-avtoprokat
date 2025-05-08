import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { createUserData, fetchUser } from "../../http/userAPI";

const CreateUserData = observer(({ userData, setUserData, show, onHide }) => {
  const [firstName, setFirstName] = useState(userData.first_name);
  const [lastName, setLastName] = useState(userData.last_name);
  const [middleName, setMiddleName] = useState(userData.middle_name);
  const [phoneNumber, setPhoneNumber] = useState(userData.phone_number);
  const [file, setFile] = useState(null);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addUserData = () => {
    const formData = new FormData();
    formData.append("id", userData.id);
    formData.append("phone_number", phoneNumber);
    formData.append("last_name", lastName);
    formData.append("first_name", firstName);
    formData.append("middle_name", middleName);
    if (file != null) {
      formData.append("img", file);
    }
    createUserData(formData)
      .then((_) => {
        onHide();
        fetchUser().then((data) => setUserData(data));
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  useEffect(() => {
    setFirstName(userData.first_name);
    setLastName(userData.last_name);
    setMiddleName(userData.middle_name);
    setPhoneNumber(userData.phone_number);
    setFile(null);
  }, [userData]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Редактирование профиля
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-3"
            placeholder="Введите вашу Фамилию"
          />
          <Form.Control
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-3"
            placeholder="Введите ваше Имя"
          />
          <Form.Control
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            className="mt-3"
            placeholder="Введите ваше Отчество"
          />
          <h6 className="mt-2">Введите свой номер Телефона</h6>
          <Form.Control
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-3"
            placeholder="Введите свой номер Телефона"
          />
          <h6 className="mt-2">Выберите Аватарку</h6>
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addUserData}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateUserData;
