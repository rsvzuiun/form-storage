[English](README.md) | [日本語](README-ja.md)

# form-storage

フォームの内容を LocalStorage に保存するライブラリ

https://github.com/appleple/form-storage が2020年からメンテされていないため自作

## インストール方法

### npm

```sh
npm install git+https://github.com/rsvzuiun/form-storage.git
```

```js
import FormStorage from 'form-storage';
```


### umd

[`dist/index.umd.js`](dist/index.umd.js) を好きな名前にコピーする

```html
<script src="path-to-index.umd.js"></script>
```

### umd (CDN)

```html
<script defer src="https://cdn.jsdelivr.net/gh/rsvzuiun/form-storage/dist/index.umd.js"></script>
```

## 使い方

```js
const storage = new FormStorage("form",
{
  name: "unique-name",
  includes: ['[class="in"]'],
  ignores: ['[class="out"]']
});
```

* `FormStorage.constructor()`
  * 第1引数: 対象とする `HTMLFormElement` の [CSSセレクター](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_selectors)
  * 第2引数:
    * `name`: LocalStorage に保存する際の key
    * `ignores`: 無視する `Element` の [CSSセレクター](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_selectors) の配列
    * `includes`: 対象とする `Element` の [CSSセレクター](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_selectors) の配列
* `storage.save()`: 現在のフォームの状態を LocalStorage に保存する
* `storage.apply()`: LocalStorage から状態を読み込んでフォームへ復元する
* `storage.clear()`: LocalStorage から状態を削除する
* `storage.addEventListener(...)`: `HTMLFormElement` に [`addEventListener`](https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener) を適用する
* `storage.addChildrenEventListener(...)`: `ignores`, `includes` に基づく `Element[]` に [`addEventListener`](https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener) をまとめて適用する

## 使用例

* [計算機の入力データの永続化](https://github.com/rsvzuiun/rsvzuiun.github.io/tree/main/content/posts/pot)
