import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import api from "../../services/api";

export default function UserIndex() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/api/users");
      setUsers(response.data);
    }
    loadUsers();
  }, []);

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">E-mail</TableCell>
            <TableCell align="center">Created At</TableCell>
            <TableCell align="center">Updated At</TableCell>
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row._id}>
              <TableCell align="center" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">
                {new Date(row.createdAt).toLocaleString("pt-br")}
              </TableCell>
              <TableCell align="center">
                {new Date(row.updatedAt).toLocaleString("pt-br")}
              </TableCell>
              <TableCell align="right">
                <ButtonGroup aria-label="outlined primary button group">
                  <Button color="primary">Update</Button>
                  <Button color="secondary">Delete</Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
