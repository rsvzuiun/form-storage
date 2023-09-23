type Option = {
    name: string;
    ignores: string[];
    includes: string[];
    checkbox: string | null;
};
declare class FormStorage {
    private _selector;
    private _option;
    private _checkbox;
    constructor(selector: string, opt: Partial<Option>);
    save(): void;
    apply(): void;
    clear(): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    private _form;
    private _targets;
    private _setCheckbox;
    private _getState;
    private _applyState;
}
export default FormStorage;
