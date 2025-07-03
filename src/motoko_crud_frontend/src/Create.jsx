import React, { useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { motoko_crud_backend } from "../../declarations/motoko_crud_backend";

const Create = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = new FileReader();
      data.onload = () => {
        setImage(data.result);
      };
      data.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstname: firstName,
      lastname: lastName,
      img: image === null ? [] : [image], // ✅ Convert to optional type
    };

    try {
      const res = await motoko_crud_backend.created(data);
      console.log("Data fetched", res);
      alert("New User Added!");
      window.location.href = "/";
    } catch (err) {
      console.error("Submission failed", err);
      alert("Failed to create user.");
    }
  };

  return (
    <>
      <Container fluid="md">
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
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="img" onChange={handleImage} />
          </Form.Group>

          <Button variant="dark" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Create;
