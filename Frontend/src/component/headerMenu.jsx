import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Flex, Grid, message, Space } from "antd";
import { NavLink } from "react-router-dom";
import { Input, Menu, Button } from "antd";
import { QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";
import logo from "../assets/logo-remove.png";
import { Drawer } from "antd";
import "../styles/headerMenu.css";

const { Search } = Input;

const filmItems = [
  {
    label: "Phim đang chiếu",
    key: "now-showing",
  },
  {
    label: "Phim sắp chiếu",
    key: "coming-soon",
  },
];
const cinemaItems = [
  {
    label: "Rạp 1",
    key: "cinema-1",
  },
  {
    label: "Rạp 2",
    key: "Cinema-2",
  },
];
const accountItem = [
  {
    label: "Đăng nhập",
    key: "login",
  },
  {
    label: "Đăng ký",
    key: "signin",
  },
];

const handleClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const onSearch = (value, _e, info) => console.log(info?.source, value);
const HeaderMenu = () => {
  const [openLoginDrawer, setOpenLoginDrawer] = useState(false);
  const [openSigninDrawer, setOpenSigninDrawer] = useState(false);
  const handleAccountClick = ({ key }) => {
    switch (key) {
      case "login":
        setOpenLoginDrawer(true);
        break;
      case "signin":
        setOpenSigninDrawer(true);
        break;
    }
  };
  const onClose = () => {
    setOpenLoginDrawer(false);
    setOpenSigninDrawer(false);
  };

  return (
    <div className="header-container">
      <div className="container">
        <div className="header-left">
          <NavLink className={"navlink-header"} to={"/showtime"}>
            Lịch chiếu
          </NavLink>
          <Dropdown
            menu={{
              items: filmItems,
              onClick: handleClick,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Phim
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <Dropdown
            menu={{
              items: cinemaItems,
              onClick: handleClick,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Rạp
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <NavLink className={"navlink-header"} to={"/promotion"}>
            Ưu đãi
          </NavLink>
        </div>
        <div className="header-mid">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>
        <div className="header-right">
          {/* <Search
            placeholder="Tìm phim"
            onSearch={onSearch}
            style={{
              width: 250,
            }}
          /> */}
          <div>
            <QuestionCircleOutlined />
            <a>Hỗ trợ</a>
          </div>
          <Dropdown
            menu={{
              items: accountItem,
              onClick: handleAccountClick,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <UserOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
        <Drawer
          className="login-drawer-container"
          title="Đăng nhập"
          placement="left"
          closable={false}
          onClose={onClose}
          open={openLoginDrawer}
        >
          <p>Tài khoản</p>
          <Input />
          <p>Mật khẩu</p>
          <Input />
          <div className="login-drawer-div">
            <Button
              type="text"
              onClick={() => {
                setOpenLoginDrawer(false);
                setOpenSigninDrawer(true);
              }}
            >
              Đăng ký
            </Button>
            <Button type="text">Quên mật khẩu ?</Button>
          </div>
          <Button block>Đăng nhập</Button>
        </Drawer>
        <Drawer
          title="Đăng ký"
          placement="left"
          closable={false}
          onClose={onClose}
          open={openSigninDrawer}
        >
          <div className="input-signin">
            <p>Tài khoản</p>
            <Input />
            <p>Email</p>
            <Input />
            <p>Mật khẩu</p>
            <Input type="password" />
            <p>Nhập lại mật khẩu</p>
            <Input type="password" />
            <p>Số điện thoại</p>
            <Input />
          </div>
          <Button block>Đăng ký</Button>
          <Button
            type="text"
            block
            onClick={() => {
              setOpenSigninDrawer(false);
              setOpenLoginDrawer(true);
            }}
          >
            Đã có tài khoản? Đăng nhập
          </Button>
        </Drawer>
      </div>
    </div>
  );
};
export default HeaderMenu;
