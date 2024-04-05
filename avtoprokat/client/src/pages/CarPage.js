import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneCar } from "../http/carAPI";

const CarPage = () => {
  const [car, setCar] = useState({ info: [] });
  const id = useParams();
  useEffect(() => {
    fetchOneCar(id).then((data) => setCar(data));
  }, []);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + car.img}
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-item-center">
            <h2>{car.name}</h2>
            <div
              className="d-flex align-item-center justify-content-center"
              style={{ fontSize: 64 }}
            >
              {car.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>От: {car.price} руб.</h3>
            <Button variant="outline-dark">Добавить в корзину</Button>
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
  );
};

export default CarPage;
