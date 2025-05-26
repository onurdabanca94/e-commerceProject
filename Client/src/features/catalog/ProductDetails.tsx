import Grid from '@mui/material/Grid';
import {
  CircularProgress,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router";
import requests from "../../api/requests";
import NotFound from "../../layout/errors/NotFound";
import { LoadingButton } from "@mui/lab";
import { AddShoppingCart } from "@mui/icons-material";
import { toast } from "react-toastify";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItemToCart } from "../cart/cartSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchProductById, selectProductById } from './catalogSlice';

export default function ProductDetailsPage() {
  const { cart, status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector(state => selectProductById(state, Number(id)));
  const { status: loading} = useAppSelector(state => state.catalog);

  const item = cart?.cartItems.find((i) => i.productId === product?.id);

  useEffect(() => {
    if(!product && id)
      dispatch(fetchProductById(parseInt(id)))
  }, [id]);

  const remainingStock = (product?.stock ?? 0) - (item?.quantity ?? 0);

  async function handleAddItem(id: number) {
    try {
      const productDetails = await requests.Catalog.details(id);

      const resultAction = await dispatch(addItemToCart({ productId: id }));
      const updatedCart = unwrapResult(resultAction);

      const existingItem = updatedCart.cartItems.find((i) => i.productId === id);
      const totalQuantity = existingItem?.quantity ?? 1;

      toast.success(
        `${productDetails.name} sepete eklendi! Şu anda sepetinizde ${totalQuantity} adet var.`
      );
    } catch (error) {
      console.log(error);
      toast.error("Ürün sepete eklenirken bir hata oluştu.");
    }
  }

  if (loading === "pendingFetchProductById") return <CircularProgress />;
  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xl={3} lg={4} md={5} sm={6} xs={12}>
        <img
          src={`http://localhost:5057/images/${product.imageUrl}`}
          style={{
            width: 400,
            height: 400,
            objectFit: "contain",
            borderRadius: 8,
            boxShadow: "0 0 8px rgba(0,0,0,0.1)",
          }}
        />
      </Grid>
      <Grid item xl={9} lg={8} md={7} sm={6} xs={12}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {currencyTRY.format(product.price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Stock</TableCell>
                <TableCell>{product.stock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }} alignItems="center">
          <LoadingButton
            variant="outlined"
            loadingPosition="start"
            startIcon={<AddShoppingCart />}
            loading={status === "pendingAddItem" + product.id}
            onClick={() => handleAddItem(product.id)}
          >
            Sepete Ekle
          </LoadingButton>
          {item?.quantity! > 0 && (
            <Typography variant="body2">
              Sepetinize {item?.quantity} adet eklendi. Stokta {remainingStock} adet kaldı.
            </Typography>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
