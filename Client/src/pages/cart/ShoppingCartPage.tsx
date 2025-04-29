import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Delete } from "@mui/icons-material";
import { useCartContext } from "../../context/CartContext";

export default function ShoppingCartPage() {
  //const [loading, setLoading] = useState(true);

  const { cart } = useCartContext();

  //if(loading) return <CircularProgress />
  if (!cart) return <h1>Sepetiniz ürün bulunmamaktadır.</h1>;

  const totalItemCount = cart.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalPrice = cart.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
            {cart.cartItems.map((item) => (
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
                  {(item.price / 100).toFixed(2)} ₺
                </TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">
                  {((item.price * item.quantity) / 100).toFixed(2)} ₺
                </TableCell>
                <TableCell align="right">
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Box mt={2}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableBody>
            <TableRow>
              <TableCell colSpan={2} />
              <TableCell colSpan={2} />
              <TableCell colSpan={2} />
              <TableCell colSpan={2} />
              <TableCell colSpan={2} />
              <TableCell colSpan={2} />
              <TableCell colSpan={2} />
              <TableCell colSpan={2} />
              <TableCell colSpan={2} />
              <TableCell colSpan={2} />
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Toplam
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {totalItemCount}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {(totalPrice / 100).toFixed(2)} ₺
              </TableCell>
              <TableCell />
            </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box> */}
      <Box mt={4}>
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
      </Box>
    </>
  );
}
