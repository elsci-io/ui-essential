(()=>{"use strict";(()=>{class t{#t;#e;#i;#n;constructor(t){this.#t=t,this.#e=t.querySelector("input"),this.#i=!0,this.#n=""}get isValid(){return this.#i}get errorMessage(){return this.#n}checkValidity(){this.setCustomValidity(""),this.#e.checkValidity();let t=this.#e.validity;return t.valid&&(t=this.#s()),this.#i=t.valid,this.#n=this.#l(t),this.isValid}setCustomValidity(t){this.#e.setCustomValidity(t),this.#i=this.#e.validity.valid,this.#n=t}#s(){const{badInput:t,customError:e,patternMismatch:i,typeMismatch:n,valid:s,rangeOverflow:l,rangeUnderflow:a,tooLong:o,tooShort:r,valueMissing:h,stepMismatch:d}=this.#e.validity,u=Object.assign({},{badInput:t,customError:e,patternMismatch:i,typeMismatch:n,valid:s,rangeOverflow:l,rangeUnderflow:a,tooLong:o,tooShort:r,valueMissing:h,stepMismatch:d},this.#a(),this.#o());return u.valid=!u.valueMissing&&!u.rangeUnderflow&&!u.rangeOverflow,u}#a(){const t=this.#e.value.trim();return{valueMissing:this.#t.hasAttribute("required")&&""===t}}#o(){if("number"!==this.#e.type)return{rangeUnderflow:!1,rangeOverflow:!1};const{min:t,max:e,value:i}=this.#e;return{rangeUnderflow:""!==t&&+i<+t,rangeOverflow:""!==e&&+i>+e}}#l(t){const e="number"===this.#e.type,{badInput:i,rangeOverflow:n,rangeUnderflow:s,tooLong:l,tooShort:a,valueMissing:o,stepMismatch:r}=t;return e&&i?"Invalid number":e&&r&&"1"===this.#e.step?"Must be an integer":n?"Greater than "+this.#e.max:s?"Less than "+this.#e.min:l?"Max length is "+this.#e.maxLength:a?"Min length is "+this.#e.minLength:!i&&o?"Required":this.#e.validationMessage}}const e=Object.freeze({Shift:"ShiftLeft",Esc:"Escape",Enter:"Enter",Up:"ArrowUp",Down:"ArrowDown"}),i=(t,...e)=>{let i=t[0];for(let s=0;s<e.length;s++)i+=(n=String(e[s]))?n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):"",i+=t[s+1];var n;return i};class n extends HTMLElement{static#r=new Set(["autocomplete","autofocus","disabled","max","maxlength","min","minlength","name","pattern","readonly","step","type","value"]);#e;#h;#d;#u={onTrailingIconClick:[],onChangeValue:[],onInput:[]};connectedCallback(){this.innerHTML=this.#c(),this.#e=this.querySelector("input"),this.#h=this.querySelector(".text-input__error"),this.#d=new t(this),this.#p(),this.#m(),this.hasAttribute("value")&&(this.value=this.getAttribute("value"))}disconnectedCallback(){this.setAttribute("value",this.value),window.removeEventListener("visibilitychange",this.#E.bind(this),{capture:!0})}get value(){return this.rawValue.trim()}get rawValue(){return this.#e.value}set value(t){this.#e.value=function(t){return!(void 0===t||!Number.isFinite(t))}(t)||"string"==typeof t?t:"",this.checkValidity()}checkValidity(){const t=this.#d.checkValidity();return this.errorMessage=this.#d.errorMessage,t}get errorMessage(){return this.#h.textContent}set errorMessage(t){this.#d.setCustomValidity(t),this.#h.textContent=this.#d.errorMessage}onTrailingIconClick(t){this.#u.onTrailingIconClick.push(t)}onInput(t){this.#u.onInput.push(t)}onChangeValue(t){this.#u.onChangeValue.push(t)}focus(t){this.#e.focus(t)}setDisabled(t){this.toggleAttribute("disabled",t),this.#e.toggleAttribute("disabled",t)}#g(t){"number"!==this.#e.type||t.key!==e.Up&&t.key!==e.Down||t.preventDefault()}#b(){const t=this.checkValidity();this.#u.onInput.forEach((e=>e(this.value,t)))}#w(){this.#v()}#y(){this.#u.onTrailingIconClick.forEach((t=>t()))}#v(){this.checkValidity(),this.#u.onChangeValue.forEach((t=>t(this.value)))}#p(){for(const t of this.attributes)n.#r.has(t.name)&&this.#e.setAttribute(t.name,t.value);"number"!==this.getAttribute("type")||this.hasAttribute("step")||this.#e.setAttribute("step","any")}#m(){this.#e.addEventListener("keydown",this.#g.bind(this)),this.#e.addEventListener("input",this.#b.bind(this)),this.#e.addEventListener("change",this.#w.bind(this)),this.querySelector(".text-input__trailing-icon").addEventListener("click",this.#y.bind(this)),window.addEventListener("visibilitychange",this.#E.bind(this),{capture:!0})}#E(){document.activeElement===this.#e&&this.#e.blur()}#c(){const t=this.getAttribute("data-icon")||"";return i`<input class="text-input__input" placeholder="needed for CSS">
                <label class="text-input__label">${this.getAttribute("label")}</label>
                <i class="text-input__trailing-icon material-symbols-outlined">${t}</i>
                <p class="text-input__error"></p>`}static get is(){return"text-input"}}window.customElements.define(n.is,n);class s extends HTMLElement{#V;#x=[];#f=0;#C=-1;#u={onOptionClick:[]};get options(){return this.#x}set options(t){this.#k(t),this.innerHTML=this.#c(),this.#V=this.querySelector("ul"),this.#S(),this.#m()}set filter(t){const e=t.toLowerCase();for(const t of this.querySelectorAll("li")){const{displayName:i}=this.#x[t.dataset.index],n=i.toLowerCase().indexOf(e);t.innerHTML=this.#I(i,n,e.length),t.toggleAttribute("hidden",-1===n)}const i=this.#M();i&&(i.hasAttribute("hidden")?this.#A():i.scrollIntoView({block:"nearest"}))}show(){this.style.display="block",this.#S()}hide(){this.style.display="none",this.#A()}selectNextItem(){const t=this.#L();if(this.hasSelectedElement()){const e=t.indexOf(this.#M());if(t.length-1<=e)return;this.#T(t[e+1].dataset.index)}else{if(0===t.length)return;this.#T(t[0].dataset.index)}}selectPrevItem(){const t=this.#L();if(this.hasSelectedElement()){const e=t.indexOf(this.#M());if(0===e)return;this.#T(t[e-1].dataset.index)}else{if(0===t.length)return;this.#T(t[t.length-1].dataset.index)}}triggerClickOnSelectedItem(){this.hasSelectedElement()&&this.#M().dispatchEvent(new MouseEvent("mousedown"))}hasSelectedElement(){return null!=this.#M()}isVisible(){return"none"!==window.getComputedStyle(this).display}onOptionClick(t){this.#u.onOptionClick.push(t)}connectedCallback(){this.innerHTML=this.#c(),this.#V=this.querySelector("ul"),this.#m()}#k(t){this.#x=[...t].sort(((t,e)=>t.displayName.localeCompare(e.displayName)))}#L(){return[...this.#V.querySelectorAll("li:not([hidden])")]}#m(){for(const t of this.querySelectorAll("li"))t.addEventListener("mousedown",(()=>{const e=this.#x[t.dataset.index];this.#u.onOptionClick.forEach((t=>t(e)))}))}#c(){return`\n            <ul>\n                ${this.#x.map(((t,e)=>i`<li data-index="${e}" title="${t.displayName}">${t.displayName}</li>`)).join("")}\n            </ul>`}#S(){const t=this.parentElement.getBoundingClientRect();0===this.#f&&(this.#f=Math.max(...this.#x.map((t=>function(t){const e=document.createElement("span");document.body.appendChild(e),e.textContent=t,e.style.fontSize="1rem",e.style.visibility="hidden",e.style.position="absolute";const i=Math.ceil(e.getBoundingClientRect().width)+1;return e.remove(),i}(t.displayName))),0));const e=Math.max(this.#f+24+22,t.width),i=document.documentElement.clientWidth-t.left;this.#V.style.right=e>i?0:null,this.#V.style.width=`${Math.min(e,document.documentElement.clientWidth)}px`}#M(){return this.querySelector(`li[data-index="${this.#C}"]`)}#T(t){this.#A(),this.#C=t;const e=this.#M();e.classList.add("list-box__item--active"),e.scrollIntoView({block:"nearest"})}#A(){this.#C>=0&&(this.#M().classList.remove("list-box__item--active"),this.#C=-1)}#I(t,e,n){if(e>=0){const s=t.substring(0,e),l=t.substring(e,e+n),a=t.substring(e+n);return i`<span>${s}<mark>${l}</mark>${a}</span>`}return t}static get is(){return"list-box"}}window.customElements.define(s.is,s);class l extends HTMLElement{#e;#D;#O;#q=null;#N;#u={onChangeValue:[]};connectedCallback(){this.innerHTML=this.#c(),this.#e=this.querySelector("text-input"),this.#D=this.querySelector("list-box"),this.#N=this.hasAttribute("shouldMatchOptions"),this.#m()}get value(){return this.#O}get rawValue(){return this.#e.value}set value(t){this.#O=t,this.#e.value=t&&t.displayName?t.displayName:""}set initialValue(t){this.value=t,this.#q=t}set options(t){this.#D.options=t,this.#$()}set errorMessage(t){this.#e.errorMessage=t}checkValidity(){return this.#_()&&this.#e.checkValidity()}onChangeValue(t){this.#u.onChangeValue.push(t)}setDisabled(t){this.toggleAttribute("disabled",t),this.#e.setDisabled(t)}#b(){this.errorMessage="",this.#$(),this.#D.isVisible()||this.#D.show()}#P(){this.#$(),this.#D.show()}#U(){this.#H()}#R(t){this.value=t,this.#H()}#B(){this.value={displayName:""},this.#e.querySelector("input").focus()}#W(t){switch([e.Up,e.Down].includes(t.code)&&(t.preventDefault(),t.stopImmediatePropagation()),t.key){case e.Esc:this.#H();break;case e.Enter:this.#D.isVisible()&&(this.#D.hasSelectedElement()?this.#D.triggerClickOnSelectedItem():this.#H());break;case e.Down:this.#D.isVisible()||this.#D.show(),this.#D.selectNextItem();break;case e.Up:this.#D.isVisible()||this.#D.show(),this.#D.selectPrevItem()}}#K(){this.#v()}#H(){this.#D.hide(),this.#v()}#v(){this.#_()&&this.#F()&&(this.#q=this.value,this.#u.onChangeValue.forEach((t=>t(this.value))))}#_(){const t=this.#e.value;if(""===t)return this.#O=null,!0;if(this.value&&this.value.displayName===t)return this.errorMessage="",!0;if(!this.#N)return this.errorMessage="",this.#O={displayName:t},!0;for(const e of this.#D.options)if(e.displayName===t)return this.errorMessage="",this.#O=e,this.#e.value=e.displayName,!0;return this.#O=null,this.errorMessage="Select from list",!1}#$(){this.#D.filter=this.#e.value}#F(){return this.#q!==this.value}#m(){const t=this.#e.querySelector("input");this.addEventListener("keydown",this.#W.bind(this)),t.addEventListener("input",this.#b.bind(this)),t.addEventListener("blur",this.#U.bind(this)),t.addEventListener("focus",this.#P.bind(this)),this.#e.onTrailingIconClick(this.#B.bind(this)),this.#e.onChangeValue(this.#K.bind(this)),this.#D.onOptionClick(this.#R.bind(this))}#c(){const t=this.hasAttribute("required")?"required":"",e=this.hasAttribute("disabled")?"disabled":"",n=this.hasAttribute("no-icon")?"":"close";return i`
            <text-input 
                class="text-input--with-right-icon" 
                label="${this.getAttribute("label")}" 
                ${t}
                ${e}
                data-icon="${n}"
                autocomplete="off"
            ></text-input>
            <list-box></list-box>`}static get is(){return"typeahead-input"}}window.customElements.define(l.is,l);class a extends HTMLElement{#e;#D;#O;#q=null;#u={onShowDropdown:[],onChangeValue:[]};get value(){return this.#O}set value(t){this.#e.value=t&&t.displayName?t.displayName:"",this.#O=t}set options(t){this.#D.options=t}showDropdown(){this.#D.show(),this.#u.onShowDropdown.forEach((t=>t()))}onShowDropdown(t){this.#u.onShowDropdown.push(t)}onChangeValue(t){this.#u.onChangeValue.push(t)}checkValidity(){return this.#_()}connectedCallback(){this.innerHTML=this.#c(),this.#e=this.querySelector("text-input"),this.#D=this.querySelector("list-box"),this.#m()}#m(){this.addEventListener("keydown",this.#W.bind(this));const t=this.#e.querySelector("input");t.addEventListener("focus",this.#P.bind(this)),t.addEventListener("focusout",this.#z.bind(this)),t.addEventListener("click",this.#j.bind(this)),this.#D.onOptionClick(this.#R.bind(this))}#P(){this.showDropdown()}#z(){this.#H()}#R(t){this.#e.value=t.displayName,this.#O=t,this.#H()}#j(){this.showDropdown()}#W(t){switch([e.Up,e.Down].includes(t.code)&&(t.preventDefault(),t.stopImmediatePropagation()),t.key){case e.Esc:t.preventDefault(),this.#H(),this.#e.focus();break;case e.Enter:this.#D.isVisible()&&(t.stopPropagation(),this.#D.hasSelectedElement()?this.#D.triggerClickOnSelectedItem():this.#D.hide());break;case e.Down:this.#D.isVisible()||this.#D.show(),this.#D.selectNextItem();break;case e.Up:this.#D.isVisible()||this.#D.show(),this.#D.selectPrevItem()}}#H(){this.#D.hide(),this.#v()}#v(){this.#_()&&this.#q!==this.value&&(this.#q=this.value,this.#u.onChangeValue.forEach((t=>t(this.value))))}#_(){return this.#e.hasAttribute("required")&&!this.#e.value?this.#e.errorMessage="Required":this.#e.errorMessage="",this.#e.checkValidity()}#c(){const t=this.hasAttribute("required")?"required":"",e=this.hasAttribute("disabled")?"disabled":"";return i`
            <text-input
                class="text-input--select" 
                label="${this.getAttribute("label")}" 
                ${t}
                ${e}
                data-icon="arrow_drop_down"
                readonly
            ></text-input>
            <list-box></list-box>`}static get is(){return"select-input"}}window.customElements.define(a.is,a);class o extends HTMLElement{#G;#i=!0;static#X=6;static#Y=10;static#J=1;#Q=new ResizeObserver(this.#Z.bind(this));#u={onChangeValue:[]};connectedCallback(){this.innerHTML=this.#c(),this.#G={text:this.querySelector(".edit-text__text"),popup:this.querySelector(".edit-text__popup"),input:this.querySelector("text-input")},this.#m(),this.#Q.observe(document.body)}disconnectedCallback(){this.#Q.unobserve(document.body)}value(){return this.#G.text.textContent.trim()}onChange(t){this.#u.onChangeValue.push(t)}#m(){this.#G.text.addEventListener("click",this.#tt.bind(this)),this.#G.popup.addEventListener("click",this.#et.bind(this)),this.#G.popup.addEventListener("keydown",this.#W.bind(this)),this.#G.input.onInput(this.#b.bind(this)),this.addEventListener("cancel",this.#it.bind(this)),this.querySelector(".popup-content").addEventListener("click",(t=>{t.stopPropagation()}))}#tt(){this.#nt(),this.#Z(),this.#st(this.value()),this.#G.popup.showModal(),this.#G.input.focus()}#b(t,e){this.#st(t),this.#i=e}#it(){this.#G.popup.close()}#et(){this.#i&&this.#lt()}#W(t){t.key!==e.Enter||t.repeat||this.#et()}#lt(){this.#at(),this.#G.popup.close(),this.#u.onChangeValue.forEach((t=>t(this.value())))}#nt(){this.#G.input.value=this.#G.text.textContent}#at(){let t=this.#G.input.value;this.#ot()&&(t=+t),this.#G.text.textContent=t}#Z(){let{top:t,left:e}=this.getBoundingClientRect();this.#G.popup.style.top=t+window.scrollY+"px",this.#G.popup.style.left=e+window.scrollX+"px"}#st(t){const e=Math.min(o.#Y,Math.max(o.#X,t.length+o.#J));this.#G.input.querySelector("input").style.width=e+"ch"}#ot(){return"number"===this.getAttribute("type")}#c(){const t=this.hasAttribute("required")?"required":"",e=this.getAttribute("type")||"text";let i="";this.hasAttribute("step")&&(i=`step="${this.getAttribute("step")}"`);let n="";this.hasAttribute("min")&&(n=`min="${this.getAttribute("min")}"`);let s="";this.hasAttribute("max")&&(s=`max="${this.getAttribute("max")}"`);const l=this.getAttribute("value");return`<span class="edit-text__text">${l}</span>\n                <dialog class="edit-text__popup" tabindex="9">\n                    <section class="popup-content">\n                        <text-input \n                            class="text-input--with-right-icon" \n                            label="" \n                            autocomplete="off"\n                            ${t}\n                            ${i}\n                            ${n}\n                            ${s}\n                            type="${e}"\n                            value="${l}"\n                        ></text-input>\n                    </section>\n                </dialog>`}static get is(){return"edit-text"}}window.customElements.define(o.is,o)})()})();
//# sourceMappingURL=bundle.js.map