import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router";
import { useCartContext } from "../context/CartContext";

const links = [
  { title: "Home", to: "/" },
  { title: "Catalog", to: "/catalog" },
  { title: "About", to: "/about" },
  { title: "Contact", to: "/contact" },
  { title: "Error", to: "/error" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "text.primary",
  },
  "&.active": {
    color: "warning.main",
  },
};

export default function Header() {
  const { cart } = useCartContext();
  //const itemCount = cart?.cartItems.reduce((total, item) => total + item.quantity, 0) --> Toplam ürün sayısını verir.
  const itemCount = cart?.cartItems.length || 0; // --> Toplam ürün çeşidi sayısını verir.
  const totalQuantity =
    cart?.cartItems.reduce((sum, item) => sum + item.quantity, 0) || 0; // --> toplam ürün çeşidi ve ürün sayısını icon üstünde gösterir.

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">E-Commerce Project</Typography>
          {/* <List sx={{ display: "flex" }}>
            {links.map((link) => (
              <ListItem component={NavLink} to={link.to} sx={navStyles}>
                {link.title}
              </ListItem>
            ))}
          </List> */}

          <Stack direction="row">
            {links.map((link) => (
              <Button
                key={link.to}
                component={NavLink}
                to={link.to}
                sx={navStyles}
              >
                {link.title}
              </Button>
            ))}
          </Stack>
        </Box>

        <Box>
          <Tooltip
            slotProps={{
              popper: {
                sx: {
                  [`& .MuiTooltip-tooltip`]: {
                    backgroundColor: "#222",
                    color: "#f0f0f0",
                    fontSize: "13px",
                    border: "1px solid #888",
                    boxShadow: "1px 1px 10px rgba(122, 10, 10, 0.3)",
                  },
                },
              },
            }}
            title={`${itemCount} ürün çeşidi, toplam ${totalQuantity} ürün var.`}
          >
            <IconButton
              component={Link}
              to="/cart"
              size="large"
              edge="start"
              color="inherit"
            >
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
