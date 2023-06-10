import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import useAuth from "../../hooks/useAuth";

const pages: { [key: string]: string }[] = [{ Home: "/" }];
const settings = ["Profile", "Logout"];

function ResponsiveAppBar() {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        axios.get("/api/logout", { withCredentials: true }).then(() => {
            setAuth({});
            navigate("/login");
        });
    };

    return (
        <AppBar position="static" sx={{ marginBottom: 5 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h4"
                        fontStyle="italic"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 5,
                            display: { xs: "none", md: "flex" },
                            fontWeight: 700,
                            letterSpacing: ".25rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Remindify
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => {
                                const pageName: string = Object.keys(page)[0];
                                const pageRoute: string = page[pageName];
                                return (
                                    <Button
                                        key={pageName}
                                        onClick={() => {
                                            navigate(pageRoute);
                                        }}
                                        sx={{
                                            my: 2,
                                            color: "white",
                                            display: "block",
                                        }}
                                    >
                                        {pageName}
                                    </Button>
                                );
                            })}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h4"
                        fontStyle="italic"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: ".25rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Remindify
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => {
                            const pageName: string = Object.keys(page)[0];
                            const pageRoute: string = page[pageName];
                            return (
                                <Button
                                    key={pageName}
                                    onClick={() => {
                                        navigate(pageRoute);
                                    }}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    {pageName}
                                </Button>
                            );
                        })}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    // src="/static/images/avatar/2.jpg"
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={() => {
                                        if (setting === "Logout") {
                                            handleCloseUserMenu();
                                            handleLogout();
                                        }
                                    }}
                                >
                                    <Typography textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
