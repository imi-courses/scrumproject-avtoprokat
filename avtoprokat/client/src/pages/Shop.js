import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import CarList from "../components/CarList";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchBrands, fetchCars, fetchTypes } from "../http/carAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
  const { car: carStore } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => carStore.setTypes(data));
    fetchBrands().then((data) => carStore.setBrands(data));
    fetchCars(null, null, 1, 3).then((data) => {
      carStore.setCars(data.rows);
      carStore.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchCars(
      carStore.selectedType.id,
      carStore.selectedBrand.id,
      carStore.page,
      3
    ).then((data) => {
      carStore.setCars(data.rows);
      carStore.setTotalCount(data.count);
    });
  }, [carStore.page, carStore.selectedType, carStore.selectedBrand]);

  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <CarList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
