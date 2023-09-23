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

[`dist/index.umd.cjs`](dist/index.umd.cjs) を好きな名前にコピーする

```html
<script src="path-to-index.umd.cjs"></script>
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
    * `ignores`: 無視する `HTMLInputElement` の [CSSセレクター](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_selectors) の配列
    * `includes`: 対象とする `HTMLInputElement` の [CSSセレクター](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_selectors) の配列
* `storage.save()`: 現在のフォームの状態を LocalStorage に保存する
* `storage.apply()`: LocalStorage から状態を読み込んでフォームへ復元する
* `storage.clear()`: LocalStorage から状態を削除する
* `storage.addEventListener(...)`: `ignores`, `includes` に基づく `HTMLInputElement[]` に [`addEventListener`](https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener) をまとめて適用する

## 使用例

* [計算機の入力データの永続化](https://github.com/rsvzuiun/rsvzuiun.github.io/tree/main/content/posts/pot)
