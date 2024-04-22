# firebase プロジェクトの設定
- Authentication を開始して、 mail と google を有効にする
- Cloud Firestore を開始する


# `.env.local`
- json ファイルを環境変数に設定するときは、key を`""` で囲んで、[改行を削除](https://www.textfixer.com/tools/remove-line-breaks.php)
## `NEXTAUTH_SECRET`
```shell
openssl rand -base64 32
```

```ts
export const authOptions:NextAuthOptions ={
  ...,
  secret: process.env.NEXTAUTH_SECRET,
}
```
## `NEXT_PUBLIC_FIREBASE_CONFIG`
- firebase SDK で使用
- console から `firebaseConfig`を取得

## `NEXT_FIREBASE_SERVICE_ACCOUNT_KEY`
- firebase Admin SDK　で使用
- サービスアカウント > `新しい秘密鍵を生成`

## `NEXT_PUBLIC_ADMIN_UID`
- admin の uid を設定
- `SetAdminButton`を押して、`NEXT_PUBLIC_ADMIN_UID`の`Custom Claim` に `Admin` を設定する

# error??
- 2023/9/19 firebase auth のログインエラーが`auth/invalid-login-credentials` のみ


# deploy
## `Firebase: Error (auth/unauthorized-domain).`がでた場合
- firebase console Authentication 承認済みドメインに`anonymous-login.vercel.app`を追加
- `NEXTAUTH_URL`は`http://localhost:3000`のままでも正常動作

# anonymousについて
firestore に`read, write if true`（誰でも書き込めるルール）を設定すると警告がでる
しかし、firebase Admin SDK を使うと、管理者からの操作なので、ルールに束縛されない
Server Actions からのデータ操作は firebase Admin SDK を使う
つまり、Server Actions からの操作はルールに束縛されない
anonyomus ログインを使う必要がない

# primary color について
shadcn で primary color が設定されているので、
アプリで使うメインテーマは`tailwind.config.ts`に`main`として登録

# server component での pathname 取得について
middleware で取得できる
https://github.com/vercel/next.js/issues/43704#issuecomment-1411186664
ただし、ページ毎に呼び出す必要がある

# Mockup Photo
-  [unsplash](https://source.unsplash.com/random)

# firebase エミュレータ
```zsh
# fish ではエラーになるので、 zsh を選ぶ
zsh

# 設定で Firestore, Emulators を選ぶ
firebase init
# Emulators Setup で Auth, Firestore を選ぶ
```

## 1. エミュレータへの接続
### a. Admin SDK firestore
環境変数に`FIRESTORE_EMULATOR_HOST`を設定
### b. Admin SDK auth
環境変数に`FIREBASE_AUTH_EMULATOR_HOST`を設定
### c. SDK auth
```js
import { getAuth, connectAuthEmulator } from "firebase/auth";
const isDev = process.env.NODE_ENV === "development";
if (isDev) {
  connectAuthEmulator(authClient, "http://127.0.0.1:9099");
}
```

## 2. エミュレータの立ち上げ
```zsh
firebase emulators:start
```

## 3. user 登録
エミュレーターでユーザー登録
`Custom Claim`
```json
{"admin":true}
```

# 🔌 tRPC
|Pros & Cons | |
|-|-|
|🙆|ページの更新が不要<br/>クライアントサイドで`Admin SDK`が使える |
|🙅|描画毎に通信|


⛳ `search params` とサーバーサイド `fetch` で対応すれば大抵は解決<br/>ページ更新が頻繁すぎる場合は、`tRPC` を使う

# useFormStatus
`react-dom` の `18.2.13` ではエラー
```
dependencies:
+ react 18.2.0
+ react-dom 18.2.0

devDependencies:
- @types/react 18.2.28
+ @types/react 18.2.21 (18.2.28 is available)
- @types/react-dom 18.2.13
+ @types/react-dom 18.2.7 (18.2.13 is available)
```


cors
```

gsutil cors get gs://predict-draw.appspot.com

gsutil cors set cors.json gs://predict-draw.appspot.com
```