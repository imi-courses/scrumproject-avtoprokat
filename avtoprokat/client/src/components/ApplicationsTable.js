import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { APPLICATIONS_ROUTE } from "../utils/consts";

const ApplicationsTable = ({ applications }) => {
  const navigate = useNavigate();
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>UserId</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application) => (
          <tr key={application.id}>
            <td>{application.id}</td>
            <td>{application.userId}</td>
            <td>
              <Button
                variant="primary"
                onClick={() =>
                  navigate(APPLICATIONS_ROUTE + "/" + application.id)
                }
              >
                Перейти
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ApplicationsTable;
