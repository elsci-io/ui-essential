export default class SnackBar {
    /**
     * @param {string} messageText
     * @param {string?} buttonText
     * @param {string} elementId
     * @return {string}
     */
    static "__#3@#htmlTemplate"(messageText: string, buttonText: string | null, elementId: string): string;
    /** @param {{msgText:string, btnText:string, btnCb:function, ttl:number}} prop */
    static "__#3@#validateProperties"(prop: {
        msgText: string;
        btnText: string;
        btnCb: Function;
        ttl: number;
    }): void;
    static "__#3@#getSnackBarContainerEl"(): Element;
    /** @param {string} id */
    constructor(id?: string);
    /**
     * @param {{msgText:string, btnText:string, btnCb:function, ttl:number}} prop
     */
    show(prop: {
        msgText: string;
        btnText: string;
        btnCb: Function;
        ttl: number;
    }): void;
    remove(): void;
    #private;
}
