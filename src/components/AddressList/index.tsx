import React, { useCallback, useState, useEffect } from 'react';
import { getAddresses, createAddress, updateAddress, deleteAddress } from '../resources';
import { AddressType } from '../resources/types';
import { Paginate } from '../Paginate';

import { Button, Table } from 'react-bootstrap';
import { NewAddressForm, EditAddressForm } from '../AddressForm';

type PageInfoType = {
    total: number;
    page: number;
    per: number;
};

export const AddressList = () => {
    const [addressState, setAddressState] = useState<AddressType[]>([]);
    const [pageInfoState, setPageInfoState] = useState<PageInfoType>({ total: 0, page: 1, per: 20 });

    const [newFormState, setNewFormState] = useState({ isOpen: false });
    const [editFormState, setEditFormState] = useState({ isOpen: false, address: undefined });
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        if(refresh) {
            const promise = getAddresses({ page: pageInfoState.page, per: pageInfoState.per });
            promise.then((data) => {
                setAddressState(data.results);
                setPageInfoState({ total: data.total, page: data.page, per: data.per });
            });
            setRefresh(false);
        }
    }, [pageInfoState.page, pageInfoState.per, setPageInfoState, refresh]);

    const handlePaginateClick = useCallback((page: number) => {
        setPageInfoState({ ...pageInfoState, page });
        setRefresh(true);
    }, [setPageInfoState, pageInfoState]);

    const handleNewFormOpen = useCallback(() => {
        setNewFormState({ isOpen: true });
    }, [setNewFormState]);

    const handleEditFormOpen = useCallback((address) => {
       setEditFormState({ isOpen: true, address });
    }, [setEditFormState]);

    const handleNewFormClose = useCallback(() => {
        setNewFormState({ isOpen: false });
    }, [setNewFormState]);

    const handleEditFormClose = useCallback(() => {
        setEditFormState({ isOpen: false, address: undefined });
    }, [setEditFormState]);

    const handleNewFormSave = useCallback((address: AddressType) => {
        createAddress(address).then((data) => {
            setNewFormState({ isOpen: false});
            setRefresh(true);
        });
    }, [setNewFormState]);

    const handleEditFormSave = useCallback((address: AddressType) => {
        updateAddress(address).then((data) => {
            setEditFormState({ isOpen: false, address: undefined});
            setRefresh(true);
        });
    }, [setEditFormState]);

    const handleDelete = useCallback((id: number) => {
        deleteAddress(id).then((data) => {
            setEditFormState({ isOpen: false, address: undefined});
            setRefresh(true);
        });
    }, [setEditFormState]);

    return (
        <>
            <NewAddressForm show={newFormState.isOpen} onClose={handleNewFormClose} onSave={handleNewFormSave} />
            <EditAddressForm show={editFormState.isOpen} onClickDelete={handleDelete} onClose={handleEditFormClose} onSave={handleEditFormSave} address={editFormState.address} />
            <Button variant="primary" onClick={handleNewFormOpen}>新規作成</Button>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>名前</th>
                        <th>名前（カナ）</th>
                        <th>性別</th>
                        <th>電話番号</th>
                        <th>メールアドレス</th>
                        <th>郵便番号</th>
                        <th>都道府県</th>
                        <th>市区町村</th>
                        <th>番地</th>
                        <th>建物名</th>
                        <th>住所・その他</th>
                        <th>年齢</th>
                    </tr>
                </thead>
                <tbody>
                    {addressState.map((address) => {
                        return (
                        <tr key={address.id} onClick={() => handleEditFormOpen(address)}>
                            <td>{address.name}</td>
                            <td>{address.name_kana}</td>
                            <td>{address.gender}</td>
                            <td>{address.phone}</td>
                            <td>{address.mail}</td>
                            <td>{address.zipcode}</td>
                            <td>{address.address1}</td>
                            <td>{address.address2}</td>
                            <td>{address.address3}</td>
                            <td>{address.address4}</td>
                            <td>{address.address5}</td>
                            <td>{address.age}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Paginate total={pageInfoState.total} per={pageInfoState.per} page={pageInfoState.page} onClick={handlePaginateClick} />
        </>
    );
}