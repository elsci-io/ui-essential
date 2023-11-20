(()=>{"use strict";(()=>{class t{#t;#e;#i;#s;constructor(t){this.#t=t,this.#e=t.querySelector("input"),this.#i=!0,this.#s=""}get isValid(){return this.#i}get errorMessage(){return this.#s}checkValidity(){this.setCustomValidity(""),this.#e.checkValidity();let t=this.#e.validity;return t.valid&&(t=this.#n()),this.#i=t.valid,this.#s=this.#l(t),this.isValid}setCustomValidity(t){this.#e.setCustomValidity(t),this.#i=this.#e.validity.valid,this.#s=t}#n(){const{badInput:t,customError:e,patternMismatch:i,typeMismatch:s,valid:n,rangeOverflow:l,rangeUnderflow:a,tooLong:o,tooShort:r,valueMissing:h,stepMismatch:d}=this.#e.validity,u=Object.assign({},{badInput:t,customError:e,patternMismatch:i,typeMismatch:s,valid:n,rangeOverflow:l,rangeUnderflow:a,tooLong:o,tooShort:r,valueMissing:h,stepMismatch:d},this.#a(),this.#o());return u.valid=!u.valueMissing&&!u.rangeUnderflow&&!u.rangeOverflow,u}#a(){const t=this.#e.value.trim();return{valueMissing:this.#t.hasAttribute("required")&&""===t}}#o(){if("number"!==this.#e.type)return{rangeUnderflow:!1,rangeOverflow:!1};const{min:t,max:e,value:i}=this.#e;return{rangeUnderflow:""!==t&&+i<+t,rangeOverflow:""!==e&&+i>+e}}#l(t){const e="number"===this.#e.type,{badInput:i,rangeOverflow:s,rangeUnderflow:n,tooLong:l,tooShort:a,valueMissing:o,stepMismatch:r}=t;return e&&i?"Invalid number":e&&r&&"1"===this.#e.step?"Must be an integer":s?"Greater than "+this.#e.max:n?"Less than "+this.#e.min:l?"Max length is "+this.#e.maxLength:a?"Min length is "+this.#e.minLength:!i&&o?"Required":this.#e.validationMessage}}const e=Object.freeze({Shift:"ShiftLeft",Esc:"Escape",Enter:"Enter",Up:"ArrowUp",Down:"ArrowDown"}),i=(t,...e)=>{let i=t[0];for(let n=0;n<e.length;n++)i+=(s=String(e[n]))?s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):"",i+=t[n+1];var s;return i};class s extends HTMLElement{static#r=new Set(["autocomplete","autofocus","disabled","max","maxlength","min","minlength","name","pattern","readonly","step","type","value"]);#e;#h;#d;#u={onTrailingIconClick:[],onChangeValue:[],onInput:[]};#c;connectedCallback(){this.innerHTML=this.#p(),this.#e=this.querySelector("input"),this.#h=this.querySelector(".text-input__error"),this.#d=new t(this),this.#m(),this.#g(),this.hasAttribute("value")&&(this.value=this.getAttribute("value"))}disconnectedCallback(){this.setAttribute("value",this.value),window.removeEventListener("visibilitychange",this.#E.bind(this),{capture:!0})}get value(){return this.rawValue.trim()}get rawValue(){return this.#e.value}set value(t){this.#e.value=function(t){return!(void 0===t||!Number.isFinite(t))}(t)||"string"==typeof t?t:"",this.checkValidity()}checkValidity(){const t=this.#d.checkValidity();return this.errorMessage=this.#d.errorMessage,t}get errorMessage(){return this.#h.textContent}set errorMessage(t){this.#c=null,this.#d.setCustomValidity(t),this.#h.textContent=this.#d.errorMessage}onTrailingIconClick(t){this.#u.onTrailingIconClick.push(t)}onInput(t){this.#u.onInput.push(t)}onChangeValue(t){this.#u.onChangeValue.push(t)}focus(t){this.#e.focus(t)}setDisabled(t){this.toggleAttribute("disabled",t),this.#e.toggleAttribute("disabled",t)}#b(t){"number"!==this.#e.type||t.key!==e.Up&&t.key!==e.Down||t.preventDefault(),t.key!==e.Enter||t.repeat||this.#v()}#w(){const t=this.checkValidity();this.#u.onInput.forEach((e=>e(this.value,t)))}#v(){this.#c!==this.value&&(this.#c=this.value,this.#y())}#V(){this.#u.onTrailingIconClick.forEach((t=>t()))}#y(){this.checkValidity(),this.#u.onChangeValue.forEach((t=>t(this.value)))}#m(){for(const t of this.attributes)s.#r.has(t.name)&&this.#e.setAttribute(t.name,t.value);"number"!==this.getAttribute("type")||this.hasAttribute("step")||this.#e.setAttribute("step","any")}#g(){this.#e.addEventListener("keydown",this.#b.bind(this)),this.#e.addEventListener("input",this.#w.bind(this)),this.#e.addEventListener("focusout",this.#v.bind(this)),this.querySelector(".text-input__trailing-icon").addEventListener("click",this.#V.bind(this)),window.addEventListener("visibilitychange",this.#E.bind(this),{capture:!0})}#E(){document.activeElement===this.#e&&this.#e.blur()}#p(){const t=this.getAttribute("data-icon")||"";return i`<input class="text-input__input" placeholder="needed for CSS">
                <label class="text-input__label">${this.getAttribute("label")}</label>
                <i class="text-input__trailing-icon material-symbols-outlined">${t}</i>
                <p class="text-input__error"></p>`}static get is(){return"text-input"}}window.customElements.define(s.is,s);class n extends HTMLElement{#f;#x=[];#k=0;#C=-1;#u={onOptionClick:[]};get options(){return this.#x}set options(t){this.#S(t),this.innerHTML=this.#p(),this.#f=this.querySelector("ul"),this.#A(),this.#g()}set filter(t){const e=t.toLowerCase();for(const t of this.querySelectorAll("li")){const{displayName:i}=this.#x[t.dataset.index],s=i.toLowerCase().indexOf(e);t.innerHTML=this.#M(i,s,e.length),t.toggleAttribute("hidden",-1===s)}const i=this.#I();i&&(i.hasAttribute("hidden")?this.#L():i.scrollIntoView({block:"nearest"}))}show(){this.style.display="block",this.#A()}hide(){this.style.display="none",this.#L()}selectNextItem(){const t=this.#T();if(this.hasSelectedElement()){const e=t.indexOf(this.#I());if(t.length-1<=e)return;this.#D(t[e+1].dataset.index)}else{if(0===t.length)return;this.#D(t[0].dataset.index)}}selectPrevItem(){const t=this.#T();if(this.hasSelectedElement()){const e=t.indexOf(this.#I());if(0===e)return;this.#D(t[e-1].dataset.index)}else{if(0===t.length)return;this.#D(t[t.length-1].dataset.index)}}triggerClickOnSelectedItem(){this.hasSelectedElement()&&this.#I().dispatchEvent(new MouseEvent("mousedown"))}hasSelectedElement(){return null!=this.#I()}isVisible(){return"none"!==window.getComputedStyle(this).display}onOptionClick(t){this.#u.onOptionClick.push(t)}connectedCallback(){this.innerHTML=this.#p(),this.#f=this.querySelector("ul"),this.#g()}#S(t){this.#x=[...t].sort(((t,e)=>t.displayName.localeCompare(e.displayName)))}#T(){return[...this.#f.querySelectorAll("li:not([hidden])")]}#g(){for(const t of this.querySelectorAll("li"))t.addEventListener("mousedown",(()=>{const e=this.#x[t.dataset.index];this.#u.onOptionClick.forEach((t=>t(e)))}))}#p(){return`\n            <ul>\n                ${this.#x.map(((t,e)=>i`<li data-index="${e}" title="${t.displayName}">${t.displayName}</li>`)).join("")}\n            </ul>`}#A(){const t=this.parentElement.getBoundingClientRect();0===this.#k&&(this.#k=Math.max(...this.#x.map((t=>function(t){const e=document.createElement("span");document.body.appendChild(e),e.textContent=t,e.style.fontSize="1rem",e.style.visibility="hidden",e.style.position="absolute";const i=Math.ceil(e.getBoundingClientRect().width)+1;return e.remove(),i}(t.displayName))),0));const e=Math.max(this.#k+24+22,t.width),i=document.documentElement.clientWidth-t.left;this.#f.style.right=e>i?0:null,this.#f.style.width=`${Math.min(e,document.documentElement.clientWidth)}px`}#I(){return this.querySelector(`li[data-index="${this.#C}"]`)}#D(t){this.#L(),this.#C=t;const e=this.#I();e.classList.add("list-box__item--active"),e.scrollIntoView({block:"nearest"})}#L(){this.#C>=0&&(this.#I().classList.remove("list-box__item--active"),this.#C=-1)}#M(t,e,s){if(e>=0){const n=t.substring(0,e),l=t.substring(e,e+s),a=t.substring(e+s);return i`<span>${n}<mark>${l}</mark>${a}</span>`}return t}static get is(){return"list-box"}}window.customElements.define(n.is,n);class l extends HTMLElement{#e;#N;#O;#q=null;#$;#u={onChangeValue:[]};connectedCallback(){this.innerHTML=this.#p(),this.#e=this.querySelector("text-input"),this.#N=this.querySelector("list-box"),this.#$=this.hasAttribute("shouldMatchOptions"),this.#g()}get value(){return this.#O}get rawValue(){return this.#e.value}set value(t){this.#O=t,this.#e.value=t&&t.displayName?t.displayName:""}set initialValue(t){this.value=t,this.#q=t}set options(t){this.#N.options=t,this.#_()}set errorMessage(t){this.#e.errorMessage=t}checkValidity(){return this.#P()&&this.#e.checkValidity()}onChangeValue(t){this.#u.onChangeValue.push(t)}setDisabled(t){this.toggleAttribute("disabled",t),this.#e.setDisabled(t)}#w(){this.errorMessage="",this.#_(),this.#N.isVisible()||this.#N.show()}#U(){this.#_(),this.#N.show()}#H(){this.#R()}#B(t){this.value=t,this.#R()}#K(){this.value={displayName:""},this.#e.querySelector("input").focus()}#F(t){switch([e.Up,e.Down].includes(t.code)&&(t.preventDefault(),t.stopImmediatePropagation()),t.key){case e.Esc:this.#R();break;case e.Enter:this.#N.isVisible()&&(this.#N.hasSelectedElement()?this.#N.triggerClickOnSelectedItem():this.#R());break;case e.Down:this.#N.isVisible()||this.#N.show(),this.#N.selectNextItem();break;case e.Up:this.#N.isVisible()||this.#N.show(),this.#N.selectPrevItem()}}#z(){this.#y()}#R(){this.#N.hide(),this.#y()}#y(){this.#P()&&this.#W()&&(this.#q=this.value,this.#u.onChangeValue.forEach((t=>t(this.value))))}#P(){const t=this.#e.value;if(""===t)return this.#O=null,!0;if(this.value&&this.value.displayName===t)return this.errorMessage="",!0;if(!this.#$)return this.errorMessage="",this.#O={displayName:t},!0;for(const e of this.#N.options)if(e.displayName===t)return this.errorMessage="",this.#O=e,this.#e.value=e.displayName,!0;return this.#O=null,this.errorMessage="Select from list",!1}#_(){this.#N.filter=this.#e.value}#W(){return this.#q!==this.value}#g(){const t=this.#e.querySelector("input");this.addEventListener("keydown",this.#F.bind(this)),t.addEventListener("input",this.#w.bind(this)),t.addEventListener("blur",this.#H.bind(this)),t.addEventListener("focus",this.#U.bind(this)),this.#e.onTrailingIconClick(this.#K.bind(this)),this.#e.onChangeValue(this.#z.bind(this)),this.#N.onOptionClick(this.#B.bind(this))}#p(){const t=this.hasAttribute("required")?"required":"",e=this.hasAttribute("disabled")?"disabled":"",s=this.hasAttribute("no-icon")?"":"close";return i`
            <text-input 
                class="text-input--with-right-icon" 
                label="${this.getAttribute("label")}" 
                ${t}
                ${e}
                data-icon="${s}"
                autocomplete="off"
            ></text-input>
            <list-box></list-box>`}static get is(){return"typeahead-input"}}window.customElements.define(l.is,l);class a extends HTMLElement{#e;#N;#O;#q=null;#u={onShowDropdown:[],onChangeValue:[]};get value(){return this.#O}set value(t){this.#e.value=t&&t.displayName?t.displayName:"",this.#O=t}set options(t){this.#N.options=t}showDropdown(){this.#N.show(),this.#u.onShowDropdown.forEach((t=>t()))}onShowDropdown(t){this.#u.onShowDropdown.push(t)}onChangeValue(t){this.#u.onChangeValue.push(t)}checkValidity(){return this.#P()}connectedCallback(){this.innerHTML=this.#p(),this.#e=this.querySelector("text-input"),this.#N=this.querySelector("list-box"),this.#g()}#g(){this.addEventListener("keydown",this.#F.bind(this));const t=this.#e.querySelector("input");t.addEventListener("focus",this.#U.bind(this)),t.addEventListener("focusout",this.#j.bind(this)),t.addEventListener("click",this.#G.bind(this)),this.#N.onOptionClick(this.#B.bind(this))}#U(){this.showDropdown()}#j(){this.#R()}#B(t){this.#e.value=t.displayName,this.#O=t,this.#R()}#G(){this.showDropdown()}#F(t){switch([e.Up,e.Down].includes(t.code)&&(t.preventDefault(),t.stopImmediatePropagation()),t.key){case e.Esc:t.preventDefault(),this.#R(),this.#e.focus();break;case e.Enter:this.#N.isVisible()&&(t.stopPropagation(),this.#N.hasSelectedElement()?this.#N.triggerClickOnSelectedItem():this.#N.hide());break;case e.Down:this.#N.isVisible()||this.#N.show(),this.#N.selectNextItem();break;case e.Up:this.#N.isVisible()||this.#N.show(),this.#N.selectPrevItem()}}#R(){this.#N.hide(),this.#y()}#y(){this.#P()&&this.#q!==this.value&&(this.#q=this.value,this.#u.onChangeValue.forEach((t=>t(this.value))))}#P(){return this.#e.hasAttribute("required")&&!this.#e.value?this.#e.errorMessage="Required":this.#e.errorMessage="",this.#e.checkValidity()}#p(){const t=this.hasAttribute("required")?"required":"",e=this.hasAttribute("disabled")?"disabled":"";return i`
            <text-input
                class="text-input--select" 
                label="${this.getAttribute("label")}" 
                ${t}
                ${e}
                data-icon="arrow_drop_down"
                readonly
            ></text-input>
            <list-box></list-box>`}static get is(){return"select-input"}}window.customElements.define(a.is,a);class o extends HTMLElement{#X;#i=!0;#Y;#J="";#Q=new ResizeObserver(this.#Z.bind(this));#u={onChangeValue:[]};connectedCallback(){this.innerHTML=this.#p(),this.#X={text:this.querySelector(".edit-text__text"),popup:this.querySelector(".edit-text__popup"),input:this.querySelector("text-input")},this.#g(),this.#Q.observe(document.body),this.#tt(),this.#et()}disconnectedCallback(){this.#Q.unobserve(document.body)}value(){return this.#Y}onChange(t){this.#u.onChangeValue.push(t)}#it(){return`${this.#Y}${this.#J}`}#g(){this.#X.text.addEventListener("click",this.#st.bind(this)),this.#X.popup.addEventListener("click",this.#nt.bind(this)),this.#X.popup.addEventListener("keydown",this.#F.bind(this)),this.#X.input.onInput(this.#w.bind(this)),this.addEventListener("cancel",this.#lt.bind(this)),this.querySelector(".popup-content").addEventListener("click",(t=>{t.stopPropagation()}))}#st(){this.#at(),this.#Z(),this.#X.popup.showModal(),this.#X.input.focus()}#w(t,e){this.#i=e}#lt(){this.#X.popup.close()}#nt(){this.#i&&this.#ot()}#F(t){t.stopPropagation(),t.key!==e.Enter||t.repeat||this.#nt()}#ot(){this.#et(),this.#X.popup.close(),this.#u.onChangeValue.forEach((t=>t(this.value())))}#at(){this.#X.input.value=this.#Y}#et(){this.#Y=this.#X.input.value,this.#rt()&&(this.#Y=+this.#Y),this.#X.text.textContent=this.#it()}#Z(){let{top:t,left:e}=this.getBoundingClientRect();this.#X.popup.style.top=t+window.scrollY+"px",this.#X.popup.style.left=e+window.scrollX+"px"}#rt(){return"number"===this.getAttribute("type")}#tt(){this.hasAttribute("suffix")&&(this.#J=this.getAttribute("suffix")),this.#Y=this.getAttribute("value")||""}#p(){const t=this.hasAttribute("required")?"required":"",e=this.getAttribute("type")||"text";let i="";this.hasAttribute("step")&&(i=`step="${this.getAttribute("step")}"`);let s="";this.hasAttribute("min")&&(s=`min="${this.getAttribute("min")}"`);let n="";return this.hasAttribute("max")&&(n=`max="${this.getAttribute("max")}"`),`<span class="edit-text__text"></span>\n                <dialog class="edit-text__popup" tabindex="9">\n                    <section class="popup-content">\n                        <text-input \n                            class="text-input--with-right-icon" \n                            label="" \n                            autocomplete="off"\n                            ${t}\n                            ${i}\n                            ${s}\n                            ${n}\n                            type="${e}"\n                            value="${this.getAttribute("value")}"\n                        ></text-input>\n                    </section>\n                </dialog>`}static get is(){return"edit-text"}}window.customElements.define(o.is,o)})()})();
//# sourceMappingURL=bundle.js.map