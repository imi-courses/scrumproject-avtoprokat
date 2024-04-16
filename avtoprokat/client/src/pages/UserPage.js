import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { fetchUser } from "../http/userAPI";
import CreateUserData from "../components/modals/CreateUserData";

const UserPage = () => {
  const [userVisible, setUserVisible] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetchUser().then((data) => setUserData(data));
  }, []);
  return (
    <Container className="mt-3">
      <Row>
        <Col md={3}>
          <Image
            width={250}
            height={250}
            src={
              userData.img != null
                ? process.env.REACT_APP_API_URL + userData.img
                : "./default-avatar.jpg"
            }
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </Col>
        <Col md={9}>
          <Row className="d-flex flex-column align-item-center">
            <h3>
              Email:{" "}
              {userData.email != null && userData.email != ""
                ? userData.email
                : "Пусто"}
            </h3>
          </Row>
          <Row className="d-flex flex-column align-item-center">
            <h3>
              Фамилия:{" "}
              {userData.last_name != null && userData.last_name != ""
                ? userData.last_name
                : "Пусто"}
            </h3>
          </Row>
          <Row className="d-flex flex-column align-item-center">
            <h3>
              Имя:{" "}
              {userData.first_name != null && userData.first_name != ""
                ? userData.first_name
                : "Пусто"}
            </h3>
          </Row>
          <Row className="d-flex flex-column align-item-center">
            <h3>
              Отчество:{" "}
              {userData.middle_name != null && userData.middle_name != ""
                ? userData.middle_name
                : "Пусто"}
            </h3>
          </Row>
          <Row className="d-flex flex-column align-item-center">
            <h3>
              Номер телефона:{" "}
              {userData.phone_number != null && userData.phone_number != ""
                ? userData.phone_number
                : "Пусто"}
            </h3>
          </Row>
          <Button
            variant="outline-dark"
            className="mt-2 p-2"
            onClick={() => setUserVisible(true)}
          >
            Редактировать
          </Button>
        </Col>
      </Row>
      {userData && (
        <CreateUserData
          userData={userData}
          setUserData={setUserData}
          show={userVisible}
          onHide={() => setUserVisible(false)}
        />
      )}
    </Container>
  );
};

export default UserPage;
