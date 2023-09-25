declare class FormStorage {
    private _selector;
    private _option;
    private _checkbox;
    constructor(selector: string, opt?: {
        name?: string;
        ignores?: string[];
        includes?: string[];
        checkbox?: string | null;
    });
    save(): void;
    apply(): void;
    clear(): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    addChildrenEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    private _form;
    private _targets;
    private _serialize;
    private _setCheckbox;
    private _getState;
    private _applyState;
}
export default FormStorage;
