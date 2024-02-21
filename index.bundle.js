!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.elsciUi=e():t.elsciUi=e()}(self,(()=>(()=>{"use strict";var t={d:(e,i)=>{for(var s in i)t.o(i,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:i[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{EditText:()=>u,InputValidator:()=>m,SelectInput:()=>d,SnackBar:()=>c,TextInput:()=>r,TypeAheadInput:()=>h});class i{#t;#e;#i;#s;constructor(t){this.#t=t,this.#e=t.querySelector("input"),this.#i=!0,this.#s=""}get isValid(){return this.#i}get errorMessage(){return this.#s}checkValidity(){this.setCustomValidity(""),this.#e.checkValidity();let t=this.#e.validity;return t.valid&&(t=this.#n()),this.#i=t.valid,this.#s=this.#l(t),this.isValid}setCustomValidity(t){this.#e.setCustomValidity(t),this.#i=this.#e.validity.valid,this.#s=t}#n(){const{badInput:t,customError:e,patternMismatch:i,typeMismatch:s,valid:n,rangeOverflow:l,rangeUnderflow:a,tooLong:r,tooShort:o,valueMissing:h,stepMismatch:d}=this.#e.validity,u=Object.assign({},{badInput:t,customError:e,patternMismatch:i,typeMismatch:s,valid:n,rangeOverflow:l,rangeUnderflow:a,tooLong:r,tooShort:o,valueMissing:h,stepMismatch:d},this.#a(),this.#r());return u.valid=!u.valueMissing&&!u.rangeUnderflow&&!u.rangeOverflow,u}#a(){const t=this.#e.value.trim();return{valueMissing:this.#t.hasAttribute("required")&&""===t}}#r(){if("number"!==this.#e.type)return{rangeUnderflow:!1,rangeOverflow:!1};const{min:t,max:e,value:i}=this.#e;return{rangeUnderflow:""!==t&&+i<+t,rangeOverflow:""!==e&&+i>+e}}#l(t){const e="number"===this.#e.type,{badInput:i,rangeOverflow:s,rangeUnderflow:n,tooLong:l,tooShort:a,valueMissing:r,stepMismatch:o}=t;return e&&i?"Invalid number":e&&o&&"1"===this.#e.step?"Must be an integer":s?"Greater than "+this.#e.max:n?"Less than "+this.#e.min:l?"Max length is "+this.#e.maxLength:a?"Min length is "+this.#e.minLength:!i&&r?"Required":this.#e.validationMessage}}const s=Object.freeze({Shift:"ShiftLeft",Esc:"Escape",Enter:"Enter",Up:"ArrowUp",Down:"ArrowDown"}),n=t=>t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):"",l=(t,...e)=>{let i=t[0];for(let s=0;s<e.length;s++)i+=n(String(e[s])),i+=t[s+1];return i};function a(t){const e=document.createElement("span");document.body.appendChild(e),e.textContent=t,e.style.fontSize="1rem",e.style.visibility="hidden",e.style.position="absolute";const i=Math.ceil(e.getBoundingClientRect().width)+1;return e.remove(),i}class r extends HTMLElement{static#o=new Set(["autocomplete","autofocus","disabled","max","maxlength","min","minlength","name","pattern","readonly","step","type","value","placeholder"]);#e;#h;#d;#u={onTrailingIconClick:[],onChangeValue:[],onInput:[]};#c;connectedCallback(){this.innerHTML=this.#p(),this.#e=this.querySelector("input"),this.#h=this.querySelector(".text-input__error"),this.#d=new i(this),this.#m(),this.#g(),this.hasAttribute("value")&&(this.value=this.getAttribute("value"))}disconnectedCallback(){this.setAttribute("value",this.value),window.removeEventListener("visibilitychange",this.#b.bind(this),{capture:!0})}get value(){return this.rawValue.trim()}get rawValue(){return this.#e.value}set value(t){this.#e.value=function(t){return!(void 0===t||!Number.isFinite(t))}(t)||"string"==typeof t?t:"",this.#c=this.#e.value,this.checkValidity()}checkValidity(){const t=this.#d.checkValidity();return this.errorMessage=this.#d.errorMessage,t}get errorMessage(){return this.#h.textContent}set errorMessage(t){t&&(this.#c=null),this.#d.setCustomValidity(t),this.#h.textContent=this.#d.errorMessage}onTrailingIconClick(t){this.#u.onTrailingIconClick.push(t)}onInput(t){this.#u.onInput.push(t)}onChangeValue(t){this.#u.onChangeValue.push(t)}focus(t){this.#e.focus(t)}setDisabled(t){this.toggleAttribute("disabled",t),this.#e.toggleAttribute("disabled",t)}#E(t){"number"!==this.#e.type||t.key!==s.Up&&t.key!==s.Down||t.preventDefault(),t.key!==s.Enter||t.repeat||this.#w()}#v(){const t=this.checkValidity();this.#u.onInput.forEach((e=>e(this.value,t)))}#w(){this.#c!==this.value&&this.#y()}#f(){this.#u.onTrailingIconClick.forEach((t=>t()))}#y(){this.checkValidity()&&(this.#c=this.value,this.#u.onChangeValue.forEach((t=>t(this.value))))}#m(){for(const t of this.attributes)r.#o.has(t.name)&&this.#e.setAttribute(t.name,t.value);"number"!==this.getAttribute("type")||this.hasAttribute("step")||this.#e.setAttribute("step","any"),this.hasAttribute("placeholder")&&this.classList.add("placeholder-shown")}#g(){this.#e.addEventListener("keydown",this.#E.bind(this)),this.#e.addEventListener("input",this.#v.bind(this)),this.#e.addEventListener("focusout",this.#w.bind(this)),this.querySelector(".text-input__trailing-icon").addEventListener("click",this.#f.bind(this)),window.addEventListener("visibilitychange",this.#b.bind(this),{capture:!0})}#b(){document.activeElement===this.#e&&this.#e.blur()}#p(){const t=this.getAttribute("data-icon")||"";return l`<input class="text-input__input" placeholder="needed for CSS">
                <label class="text-input__label">${this.getAttribute("label")}</label>
                <i class="text-input__trailing-icon material-symbols-outlined">${t}</i>
                <p class="text-input__error"></p>`}static get is(){return"text-input"}}window.customElements.get(r.is)||window.customElements.define(r.is,r);class o extends HTMLElement{#x;#V=[];#k=0;#C=-1;#u={onOptionClick:[]};get options(){return this.#V}set options(t){this.#A(t),this.innerHTML=this.#p(),this.#x=this.querySelector("ul"),this.#S(),this.#g()}set filter(t){const e=t.toLowerCase();for(const t of this.querySelectorAll("li")){const{displayName:i}=this.#V[t.dataset.index],s=i.toLowerCase().indexOf(e);t.innerHTML=this.#I(i,s,e.length),t.toggleAttribute("hidden",-1===s)}const i=this.#M();i&&(i.hasAttribute("hidden")?this.#T():i.scrollIntoView({block:"nearest"}))}show(){this.style.display="block",this.#S()}hide(){this.style.display="none",this.#T()}selectNextItem(){const t=this.#L();if(this.hasSelectedElement()){const e=t.indexOf(this.#M());if(t.length-1<=e)return;this.#O(t[e+1].dataset.index)}else{if(0===t.length)return;this.#O(t[0].dataset.index)}}selectPrevItem(){const t=this.#L();if(this.hasSelectedElement()){const e=t.indexOf(this.#M());if(0===e)return;this.#O(t[e-1].dataset.index)}else{if(0===t.length)return;this.#O(t[t.length-1].dataset.index)}}triggerClickOnSelectedItem(){this.hasSelectedElement()&&this.#M().dispatchEvent(new MouseEvent("mousedown"))}hasSelectedElement(){return null!=this.#M()}isVisible(){return"none"!==window.getComputedStyle(this).display}onOptionClick(t){this.#u.onOptionClick.push(t)}connectedCallback(){this.innerHTML=this.#p(),this.#x=this.querySelector("ul"),this.#g()}#A(t){this.#V=[...t].sort(((t,e)=>t.displayName.localeCompare(e.displayName)))}#L(){return[...this.#x.querySelectorAll("li:not([hidden])")]}#g(){for(const t of this.querySelectorAll("li"))t.addEventListener("mousedown",(()=>{const e=this.#V[t.dataset.index];this.#u.onOptionClick.forEach((t=>t(e)))}))}#p(){return`\n            <ul>\n                ${this.#V.map(((t,e)=>l`<li data-index="${e}" title="${t.displayName}">${t.displayName}</li>`)).join("")}\n            </ul>`}#S(){const t=this.parentElement.getBoundingClientRect();0===this.#k&&(this.#k=Math.max(...this.#V.map((t=>a(t.displayName))),0));const e=Math.max(this.#k+24+22,t.width),i=document.documentElement.clientWidth-t.left;this.#x.style.right=e>i?0:null,this.#x.style.width=`${Math.min(e,document.documentElement.clientWidth)}px`}#M(){return this.querySelector(`li[data-index="${this.#C}"]`)}#O(t){this.#T(),this.#C=t;const e=this.#M();e.classList.add("list-box__item--active"),e.scrollIntoView({block:"nearest"})}#T(){this.#C>=0&&(this.#M().classList.remove("list-box__item--active"),this.#C=-1)}#I(t,e,i){if(e>=0){const s=t.substring(0,e),n=t.substring(e,e+i),a=t.substring(e+i);return l`<span>${s}<mark>${n}</mark>${a}</span>`}return t}static get is(){return"list-box"}}window.customElements.get(o.is)||window.customElements.define(o.is,o);class h extends HTMLElement{#e;#D;#_;#N=null;#$;#u={onChangeValue:[]};connectedCallback(){this.innerHTML=this.#p(),this.#e=this.querySelector("text-input"),this.#D=this.querySelector("list-box"),this.#$=this.hasAttribute("shouldMatchOptions"),this.#g()}get value(){return this.#_}get rawValue(){return this.#e.value}set value(t){this.#_=t,this.#e.value=t&&t.displayName?t.displayName:""}set initialValue(t){this.value=t,this.#N=t}set options(t){this.#D.options=t,this.#B()}set errorMessage(t){this.#e.errorMessage=t}checkValidity(){return this.#q()&&this.#e.checkValidity()}onChangeValue(t){this.#u.onChangeValue.push(t)}setDisabled(t){this.toggleAttribute("disabled",t),this.#e.setDisabled(t)}#v(){this.errorMessage="",this.#B(),this.#D.isVisible()||this.#D.show()}#P(){this.#B(),this.#D.show()}#U(){this.#j()}#H(t){this.value=t,this.#j()}#F(){this.value={displayName:""},this.#e.querySelector("input").focus()}#R(t){switch([s.Up,s.Down].includes(t.code)&&(t.preventDefault(),t.stopImmediatePropagation()),t.key){case s.Esc:this.#j();break;case s.Enter:this.#D.isVisible()&&(this.#D.hasSelectedElement()?this.#D.triggerClickOnSelectedItem():this.#j());break;case s.Down:this.#D.isVisible()||this.#D.show(),this.#D.selectNextItem();break;case s.Up:this.#D.isVisible()||this.#D.show(),this.#D.selectPrevItem()}}#W(){this.#y()}#j(){this.#D.hide(),this.#y()}#y(){this.#q()&&this.#K()&&(this.#N=this.value,this.#u.onChangeValue.forEach((t=>t(this.value))))}#q(){const t=this.#e.value;if(""===t)return this.#_=null,!0;if(this.value&&this.value.displayName===t)return this.errorMessage="",!0;if(!this.#$)return this.errorMessage="",this.#_={displayName:t},!0;for(const e of this.#D.options)if(e.displayName===t)return this.errorMessage="",this.#_=e,this.#e.value=e.displayName,!0;return this.#_=null,this.errorMessage="Select from list",!1}#B(){this.#D.filter=this.#e.value}#K(){return this.#N!==this.value}#g(){const t=this.#e.querySelector("input");this.addEventListener("keydown",this.#R.bind(this)),t.addEventListener("input",this.#v.bind(this)),t.addEventListener("blur",this.#U.bind(this)),t.addEventListener("focus",this.#P.bind(this)),this.#e.onTrailingIconClick(this.#F.bind(this)),this.#e.onChangeValue(this.#W.bind(this)),this.#D.onOptionClick(this.#H.bind(this))}#p(){const t=this.hasAttribute("required")?"required":"",e=this.hasAttribute("disabled")?"disabled":"",i=this.hasAttribute("no-icon")?"":"close";return l`
            <text-input 
                class="text-input--with-right-icon" 
                label="${this.getAttribute("label")}" 
                ${t}
                ${e}
                data-icon="${i}"
                autocomplete="off"
            ></text-input>
            <list-box></list-box>`}static get is(){return"typeahead-input"}}window.customElements.get(h.is)||window.customElements.define(h.is,h);class d extends HTMLElement{#e;#D;#_;#N=null;#u={onShowDropdown:[],onChangeValue:[]};get value(){return this.#_}set value(t){this.#e.value=t&&t.displayName?t.displayName:"",this.#_=t}set options(t){this.#D.options=t}showDropdown(){this.#D.show(),this.#u.onShowDropdown.forEach((t=>t()))}onShowDropdown(t){this.#u.onShowDropdown.push(t)}onChangeValue(t){this.#u.onChangeValue.push(t)}checkValidity(){return this.#q()}connectedCallback(){this.innerHTML=this.#p(),this.#e=this.querySelector("text-input"),this.#D=this.querySelector("list-box"),this.#g()}#g(){this.addEventListener("keydown",this.#R.bind(this));const t=this.#e.querySelector("input");t.addEventListener("focus",this.#P.bind(this)),t.addEventListener("focusout",this.#z.bind(this)),t.addEventListener("click",this.#G.bind(this)),this.#D.onOptionClick(this.#H.bind(this))}#P(){this.showDropdown()}#z(){this.#j()}#H(t){this.#e.value=t.displayName,this.#_=t,this.#j()}#G(){this.showDropdown()}#R(t){switch([s.Up,s.Down].includes(t.code)&&(t.preventDefault(),t.stopImmediatePropagation()),t.key){case s.Esc:t.preventDefault(),this.#j(),this.#e.focus();break;case s.Enter:this.#D.isVisible()&&(t.stopPropagation(),this.#D.hasSelectedElement()?this.#D.triggerClickOnSelectedItem():this.#D.hide());break;case s.Down:this.#D.isVisible()||this.#D.show(),this.#D.selectNextItem();break;case s.Up:this.#D.isVisible()||this.#D.show(),this.#D.selectPrevItem()}}#j(){this.#D.hide(),this.#y()}#y(){this.#q()&&this.#N!==this.value&&(this.#N=this.value,this.#u.onChangeValue.forEach((t=>t(this.value))))}#q(){return this.#e.hasAttribute("required")&&!this.#e.value?this.#e.errorMessage="Required":this.#e.errorMessage="",this.#e.checkValidity()}#p(){const t=this.hasAttribute("required")?"required":"",e=this.hasAttribute("disabled")?"disabled":"";return l`
            <text-input
                class="text-input--select" 
                label="${this.getAttribute("label")}" 
                ${t}
                ${e}
                data-icon="arrow_drop_down"
                readonly
            ></text-input>
            <list-box></list-box>`}static get is(){return"select-input"}}window.customElements.get(d.is)||window.customElements.define(d.is,d);class u extends HTMLElement{#X;#i=!0;#Y;#J="";#Q="";#Z=t=>t;#tt=new ResizeObserver(this.#et.bind(this));#u={onChangeValue:[]};#it=[];connectedCallback(){this.innerHTML=this.#p(),this.#X={text:this.querySelector(".edit-text__text"),popup:this.querySelector(".edit-text__popup"),input:this.querySelector("text-input")},this.#g(),this.#tt.observe(document.body),this.#st(),this.#nt()}disconnectedCallback(){this.#tt.unobserve(document.body)}onChange(t){this.#u.onChangeValue.push(t)}checkValidity(){return this.#X.input.checkValidity()}toggleIncorrectAttribute(t){this.toggleAttribute("incorrect",t)}addExternalValidator(t){this.#it.push(t)}get value(){return this.#X.input.value}set displayTextTransformer(t){this.#Z=t}#lt(){return this.getAttribute("value")}#at(){let t=this.#Z(this.#lt());return this.#rt()&&(t=+t),`${this.#Q}${t}${this.#J}`}#g(){this.#X.text.addEventListener("click",this.#ot.bind(this)),this.addEventListener("mousedown",this.#ht.bind(this)),this.#X.popup.addEventListener("keydown",this.#R.bind(this)),this.#X.input.onInput(this.#v.bind(this)),this.addEventListener("cancel",this.#dt.bind(this))}#ot(){this.toggleIncorrectAttribute(!1),this.#ut(),this.#et(),this.#X.popup.showModal(),this.#X.input.focus()}#v(t,e){this.#i=e}#dt(){this.#X.popup.close()}#ct(){this.#pt()&&(this.#X.popup.close(),this.#mt())}#ht(t){t.target===this.#X.popup&&(t.preventDefault(),t.stopPropagation(),this.#pt()&&(this.#X.popup.close(),this.#mt()))}#pt(){for(const t of this.#it){const e=t.validate(this,this.value);if(!e.isValid)return this.#X.input.errorMessage=e.errorMessage,!1}return!0}#mt(){if(!this.#i)return void(this.#X.input.value=this.#lt());this.#lt()!==this.#X.input.value&&this.#X.input.value.length&&(this.#nt(),this.#u.onChangeValue.forEach((t=>t(this.#lt()))));const t=this.#X.input.rawValue;0!==t.length||this.#X.input.hasAttribute("required")?(this.#Y=t,this.#X.text.toggleAttribute("empty-value",!1)):this.#gt()}#gt(){this.#X.text.textContent="set",this.#X.text.toggleAttribute("empty-value",!0),this.removeAttribute("value"),this.removeAttribute("title")}#R(t){t.stopPropagation(),t.key===s.Enter&&!t.repeat&&this.#i&&this.#ct()}#ut(){this.hasAttribute("value")&&(this.#Y=this.getAttribute("value"),this.#X.input.value=this.#Y)}#nt(){this.setAttribute("value",this.#X.input.value),this.setAttribute("title",this.#X.input.value);let t=this.#lt();"string"==typeof t&&t.length>0?this.#X.text.textContent=this.#at():this.#gt()}#et(){let{top:t,left:e}=this.getBoundingClientRect();this.#X.popup.style.top=t+window.scrollY+"px",this.#X.popup.style.left=e+window.scrollX+"px",this.hasAttribute("max-width")?this.#X.popup.style.width=a(this.#X.input.rawValue)+16+"px":this.#X.popup.style["max-width"]=Math.max(this.offsetWidth+16,128)+"px"}#rt(){return"number"===this.getAttribute("type")}#st(){this.hasAttribute("suffix")&&(this.#J=this.getAttribute("suffix")),this.hasAttribute("prefix")&&(this.#Q=this.getAttribute("prefix")),this.hasAttribute("max-width")&&(this.#X.popup.style["max-width"]=this.getAttribute("max-width")+"px",this.#X.input.style["max-width"]=this.getAttribute("max-width")-16+"px"),this.hasAttribute("min-width")&&(this.#X.popup.style["min-width"]=this.getAttribute("min-width")+"px",this.#X.input.style["min-width"]=this.getAttribute("min-width")-16+"px"),this.#X.input.value=this.#lt(),this.hasAttribute("scale")&&(this.displayTextTransformer=t=>function(t,e){const i=Math.pow(10,e);return Math.round(t*i)/i}(t,parseInt(this.getAttribute("scale"))))}#p(){const t=this.hasAttribute("required")?"required":"",e=this.getAttribute("type")||"text";let i="";this.hasAttribute("step")&&(i=`step="${this.getAttribute("step")}"`);let s="";this.hasAttribute("min")&&(s=`min="${this.getAttribute("min")}"`);let n="";this.hasAttribute("max")&&(n=`max="${this.getAttribute("max")}"`);let l="";this.hasAttribute("minlength")&&(l=`minlength="${this.getAttribute("minlength")}"`);let a="";this.hasAttribute("maxlength")&&(a=`maxlength="${this.getAttribute("maxlength")}"`);let r="";return this.hasAttribute("pattern")&&(r=`pattern="${this.getAttribute("pattern")}"`),`<span class="edit-text__text"></span>\n                <dialog class="edit-text__popup" tabindex="9">\n                        <text-input \n                            class="text-input--with-right-icon" \n                            label="" \n                            autocomplete="off"\n                            ${t}\n                            ${i}\n                            ${s}\n                            ${n}\n                            ${l}\n                            ${a}\n                            ${r}\n                            type="${e}"\n                        ></text-input>\n                </dialog>`}static get is(){return"edit-text"}}window.customElements.get(u.is)||window.customElements.define(u.is,u);class c{#bt;#Et;#wt;#vt=()=>{};constructor(t="snackBar"){this.#bt=t}show(t){c.#yt(t),this.#vt=t.btnCb,this.#ft(),this.#wt=this.#xt(this.#bt,t),this.#Vt(),this.#Et=setTimeout((()=>{this.remove()}),t.ttl||15e3)}#kt(){return this.#wt.querySelector("[js-ok]")}#Ct(){return this.#wt.querySelector("[js-close]")}#At(){return document.getElementById(`${this.#bt}`)}#ft(){const t=this.#At();t&&t.remove(),this.#Et&&window.clearTimeout(this.#Et)}#Vt(){const t=this.#kt();t&&t.addEventListener("click",(()=>{this.remove(),this.#vt()})),this.#Ct().addEventListener("click",(()=>{this.remove()}))}remove(){this.#wt.remove();const t=c.#St();0===t.children.length&&t.remove()}#xt(t,e){const i=c.#St();return i.insertAdjacentHTML("beforeend",c.#p(e.msgText,e.btnText,this.#bt)),i.lastElementChild}static#p(t,e,i){return`\n            <div id="${n(i)}" class="snackbar">\n                <div class="snackbar__label">${n(t)}</div>\n                <div class="snackbar__buttons">\n                    ${e?`<button class="snackbar__button-ok" js-ok>${n(e)}</button>`:""}\n                    <button class="snackbar__button-close material-symbols-outlined" js-close title="Close">close</button>\n                </div>\n            </div>`}static#yt(t){if(!t)throw new Error("No SnackBar properties");if(!t.msgText)throw new Error("Empty SnackBar message text");if(t.btnText&&!t.btnCb)throw new Error("No callback for SnackBar button");if(!t.btnText&&t.btnCb)throw new Error("No SnackBar button text");if(t.btnCb&&"function"!=typeof t.btnCb)throw new Error("Callback for SnackBar button is not a function");if(t.ttl&&"number"!=typeof t.ttl)throw new Error("TTL is not a number")}static#St(){let t=document.body.querySelector(".snackbar-container");return t||(document.body.insertAdjacentHTML("beforeend","<div class='snackbar-container'/>"),t=document.body.lastElementChild),t}}class p{#i;#s;constructor(t,e){this.#i=t,this.#s=e,this._isValid=t,this._errorMessage=e}get isValid(){return this._isValid}get errorMessage(){return this._errorMessage}}class m{#It;#s;constructor(t,e){this.#It=t,this.#s=e}validate(t,e){return this.#It(t,e)?new p(!0,""):new p(!1,this.#s)}}return e})()));
//# sourceMappingURL=index.bundle.js.map