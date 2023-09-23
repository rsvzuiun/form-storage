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

  private _ele(): HTMLFormElement {
    return document.querySelector(this._selector)!;
  }

  private _setCheckbox(): void {
    this._ele().addEventListener("submit", () => {
      if (this._checkbox?.checked) {
        this.save();
      } else {
        this.clear();
      }
    });
  }

  private _getState(): string {
    return serialize(this._ele());
  }

  private _applyState(str: string): void {
    const { ignores, includes } = this._option;
    const obj = deserialize(str);

    obj.forEach((values, key) => {
      const targets = Array.from(
        this._ele().querySelectorAll<HTMLInputElement>(`input[name="${key}"]`)
      );

      if (targets.length === 0) return;
      if (targets[0].type === "file") return;
      if (ignores.some((x) => targets[0].matches(x))) return;
      if (includes.some((x) => !targets[0].matches(x))) return;
      if (targets.some((e) => e.type !== targets[0].type)) {
        return;
        // throw new Error("nameにtype違い混在")
      }

      if (["radio", "checkbox"].includes(targets[0].type)) {
        targets.forEach((t) => {
          values.forEach((v) => {
            if (t.value === v) t.checked = true;
          });
        });
        return;
      }
      if (targets.length > 1) {
        return;
        // throw new Error("radio, checkbox以外でname重複");
      }

      targets[0].value = values[0];
    });
  }
}

export default FormStorage;
