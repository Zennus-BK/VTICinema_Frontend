import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Flex, Grid, message, Space } from 'antd';
import { NavLink } from "react-router-dom";
import { Input, Menu, Button } from 'antd';
import { QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../assets/logo-remove.png'
import { Drawer } from 'antd';
import '../styles/headerMenu.css'
import accountApi from '../axios/accountService';
import { useNavigate, redirect } from "react-router-dom";
const { Search } = Input;


//Items menu

const filmItems = [
    {
        label: 'Phim đang chiếu',
        key: 'now-showing',
    },
    {
        label: 'Phim sắp chiếu',
        key: 'coming-soon',
    },
];
const cinemaItems = [
    {
        label: 'Rạp 1',
        key: 'cinema-1',
    },
    {
        label: 'Rạp 2',
        key: 'Cinema-2',
    },
];
const accountItem = [
    {
        label: 'Đăng nhập',
        key: 'login',
    },
    {
        label: 'Đăng ký',
        key: 'signin',
    },
];
const userItem = [
    {
        label: 'Thông tin tài khoản',
        key: 'user-detail'
    },
    {
        label: 'Đăng xuất',
        key: 'logout'
    }
]

const HeaderMenu = () => {
    //Variable
    const [phoneNumber, setPhoneNumber] = useState();
    const [fullname, setFullname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRetype, setPasswordRetype] = useState();
    const [openLoginDrawer, setOpenLoginDrawer] = useState(false)
    const [openSigninDrawer, setOpenSigninDrawer] = useState(false)
    const navigate = useNavigate();
    //funtion

    const handleClick = ({ key }) => {
        message.info(`Click on item ${key}`);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value)
    }
    const handleFullnameChange = (event) => {
        setFullname(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const hangdlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const hangdlePasswordRetypeChange = (event) => {
        setPasswordRetype(event.target.value)
    }
    const handleSiginClick = async () => {
        if (password != passwordRetype) {
            window.alert("Mật khẩu không trùng nhau");
            return
        }
        const accountSignin = {
            password: password,
            fullName: fullname,
            email: email,
            phoneNumber: phoneNumber
        };
        try {
            const res = await accountApi.signin(accountSignin);
            if (res.status == 200) {
                window.alert("Đăng ký thành công. Xin mời đăng nhập");
                return location.reload();
            }
        } catch (error) {
            window.alert(error.res.data.message);
        }
    }
    const handleLoginClick = async () => {
        const accountLogin = {
            phoneNumber: phoneNumber,
            password: password
        }
        try {
            const res = await accountApi.login(accountLogin);
            console.log(res)
            localStorage.setItem("accountId", res.data.accountId);
            localStorage.setItem("avatar", res.data.avatar);
            localStorage.setItem("dateOfBirth", res.data.dateOfBirth);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("fullName", res.data.fullName);
            localStorage.setItem("phoneNumber", res.data.phoneNumber);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("token", res.data.token);
            if (res.data.role == "ADMIN") { navigate("/admin-homepage"); }
            else { location.reload(); }
        } catch (error) {
            window.alert(error.res.data.message);
        }
    }
    const handleUserDetail = () => {
        navigate("/account-detail");
    }
    const handleLogout = () => {
        localStorage.clear();
        location.reload;
        navigate('/');
    }
    const handleAccountClick = ({ key }) => {
        switch (key) {
            case "login":
                setOpenLoginDrawer(true);
                break;
            case "signin":
                setOpenSigninDrawer(true);
                break;
            case "user-detail":
                handleUserDetail();
                break;
            case "logout":
                handleLogout();
                break;
        }
    };
    const onClose = () => {
        setOpenLoginDrawer(false);
        setOpenSigninDrawer(false);
    };

    return (
        <>
            <div className='header-container'>
                <div className="header-left">
                    <NavLink className={"navlink-header"} to={"/showtime"}>Lịch chiếu</NavLink>
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
                    <NavLink className={"navlink-header"} to={"/promotion"}>Ưu đãi</NavLink>
                </div>
                <div className="header-mid" onClick={() => { navigate("/") }}>
                    <img src={logo}></img>
                </div>
                <div className="header-right">
                    <div>
                        <QuestionCircleOutlined style={{ padding: 5 }} />
                        <a>Hỗ trợ</a>
                    </div>
                    <Dropdown
                        menu={{
                            items: localStorage.getItem("role") == null ? accountItem : userItem,
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
                    className='login-drawer-container'
                    title="Đăng nhập"
                    placement='left'
                    closable={false}
                    onClose={onClose}
                    open={openLoginDrawer}
                >
                    <p>Số điện thoại</p>
                    <Input onChange={handlePhoneNumberChange} />
                    <p>Mật khẩu</p>
                    <Input type='password' onChange={hangdlePasswordChange} />
                    <div className='login-drawer-div'>
                        <Button type="text" onClick={() => { setOpenLoginDrawer(false); setOpenSigninDrawer(true) }}>Đăng ký</Button>
                        <Button type="text">Quên mật khẩu ?</Button>
                    </div>
                    <Button block onClick={handleLoginClick}>Đăng nhập</Button>
                </Drawer>
                <Drawer
                    title="Đăng ký"
                    placement='left'
                    closable={false}
                    onClose={onClose}
                    open={openSigninDrawer}
                >
                    <div className='input-signin'>
                        <p>Số điện thoại</p>
                        <Input onChange={handlePhoneNumberChange} />
                        <p>Họ và tên</p>
                        <Input onChange={handleFullnameChange} />
                        <p>Email</p>
                        <Input onChange={handleEmailChange} />
                        <p>Mật khẩu</p>
                        <Input type='password' onChange={hangdlePasswordChange} />
                        <p>Nhập lại mật khẩu</p>
                        <Input type='password' onChange={hangdlePasswordRetypeChange} />
                    </div>
                    <Button block onClick={handleSiginClick}>Đăng ký</Button>
                    <Button type="text" block onClick={() => { setOpenSigninDrawer(false); setOpenLoginDrawer(true) }}>Đã có tài khoản? Đăng nhập</Button>
                </Drawer>
            </div>

        </>
    )
};
export default HeaderMenu;