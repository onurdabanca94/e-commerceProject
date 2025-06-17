import { LockOutlined } from "@mui/icons-material";
import { FieldValues, useForm } from 'react-hook-form';
import {
  Avatar,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { loginUser } from "./accountSlice";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../store/store";
import { getCart } from "../cart/cartSlice";

export default function LoginPage() {
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {register, handleSubmit, formState: {errors, isSubmitting, isValid}} = useForm({
    defaultValues: {
      username: "",
      password: ""
    }
  });

  //username password bilgileri.
  async function submitForm(data: FieldValues){
    await dispatch(loginUser(data));
    await dispatch(getCart());
    navigate("/catalog");
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
        <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 2 }}>
          <TextField
            {...register("username", {required: "Kullanıcı adı zorunludur."})}
            label="Kullanıcı Adı"
            fullWidth
            required
            autoFocus
            sx={{ mb: 2 }}
            size="small"
            error={!!errors.username}
            helperText={errors.username?.message}
          ></TextField>
          <TextField
            {...register("password", {required: "Şifre zorunludur.", minLength: {
              value: 6,
              message: "Minimum 6 karakter girmelisiniz."
            }})}
            label="Şifre"
            type="password"
            fullWidth
            required
            autoFocus
            sx={{ mb: 2 }}
            size="small"
            error={!!errors.password}
            helperText={errors.password?.message}
          ></TextField>
          <LoadingButton 
          loading={isSubmitting}
          disabled={!isValid} 
          type="submit" 
          variant="contained" 
          fullWidth sx={{ mt: 1 }}>
            Giriş Yap
          </LoadingButton>
        </Box>
      </Paper>
    </Container>
  );
}
