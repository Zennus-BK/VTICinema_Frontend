import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/homepage";
import Showtime from "../pages/showtime";
import Promotion from "../pages/promotion";
import Accountdetail from "../pages/accountdetail";
import AdminHomepage from "../pages/adminhomepage";
import AdminAccount from "../pages/adminAccount";
import BookTicket from "../pages/bookTicket";
import FilmDetail from "../pages/FilmDetail";

const RoutesWithHeader = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/showtime" element={<Showtime />} />
            <Route path="/promotion" element={<Promotion />} />
            <Route path="/account-detail" element={<Accountdetail />} />
            <Route path="/admin-homepage" element={<AdminHomepage />} />
            <Route path="/admin/account" element={<AdminAccount />} />
            <Route path="/bookticket/:showtimeId" element={<BookTicket />} />
            <Route path="/film/all/:id" element={<FilmDetail />} />
        </Routes>
    );
};


export default RoutesWithHeader;