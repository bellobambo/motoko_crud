import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { motoko_crud_backend } from "../../declarations/motoko_crud_backend";

const Create = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    const data = {
      firstname: firstName,
      lastname: lastName,
    };
    motoko_crud_backend.created(data).then((res) => {
      console.log("Data fetched", res);
      alert("New User Added!");
      window.location.href = "/";
    });
  };
  return (
    <>
      <div>Create New User</div>
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
      </Form>
    </>
  );
};

export default Create;
