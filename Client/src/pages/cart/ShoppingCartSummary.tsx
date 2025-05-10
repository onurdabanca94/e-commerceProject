import { TableCell, TableRow } from "@mui/material";
import { useCartContext } from "../../context/CartContext";
import { currencyTRY } from "../../utils/formatCurrency";

export default function ShoppingCartSummary() {
    const {cart} = useCartContext();
    const subTotal = cart?.cartItems.reduce((toplam, item) => toplam + (item.quantity * item.price), 0) ?? 0;
    const tax = subTotal * 0.2;
    const sumTotal = subTotal + tax;
    return(
        <>
        <TableRow>
            <TableCell align="right" colSpan={5}>
                Ara Toplam
            </TableCell>
            <TableCell align="right">
                {currencyTRY.format(subTotal)}
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell align="right" colSpan={5}>
                Vergi (%20)
            </TableCell>
            <TableCell align="right">
                {currencyTRY.format(tax)}
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell align="right" colSpan={5}>
                Genel Toplam
            </TableCell>
            <TableCell align="right">
                {currencyTRY.format(sumTotal)}
            </TableCell>
        </TableRow>
        {/* <Box mt={4}>
            <TableContainer container={Paper} sx={{ minWidth:650, ml:"auto", mr:"auto"}}>
                <Table size="small">
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2} />
                            <TableCell align="right" sx={{ fontWeight: "bold", width: "150px"}}>
                                Ara Toplam
                            </TableCell>
                            <TableCell align="right" sx={{ width: "80px"}}>
                                {currencyTRY.format(subTotal)}
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold", width: "150px"}}>
                                Vergi (%20)
                            </TableCell>
                            <TableCell>
                                {currencyTRY.format(tax)}
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold", width: "150px"}}>
                                Genel Toplam
                            </TableCell>
                            <TableCell align="right" sx={{ width: "120px" }}>
                                {currencyTRY.format(sumTotal)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box> */}
        </>
    );
}