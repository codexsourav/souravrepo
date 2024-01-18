import Page404 from "@/pages/Error/Page404";
import Home from "@/pages/Home";
import React, { ReactNode } from "react";
import { Route, Routes } from "react-router-dom"

function AppRoutes() {
    // NOTE: Add Your Routes Here  

    return (
        <Routes>
            <Route path="/" element={<Protected page={<Home />} />} />
            <Route path="*" element={<Protected page={<Page404 />} />} />

        </Routes>
    )
}

export default React.memo(AppRoutes);

// protected Route
function Protected({ page }: { page: ReactNode }) {
    // TODO: init protected Logic here 
    return page;
}

