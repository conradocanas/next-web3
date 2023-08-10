import * as React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";

const navItems = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "About",
    to: "/about",
  },
];

export default function AppHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", background: "#000" }} >
          <Link href="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Caviar
            </Typography>
          </Link>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map(({ title, to }) => (
                <Link href={to} key={title}>
                  <Button sx={{ color: "#fff" }}>{title}</Button>
                </Link>
              ))}
            </Box>
            <Box
              sx={{
                paddingLeft: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Web3Button  />
              <Box sx={{ paddingLeft: "1rem", display: { xs: "none", sm: "block"} }}>
                <Web3NetworkSwitch />
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
