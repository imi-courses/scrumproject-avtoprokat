import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import CarItem from "./CarItem";

const BasketList = observer(() => {
  const { basket: basketStore } = useContext(Context);
  return (
    <Row className="d-flex">
      {basketStore.basketCars.map((basketCar, index) => (
        <CarItem key={index} car={basketCar.car} />
      ))}
    </Row>
  );
});

export default BasketList;
