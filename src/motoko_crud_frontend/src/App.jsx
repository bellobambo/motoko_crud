import { useEffect, useState } from "react";
import { motoko_crud_backend } from "declarations/motoko_crud_backend";
import Table from "react-bootstrap/Table";
import { Alert, Button, Container } from "react-bootstrap";

function App() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    motoko_crud_backend.readAll().then((res) => {
      console.log("Data fetched", res);
      setAllUsers(res);
    });
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
    motoko_crud_backend.delete(id).then((res) => {
      console.log("Data deleted", res);
      alert("User Deleted!");
      window.location.href = "/";
    });

    motoko_crud_backend.readAll().then((res) => {
      console.log("Data fetched", res);
      setAllUsers(res);
    });
  };

  return (
    <>
      <Container fluid="md">
        <h1>List all users</h1>
        <a href="/create">Add User</a>
        <Table responsive>
          <thead>
            <tr>
              <th>No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((val, i) => (
              <tr>
                <td>{i + 1}</td>
                {/* <td>{val[0]}</td> */}
                <td>{val[1].firstname}</td>
                <td>{val[1].lastname}</td>
                <td>
                  {" "}
                  <a href={`/update/${val[0]}`}>Update</a>
                  <Button
                    variant="dark"
                    onClick={(e) => handleDelete(e, val[0])}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default App;
