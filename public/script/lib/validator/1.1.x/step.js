/*!
 * JRaiser 2 Javascript Library
 * validator-step - v1.1.0 (2015-06-30T14:06:13+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define("validator/1.1.x/step",["dom/1.1.x/","ajax/1.2.x/","widget/1.1.x/"],function(e,t,r){"use strict";function n(e,t){var r=[];if(i.isArray(e)){var n=e;e={},e[t]=n}for(t in e)e.hasOwnProperty(t)&&e[t].forEach(function(e){null!=e&&r.push({name:t,value:e})});return r}var i=e("base/1.1.x/"),s=e("dom/1.1.x/"),o=e("ajax/1.2.x/"),l=e("widget/1.1.x/"),a=0;return l.create({_init:function(e){var t=this;if(t._id=++a,t._vOptions={},t._fields=e.fields||[],"string"==typeof t._fields&&(t._fields=t._fields.split(/\s+/)),t._rule=e.rule,"string"==typeof t._rule){var r=[];t._ruleNames=[];var n=t._rule.replace(/(\w+)(?::([^!&|()]+))?/g,function(e,n,i){t._ruleNames.push(n);var s="_helpers_."+n+"(_val_";return i&&(s+=",_refVars_["+(r.push(i)-1)+"]"),s+=")"}),i=new Function("_val_","_refVars_","_helpers_","return "+n+";");n=null,r.length||(r=null),t._rule=function(e,t){return i(e,r,t)}}e.stepDisabled?t.disableStep():t.enableStep()},id:function(){return this._id},fields:function(){return this._fields.slice()},isRemote:function(){return!!this._options.remoteURL},stepDisabled:function(){return this._stepDisabled},enableStep:function(){this._stepDisabled=!1},disableStep:function(){this._stepDisabled=!0},syncWithValidator:function(e){this._vOptions=i.extend({},e)},exec:function(e,t,r,s,l){var a=this;if(a.stepDisabled())return 0;var u=a._ruleNames;if(u)for(var _=u.length-1;_>=0;_--)if(!r[u[_]])throw new Error('Rule "'+u[_]+'" does not exist');a._trigger("beforevalidate",{sourceEvent:l,elements:e.slice()});var c=this._fields,f=c.length;1===f&&(t=t[c[0]]);var d,v=a._options,h=!0;if(1!==f||v.oneByOne===!1||v.remoteURL){if(1===f&&v.required!==!1&&(h=t.length>0&&""!==t.join("")),h&&a._rule)if(v.remoteURL){var p=function(t){return a._remoteCache=t,a._message=a._rule.call(window,t),a._message?a._error(e.slice(),!0,l):void a._correct(e.slice(),!0,l)};if(!s)return a._beforeSend(e.slice()),void o.send(v.remoteURL,i.customExtend({data:n(t,c[0]),onsuccess:p},v.ajaxSettings||a._vOptions.ajaxSettings,{overwrite:!1}));if("_remoteCache"in a)return p(a._remoteCache)}else{var m;switch(f){case 0:m=[];break;case 1:m=[t.slice()];break;default:m=c.map(function(e){return t[e]?t[e].slice():null})}m.push(r),h=a._rule.apply(window,m),"string"==typeof h&&(a._message=h,h=!1)}h||(d=e.slice())}else if(h=v.required===!1||t.length>0){var d=[];t.every(function(t,n){var i,s=""===t||null==t;if(v.required===!1){if(s)return!0;i=!0}else i=!s;return i&&null!=t&&a._rule&&(i=a._rule.call(window,t,r)),i||d.push(e[n]),h=h&&i,i||!a._vOptions.breakOnError})}else d=e.slice();return h?void a._correct(e.slice(),!1,l):a._error(d,!1,l)},_makeEventArg:function(e){return e.stepId=this.id(),this._options.eventElements&&(e.elements=i.toArray(s(e.elements).filter(this._options.eventElements))),e},_beforeSend:function(e,t){var r=this._makeEventArg({sourceEvent:t,elements:e});return 1==this._options.eventMode&&this._vOptions.beforeSend&&this._vOptions.beforeSend.call(window,r),this._trigger("beforesend",r),r},_error:function(e,t,r){var n=this._makeEventArg({sourceEvent:r,elements:e,isRemote:!!t,message:this._message||this._options.message});return 1==this._options.eventMode&&this._vOptions.onError&&this._vOptions.onError.call(window,n),this._trigger("error",n),n},_correct:function(e,t,r){var n=this._makeEventArg({sourceEvent:r,elements:e,isRemote:!!t});return 1==this._options.eventMode&&this._vOptions.onCorrect&&this._vOptions.onCorrect.call(window,n),this._trigger("correct",n),n}},{eventMode:1})});