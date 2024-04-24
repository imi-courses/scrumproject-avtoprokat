import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CAR_ROUTE } from "../utils/consts";
const CarItem= ({ car }) => {
  
  const navigate = useNavigate();
  return (
    <Col
      md={3}
      className={"mt-3"}
      onClick={() => navigate(CAR_ROUTE + "/" + car.id)}
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
  );
};

export default CarItem;
