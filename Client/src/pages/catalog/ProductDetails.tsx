import {
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IProduct } from "../../model/IProduct";
import requests from "../../api/requests";
import NotFound from "../../components/errors/NotFound";
import { LoadingButton } from "@mui/lab";
import { AddShoppingCart } from "@mui/icons-material";
import { toast } from "react-toastify";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItemToCart } from "../cart/cartSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function ProductDetailsPage() {
  const { cart, status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  const item = cart?.cartItems.find((i) => i.productId === product?.id);

  useEffect(() => {
    id &&
      requests.Catalog.details(parseInt(id))
        .then((data) => setProduct(data))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
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

  if (loading) return <CircularProgress />;
  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xl={3} lg={4} md={5} sm={6} xs={12}>
        <img
          src={`http://localhost:5057/images/${product.imageUrl}`}
          style={{
            width: 400,         // Sabit genişlik (px olarak)
            height: 400,        // Sabit yükseklik (px olarak)
            objectFit: "contain", // Görsel orantısını korur, boşluk kalabilir
            borderRadius: 8,    // İstersen köşeleri hafif yuvarlatabilirsin
            boxShadow: "0 0 8px rgba(0,0,0,0.1)", // Hafif gölgeyle daha hoş görünür
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
              Sepetinize {item.quantity} adet eklendi. Stokta {remainingStock} adet kaldı.
            </Typography>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
