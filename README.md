[English](README.md) | [日本語](README-ja.md)

# form-storage

Library to save form contents to LocalStorage

https://github.com/appleple/form-storage has not been maintained since 2020, so I made it.

## Installation

### npm

```sh
npm install git+https://github.com/rsvzuiun/form-storage.git
```

```js
import FormStorage from 'form-storage';
```


### umd

Copy [`dist/index.umd.js`](dist/index.umd.js) to your desired name.

```html
<script src="path-to-index.umd.js"></script>
```

## Usage

```js
const storage = new FormStorage("form",
{
  name: "unique-name",
  includes: ['[class="in"]'],
  ignores: ['[class="out"]']
});
```

* `FormStorage.constructor()`
  * 1st argument: [CSS selectors](https://developer.mozilla.org/en/docs/Web/CSS/CSS_selectors) to target `HTMLFormElement`
  * 2nd argument:
    * `name`: Key when savig to LocalStorage
    * `ignores`: Array of [CSS selectors](https://developer.mozilla.org/en/docs/Web/CSS/CSS_selectors) to ignore `Element`
    * `includes`: Array of [CSS selectors](https://developer.mozilla.org/en/docs/Web/CSS/CSS_selectors) to include `Element`
* `storage.save()`: Save the current form content to LocalStorage
* `storage.apply()`: Load the state from LocalStorage and apply it to the form
* `storage.clear()`: Remove the state from LocalStorage
* `storage.addEventListener(...)`: Apply [`addEventListener`](https://developer.mozilla.org/en/docs/Web/API/EventTarget/addEventListener) for `HTMLFormElement`
* `storage.addChildrenEventListener(...)`: Apply [`addEventListener`](https://developer.mozilla.org/en/docs/Web/API/EventTarget/addEventListener) for all `Elements[]` based on `ignores` and `includes`

## Example

* [Persistence of input data for calculator](https://github.com/rsvzuiun/rsvzuiun.github.io/tree/main/content/posts/pot)
