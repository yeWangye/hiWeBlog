/*!
 * LetsBlog
 * Header - v1.0.0 (2016-02-11T11:18:50+0800)
 * Released under MIT license
 */
define("/common/header/1.0.x/header",["dom/1.1.x/","ajax/1.2.x/"],function(e,n,a){"use strict";var s=e("base/1.1.x/"),_=e("dom/1.1.x/"),t=e("ajax/1.2.x/"),o=window.currentUser,i=_("#header"),l=s.createClass(function(e,n,a){var s=this;s._toggle=e.find("."+n).click(function(){s._on?s.hide():s.show()}),s._layer=e.find("."+a),s._toggleOnClass=n+"--on",s._layerOnClass=a+"--on";var t;e.click(function(){t=!0}),_("body").click(function(){t||s.hide(),t=!1})},{show:function(){var e=this;e._toggle.addClass(e._toggleOnClass),e._layer.addClass(e._layerOnClass),e._on=!0},hide:function(){var e=this;e._toggle.removeClass(e._toggleOnClass),e._layer.removeClass(e._layerOnClass),e._on=!1}});if(new l(i.find(".header__nav"),"header__nav__toggle","header__nav__list"),new l(i.find(".header__user-panel"),"header__user-panel__toggle","header__user-panel__menu"),o.group.perm_manage_comment){var r=function(){t.send({url:"/admin/comment/totalpendingreviews",dataType:"json",onsuccess:function(e){var n=i.find(".header__user-panel__menu__item__admin__pending-reviews");1===e.status&&e.data.total>0?(n.find("em").text(e.data.total),n.show()):n.hide(),setTimeout(r,6e4)}})};r()}});