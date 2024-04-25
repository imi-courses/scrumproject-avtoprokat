import React, { useContext } from "react";
import { Col, Container, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";

import BasketList from "../components/BasketList";
import { Context } from "../index";
import { createApplication } from "../http/applicationAPI";

const Basket = observer(() => {
  const { basket: basketStore } = useContext(Context);
  const handleSendApplication = () => {
    createApplication(
      JSON.stringify(
        basketStore.basketCars.map((basketCar) => {
          return {
            date_start: basketCar.date_start,
            date_end: basketCar.date_end,
            carId: basketCar.car.id,
          };
        })
      )
    )
      .then((_) => alert("Ваша заявка отправлена"))
      .catch((error) => alert(error));
  };

  return (
    <Container>
      <Col>
        <div className="mb-3">Корзина</div>
        <BasketList />
        {basketStore.basketCars?.length > 0 && (
          <Button
            className="mt-3"
            variant="primary"
            onClick={handleSendApplication}
          >
            Арендовать
          </Button>
        )}
      </Col>
    </Container>
  );
});

export default Basket;
