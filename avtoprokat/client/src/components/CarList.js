import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import CarItem from "./CarItem";

const CarList = observer(() => {
  const { car: carStore } = useContext(Context);
  return (
    <Row className="d-flex">
      {carStore.cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </Row>
  );
});

export default CarList;
