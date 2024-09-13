# Redux Github Viewer (API 通信)

## 概要
Reactを使ったAPI通信をキャッチアップする為に作成したミニアプリです。
実際に[Github REST API](https://docs.github.com/ja/rest/overview/resources-in-the-rest-api/)を使用して、自身のリポジトリのissueに対してCRUDができるようにしてあります。（プルリクエストは未実装）

## デモ

GithubPagesではなく[Netlify](https://www.netlify.com/)にデプロイして公開しています。

デモ: [https://github-viewer-2024.netlify.app](https://github-viewer-2024.netlify.app)


## 学習で身に着けること

- Reduxでの状態管理
- React Routerでのページ設定とページ遷移
- Eslint + Prettier
- HTTPリクエスト/レスポンスの仕組み
- AjaxでのHTTPリクエストの実装
- Promise, Async, Await

### 実装に必要な概念を学ぶ

#### Redux

- [Redux.js 公式](https://redux.js.org/introduction/getting-started)

#### REST APIについて
- [HTTPリクエスト/レスポンスの構成要素を初心者にも分かるように解説してみた](https://qiita.com/koheiyamaguchi0203/items/5777c4653a01ae4c7b06)
- [初心者目線でAjaxの説明](https://qiita.com/hisamura333/items/e3ea6ae549eb09b7efb9)
- [RESTful Web API の設計](https://learn.microsoft.com/ja-jp/azure/architecture/best-practices/api-design)

#### 環境変数とNode.jsのprocess.env

- [環境設定を行う！Node.jsのenvの使い方【初心者向け】](https://techacademy.jp/magazine/16243)
- [環境変数ってなに? ( Linux )](https://qiita.com/angel_p_57/items/480e3fd4552e52199835)
- [create-react-appで独自の環境変数を読み込む](https://qiita.com/zgmf_mbfp03/items/008436c5749d65f96e55)

#### HTTPクライアントのAxios
- [Axios公式](https://github.com/axios/axios)
- [axiosライブラリを使ってリクエストする](https://qiita.com/reflet/items/d5658d5d69e8e1ccd489)
- [axios、async/awaitを使ったHTTPリクエスト(Web APIを実行)](https://qiita.com/shisama/items/61cdcc09dc69fd8d3127)

### JavaScriptのアドバンスな機能

#### Promise async, wait

- [Promiseの使い方、それに代わるasync/awaitの使い方](https://qiita.com/suin/items/97041d3e0691c12f4974)

#### トースト（Notification)について

[react-toastify](https://github.com/fkhadra/react-toastify)というライブラリをつかってサイト内のトーストは実行しています。
