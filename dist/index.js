var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function deserialize(query) {
  const params = new URLSearchParams(query);
  return new Map(Array.from(params.keys()).map((k) => [k, params.getAll(k)]));
}
const targetSelector = `input:not([type="file"]):not([type="password"]), select, textarea`;
class FormStorage {
  constructor(selector, opt) {
    __publicField(this, "_selector");
    __publicField(this, "_option");
    __publicField(this, "_checkbox", null);
    this._selector = selector;
    this._option = {
      ...{
        name: "form",
        ignores: [],
        includes: [],
        checkbox: null
      },
      ...opt
    };
    document.addEventListener("DOMContentLoaded", () => {
      if (this._option.checkbox) {
        this._checkbox = document.querySelector(this._option.checkbox);
        this._setCheckbox();
      }
    });
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
    this._form().addEventListener(type, listener, options);
  }
  addChildrenEventListener(type, listener, options) {
    this._targets().forEach((e) => e.addEventListener(type, listener, options));
  }
  _form() {
    return document.querySelector(this._selector);
  }
  _targets() {
    const { ignores, includes } = this._option;
    return [
      ...document.querySelectorAll(
        `${this._selector} ${targetSelector}`
      )
    ].filter(
      (e) => ignores.every((x) => !e.matches(x)) && (includes.length === 0 || includes.some((x) => e.matches(x)))
    );
  }
  _serialize() {
    const formdata = new FormData(this._form());
    const targetNames = this._targets().map((e) => e.name);
    [...formdata.keys()].forEach((k) => {
      if (!targetNames.includes(k))
        formdata.delete(k);
    });
    return new URLSearchParams(
      [...formdata].map(([k, v]) => [k, String(v)])
    ).toString();
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
    return this._serialize();
  }
  _applyState(str) {
    const _targets = this._targets();
    const obj = deserialize(str);
    obj.forEach((values, key) => {
      const targets = _targets.filter((e) => e.matches(`[name="${key}"]`));
      if (targets.length === 0)
        return;
      targets.forEach((t, i) => {
        if ("checked" in t && ["checkbox", "radio"].includes(t.type)) {
          values.forEach((v) => {
            if (t.value === v)
              t.checked = true;
          });
        } else {
          if (i < values.length)
            t.value = values[i];
        }
      });
    });
  }
}
export {
  FormStorage as default
};
