var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function serialize(ele) {
  return new URLSearchParams(
    [...new FormData(ele)].map(([k, v]) => [k, String(v)])
  ).toString();
}
function deserialize(query) {
  const params = new URLSearchParams(query);
  return new Map(Array.from(params.keys()).map((k) => [k, params.getAll(k)]));
}
const defaults = {
  name: "form",
  ignores: [],
  includes: [],
  checkbox: null
};
class FormStorage {
  constructor(selector, opt) {
    __publicField(this, "_selector");
    __publicField(this, "_option");
    __publicField(this, "_checkbox", null);
    this._selector = selector;
    this._option = Object.assign({}, defaults, opt);
    if (this._option.checkbox) {
      this._checkbox = document.querySelector(this._option.checkbox);
      this._setCheckbox();
    }
  }
  save() {
    window.localStorage.setItem(this._option.name, this._getState());
  }
  apply() {
    const str = window.localStorage.getItem(this._option.name);
    if (str)
      this._applyState(str);
  }
  clear() {
    window.localStorage.removeItem(this._option.name);
  }
  _ele() {
    return document.querySelector(this._selector);
  }
  _setCheckbox() {
    this._ele().addEventListener("submit", () => {
      var _a;
      if ((_a = this._checkbox) == null ? void 0 : _a.checked) {
        this.save();
      } else {
        this.clear();
      }
    });
  }
  _getState() {
    return serialize(this._ele());
  }
  _applyState(str) {
    const { ignores, includes } = this._option;
    const obj = deserialize(str);
    obj.forEach((values, key) => {
      const targets = Array.from(
        this._ele().querySelectorAll(`input[name="${key}"]`)
      );
      if (targets.length === 0)
        return;
      if (targets[0].type === "file")
        return;
      if (ignores.some((x) => targets[0].matches(x)))
        return;
      if (includes.some((x) => !targets[0].matches(x)))
        return;
      if (targets.some((e) => e.type !== targets[0].type)) {
        return;
      }
      if (["radio", "checkbox"].includes(targets[0].type)) {
        targets.forEach((t) => {
          values.forEach((v) => {
            if (t.value === v)
              t.checked = true;
          });
        });
        return;
      }
      if (targets.length > 1) {
        return;
      }
      targets[0].value = values[0];
    });
  }
}
export {
  FormStorage as default
};
