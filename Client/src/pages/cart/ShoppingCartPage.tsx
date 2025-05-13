import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { AddCircleOutline, Delete, RemoveCircleOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import requests from "../../api/requests";
import { toast } from "react-toastify";
import ShoppingCartSummary from "./ShoppingCartSummary";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setCart } from "./cartSlice";

export default function ShoppingCartPage() {
  //const [loading, setLoading] = useState(true);

  const { cart } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState({loading: false, id: ""});

  function handleAddItem(productId: number, id: string){
    setStatus({loading: true, id: id});

    requests.Cart.addItem(productId)
      .then(cart => dispatch(setCart(cart)))
      .catch(error => console.log(error))
      .finally(() => setStatus({loading: false, id: ""}));
  }

  function handleRemoveItem(productId: number, id: string, quantity = 1){
    setStatus({loading: true, id: id});

    requests.Cart.deleteItem(productId, quantity)
      .then((cart) => dispatch(setCart(cart)))
      .catch(error => console.log(error))
      .finally(() => setStatus({loading: false, id: id}));
  }
  //if(loading) return <CircularProgress />
  if (cart?.cartItems.length === 0) return <Alert severity="warning">Sepetinizde ürün bulunmamaktadır.</Alert>

  // const totalItemCount = cart?.cartItems.reduce(
  //   (sum, item) => sum + item.quantity,
  //   0
  // );
  // const totalPrice = cart?.cartItems.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Ürün Adı</TableCell>
              <TableCell align="right">Fiyat</TableCell>
              <TableCell align="right">Adet</TableCell>
              <TableCell align="right">Toplam</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart?.cartItems.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    src={`http://localhost:5057/images/${item.imageUrl}`}
                    style={{ height: 60 }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">
                  {/* {(item.price / 100).toFixed(2)} ₺ */}
                  { currencyTRY.format(item.price)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton 
                    loading={status.loading && status.id === "add" + item.productId} 
                    onClick={() => handleAddItem(item.productId, "add" + item.productId)}>
                    <AddCircleOutline />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton 
                    loading={status.loading && status.id === "del" + item.productId}
                    onClick={() => handleRemoveItem(item.productId, "del" + item.productId)}>
                    <RemoveCircleOutline />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {/* {((item.price * item.quantity) / 100).toFixed(2)} ₺ */}
                  { currencyTRY.format(item.price * item.quantity)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton color="error" 
                    loading={status.loading && status.id === "del_all" + item.productId}
                    onClick={() => {
                      handleRemoveItem(item.productId, "del_all" + item.productId, item.quantity);
                      toast.error(`${item.name} sepetinizden silindi!`);
                      }}>
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
            {/* //cart summary */}
            <ShoppingCartSummary />
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Box mt={4}>
        <TableContainer
          component={Paper}
          sx={{ minWidth: 650, ml: "auto", mr: "auto" }}
        >
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", width: "150px" }}
                >
                  Toplam Ürün Adedi
                </TableCell>
                <TableCell align="right" sx={{ width: "80px" }}>
                  {totalItemCount}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", width: "150px" }}
                >
                  Toplam Fiyat
                </TableCell>
                <TableCell align="right" sx={{ width: "120px" }}>
                  {(totalPrice / 100).toFixed(2)} ₺
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box> */}
    </>
  );
}
