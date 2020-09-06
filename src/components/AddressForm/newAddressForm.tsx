import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import { Button, Modal } from 'react-bootstrap';

import { AddressType } from '../resources/types';
import { AddressForm } from './addressForm';

type Props = {
  show: boolean;
  onClose: () => void;
  onSave: (values: AddressType) => void;
};

export const NewAddressForm = (props: Props) => {
  const { show, onClose, onSave } = props;

  const formik = useFormik<AddressType>({
    initialValues: {
      name: '',
      name_kana: '',
      gender: '男',
      phone: '',
      mail: '',
      zipcode: '',
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      address5: '',
      age: 20,
    },
    onSubmit: (values) => {
      onSave(values);
    }
  });

  const handleClose = useCallback(() => {
    formik.resetForm();
    onClose();
  }, [formik, onClose]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>新規作成</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <AddressForm values={formik.values} onChange={formik.handleChange} setFieldValue={formik.setFieldValue} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>閉じる</Button>
        <Button variant="primary" onClick={formik.submitForm}>保存</Button>
      </Modal.Footer>
    </Modal>
  );
}