import "./App.css";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { addData, deleetData, updateData } from "./Actions/action";
import React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function App() {
  const reduxData = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const [editData, setEditData] = React.useState(false);
  const [editValue, setEditValue] = React.useState({ item: "", id: "" });

  const inputValidation = Yup.object().shape({
    value: Yup.string().required("Required").trim(),
  });

  const editInputValidation = Yup.object().shape({
    editDataValue: Yup.string().required("Required").trim(),
  });

  const setOnClickValue = (item, id) => {
    setEditValue({ item, id });
    setEditData(true);
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ my: 3 }}>
        <Grid
          sx={{
            borderRadius: "25px",
            p: 2,
            boxShadow: 5,
          }}
        >
          <Typography variant="h4" align="center" sx={{ m: 1 }}>
            Todo App
          </Typography>

          {!editData ? (
            <Formik
              initialValues={{
                value: "",
              }}
              validationSchema={inputValidation}
              onSubmit={(values, event) => {
                var flag = true;
                reduxData.length > 0 &&
                  reduxData.map((item) =>
                    item === values.value ? (flag = false) : null
                  );
                flag && dispatch(addData(values));
                event.resetForm({ editDataValue: "", value: "" });
              }}
            >
              {({ values, handleChange, errors, touched }) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        id="value"
                        name="value"
                        label="Enter Value"
                        value={values.value}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                      />
                      {errors.value && touched.value && (
                        <div style={{ color: "red" }}>{errors.value}</div>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} align="center">
                      <Button
                        type="submit"
                        sx={{ width: 100, m: 3 }}
                        variant="contained"
                        color="success"
                      >
                        Add List
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          ) : (
            <Formik
              enableReinitialize
              initialValues={{
                editDataValue: editValue.item,
              }}
              validationSchema={editInputValidation}
              onSubmit={(values, event) => {
                var flag = true;
                reduxData.length > 0 &&
                  reduxData.map((item) =>
                    item === values.editDataValue ? (flag = false) : null
                  );
                flag &&
                  dispatch(updateData(values.editDataValue, editValue.id)) &&
                  setEditData(false);
                event.resetForm({ editDataValue: "", value: "" });
              }}
            >
              {({ values, handleChange, errors, touched }) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        id="editDataValue"
                        name="editDataValue"
                        label="Enter Value"
                        value={values.editDataValue}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                      />
                      {errors.editDataValue && touched.editDataValue && (
                        <div style={{ color: "red" }}>
                          {errors.editDataValue}
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} align="center">
                      <Button
                        type="submit"
                        sx={{ width: 100, m: 3 }}
                        variant="contained"
                        color="success"
                      >
                        Edit
                      </Button>
                      <Button
                        type="cancle"
                        sx={{ width: 100, m: 3 }}
                        variant="contained"
                        color="error"
                        onClick={() => setEditData(false)}
                      >
                        Cancle
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          )}
        </Grid>
      </Container>

      {reduxData.length > 0 && (
        <Container maxWidth="lg">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Index</StyledTableCell>
                  <StyledTableCell align="center">Notes</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reduxData.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{index}</TableCell>
                    <TableCell align="center">{item}</TableCell>
                    <TableCell align="right">
                      <Button
                        type="submit"
                        sx={{ width: 100 }}
                        variant="contained"
                        color="primary"
                        onClick={() => setOnClickValue(item, index)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="submit"
                        sx={{ width: 100, ml: 1 }}
                        variant="contained"
                        color="error"
                        onClick={() => dispatch(deleetData(item))}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </>
  );
}

export default App;
