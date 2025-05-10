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
import { useState } from "react";
import requests from "../../api/requests";
import { LoadingButton } from "@mui/lab";
import { useCartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { currencyTRY } from "../../utils/formatCurrency";
interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {

  const [loading, setLoading] = useState(false);
  const { cart, setCart } = useCartContext();

  //Aşağıdaki fonksiyon ile ProductDetails sayfasındakine göre async bir fonksiyon olarak kullanımı gösterilmiştir.
  async function handleAddItem(productId: number) {
    setLoading(true);
  
    const existingItem = cart?.cartItems.find(i => i.productId === productId);
    const existingQuantity = existingItem?.quantity ?? 0;
  
    try {
      const productDetails = await requests.Catalog.details(productId);
      const updatedCart = await requests.Cart.addItem(productId);
  
      setCart(updatedCart);
  
      const totalQuantity = existingQuantity + 1;
      toast.success(`${productDetails.name} sepete eklendi! Şu anda sepetinizde ${totalQuantity} adet var.`);
    } catch (error) {
      console.log(error);
      toast.error("Ürün eklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
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
        {/* <Button variant="outlined" size="small" startIcon={<AddShoppingCart/>} color="success" 
                onClick={() => handleAddItem(product.id)}>Sepete Ekle</Button> */}
        <LoadingButton
          size="small"
          variant="outlined"
          startIcon={<AddShoppingCart />}
          loading={loading}
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
