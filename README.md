# ajax-sample-react

## Requirement

* node をインストールする

https://nodejs.org/ja/download/

## Reactアプリケーションの構築

```
npx create-react-app ajax_client --template typescript
cd ajax_client
```

## コンポーネントの追加

使用するライブラリを追加します。

```
npm install --save axios react-bootstrap formik http-proxy-middleware
```

以下は必須ではないですが、入れておくとエディタがコードの間違いを指摘してくれるので便利です。

```
npm install --save-dev eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react
```

## typescriptバージョンの更新

package.jsonの中のtypescriptのバージョンを3.7.5 → 3.8.3に書き換えます。

```
    "typescript": "^3.8.3"
```

## npm install再実行

```
npm install
```

## setupProxy.jsの配置

Cloud9を使っている人はCORS対策のため、以下のコードを`src/`以下に配置しておく必要があります。  

```
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      pathRewrite: function(path, req) { return  path.replace('/api', '/') },
      changeOrigin: true,
    })
  );
};
```

## 立ち上げ

```
PORT=8081 SKIP_PREFLIGHT_CHECK=true npm start
```

## 演習課題

### 1. addresses.jsonから情報を取得し、一覧表示する

この課題を達成するためには以下のライブラリを使って実装します

* axios
https://github.com/axios/axios

* react-bootstrap
https://react-bootstrap.github.io/

ファイルの配置
```
src/
  components/
    AddressList/
      index.tsx
    resources/
      index.ts
      types.ts
```

src/App.tsxの置き換え

```
import React from 'react';
import './App.css';

import { Container } from 'react-bootstrap';
import { AddressList } from './components/AddressList';

function App() {
  return (
    <Container>
      <AddressList />
    </Container>
  );
}

export default App;
```

AddressList/index.tsx の雛形

```
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

import { getAddresses } from '../resources';
import { AddressType } from '../resources/types';

export const AddressList = () => {
    const [addressState, setAddressState] = useState<AddressType[]>([]);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        if(refresh) {
            const promise = getAddresses({ page: 1, per: 100 });
            promise.then((data) => {
                setAddressState(data.results);
            });
            setRefresh(false);
        }
    }, [refresh]);
    return (
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
                        <tr key={address.id}>
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
                    );
                })}
            </tbody>
        </Table>
    );
}
```

resources/index.tsx

```
import axios from "axios";
import { AddressResponseType } from './types';

const instance = axios.create({
    baseURL: "/api",
    timeout: 1000,
});

export type GetAddressesParams = {
    page: number;
    per: number;
}

export const getAddresses = async (params: GetAddressesParams) => {
  const response = await instance.get<AddressResponseType>("/addresses.json", {
    params,
  });
  return await response.data;
};
```

resources/types.ts

```
export type AddressType = {
  id?: number;
  name: string;
  name_kana: string;
  gender: string;
  phone: string;
  mail: string;
  zipcode: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  address5: string;
  age: number;
};

export type AddressResponseType = {
  total: number;
  per: number;
  page: number;
  results: AddressType[];
};
```

## 解説

### useState

state(ここではaddressStateやrefresh)を使ってコンポーネントの状態を表現します。  
stateを更新する際はsetStateを使用します。（ここではsetAddressStateやsetRefresh）  
useStateを使用する際は型情報を付加できます。指定しなければ任意の型が入るany型となりますが、型を指定することで、間違った情報が代入されようとすると事前にエラーを出してくれます。  

### useEffect

react-hooksの機能の一つで、特定の値の更新等に連動して実行される関数です。
第2引数の配列内の値が変更されたときに動作し、この例ではrefreshフラグが変更されたときに動作します。

https://ja.reactjs.org/docs/hooks-effect.html

### react-bootstrap Table

使用している`<Table>`はHTMLの`<table>`ではなく、React Bootstrapの`<Table>`コンポーネントを指しています。コンポーネントを使用する際は、importで指定することで、取り込むことができます。

https://react-bootstrap.github.io/components/table/

### axios

APIで情報を取得するためにaxiosというライブラリを使用します。
入出力のパラメータに型を指定しておくことで、入力間違いを防ぐことができます。

取得する情報は以下に掲載しています。

https://github.com/kirikak2/ajax_sample#ajax-sample-specification

### promise

JavaScriptでは非同期的に動く処理と同期的に動く処理を書き分ける必要があり、axiosの関数の返却値は基本的に非同期で処理が返却されます。  
非同期の処理はPromiseオブジェクトを受け取るため、thenを呼び出して、受け取ったあとの値の代入を同期的に入れる必要があります。  
このthenがなければ、値の取得より早く値を代入する処理が動いてしまう場合があり、うまくデータを取得できません。  

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/then

### 2. ページネーションを実装する

ページネーションはデータをページに分割し、ページごとに分割表示するUIです。

https://react-bootstrap.github.io/components/pagination/

ヒントとしてコンポーネントだけ用意します。  
（大量にページがあるときは中間のページ番号をスキップするなど、改良の余地があります。）

ファイルの配置

```
src/
  components/
    Paginate/
      index.tsx
```

Paginate/index.tsxの実装

```
import React, { useCallback } from 'react';
import { Pagination } from 'react-bootstrap';

type Props = {
  total: number;
  per: number;
  page: number;
  onClick: (page: number) => void;
};

export const Paginate = React.memo((props: Props) => {
  const { total, per, page, onClick } = props;
  const lastPage = (total / per) + (total % per === 0 ? 0 : 1);

  const paginationItems = [];

  const handleClick = useCallback((page) => {
    if(page < 1 || page > lastPage) {
      return;
    }
    onClick(page);
  }, [onClick, lastPage]);
  for(let i = 1; i <= lastPage; i++) {
    paginationItems.push(
      <Pagination.Item key={i} onClick={() => handleClick(i)} active={i === page}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => handleClick(1)} />
      <Pagination.Prev onClick={() => handleClick(page - 1)} />
      {paginationItems}
      <Pagination.Next onClick={() => handleClick(page + 1)} />
      <Pagination.Last onClick={() => handleClick(lastPage)} />
    </Pagination>
  );
});
```

# 解説

## props

Reactでは、コンポーネントからコンポーネントを呼び出す際に、propsという形で引数を渡すことができます。  
例えばこのコンポーネントでは以下のように呼び出せます。  

```
<Paginate total={500} per={100} page={1} onClick={クリック時の動作をする関数}>
```

propsを渡す関数では、上位で値が変動するたびに呼び出されるため、React.memoを使うことによって、同じ値が渡されたときは、描画処理を行わないようにすることで、全体の書き換え回数を減らし、パフォーマンスを上げることができます。

AddressList/index.tsxの実装を考えてみましょう。

## 実装のヒント

PaginateとAddressListを連動させるためには、共通の新たなステートが必要になります。
onClickに必要なステートを考えてみましょう。

### 3. データの新規作成

リストの上に新規作成ボタンを実装しましょう。

ファイルの配置
```
src/
  components/
    AddressForm/
      index.tsx
```

AddressForm/index.tsxの実装

```
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

```

# 解説

## formik

フォームの制御にはformikというライブラリを使用します。いわゆるHTMLで値を送信する`<form>`を実現するライブラリです。

https://formik.org/docs/api/useFormik

AddressList/index.tsxの実装を考えてみましょう。

## 実装のヒント

* ダイアログを表示・非表示にするためには、showのパラメータがtrue / falseになるように作りましょう。
* onSave()は何をすればよいかを考えてみましょう。

### 4. データの編集・削除

編集はデータの新規作成とほぼ実装は同じです。

```
src/
  components/
    AddressForm/
      editAddressForm.tdx
```

Propsとformikのパラメータだけヒントとして掲載します。

```
type Props = {
  show: boolean;
  onClickDelete: (id: number) => void;
  onClose: () => void;
  onSave: (values: AddressType) => void;
  address?: AddressType;
}
```

formikのパラメータ
```
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
```