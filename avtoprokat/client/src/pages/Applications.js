import { useState, useEffect } from "react";
import { Col, Container } from "react-bootstrap";

import CustomPagination from "../components/CustomPagination";
import { fetchApplications } from "../http/applicationAPI";
import ApplicationsTable from "../components/ApplicationsTable";
import { useNavigate } from "react-router-dom";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const getApplications = () => {
    fetchApplications(page, 10)
      .then((data) => {
        setApplications(data.rows);
        setCount(data.count);
      })
      .catch((error) => alert(error.response.data.message));
  };

  useEffect(() => {
    getApplications();
  }, [page]);

  return (
    <Container>
      <Col>
        <div className="mb-3">История</div>
        <ApplicationsTable applications={applications} />
        <CustomPagination
          page={page}
          setPage={setPage}
          count={count}
          limit={10}
        />
      </Col>
    </Container>
  );
};

export default Applications;
