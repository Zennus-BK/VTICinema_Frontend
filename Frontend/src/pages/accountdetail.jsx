import React, { useEffect, useState } from "react";
import HeaderMenu from "../component/headerMenu";
import accountApi from "../axios/accountService";
import { Avatar, Button, Modal, Input } from 'antd';
import '../styles/accountdetail.css';


const Accountdetail = () => {
    const [fullnameInput, setFullnameInput] = useState();
    const [dateOfBirthInput, setDateOfBirthInput] = useState();
    const [emailInput, setEmailInput] = useState();
    const [phoneNumberInput, setPhoneNumberInput] = useState();
    const [avatarInput, setAvatarInput] = useState();
    const [passwordInput, setPasswordInput] = useState();
    const [passwordInputCheck, setPasswordInputCheck] = useState();
    const [passwordCurent, setPasswordCurrent] = useState();
    const [accountdetail, setAccountdetail] = useState({
        accountId: 0,
        fullName: "",
        dateOfBirth: "",
        email: "",
        phoneNumber: "",
        password: "",
        avatar: ""
    });
    const [isModalUpdateAccountOpen, setIsModalUpdateAccountOpen] = useState(false);
    const [isModalUpdateAvatarOpen, setIsModalUpdateAvatarOpen] = useState(false);
    const [isModalUpdatePasswordOpen, setIsModalUpdatePasswordOpen] = useState(false);
    const showModalUpdateAccount = () => {
        setIsModalUpdateAccountOpen(true);
        setFullnameInput(accountdetail.fullName);
        setDateOfBirthInput(accountdetail.dateOfBirth);
        setEmailInput(accountdetail.email);
        setPhoneNumberInput(accountdetail.phoneNumber);
    };
    const showModalUpdateAvatar = () => {
        setIsModalUpdateAvatarOpen(true);
    }
    const showModalUpdatePassword = () => {
        setIsModalUpdatePasswordOpen(true);
    }

    //Handle OK
    const handleUpdateAccountOk = async () => {
        accountdetail.fullName = fullnameInput
        accountdetail.dateOfBirth = dateOfBirthInput
        accountdetail.email = emailInput
        accountdetail.phoneNumber = phoneNumberInput
        try {
            await accountApi.update(accountdetail)
            location.reload;
        } catch (error) {
            window.alert(error.message)
        }
        setIsModalUpdateAccountOpen(false);
    };

    const handleUpdateAvatarOk = async () => {
        accountdetail.avatar = avatarInput
        try {
            await accountApi.update(accountdetail)
        } catch (error) {
            window.alert(error.message)
        }
        setIsModalUpdateAvatarOpen(false);
    }

    const handleUpdatePasswordOk = async () => {
        if (passwordInput != passwordInputCheck) {
            window.alert("Mật khẩu mới không khớp")
            return
        }
        const updatePasswordBody = {
            phoneNumber: accountdetail.phoneNumber,
            passwordCurrent: passwordCurent,
            passwordNew: passwordInput
        }
        const result = await accountApi.updatePassword(updatePasswordBody);
        window.alert(result.data)
    }
    const handleCancel = () => {
        setIsModalUpdateAccountOpen(false);
        setIsModalUpdateAvatarOpen(false);
        setIsModalUpdatePasswordOpen(false);
    };
    const getAccountDetail = async () => {
        try {
            const res = await accountApi.accountdetail(localStorage.getItem("accountId"));
            setAccountdetail({
                accountId: res.data.accountId,
                fullName: res.data.fullName,
                dateOfBirth: res.data.dateOfBirth,
                email: res.data.email,
                phoneNumber: res.data.phoneNumber,
                password: res.data.password,
                avatar: res.data.avatar
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleFullnameChange = (e) => { setFullnameInput(e.target.value) }
    const handleDateOfBirthChange = (e) => { setDateOfBirthInput(e.target.value) }
    const handleEmailChange = (e) => { setEmailInput(e.target.value) }
    const handlePhoneNumberChange = (e) => { setPhoneNumberInput(e.target.value) }
    const handleAvatarChange = (e) => { setAvatarInput(e.target.value) }
    const handlePasswordCurrentChange = (e) => { setPasswordCurrent(e.target.value) }
    const handlePasswordInputChange = (e) => { setPasswordInput(e.target.value) }
    const handlePasswordInputCheckChange = (e) => { setPasswordInputCheck(e.target.value) }
    useEffect(() => {
        getAccountDetail();
    }, []);
    return (
        <>
            <div className="top-container">
                <Avatar size={180} src={accountdetail.avatar} />
                <div className="top-right">
                    <h2>Xin chào</h2>
                    <h1>{accountdetail.fullName}</h1>
                    <div className="account-button">
                        <Button onClick={showModalUpdateAccount}>
                            Cập nhật thông tin
                        </Button>
                        <Button onClick={showModalUpdateAvatar}>
                            Cập nhật ảnh đại diện
                        </Button>
                        <Button onClick={showModalUpdatePassword}>
                            Cập nhật mật khẩu
                        </Button>

                    </div>
                </div>

                <Modal title="Cập nhật thông tin" open={isModalUpdateAccountOpen} onOk={handleUpdateAccountOk} onCancel={handleCancel}>
                    <p>
                        <a>Họ và tên:</a>
                        <Input defaultValue={accountdetail.fullName} onChange={handleFullnameChange} />
                    </p>
                    <p>
                        <a>Ngày sinh:</a>
                        <Input defaultValue={accountdetail.dateOfBirth} onChange={handleDateOfBirthChange} />
                    </p>
                    <p>
                        <a>Email:</a>
                        <Input defaultValue={accountdetail.email} onChange={handleEmailChange} />
                    </p>
                    <p>
                        <a>Số điện thoại:</a>
                        <Input defaultValue={accountdetail.phoneNumber} onChange={handlePhoneNumberChange} />
                    </p>
                </Modal>
                <Modal title="Cập nhật ảnh đại diện" open={isModalUpdateAvatarOpen} onOk={handleUpdateAvatarOk} onCancel={handleCancel}>
                    <p>
                        <a>Ảnh đại diện:</a>
                        <Input onChange={handleAvatarChange} />
                    </p>
                </Modal>
                <Modal title="Cập nhật mật khẩu" open={isModalUpdatePasswordOpen} onOk={handleUpdatePasswordOk} onCancel={handleCancel}>
                    <p>
                        <a>Mật khẩu hiện tại:</a>
                        <Input type="password" onChange={handlePasswordCurrentChange} />
                        <a>Mật khẩu mới:</a>
                        <Input type="password" onChange={handlePasswordInputChange} />
                        <a>Nhập lại mật khẩu mới:</a>
                        <Input type="password" onChange={handlePasswordInputCheckChange} />
                    </p>
                </Modal>
            </div>
            <div className="bottom-container">
                <AccountCard
                    accountId={accountdetail.accountId}
                    fullName={accountdetail.fullName}
                    dateOfBirth={accountdetail.dateOfBirth}
                    email={accountdetail.email}
                    phoneNumber={accountdetail.phoneNumber} />
            </div>
        </>
    )
};

const AccountCard = (props) => {
    return (
        <>
            <div className="field">
                <a className="key">Mã thành viên</a>
                <a className="value">{props.accountId}</a>
            </div>
            <div className="field">
                <a className="key">Họ và tên</a>
                <a className="value">{props.fullName}</a>
            </div>
            <div className="field">
                <a className="key">Ngày sinh</a>
                <a className="value">{props.dateOfBirth}</a>
            </div>
            <div className="field">
                <a className="key">Email</a>
                <a className="value">{props.email}</a>
            </div>
            <div className="field">
                <a className="key">Số điện thoại</a>
                <a className="value">{props.phoneNumber}</a>
            </div>
        </>
    )
}

export default Accountdetail;