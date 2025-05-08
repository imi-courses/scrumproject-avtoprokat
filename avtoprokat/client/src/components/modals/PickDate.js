import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { observer } from "mobx-react-lite";

import { Context } from "../..";

const PickDate = observer(({ show, onHide, car }) => {
  const { basket: basketStore } = useContext(Context);
  const [dateStart, setDateStart] = useState(
    basketStore.basketCars.filter((basketCar) => basketCar.car.id === car.id)[0]
      ?.date_start ?? new Date().toISOString().split("T")[0]
  );
  const [dateEnd, setDateEnd] = useState(
    basketStore.basketCars.filter((basketCar) => basketCar.car.id === car.id)[0]
      ?.date_end ?? new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    setDateStart(
      basketStore.basketCars.filter(
        (basketCar) => basketCar.car.id === car.id
      )[0]?.date_start ?? new Date().toISOString().split("T")[0]
    );
    setDateEnd(
      basketStore.basketCars.filter(
        (basketCar) => basketCar.car.id === car.id
      )[0]?.date_end ?? new Date().toISOString().split("T")[0]
    );
  }, [show]);

  const handleAddCar = () => {
    if (
      basketStore.basketCars.filter((basketCar) => basketCar.car.id === car.id)
        .length === 0
    ) {
      basketStore.addCar({
        car: car,
        date_start: dateStart,
        date_end: dateEnd,
      });
    } else {
      console.log("edit");
      basketStore.editCar({
        car: car,
        date_start: dateStart,
        date_end: dateEnd,
      });
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Выберите даты аренды машины
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div>Выберите дату начала аренды</div>
          <Form.Control
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            type="date"
            min={new Date().toISOString().split("T")[0]}
          />
          <div className="mt-3">Выберите дату конца аренды</div>
          <Form.Control
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            type="date"
            min={new Date().toISOString().split("T")[0]}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={handleAddCar}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default PickDate;
