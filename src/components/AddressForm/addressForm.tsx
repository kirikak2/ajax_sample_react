import React, { useCallback } from 'react';

import { Form, Row, Col } from 'react-bootstrap';

type Props = {
  values: { [field: string]: any };
  onChange: (e: React.ChangeEvent<any>) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};

export const AddressForm = React.memo((props: Props) => {
  const { values, onChange, setFieldValue } = props;
  const handleChange = useCallback((e: React.ChangeEvent<any>) => {
    onChange(e);
  }, [onChange]);

  return (
    <Form>
      <Form.Label>名前</Form.Label>
      <Form.Control name="name" type="text" value={values.name} onChange={handleChange} />

      <Form.Label>名前（カナ）</Form.Label>
      <Form.Control name="name_kana" type="text" value={values.name_kana} onChange={handleChange} />

      <Form.Group as={Row}>
        <Form.Label column>性別</Form.Label>
        <Col sm={10}>
          <Form.Check name="gender" type="radio" label="男" checked={values.gender === '男'} onChange={() => setFieldValue("gender", "男")} />
          <Form.Check name="gender" type="radio" label="女" checked={values.gender === '女'} onChange={() => setFieldValue("gender", "女")} />
        </Col>
      </Form.Group>

      <Form.Label>電話番号</Form.Label>
      <Form.Control name="phone" type="text" value={values.phone} onChange={handleChange} />

      <Form.Label>メールアドレス</Form.Label>
      <Form.Control name="mail" type="email" value={values.mail} onChange={handleChange} />

      <Form.Label>郵便番号</Form.Label>
      <Form.Control name="zipcode" type="text" value={values.zipcode} onChange={handleChange} />

      <Form.Group>
        <Form.Label>都道府県</Form.Label>
        <Form.Control name="address1" type="text" value={values.address1} onChange={handleChange} />

        <Form.Label>市区町村</Form.Label>
        <Form.Control name="address2" type="text" value={values.address2} onChange={handleChange} />

        <Form.Label>番地</Form.Label>
        <Form.Control name="address3" type="text" value={values.address3} onChange={handleChange} />

        <Form.Label>建物名</Form.Label>
        <Form.Control name="address4" type="text" value={values.address4} onChange={handleChange} />

        <Form.Label>その他</Form.Label>
        <Form.Control name="address5" type="text" value={values.address5} onChange={handleChange} />

        <Form.Label>年齢</Form.Label>
        <Form.Control name="age" type="number" value={values.age} onChange={handleChange} />
      </Form.Group>
    </Form>
  );
});