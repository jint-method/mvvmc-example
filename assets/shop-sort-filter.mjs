import { sort } from "./store.mjs";
export default class ShopSortFilter extends HTMLElement {
    constructor() {
        super();
        this.handleInput = () => {
            // @ts-expect-error
            sort(this.input.value);
        };
        this.input = this.querySelector("select");
    }
    connectedCallback() {
        this.input.addEventListener("change", this.handleInput);
    }
    disconenctedCallback() {
        this.input.removeEventListener("change", this.handleInput);
    }
}
