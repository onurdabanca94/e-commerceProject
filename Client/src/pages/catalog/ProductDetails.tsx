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
import { useCartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItemToCart, setCart } from "../cart/cartSlice";

export default function ProductDetailsPage() {

  const { cart, status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  // const [isAdded, setIsAdded] = useState(false);

  const item = cart?.cartItems.find(i => i.productId == product?.id);

  useEffect(() => {
    id &&
      requests.Catalog.details(parseInt(id))
        .then((data) => setProduct(data))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
  }, [id]);

  // function handleAddItem(id: number) {
  //   setIsAdded(true);
  
  //   requests.Catalog.details(id)
  //     .then(productDetails => {
  //       const existingItem = cart?.cartItems.find(i => i.productId === id);
  //       const existingQuantity = existingItem?.quantity ?? 0;
  
  //       requests.Cart.addItem(id)
  //         .then(updatedCart => {
  //           dispatch(setCart(updatedCart));
  
  //           const totalQuantity = existingQuantity + 1;
  
  //           toast.success(`${productDetails.name} sepete eklendi! Şu anda sepetinizde ${totalQuantity} adet var.`);
  //         })
  //         .catch(error => console.log(error));
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       toast.error("Ürün detayları alınırken bir hata oluştu.");
  //     })
  //     .finally(() => setIsAdded(false));
  // }

  if (loading) return <CircularProgress />;
  if (!product) return <NotFound />;

  const remainingStock = (product?.stock ?? 0) - (item?.quantity ?? 0);

  return (
    //<Typography variant="h2">{product.name}</Typography>
    <Grid container spacing={6}>
      <Grid size={{ xl: 3, lg: 4, md: 5, sm: 6, xs: 12 }}>
        <img
          src={`http://localhost:5057/images/${product.imageUrl}`}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid size={{ xl: 9, lg: 8, md: 7, sm: 6, xs: 12 }}>
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

        <Stack direction="row" spacing={2} sx={{mt: 3}} alignItems="center">
          <LoadingButton
            variant="outlined"
            loadingPosition="start"
            startIcon={<AddShoppingCart />}
            // loading={isAdded}
            loading={status === "pendingAddItem" + product.id}
            onClick={() => dispatch(addItemToCart({productId: product.id}))}
          >
            Sepete Ekle
          </LoadingButton>
          {
            item?.quantity! > 0 && (
                <Typography variant="body2">Sepetinize {item?.quantity} adet eklendi. Stokta {remainingStock} adet kaldı.</Typography>
            )
          }
        </Stack>
      </Grid>
    </Grid>
  );
}
