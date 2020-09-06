import React from 'react';
import { useFormik } from 'formik';
import { Button, Modal } from 'react-bootstrap';

import { AddressType } from '../resources/types';
import { AddressForm } from './addressForm';

type Props = {
  show: boolean;
  onClickDelete: (id: number) => void;
  onClose: () => void;
  onSave: (values: AddressType) => void;
  address?: AddressType;
}

export const EditAddressForm = (props: Props) => {
  const { address, show, onClickDelete, onClose, onSave } = props;

  const formik = useFormik<AddressType>({
    enableReinitialize: true,
    initialValues: {
      id: address ? address.id : undefined,
      name: address ? address.name : "",
      name_kana: address ? address.name_kana : "",
      gender: address ? address.gender : "",
      phone: address ? address.phone : "",
      mail: address ? address.mail : "",
      zipcode: address ? address.zipcode : "",
      address1: address ? address.address1 : "",
      address2: address ? address.address2 : "",
      address3: address ? address.address3 : "",
      address4: address ? address.address4 : "",
      address5: address ? address.address5 : "",
      age: address ? address.age : 20,
    },
    onSubmit: (values) => {
      onSave(values);
    }
  });

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>編集</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <AddressForm values={formik.values} onChange={formik.handleChange} setFieldValue={formik.setFieldValue} />
      </Modal.Body>

      <Modal.Footer>
        { formik.values.id && <Button variant="danger" onClick={() => onClickDelete(formik.values.id!)}>削除</Button> }
        <Button variant="secondary" onClick={onClose}>閉じる</Button>
        <Button variant="primary" onClick={formik.submitForm}>保存</Button>
      </Modal.Footer>
    </Modal>
  );
}