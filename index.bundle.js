!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.elsciUi=e():t.elsciUi=e()}(self,(()=>(()=>{"use strict";var t={d:(e,i)=>{for(var s in i)t.o(i,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:i[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{EditText:()=>d,SelectInput:()=>u,TextInput:()=>r,TypeAheadInput:()=>o});class i{#t;#e;#i;#s;constructor(t){this.#t=t,this.#e=t.querySelector("input"),this.#i=!0,this.#s=""}get isValid(){return this.#i}get errorMessage(){return this.#s}checkValidity(){this.setCustomValidity(""),this.#e.checkValidity();let t=this.#e.validity;return t.valid&&(t=this.#n()),this.#i=t.valid,this.#s=this.#l(t),this.isValid}setCustomValidity(t){this.#e.setCustomValidity(t),this.#i=this.#e.validity.valid,this.#s=t}#n(){const{badInput:t,customError:e,patternMismatch:i,typeMismatch:s,valid:n,rangeOverflow:l,rangeUnderflow:a,tooLong:r,tooShort:h,valueMissing:o,stepMismatch:u}=this.#e.validity,d=Object.assign({},{badInput:t,customError:e,patternMismatch:i,typeMismatch:s,valid:n,rangeOverflow:l,rangeUnderflow:a,tooLong:r,tooShort:h,valueMissing:o,stepMismatch:u},this.#a(),this.#r(),this.#h());return d.valid=!(d.valueMissing||d.rangeUnderflow||d.rangeOverflow||d.stepMismatch),d}#a(){const t=this.#e.value.trim();return{valueMissing:this.#t.hasAttribute("required")&&""===t}}#r(){if("number"!==this.#e.type)return{rangeUnderflow:!1,rangeOverflow:!1};const{min:t,max:e,value:i}=this.#e;return{rangeUnderflow:""!==t&&+i<+t,rangeOverflow:""!==e&&+i>+e}}#h(){if("number"!==this.#e.type)return{stepMismatch:!1};const t=this.#t.getAttribute("number-type");return t&&"integer"===t?{stepMismatch:!Number.isInteger(this.#e.valueAsNumber)}:{stepMismatch:!1}}#l(t){const e="number"===this.#e.type,{badInput:i,rangeOverflow:s,rangeUnderflow:n,tooLong:l,tooShort:a,valueMissing:r,stepMismatch:h}=t;if(e&&i)return"Invalid number";if(e&&h){if("1"===this.#e.step)return"Must be an integer";const t=this.#t.getAttribute("number-type");if(t&&"integer"===t)return"Must be an integer"}return s?"Greater than "+this.#e.max:n?"Less than "+this.#e.min:l?"Max length is "+this.#e.maxLength:a?"Min length is "+this.#e.minLength:!i&&r?"Required":this.#e.validationMessage}}const s=Object.freeze({Shift:"ShiftLeft",Esc:"Escape",Enter:"Enter",Up:"ArrowUp",Down:"ArrowDown"}),n=t=>t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):"",l=(t,...e)=>{let i=t[0];for(let s=0;s<e.length;s++)i+=n(String(e[s])),i+=t[s+1];return i};function a(t){const e=document.createElement("span");document.body.appendChild(e),e.textContent=t,e.style.fontSize="1rem",e.style.visibility="hidden",e.style.position="absolute";const i=Math.ceil(e.getBoundingClientRect().width)+1;return e.remove(),i}class r extends HTMLElement{static#o=new Set(["autocomplete","autofocus","disabled","max","maxlength","min","minlength","name","pattern","readonly","step","type","value","placeholder"]);#e;#u;#d;#p={onTrailingIconClick:[],onChangeValue:[],onInput:[]};#c;#m=[];connectedCallback(){this.innerHTML=this.#g(),this.#e=this.querySelector("input"),this.#u=this.querySelector(".text-input__error"),this.#d=new i(this),this.#b(),this.#E(),this.hasAttribute("value")&&(this.value=this.getAttribute("value"))}disconnectedCallback(){this.setAttribute("value",this.value),window.removeEventListener("visibilitychange",this.#v.bind(this),{capture:!0})}addValidator(t){this.#m.push(t)}get value(){return this.rawValue.trim()}get rawValue(){return this.#e.value}set value(t){this.#e.value=function(t){return!(void 0===t||!Number.isFinite(t))}(t)||"string"==typeof t?t:"",this.#c=this.#e.value,this.checkValidity()}checkValidity(){if(!this.#d.checkValidity())return this.errorMessage=this.#d.errorMessage,!1;this.errorMessage=this.#d.errorMessage;for(const t of this.#m){const e=t.validate(this,this.value);if(!e.isValid)return this.errorMessage=e.errorMessage,this.focus(),!1}return!0}get errorMessage(){return this.#u.textContent}set errorMessage(t){t&&(this.#c=null),this.#d.setCustomValidity(t),this.#u.textContent=this.#d.errorMessage}onTrailingIconClick(t){this.#p.onTrailingIconClick.push(t)}onInput(t){this.#p.onInput.push(t)}onChangeValue(t){this.#p.onChangeValue.push(t)}focus(t){this.#e.focus(t)}setDisabled(t){this.toggleAttribute("disabled",t),this.#e.toggleAttribute("disabled",t)}setPlaceholder(t){this.#e.setAttribute("placeholder",n(t)),this.classList.add("placeholder-shown")}#w(t){"number"!==this.#e.type||t.key!==s.Up&&t.key!==s.Down||t.preventDefault(),t.key!==s.Enter||t.repeat||this.#y()}#f(){const t=this.checkValidity();this.#p.onInput.forEach((e=>e(this.value,t)))}#y(){this.#c!==this.value&&this.#V()}#x(){this.#p.onTrailingIconClick.forEach((t=>t()))}#V(){this.checkValidity()&&(this.#c=this.value,this.#p.onChangeValue.forEach((t=>t(this.value))))}#b(){for(const t of this.attributes)r.#o.has(t.name)&&this.#e.setAttribute(t.name,t.value);"number"!==this.getAttribute("type")||this.hasAttribute("step")||this.#e.setAttribute("step","any"),this.hasAttribute("placeholder")&&this.classList.add("placeholder-shown")}#E(){this.#e.addEventListener("keydown",this.#w.bind(this)),this.#e.addEventListener("input",this.#f.bind(this)),this.#e.addEventListener("focusout",this.#y.bind(this)),this.querySelector(".text-input__trailing-icon").addEventListener("click",this.#x.bind(this)),window.addEventListener("visibilitychange",this.#v.bind(this),{capture:!0})}#v(){document.activeElement===this.#e&&this.#e.blur()}#g(){const t=this.getAttribute("data-icon")||"";return l`<input class="text-input__input" placeholder="needed for CSS">
                <label class="text-input__label">${this.getAttribute("label")}</label>
                <i class="text-input__trailing-icon material-symbols-outlined">${t}</i>
                <p class="text-input__error"></p>`}static get is(){return"text-input"}}window.customElements.get(r.is)||window.customElements.define(r.is,r);class h extends HTMLElement{#A;#C=[];#k=0;#S=-1;#M=(t,e)=>t.displayName.localeCompare(e.displayName);#p={onOptionClick:[]};#I;get options(){return this.#C}set options(t){this.#T(t),this.innerHTML=this.#g(),this.#A=this.querySelector("ul"),this.#L(),this.#E()}set comparator(t){this.#M=t}set filter(t){const e=t.toLowerCase();for(const t of this.querySelectorAll("li")){const{displayName:i}=this.#C[t.dataset.index],s=i.toLowerCase().indexOf(e);t.innerHTML=this.#D(i,s,e.length),t.toggleAttribute("hidden",-1===s)}const i=this.#O();i&&(i.hasAttribute("hidden")?this.#$():i.scrollIntoView({block:"nearest"}))}show(){document.addEventListener("wheel",this.#I,{capture:!0,passive:!1}),this.toggleAttribute("open",!0),this.#L()}hide(){document.removeEventListener("wheel",this.#I,{capture:!0,passive:!1}),this.toggleAttribute("open",!1),this.#$()}selectNextItem(){const t=this.#N();if(this.hasSelectedElement()){const e=t.indexOf(this.#O());if(t.length-1<=e)return;this.#q(t[e+1].dataset.index)}else{if(0===t.length)return;this.#q(t[0].dataset.index)}}selectPrevItem(){const t=this.#N();if(this.hasSelectedElement()){const e=t.indexOf(this.#O());if(0===e)return;this.#q(t[e-1].dataset.index)}else{if(0===t.length)return;this.#q(t[t.length-1].dataset.index)}}triggerClickOnSelectedItem(){this.hasSelectedElement()&&this.#O().dispatchEvent(new MouseEvent("mousedown"))}hasSelectedElement(){return null!=this.#O()}isVisible(){return this.hasAttribute("open")}onOptionClick(t){this.#p.onOptionClick.push(t)}connectedCallback(){this.innerHTML=this.#g(),this.#A=this.querySelector("ul"),this.#E(),this.#I=t=>{if(this.contains(t.target)){const e=t.deltaY<0,i=t.deltaY>0,s=0===this.#A.scrollTop,n=this.#A.scrollTop+this.#A.clientHeight>=this.#A.scrollHeight;(e&s||i&n)&&(t.stopPropagation(),t.preventDefault())}else t.stopPropagation(),t.preventDefault()}}#T(t){"function"==typeof this.#M?this.#C=[...t].sort(this.#M):this.#C=t}#N(){return[...this.#A.querySelectorAll("li:not([hidden])")]}#E(){this.#A.addEventListener("mousedown",(t=>{t.preventDefault()}));for(const t of this.querySelectorAll("li"))t.addEventListener("mousedown",(()=>{const e=this.#C[t.dataset.index];this.#p.onOptionClick.forEach((t=>t(e)))}))}#g(){return`\n            <ul>\n                ${this.#C.map(((t,e)=>l`<li data-index="${e}" title="${t.title||t.displayName}">${t.displayName}</li>`)).join("")}\n            </ul>`}#L(){const t=this.parentElement.getBoundingClientRect();0===this.#k&&(this.#k=Math.max(...this.#C.map((t=>a(t.displayName))),0));const e=Math.max(this.#k+24+22,t.width),i=document.documentElement.clientWidth-t.left;this.#A.style.right=e>i?0:null,this.#A.style.width=`${Math.min(e,document.documentElement.clientWidth)}px`,this.style.width=`${Math.min(e,document.documentElement.clientWidth)}px`,this.style.top=`${t.top}px`}#O(){return this.querySelector(`li[data-index="${this.#S}"]`)}#q(t){this.#$(),this.#S=t;const e=this.#O();e.classList.add("list-box__item--active"),e.scrollIntoView({block:"nearest"})}#$(){this.#S>=0&&(this.#O().classList.remove("list-box__item--active"),this.#S=-1)}#D(t,e,i){if(e>=0){const s=t.substring(0,e),n=t.substring(e,e+i),a=t.substring(e+i);return l`<span>${s}<mark>${n}</mark>${a}</span>`}return t}static get is(){return"list-box"}}window.customElements.get(h.is)||window.customElements.define(h.is,h);class o extends HTMLElement{#e;#P;#_;#U=null;#H;#p={onChangeValue:[]};connectedCallback(){this.innerHTML=this.#g(),this.#e=this.querySelector("text-input"),this.#P=this.querySelector("list-box"),this.#H=this.hasAttribute("shouldMatchOptions"),this.#E()}get value(){return this.#_}get rawValue(){return this.#e.value}set value(t){this.#_=t,this.#e.value=t&&t.displayName?t.displayName:""}set initialValue(t){this.value=t,this.#U=t}set options(t){this.#P.options=t,this.#j()}set errorMessage(t){this.#e.errorMessage=t}checkValidity(){return this.#R()&&this.#e.checkValidity()}onChangeValue(t){this.#p.onChangeValue.push(t)}setDisabled(t){this.toggleAttribute("disabled",t),this.#e.setDisabled(t)}#f(){this.errorMessage="",this.#j(),this.#P.isVisible()||this.#P.show()}#B(){this.#j(),this.#P.show()}#F(){this.#K()}#W(t){this.value=t,this.#K()}#z(){this.value={displayName:""},this.#e.querySelector("input").focus()}#Y(t){switch([s.Up,s.Down].includes(t.code)&&(t.preventDefault(),t.stopImmediatePropagation()),t.key){case s.Esc:this.#K();break;case s.Enter:this.#P.isVisible()&&(this.#P.hasSelectedElement()?this.#P.triggerClickOnSelectedItem():this.#K());break;case s.Down:this.#P.isVisible()||this.#P.show(),this.#P.selectNextItem();break;case s.Up:this.#P.isVisible()||this.#P.show(),this.#P.selectPrevItem()}}#G(){this.#V()}#K(){this.#P.hide(),this.#V()}#V(){this.#R()&&this.#X()&&(this.#U=this.value,this.#p.onChangeValue.forEach((t=>t(this.value))))}#R(){const t=this.#e.value;if(""===t)return this.#_=null,!0;if(this.value&&this.value.displayName===t)return this.errorMessage="",!0;if(!this.#H)return this.errorMessage="",this.#_={displayName:t},!0;for(const e of this.#P.options)if(e.displayName===t)return this.errorMessage="",this.#_=e,this.#e.value=e.displayName,!0;return this.#_=null,this.errorMessage="Select from list",!1}#j(){this.hasAttribute("nofiltering")||(this.#P.filter=this.#e.value)}#X(){return this.#U!==this.value}#E(){const t=this.#e.querySelector("input");this.addEventListener("keydown",this.#Y.bind(this)),this.addEventListener("keyup",(t=>{t.stopPropagation()})),t.addEventListener("input",this.#f.bind(this)),t.addEventListener("blur",this.#F.bind(this)),t.addEventListener("focus",this.#B.bind(this)),this.#e.onTrailingIconClick(this.#z.bind(this)),this.#e.onChangeValue(this.#G.bind(this)),this.#P.onOptionClick(this.#W.bind(this))}#g(){const t=this.hasAttribute("required")?"required":"",e=this.hasAttribute("disabled")?"disabled":"",i=this.hasAttribute("no-icon")?"":"close";return l`
            <text-input 
                class="text-input--with-right-icon" 
                label="${this.getAttribute("label")}" 
                ${t}
                ${e}
                data-icon="${i}"
                autocomplete="off"
            ></text-input>
            <list-box></list-box>`}static get is(){return"typeahead-input"}}window.customElements.get(o.is)||window.customElements.define(o.is,o);class u extends HTMLElement{#e;#P;#_;#U=null;#p={onShowDropdown:[],onChangeValue:[]};get value(){return this.#_}set value(t){this.#e.value=t&&t.displayName?t.displayName:"",this.#_=t}set options(t){this.#P.options=t}set comparator(t){this.#P.comparator=t}setDisabled(t){this.toggleAttribute("disabled",t),this.#e.setDisabled(t)}setPlaceholder(t){this.#e.setPlaceholder(t)}showDropdown(){this.#P.show(),this.#p.onShowDropdown.forEach((t=>t()))}onShowDropdown(t){this.#p.onShowDropdown.push(t)}onChangeValue(t){this.#p.onChangeValue.push(t)}checkValidity(){return this.#R()}connectedCallback(){this.innerHTML=this.#g(),this.#e=this.querySelector("text-input"),this.#P=this.querySelector("list-box"),this.#E()}#E(){this.addEventListener("keydown",this.#Y.bind(this));const t=this.#e.querySelector("input");t.addEventListener("focusout",this.#J.bind(this)),t.addEventListener("click",this.#Q.bind(this)),this.#P.onOptionClick(this.#W.bind(this))}#J(){this.#K()}#W(t){this.#e.value=t.displayName,this.#_=t,this.#K()}#Q(){this.#P.isVisible()?this.#P.hide():this.showDropdown()}#Y(t){switch([s.Up,s.Down].includes(t.code)&&(t.preventDefault(),t.stopImmediatePropagation()),t.key){case s.Esc:t.preventDefault(),this.#K(),this.#e.focus();break;case s.Enter:this.#P.isVisible()&&(t.stopPropagation(),this.#P.hasSelectedElement()?this.#P.triggerClickOnSelectedItem():this.#P.hide());break;case s.Down:this.#P.isVisible()||this.#P.show(),this.#P.selectNextItem();break;case s.Up:this.#P.isVisible()||this.#P.show(),this.#P.selectPrevItem()}}#K(){this.#P.hide(),this.#V()}#V(){this.#R()&&this.#U!==this.value&&(this.#U=this.value,this.#p.onChangeValue.forEach((t=>t(this.value))))}#R(){return this.#e.hasAttribute("required")&&!this.#e.value?this.#e.errorMessage="Required":this.#e.errorMessage="",this.#e.checkValidity()}#g(){const t=this.hasAttribute("required")?"required":"",e=this.hasAttribute("disabled")?"disabled":"";return safeHtml`
            <text-input
                class="text-input--select" 
                label="${this.getAttribute("label")}" 
                ${t}
                ${e}
                data-icon="arrow_drop_down"
                readonly
            ></text-input>
            <list-box></list-box>`}static get is(){return"select-input"}}window.customElements.get(u.is)||window.customElements.define(u.is,u);class d extends HTMLElement{#Z;#i=!0;#tt;#et="";#it="";#st=t=>t;#nt=new ResizeObserver(this.#lt.bind(this));#p={onChangeValue:[]};connectedCallback(){this.innerHTML=this.#g(),this.#Z={text:this.querySelector(".edit-text__text"),popup:this.querySelector(".edit-text__popup"),input:this.querySelector("text-input")},this.#E(),this.#nt.observe(document.body),this.#at(),this.#rt()}disconnectedCallback(){this.#nt.unobserve(document.body)}onChange(t){this.#p.onChangeValue.push(t)}checkValidity(){return this.#Z.input.checkValidity()}toggleIncorrectAttribute(t){this.toggleAttribute("incorrect",t)}addExternalValidator(t){this.#Z.input.addValidator(t)}addValidator(t){this.#Z.input.addValidator(t)}get value(){return this.#Z.input.value}set value(t){this.#Z.input.value=t,this.#rt()}set displayTextTransformer(t){this.#st=t}#ht(){return this.getAttribute("value")}#ot(){let t=this.#st(this.#ht());return this.#ut()&&(t=+t),`${this.#it}${t}${this.#et}`}#E(){this.#Z.text.addEventListener("click",this.#dt.bind(this)),this.addEventListener("click",this.#pt.bind(this)),this.#Z.popup.addEventListener("keydown",this.#Y.bind(this)),this.#Z.input.onInput(this.#f.bind(this)),this.#Z.popup.addEventListener("cancel",this.#ct.bind(this))}#dt(){this.toggleIncorrectAttribute(!1),this.#mt(),this.#lt(),this.#Z.popup.showModal(),this.#Z.input.focus()}#f(t,e){this.#i=e}#ct(){this.#Z.input.value=this.#tt}#gt(){this.checkValidity()&&(this.#Z.popup.close(),this.#bt())}#pt(t){t.preventDefault(),t.stopPropagation(),t.target===this.#Z.popup&&(this.#Z.popup.close(),this.#bt())}#bt(){if(!this.#i)return void(this.#Z.input.value=this.#ht());this.#ht()!==this.#Z.input.value&&this.#Z.input.value.length&&(this.#rt(),this.#p.onChangeValue.forEach((t=>t(this.#ht()))));const t=this.#Z.input.rawValue;0!==t.length||this.#Z.input.hasAttribute("required")?(this.#tt=t,this.#Z.text.toggleAttribute("empty-value",!1)):this.#Et()}#Et(){this.#Z.text.textContent="set",this.#Z.text.toggleAttribute("empty-value",!0),this.removeAttribute("value"),this.removeAttribute("title")}#Y(t){t.stopPropagation(),t.repeat||t.key===s.Enter&&!t.repeat&&this.#i&&this.#gt()}#mt(){this.hasAttribute("value")&&(this.#tt=this.getAttribute("value"),this.#Z.input.value=this.#tt)}#rt(){this.setAttribute("value",this.#Z.input.value),this.setAttribute("title",this.#Z.input.value),this.#Z.text.toggleAttribute("empty-value",!1);let t=this.#ht();"string"==typeof t&&t.length>0?this.#Z.text.textContent=this.#ot():this.#Et()}#lt(){let{top:t,left:e}=this.getBoundingClientRect();this.#Z.popup.style.top=t+window.scrollY+"px",this.#Z.popup.style.left=e+window.scrollX+"px",this.hasAttribute("max-width")?this.#Z.popup.style.width=a(this.#Z.input.rawValue)+16+"px":this.#Z.popup.style["max-width"]=Math.max(this.offsetWidth+16,128)+"px"}#ut(){return"number"===this.getAttribute("type")}#at(){this.hasAttribute("suffix")&&(this.#et=this.getAttribute("suffix")),this.hasAttribute("prefix")&&(this.#it=this.getAttribute("prefix")),this.hasAttribute("max-width")&&(this.#Z.popup.style["max-width"]=this.getAttribute("max-width")+"px",this.#Z.input.style["max-width"]=this.getAttribute("max-width")-16+"px"),this.hasAttribute("min-width")&&(this.#Z.popup.style["min-width"]=this.getAttribute("min-width")+"px",this.#Z.input.style["min-width"]=this.getAttribute("min-width")-16+"px"),this.#Z.input.value=this.#ht(),this.hasAttribute("scale")&&(this.displayTextTransformer=t=>function(t,e){const i=Math.pow(10,e);return Math.round(t*i)/i}(t,parseInt(this.getAttribute("scale"))))}#g(){const t=this.hasAttribute("required")?"required":"",e=this.getAttribute("type")||"text";let i="";this.hasAttribute("step")&&(i=`step="${this.getAttribute("step")}"`);let s="";this.hasAttribute("min")&&(s=`min="${this.getAttribute("min")}"`);let n="";this.hasAttribute("max")&&(n=`max="${this.getAttribute("max")}"`);let l="";this.hasAttribute("minlength")&&(l=`minlength="${this.getAttribute("minlength")}"`);let a="";this.hasAttribute("maxlength")&&(a=`maxlength="${this.getAttribute("maxlength")}"`);let r="";this.hasAttribute("pattern")&&(r=`pattern="${this.getAttribute("pattern")}"`);let h="";return this.hasAttribute("number-type")&&(h=`number-type="${this.getAttribute("number-type")}"`),`<span class="edit-text__text"></span>\n                <dialog class="edit-text__popup" tabindex="9">\n                        <text-input \n                            class="text-input--with-right-icon" \n                            label="" \n                            autocomplete="off"\n                            ${t}\n                            ${i}\n                            ${s}\n                            ${n}\n                            ${l}\n                            ${a}\n                            ${r}\n                            ${h}\n                            type="${e}"\n                        ></text-input>\n                </dialog>`}static get is(){return"edit-text"}}return window.customElements.get(d.is)||window.customElements.define(d.is,d),e})()));
//# sourceMappingURL=index.bundle.js.map