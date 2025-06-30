import { useEffect, useState } from "react";
import { motoko_crud_backend } from "declarations/motoko_crud_backend";
import Table from "react-bootstrap/Table";

function App() {
  const [allUsers, setAllUsers] = useState("");

  useEffect(() => {
    motoko_crud_backend.readAll().then((res) => {
      console.log("Data fetched", res);
      // setAllUsers(allUsers);
    });
  }, []);

  return (
    <>
      <h1>List all users</h1>
      <Table responsive>
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Seven</td>
            <td>Luna</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default App;
