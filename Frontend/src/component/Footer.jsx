import React from "react";
import "../styles/footer.css";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="box">
            <ul className="flex">
              <li>TERMS OF USE</li>
              <li>PRIVACY-POLICY</li>
              <li>BLOG</li>
              <li>FAQ</li>
              <li>WATCH LIST</li>
            </ul>
            <div className="footer-logo">
              <img src={logo} alt="" className="logo" />
              <p>
                © 2024 CINEMAX Việt Nam.VTI CINEMAX là rạp phim đạt chuẩn quốc
                tế hàng đầu Việt Nam. Hơn 20 chi nhánh với mọi tỉnh thành trên
                toàn quốc.VTI CINEMAX mong muốn sẽ mang đến những trải nghiệm
                tốt nhất đến khách hàng. <br />
                -- HOTLINE: 0223.224.8888
              </p>
            </div>
          </div>
          <div className="box">
            <h4>FOLLOW US</h4>
            <section className="box-item">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-github"></i>
              <i className="fab fa-instagram"></i>
            </section>
          </div>
          <div className="box">
            <h4>DOWNLOAD APP</h4>
            <div className="img flexSB ">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/180px-Google_Play_Store_badge_EN.svg.png" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Available_on_the_App_Store_%28black%29.png/1200px-Available_on_the_App_Store_%28black%29.png" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
