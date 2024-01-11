import assert from 'assert';
import JsDomUtils from "../../../crystaline/src/test/js/utils/JsDomUtils.js";
import SnackBar from "../../src/SnackBar/SnackBar.js";

describe('SnackBar', ()=> {
    beforeEach(async ()=>{
        await JsDomUtils.init()
    });
    describe('#show', ()=> {
        it('validates properties', ()=> {
            assert.throws(()=>{new SnackBar().show()}, (err)=>{
                return err.message === "No SnackBar properties";
            });
            assert.throws(()=>{new SnackBar().show({})}, (err)=>{
                return err.message === "Empty SnackBar message text";
            });
            assert.throws(()=>{new SnackBar().show({msgText:'test', btnText:'OK'})}, (err)=>{
                return err.message === "No callback for SnackBar button";
            });
            assert.throws(()=>{new SnackBar().show({msgText:'test', btnCb:()=>{}})}, (err)=>{
                return err.message === "No SnackBar button text";
            });
            assert.throws(()=>{
                new SnackBar().show({msgText:'test', btnText: 'OK', btnCb:{}})}, (err)=>{
                return err.message === "Callback for SnackBar button is not a function";
            });
            assert.throws(()=>{
                new SnackBar().show({msgText:'test', btnText: 'OK', btnCb:()=>{}, ttl:'100'})}, (err)=>{
                return err.message === "TTL is not a number";
            });
        });
        it('creates SnackBar', ()=> {
            new SnackBar().show({msgText:'test', btnText: 'OK', btnCb:()=>{}, ttl:3000});
            assert.ok(document.querySelector('.snackbar'))
        });
        it('labels from properties are set into SnackBar', ()=>{
            new SnackBar().show({msgText:'test'});
            assert.ok(document.querySelector('.snackbar__label').innerHTML, 'test')
        });
        it('callback is triggered', ()=>{
            const dummy = {
                called : false,
                call: ()=>{
                    dummy.called = true
                }
            }
            new SnackBar().show({msgText:'test', btnText: 'OK', btnCb:dummy.call, ttl:3000});
            assert.ok(!dummy.called);
            document.querySelector('[js-ok]').click();
            assert.ok(dummy.called);
        });
        it('disappears when TTL expired', async ()=>{
            /*will disappear in 500ms*/ new SnackBar().show({msgText:'test', ttl:500});
            /*wait 600ms*/ await new Promise((resolve)=>{setTimeout(resolve, 600)})
            assert.ok(!document.querySelector('.snackbar'))
        });
        it('only one SnackBar is present at the same time', ()=>{
            new SnackBar().show({msgText:'old'});
            new SnackBar().show({msgText:'new'});
            assert.ok(document.querySelector('.snackbar__label').innerHTML, 'new')
        });
        it('removed when pressing close button', ()=>{
            new SnackBar().show({msgText:'test'});
            document.querySelector('[js-close]').click();
            assert.ok(!document.querySelector('.snackbar'))
        });
        it('removed when pressing main button', ()=>{
            new SnackBar().show({msgText:'test', btnText: 'OK', btnCb:()=>{}, ttl:3000});
            document.querySelector('[js-ok]').click();
            assert.ok(!document.querySelector('.snackbar'))
        });
    });
    describe('vulnerability', ()=>{
        it('should not insert xxs elements',  ()=>{
            new SnackBar('<h1>Hello</h1>').show({msgText:'<h1>Hello</h1>', btnText: '<h1>Hello</h1>', btnCb:()=>{}, ttl:3000});
            assert.ok(!document.querySelector('h1'));
        });
    })
});
