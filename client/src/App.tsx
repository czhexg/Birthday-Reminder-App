import { BrowserRouter, Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./components/Auth/RequireAuth";

const theme = createTheme({
    typography: {
        fontFamily: ["Figtree", "sans-serif"].join(","),
    },
});

function App(): JSX.Element {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/login"
                            element={<Auth currentAuth="Login" />}
                        />
                        <Route
                            path="/register"
                            element={<Auth currentAuth="Register" />}
                        />
                        <Route element={<RequireAuth />}>
                            <Route path="/" element={<Layout />}>
                                <Route path="/" element={<Home />} />
                            </Route>
                        </Route>
                        {/* <Route path="*" element={<NoPage />} /> */}
                    </Routes>
                </BrowserRouter>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
