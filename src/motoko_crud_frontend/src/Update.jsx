import React, { useEffect, useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { motoko_crud_backend } from "../../declarations/motoko_crud_backend";
import { Link, useParams } from "react-router-dom";

const Update = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { id } = useParams();

  let id2 = parseInt(id, 10);

  useEffect(() => {
    motoko_crud_backend.read(id2).then((res) => {
      console.log("Data fetched", res);
      setFirstName(res[0].firstname);
      setLastName(res[0].lastname);
    });
  }, []);

  const handleSubmit = (e) => {
    const data = {
      firstname: firstName,
      lastname: lastName,
    };
    motoko_crud_backend.update(id2, data).then((res) => {
      console.log("Data fetched", res);
      alert("User Updated!");
      window.location.href = "/";
    });
  };

  return (
    <>
      <Container fluid="md">
        <div>Update User</div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>First Name </Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              name="firstname"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name </Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              name="lastname"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Button variant="dark" onClick={handleSubmit}>
            Submit
          </Button>
          <Link to="/">Back</Link>
        </Form>
      </Container>
    </>
  );
};

export default Update;
