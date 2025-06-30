import { useEffect, useState } from "react";
import { motoko_crud_backend } from "declarations/motoko_crud_backend";
import Table from "react-bootstrap/Table";

function App() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    motoko_crud_backend.readAll().then((res) => {
      console.log("Data fetched", res);
      setAllUsers(res);
    });
  }, []);

  return (
    <>
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
              <td>{val[0]}</td>
              <td>{val[1].firstname}</td>
              <td>{val[1].lastname}</td>
              <td>
                {" "}
                <a href="/update">Update</a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default App;
