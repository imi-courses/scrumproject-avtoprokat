import React, { useEffect, useState, useContext } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { deleteOneCar, fetchOneCar } from "../http/carAPI";
import { Context } from "..";
import PickDate from "../components/modals/PickDate";

const CarPage = observer(() => {
  const [car, setCar] = useState({ info: [] });
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: userStore, basket: basketStore } = useContext(Context);

  useEffect(() => {
    fetchOneCar(id).then((data) => setCar(data));
  }, []);

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md={4}>
            <Image
              width={300}
              height={300}
              src={process.env.REACT_APP_API_URL + car.img}
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
          </Col>
          <Col md={4}>
            <Row className="d-flex flex-column align-item-center">
              <div
                className="d-flex flex-column align-item-center justify-content-center"
                style={{ textAlign: "center" }}
              >
                <h2 style={{ textAlign: "start" }}>{car.name}</h2>
                <p style={{ fontSize: 36 }}>Рейтинг</p>
                <p style={{ fontSize: 64 }}>{car.rating}</p>
              </div>
            </Row>
          </Col>
          <Col md={4}>
            <Card
              className="d-flex flex-column align-items-center justify-content-evenly p-2"
              style={{
                width: 300,
                height: 300,
                fontSize: 32,
                border: "5px solid lightgray",
              }}
            >
              <h3>{car.price} руб.</h3>
              {userStore.isUser &&
                basketStore.basketCars.filter(
                  (basketCar) => basketCar.car.id === car.id
                )?.length === 0 && (
                  <Button variant="outline-dark" onClick={() => setOpen(true)}>
                    Добавить в корзину
                  </Button>
                )}
              {basketStore.basketCars.filter(
                (basketCar) => basketCar.car.id === car.id
              )?.length !== 0 && (
                <p style={{ fontSize: 20 }}>Вы уже добавили в корзину</p>
              )}
              {userStore.isUser &&
                basketStore.basketCars.filter(
                  (basketCar) => basketCar.car.id === car.id
                )?.length !== 0 && (
                  <Button
                    variant="danger"
                    onClick={() => basketStore.removeCar(car.id)}
                  >
                    Удалить из корзины
                  </Button>
                )}
              {userStore.isUser &&
                basketStore.basketCars.filter(
                  (basketCar) => basketCar.car.id === car.id
                )?.length !== 0 && (
                  <Button variant="dark-outlined" onClick={() => setOpen(true)}>
                    Изменить дату
                  </Button>
                )}
            </Card>
          </Col>
        </Row>
        <Row className="d-flex flex-column m-2">
          <h1>Характеристики</h1>
          {car.info.map((info, index) => (
            <Row
              key={info.id}
              style={{
                background: index % 2 === 0 ? "lightgray" : "transparent",
                padding: 10,
              }}
            >
              {info.title}: {info.description}
            </Row>
          ))}
        </Row>
      </Container>
      <PickDate show={open} onHide={() => setOpen(false)} car={car} />
    </>
  );
});

export default CarPage;
