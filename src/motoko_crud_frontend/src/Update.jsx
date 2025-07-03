import React, { useEffect, useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { motoko_crud_backend } from "../../declarations/motoko_crud_backend";
import { Link, useParams } from "react-router-dom";

const Update = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);

  const { id } = useParams();

  let id2 = parseInt(id, 10);

  useEffect(() => {
    motoko_crud_backend.read(id2).then((res) => {
      console.log("Data fetched", res);
      setFirstName(res[0].firstname);
      setLastName(res[0].lastname);
      setImage(res[0].img ? res[0].img[0] : null);
    });
  }, []);

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

  const handleSubmit = (e) => {
    const data = {
      firstname: firstName,
      lastname: lastName,
      img: image === null ? [] : [image],
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
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="img" onChange={handleImage} />
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
