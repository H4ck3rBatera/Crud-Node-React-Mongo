import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";

import api from "../../services/api";

export default function UserCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { id } = useParams();

  useEffect(() => {
    async function getUser() {
      var response = await api.get("/api/users/" + id);

      setName(response.data.name);
      setEmail(response.data.email);
    }
    getUser();
  }, [id]);

  async function handleSubmit() {
    const data = {
      id: id,
      name: name,
      email: email,
      password: password,
    };

    if (name !== "" && email !== "" && password !== "") {
      try {
        const response = await api.put("/api/users", data);

        if (response.status === 200) {
          window.location.href = "/user";
        } else {
          alert(response.status);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Required!");
    }
  }

  return (
    <Container maxWidth="lg">
      <h2>Update User</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="E-mail"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            To save
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
