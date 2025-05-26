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
import ShoppingCartSummary from "./ShoppingCartSummary";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItemToCart, deleteItemFromCart } from "./cartSlice";
import { toast } from "react-toastify";

export default function ShoppingCartPage() {
  const { cart, status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (cart?.cartItems.length === 0)
    return <Alert severity="warning">Sepetinizde ürün bulunmamaktadır.</Alert>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="shopping cart table">
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
              <TableRow key={item.productId}>
                <TableCell component="th" scope="row">
                  <img
                    src={`http://localhost:5057/images/${item.imageUrl}`}
                    style={{ height: 60 }}
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">
                  {currencyTRY.format(item.price)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={status === "pendingAddItem" + item.productId}
                    onClick={() =>
                      dispatch(addItemToCart({ productId: item.productId }))
                        .unwrap()
                        .then(() =>
                          toast.success(`${item.name} sepete eklendi!`)
                        )
                        .catch(() =>
                          toast.error("Ürün sepete eklenemedi")
                        )
                    }
                  >
                    <AddCircleOutline />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={
                      status ===
                      "pendingDeleteItem" + item.productId + "single"
                    }
                    onClick={() =>
                      dispatch(
                        deleteItemFromCart({
                          productId: item.productId,
                          quantity: 1,
                          key: "single",
                        })
                      )
                        .unwrap()
                        .then(() =>
                          toast.info(`${item.name} adedi azaltıldı`)
                        )
                        .catch(() =>
                          toast.error("Ürün azaltılamadı")
                        )
                    }
                  >
                    <RemoveCircleOutline />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {currencyTRY.format(item.price * item.quantity)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    color="error"
                    loading={
                      status ===
                      "pendingDeleteItem" + item.productId + "all"
                    }
                    onClick={() =>
                      dispatch(
                        deleteItemFromCart({
                          productId: item.productId,
                          quantity: item.quantity,
                          key: "all",
                        })
                      )
                        .unwrap()
                        .then(() =>
                          toast.error(`${item.name} sepetten silindi!`)
                        )
                        .catch(() =>
                          toast.error("Ürün silinemedi")
                        )
                    }
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
            <ShoppingCartSummary />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
