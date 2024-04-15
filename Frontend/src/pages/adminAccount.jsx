import React, { useEffect, useState } from "react";
import HeaderMenu from "../component/headerMenu";
import { Input, Button, Table } from 'antd';
import { PlusCircleOutlined, DeleteFilled } from '@ant-design/icons';
import accountApi from "../axios/accountService";
import('../styles/adminaccount.css')
const { Search } = Input;

const onSearch = (value, _e, info) => {
    const search = {
        phoneNumber: value
    }
    console.log(search)
}

const AdminAccount = () => {
    const [listAccount, setListAccount] = useState([]);
    const [accountIdDelete, setAccountIdDelete] = useState();

    const onSearch = async (value) => {
        const search = {
            phoneNumber: value
        }
        const res = await accountApi.findAllByPhoneNumber(search);
        setListAccount(res.data);
    }
    const handleDelete = async () => {
        const res = await accountApi.delete(accountIdDelete);
        console.log(res)
        if (res.status == 200) {
            getListAccount;
            location.reload
        }
    }
    const columns = [
        {
            title: 'Mã thành viên',
            dataIndex: 'accountId',
            key: 'accountId'
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            key: 'fullName'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRowKeys.length > 1) {
                window.alert("Chỉ chọn một thành viên")
                return
            }
            setAccountIdDelete(selectedRowKeys);
        },
        hideSelectAll: true,
    };

    const getListAccount = async () => {
        try {
            const res = await accountApi.getAllAccount();
            setListAccount(res.data);
        } catch (error) {
            window.alert(error.message)
        }
    }

    useEffect(() => {
        getListAccount();
    }, []);
    return (
        <>
            <div className="admin-account-container">
                <div className="div-top">
                    <h2>Danh sách thành viên</h2>
                </div>
                <div className="div-mid">
                    <Search
                        placeholder="Tìm theo số điện thoại"
                        onSearch={onSearch}
                        style={{
                            width: 200,
                        }}
                    />
                    <div className="button-right">
                        <Button type="text" icon={<PlusCircleOutlined />}>Thêm mới</Button>
                        <Button type="text" onClick={handleDelete} icon={<DeleteFilled />}>Xóa thành viên</Button>
                    </div>
                </div>
                <Table rowSelection={rowSelection} dataSource={listAccount} columns={columns} rowKey={(record) => record.accountId} />
            </div>

        </>
    )
};

export default AdminAccount;