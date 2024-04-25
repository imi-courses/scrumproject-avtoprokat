import React , { useState ,useContext, useEffect} from "react";
import { Card, Col, Image,Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CAR_ROUTE } from "../utils/consts";
import EditCar from "../components/modals/EditCar";
import { observer } from "mobx-react-lite";
import { fetchOneCar } from "../http/carAPI";


const CarItemAdmin = ({car}) => {
  const [carData, setCarData] = useState({});
  useEffect(() => {
    fetchOneCar(car.id).then((data) => setCarData(data));
  }, []);
  const [carVisible, setCarVisible] = useState(false);
  const navigate = useNavigate();
  
  return (
    <Container>
    <Col
      md={3}
      className={"mt-3"}
      onClick={() => {setCarVisible(true)}}
    >
      <Card style={{ cursor: "pointer" }} border={"light"}>
        <Image
          height={150}
          src={process.env.REACT_APP_API_URL + car.img}
          style={{ objectFit: "contain", objectPosition: "center" }}
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div>
            <div>{car.price}</div>
          </div>
        </div>
        <div>{car.name}</div>
      </Card>
       
    </Col>
    <EditCar carData={carData} setCarData={setCarData} show={carVisible} onHide={() => setCarVisible(false)} />
   </Container>
  );
};

export default CarItemAdmin;
