import { useState, useEffect, useContext } from "react";
import { Col, Row, Container, Button, Card, Image } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import {
  changeApplicationStatus,
  fetchApplication,
} from "../http/applicationAPI";
import { fetchOneCar } from "../http/carAPI";
import { CAR_ROUTE } from "../utils/consts";
import { Context } from "..";

const ApplicationPage = () => {
  const { user: userStore } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();
  const [application, setApplication] = useState({});
  const [cars, setCars] = useState([]);

  const getApplication = () => {
    fetchApplication(id)
      .then((data) => {
        setApplication(data);
        getCars(data.application_cars);
      })
      .catch((error) => alert(error.response.data.message));
  };

  const getCars = (cars) => {
    Promise.all(
      cars?.map(async (car) => {
        return {
          ...car,
          ...(await fetchOneCar(car.carId)),
          applicationCarId: car.id,
        };
      })
    ).then((carsResponse) => setCars(carsResponse));
  };

  useEffect(() => {
    getApplication();
  }, []);

  const buildStatus = (status) => {
    switch (status) {
      case "WAITING":
        return "В ожидании";
      case "APPROVED":
        return "Принято";
      case "REJECTED":
        return "Отклонено";
      default:
        return "-";
    }
  };

  return (
    <Container>
      <Col>
        <div className="mb-3">Заявка №{id}</div>
        <div>
          ФИО:{" "}
          {application?.user?.last_name +
            " " +
            application?.user?.first_name +
            " " +
            application?.user?.middle_name}
        </div>
        <div>Email: {application?.user?.email}</div>
        <div>Номер Телефона: {application?.user?.phone_number}</div>
      </Col>
      <Row>
        {cars.map((car, index) => (
          <Col key={index} md={5} className={"mt-3"}>
            <Card style={{ cursor: "pointer" }} border={"light"}>
              <Image
                height={150}
                src={process.env.REACT_APP_API_URL + car.img}
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
              <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                <div>Цена: {car.price}</div>
                <div>
                  Начало: {new Date(car.date_start).toLocaleDateString()}
                </div>
                <div>Конец: {new Date(car.date_end).toLocaleDateString()}</div>
              </div>
              <div>{car.name}</div>
              <div>{buildStatus(car.status)}</div>
              {userStore.isAdmin ? (
                <Col className="d-flex justify-content-end">
                  <Button
                    onClick={() =>
                      changeApplicationStatus(car.applicationCarId, "APPROVED")
                        .then((_) => {
                          getApplication();
                        })
                        .catch((error) => alert(error))
                    }
                  >
                    Принять
                  </Button>
                  <Button
                    className="ms-3 me-3"
                    onClick={() =>
                      changeApplicationStatus(car.applicationCarId, "REJECTED")
                        .then((_) => {
                          getApplication();
                        })
                        .catch((error) => alert(error))
                    }
                  >
                    Отклонить
                  </Button>
                </Col>
              ) : (
                ""
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ApplicationPage;
