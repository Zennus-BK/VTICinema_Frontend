import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/homepage";
import Showtime from "../pages/showtime";
import Promotion from "../pages/promotion";
import FilmDetail from "../pages/FilmDetail";

const RoutesWithHeader = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/showtime" element={<Showtime />} />
      <Route path="/promotion" element={<Promotion />} />
      <Route path="/film/all/:id" element={<FilmDetail />} />
    </Routes>
  );
};
export default RoutesWithHeader;
