import React from 'react';
import { Button, Modal } from 'react-bootstrap';

type Props = {
  show: boolean;
  title: string;
  onClose: () => void;
  onSave: () => void;
}

export const AddressForm = (props: Props) => {
  const { show, title, onClose, onSave } = props;
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>閉じる</Button>
        <Button variant="primary" onClick={onSave}>保存</Button>
      </Modal.Footer>
    </Modal>
  );
};