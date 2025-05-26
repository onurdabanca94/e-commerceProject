import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IProduct } from "../model/IProduct";
import { AddShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router";
import { LoadingButton } from "@mui/lab";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItemToCart } from "../cart/cartSlice";
import { toast } from "react-toastify";
import requests from "../../api/requests"; // detay için
import { unwrapResult } from "@reduxjs/toolkit"; // thunka gelen sonucu ayıklamak için

interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {
  const { status, cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  async function handleAddItem(productId: number) {
    try {
      const productDetails = await requests.Catalog.details(productId);

      const resultAction = await dispatch(addItemToCart({ productId }));
      const updatedCart = unwrapResult(resultAction); // fulfilled sonucu al

      const existingItem = updatedCart.cartItems.find(
        (i) => i.productId === productId
      );
      const totalQuantity = existingItem?.quantity ?? 1;

      toast.success(
        `${productDetails.name} sepete eklendi! Şu anda sepetinizde ${totalQuantity} adet var.`
      );
    } catch (error) {
      console.log(error);
      toast.error("Ürün sepete eklenirken bir hata oluştu.");
    }
  }

  return (
    <Card>
      <CardMedia
        sx={{ height: 160, backgroundSize: "contain" }}
        image={`http://localhost:5057/images/${product.imageUrl}`}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          color="text.secondary"
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="secondary">
          {currencyTRY.format(product.price)}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          size="small"
          variant="outlined"
          startIcon={<AddShoppingCart />}
          loading={status === "pendingAddItem" + product.id}
          onClick={() => handleAddItem(product.id)}
        >
          Sepete Ekle
        </LoadingButton>
        <Button
          component={Link}
          to={`/catalog/${product.id}`}
          variant="outlined"
          size="small"
          startIcon={<SearchIcon />}
          color="primary"
        >
          Görüntüle
        </Button>
      </CardActions>
    </Card>
  );
}
