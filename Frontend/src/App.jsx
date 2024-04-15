import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import HeaderMenu from "./component/headerMenu";
import RoutesWithHeader from "./router/router";
import Footer from "./component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <HeaderMenu />
      <div>
        <RoutesWithHeader />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
