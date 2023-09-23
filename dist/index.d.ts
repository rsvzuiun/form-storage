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
    private _ele;
    private _setCheckbox;
    private _getState;
    private _applyState;
}
export default FormStorage;
