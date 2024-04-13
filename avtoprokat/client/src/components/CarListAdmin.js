import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import CarItemAdmin from "./CarItemAdmin";

const CarListAdmin = observer(() => {
  const { car: carStore } = useContext(Context);
  return (
    <Row className="d-flex">
      {carStore.cars.map((car) => (
        <CarItemAdmin key={car.id} car={car} />
      ))}
    </Row>
  );
});

export default CarListAdmin;
