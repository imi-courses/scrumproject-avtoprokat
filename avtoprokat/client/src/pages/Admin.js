import React, { useState ,useContext, useEffect} from "react";
import { Button, Container,Row,Col } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateCar from "../components/modals/CreateCar";
import CreateType from "../components/modals/CreateType";
import CarListAdmin from "../components/CarListAdmin";
import Pages from "../components/Pages";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchBrands, fetchCars, fetchTypes } from "../http/carAPI";

const Admin = observer(() => {
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
    fetchCars(null, null, carStore.page ? carStore.page : 1, 3).then((data) => {
      carStore.setCars(data.rows);
      carStore.setTotalCount(data.count);
    });
  }, [carStore.page, carStore.selectedType, carStore.selectedBrand]);
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [carVisible, setCarVisible] = useState(false);
  return (
    <Container className="d-flex flex-column">
      <Button
        variant="outline-dark"
        className="mt-4 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Добавить тип
      </Button>
      <Button
        variant="outline-dark"
        className="mt-4 p-2"
        onClick={() => setBrandVisible(true)}
      >
        Добавить бренд
      </Button>
      <Button
        variant="outline-dark"
        className="mt-4 p-2"
        onClick={() => setCarVisible(true)}
      >
        Добавить машину
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateCar show={carVisible} onHide={() => setCarVisible(false)} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
    
          <CarListAdmin />
         <Pages />
      
     
    </Container>
  );
});

export default Admin;
