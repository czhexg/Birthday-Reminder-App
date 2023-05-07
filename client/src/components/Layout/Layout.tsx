import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

import LayoutStyles from "../../componentStyles/Layout/Layout.module.css";

function Layout(): JSX.Element {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;
