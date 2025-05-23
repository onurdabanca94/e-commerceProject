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
// import { useCartContext } from "../../context/CartContext";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addItemToCart } from "../cart/cartSlice";
interface Props {
  product: IProduct;
}

export default function Product({ product }: Props) {
  const {status} = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  // const [loading, setLoading] = useState(false);
  // const { cart, setCart } = useCartContext();
  //Aşağıdaki fonksiyon ile ProductDetails sayfasındakine göre async bir fonksiyon olarak kullanımı gösterilmiştir.
  // async function handleAddItem(productId: number) {
  //   setLoading(true);
  //   // const existingItem = cart?.cartItems.find(i => i.productId === productId);
  //   // const existingQuantity = existingItem?.quantity ?? 0;
  //   try {
  //     const productDetails = await requests.Catalog.details(productId);
  //     const updatedCart = await requests.Cart.addItem(productId);

  //     dispatch(setCart(updatedCart));

  //     const existingItem = updatedCart.cartItems.find(
  //       (i) => i.productId === productId
  //     );
  //     const totalQuantity = existingItem?.quantity ?? 1;

  //     toast.success(
  //       `${productDetails.name} sepete eklendi! Şu anda sepetinizde ${totalQuantity} adet var.`
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Ürün eklenirken bir hata oluştu.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

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
          loading={status === "pendingAddItem" + product.id}
          onClick={() => dispatch(addItemToCart({productId: product.id}))}
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
