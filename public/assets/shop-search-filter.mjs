import{search as t}from"./controller.mjs";export default class e extends HTMLElement{constructor(){super(),this.handleInput=()=>{t(this.input.value)},this.input=this.querySelector("input")}connectedCallback(){this.input.addEventListener("input",this.handleInput)}disconenctedCallback(){this.input.removeEventListener("input",this.handleInput)}}