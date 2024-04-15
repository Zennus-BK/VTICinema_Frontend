import React from "react";
import HeaderMenu from "../component/headerMenu";
import { Button } from "antd";
import('../styles/adminhomepage.css');
import { useNavigate } from "react-router-dom";

const AdminHomepage = () => {
    const navigate = useNavigate();
    return (
        <div className="admin-homepage-container">
            <div className="div-top">
                <h1>Chức năng quản lý</h1>
                <div className="admin-button">
                    <Button>Quản lý phim</Button>
                    <Button onClick={() => { navigate('/admin/account') }}>Quản lý thành viên</Button>
                    <Button>Quản lý suất chiếu</Button>
                    <Button>Quản lý phòng chiếu</Button>
                    <Button>Quản lý rạp chiếu</Button>
                    <Button>Quản lý đồ ăn</Button>
                </div>
            </div>
        </div>
    )
};

export default AdminHomepage;