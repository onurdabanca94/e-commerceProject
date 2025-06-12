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
import { useNavigate } from "react-router";
import requests from "../../api/requests";
import { toast } from "react-toastify";

export default function RegisterPage() {
  
  const navigate = useNavigate();

  const {register, handleSubmit, setError, formState: {errors, isSubmitting, isValid}} = useForm({
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: ""
    },
    mode: "onTouched"
  });

  //username password bilgileri.
  async function submitForm(data: FieldValues){
    requests.Account.register(data)
        .then(() => {
            toast.success("Kullanıcı oluşturuldu!");
            navigate("/login")
    }).catch(result => {
        const {data: errors} = result;

        errors.forEach((error: any) => {
            if(error.code == "DuplicateUserName"){
                setError("username", { message: error.description });
            }
            else if(error.code == "DuplicateEmail"){
                setError("email", { message: error.description });
            }
        });
    });
  }

  return (
    <Container maxWidth="xs">
      <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
        <Avatar
          sx={{ mx: "auto", color: "primary.main", textAlign: "center", mb: 1 }}
        >
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Kayıt Ol
        </Typography>
        <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 2 }}>
          <TextField
            {...register("username", {required: "Kullanıcı adı zorunludur."})}
            label="Kullanıcı Adı"
            fullWidth
            autoFocus
            sx={{ mb: 2 }}
            size="small"
            error={!!errors.username}
            helperText={errors.username?.message}
          ></TextField>
          <TextField
            {...register("name", {
                required: "İsim zorunludur."
                }
            )}
            label="İsim"
            fullWidth
            sx={{ mb: 2 }}
            size="small"
            error={!!errors.name}
            helperText={errors.name?.message}
          ></TextField>
          <TextField
            {...register("email", {required: "E-mail zorunludur.",
                    pattern: {
                    value:  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "E-mail geçerli değil!"
                }
            })}
            label="E-mail"
            fullWidth
            sx={{ mb: 2 }}
            size="small"
            error={!!errors.email}
            helperText={errors.email?.message}
          ></TextField>
          <TextField
            {...register("password", {required: "Şifre zorunludur.", minLength: {
              value: 6,
              message: "Minimum 6 karakter girmelisiniz."
            }})}
            label="Şifre"
            type="password"
            fullWidth
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
            Kayıt Ol
          </LoadingButton>
        </Box>
      </Paper>
    </Container>
  );
}
