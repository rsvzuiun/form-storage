if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("deserialize", () => {
    expect(deserialize("")).toStrictEqual(new Map([]));
    expect(deserialize("a=1")).toStrictEqual(new Map([["a", ["1"]]]));
    expect(deserialize("a=1&a=2&a=3")).toStrictEqual(
      new Map([["a", ["1", "2", "3"]]])
    );
  });
}

function serialize(ele: HTMLFormElement): string {
  return new URLSearchParams(
    [...new FormData(ele)].map(([k, v]) => [k, String(v)])
  ).toString();
}

function deserialize(query: string): Map<string, string[]> {
  const params = new URLSearchParams(query);

  return new Map(Array.from(params.keys()).map((k) => [k, params.getAll(k)]));
}

type Option = {
  name: string;
  ignores: string[];
  includes: string[];
  checkbox: string | null;
};

const defaults: Option = {
  name: "form",
  ignores: [],
  includes: [],
  checkbox: null,
};

class FormStorage {
  private _selector: string;
  private _option: Option;
  private _checkbox: HTMLInputElement | null = null;

  public constructor(selector: string, opt: Partial<Option>) {
    this._selector = selector;
    this._option = Object.assign({}, defaults, opt);
    if (this._option.checkbox) {
      this._checkbox = document.querySelector(this._option.checkbox);
      this._setCheckbox();
    }
  }

  public save(): void {
    window.localStorage.setItem(this._option.name, this._getState());
  }

  public apply(): void {
    const str = window.localStorage.getItem(this._option.name);
    if (str) this._applyState(str);
  }

  public clear(): void {
    window.localStorage.removeItem(this._option.name);
  }

  public addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void {
    this._targets().forEach((e) => e.addEventListener(type, listener, options));
  }

  private _form(): HTMLFormElement {
    return document.querySelector(this._selector)!;
  }

  private _targets(): HTMLInputElement[] {
    const { ignores, includes } = this._option;
    return Array.from(this._form().querySelectorAll("input")).filter(
      (e) =>
        e.type !== "file" &&
        ignores.every((x) => !e.matches(x)) &&
        (includes.length === 0 || includes.some((x) => e.matches(x)))
    );
  }

  private _setCheckbox(): void {
    this._form().addEventListener("submit", () => {
      if (this._checkbox?.checked) {
        this.save();
      } else {
        this.clear();
      }
    });
  }

  private _getState(): string {
    return serialize(this._form());
  }

  private _applyState(str: string): void {
    const _targets = this._targets();
    const obj = deserialize(str);

    obj.forEach((values, key) => {
      const targets = _targets.filter((e) => e.matches(`[name="${key}"]`));
      if (targets.length === 0) return;

      if (["radio", "checkbox"].includes(targets[0].type)) {
        targets.forEach((t) => {
          values.forEach((v) => {
            if (t.value === v) t.checked = true;
          });
        });
      } else {
        targets.forEach((e, i) => (e.value = values[i]));
      }
    });
  }
}

export default FormStorage;
