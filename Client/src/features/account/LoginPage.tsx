import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import requests from "../../api/requests";

export default function LoginPage() {

  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(values);
    requests.Account.login(values);
  }
  
  function handleInputChange(e: any){
    const {name, value} = e.target;
    setValues({...values, [name]: value}); // {username: "", password: "" => username: "abc", password: "123"} sonradan yazılan önceki değerleri günceller ...values ile
  }

  return (
    <Container maxWidth="xs">
      <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
        {/* <Avatar alt="Onur Dabanca" src="/Client/images/avatar/1.jpg"/> */}
        {/* <Avatar alt="Onur Dabanca" sx={{ bgcolor: deepOrange[500]}}>OD</Avatar> */}
        <Avatar
          sx={{ mx: "auto", color: "primary.main", textAlign: "center", mb: 1 }}
        >
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          {" "}
          Giriş Yap{" "}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            name="username"
            value={values.username}
            onChange={handleInputChange}
            label="Kullanıcı Adı"
            fullWidth
            required
            autoFocus
            sx={{ mb: 2 }}
            size="small"
          ></TextField>
          <TextField
            name="password"
            value={values.password}
            onChange={handleInputChange}
            label="Şifre"
            type="password"
            fullWidth
            required
            autoFocus
            sx={{ mb: 2 }}
            size="small"
          ></TextField>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            Giriş Yap
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
