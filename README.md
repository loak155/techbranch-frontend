# techbranch-frontend

## 使用技術

<img src="https://img.shields.io/badge/-TypeScript-silver.svg?logo=typescript">
<img src="https://img.shields.io/badge/-React-silver.svg?logo=react">
<img src="https://img.shields.io/badge/-Docker-silver.svg?logo=docker">
<img src="https://img.shields.io/badge/-GitHub Actions-silver.svg?logo=githubactions">

## 機能概要

- サインアップ
  - 登録後、ユーザ認証のメール送信する
  - メールでの URL リンクから認証すると本登録する
- ログイン
  - Email・パスワードでのログインする
  - Google アカウントでのログインする
- 記事一覧
  - 記事の一覧を表示する
  - 記事をクリックすると記事本文へ遷移する
- ブックマーク
  - ブックマークを登録する
  - ブックマークを削除する
  - ブックマーク一覧からブックマークした記事の一覧を表示する
- コメント
  - コメントを登録する
  - コメントを表示する

## セットアップ

### 環境変数の設定

`.env.production`ファイルを作成し、API のエンドポイントや他の環境変数を設定します。

```text:.env.production
REACT_APP_API_BASE_URL=https://api.techbranch.link/v1
```

### Docker イメージの作成と起動

```bash:
$ docker compose up --build
```

http://localhost:80 にアクセスできます。

### Docker を使用しない場合

```bash:
# 依存関係のインストール
$ npm install
# アプリケーションの起動
$ npm start
```

http://localhost:3000 にアクセスできます。