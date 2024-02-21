export default class SnackBar {
    /**
     * @param {string} messageText
     * @param {string?} buttonText
     * @param {string} elementId
     * @return {string}
     */
    static "__#9@#htmlTemplate"(messageText: string, buttonText: string | null, elementId: string): string;
    /** @param {{msgText:string, btnText:string, btnCb:function, ttl:number}} prop */
    static "__#9@#validateProperties"(prop: {
        msgText: string;
        btnText: string;
        btnCb: Function;
        ttl: number;
    }): void;
    static "__#9@#getSnackBarContainerEl"(): Element;
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
