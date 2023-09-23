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
  addEventListener(type, listener, options) {
    this._targets().forEach((e) => e.addEventListener(type, listener, options));
  }
  _form() {
    return document.querySelector(this._selector);
  }
  _targets() {
    const { ignores, includes } = this._option;
    return Array.from(this._form().querySelectorAll("input")).filter(
      (e) => e.type !== "file" && !ignores.some((x) => e.matches(x)) && includes.some((x) => e.matches(x))
    );
  }
  _setCheckbox() {
    this._form().addEventListener("submit", () => {
      var _a;
      if ((_a = this._checkbox) == null ? void 0 : _a.checked) {
        this.save();
      } else {
        this.clear();
      }
    });
  }
  _getState() {
    return serialize(this._form());
  }
  _applyState(str) {
    const _targets = this._targets();
    const obj = deserialize(str);
    obj.forEach((values, key) => {
      const targets = _targets.filter((e) => e.matches(`[name="${key}"]`));
      if (targets.length === 0)
        return;
      if (["radio", "checkbox"].includes(targets[0].type)) {
        targets.forEach((t) => {
          values.forEach((v) => {
            if (t.value === v)
              t.checked = true;
          });
        });
      } else {
        targets.forEach((e, i) => e.value = values[i]);
      }
    });
  }
}
export {
  FormStorage as default
};
