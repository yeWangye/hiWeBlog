/*!
 * LetsBlog
 * Comment component - v1.0.1 (2016-02-11T15:44:19+0800)
 * Released under MIT license
 */
define("/common/comment/1.0.x/comment",["dom/1.1.x/","tmpl/2.1.x/","ajax/1.2.x/","widget/1.1.x/","paginator/1.1.x/","validator/1.1.x/"],function(e,t,a){"use strict";var s=e("dom/1.1.x/"),i=e("tmpl/2.1.x/"),n=e("ajax/1.2.x/"),r=e("widget/1.1.x/"),o=e("paginator/1.1.x/"),l=e("validator/1.1.x/"),m=window.currentUser,c=new i({LIST:'<% data.forEach(function(comment) { %><article class="comment__list__item<% if (comment.userid) { %> comment__list__item--isuser<% } %>"><header class="comment__list__item__header clearfix"><div class="comment__list__item__header__author"><em><%=comment.user_nickname%></em> 说：</div><div class="comment__list__item__header__pubtime">发表于<%=comment.pubtime_formatted%></div></header><div class="comment__list__item__content"><%-comment.content%></div></article><% }); %><% if (totalPages > 1) { %><nav class="comment__list__paginator"></nav><% } %>',TIPS:'<p class="comment__list__tips"><%=tips%></p>'});return r.create({_init:function(e){var t=this,a=e.form;if(t._listWrapper=e.listWrapper,!a.length)return void t.load(e.page);var i=[];m.userid||(i.push({fields:"user_nickname",message:"请填写昵称"},{fields:"user_nickname",rule:function(e){return e.length>=2},message:"昵称最少要有两个字"},{fields:"user_email",rule:"isEmail",message:"Email格式错误",required:!1},{fields:"user_qq",rule:"isQQ",message:"QQ号格式错误",required:!1}),a.find("input[type=text]").forEach(function(e){var t=localStorage.getItem(e.name);t&&(e.value=t)})),i.push({fields:"content",message:"请填写评论内容"}),t._validator=new l({form:a,steps:i,submitProxy:function(e,a){var i=a.find("input[type=submit]"),r=i.val();i.prop("disabled",!0).val(i.attr("data-submitingtext")),e.forEach(function(e){/^user_/.test(e.name)&&localStorage.setItem(e.name,e.value)}),n.send({url:"/comment/create",data:e,method:"POST",dataType:"json",onsuccess:function(e){if(1===e.status){if(e=e.data,e.lastComment.state){alert("发表成功"),t._destroyList(),t._renderList(e.commentList,e.page,e.totalPages);var i=t._listWrapper.find(".comment__list__item").last();window.scrollTo(s(window).scrollLeft(),i.offset().top+i.outerHeight(!0)+s("#header").innerHeight()-document.documentElement.clientHeight),t._trigger("submitsuccess",{result:e})}else alert("您发表的评论需经过审核才会显示");a.find("textarea[name=content]").val("")}else alert(e.message)},oncomplete:function(){i.prop("disabled",!1).val(r)}})}}),t.load(e.page)},_destroy:function(){this._destroyList(),this._validator.destroy(),delete this._validator},_destroyList:function(){this._paginator&&(this._paginator.destroy(),delete this._paginator),this._listWrapper.empty()},_renderList:function(e,t,a){var n=this,r=n._listWrapper;e.forEach(function(e){e.content=i.escape(e.content).replace(/\r?\n/g,"<br />")}),r.html(c.render("LIST",{data:e,totalPages:a})),a>1&&(n._paginator=new o({wrapper:r.find(".comment__list__paginator"),currentPage:t,totalPages:a,prevText:"",nextText:"",ellipsisText:"",events:{click:function(e){n.load(e.page,!0),window.scrollTo(s(window).scrollLeft(),r.parent().offset().top-s("#header").innerHeight())}}}))},load:function(e){var t=this,a=t._options.listWrapper;t._destroyList(),a.html(c.render("TIPS",{tips:"正在加载评论..."})),n.send({url:"/comment/list/"+this._options.articleId,data:{page:e},dataType:"json",onsuccess:function(e){1===e.status?(e=e.data,e&&e.totalPages?t._renderList(e.commentList,e.page,e.totalPages):a.html(c.render("TIPS",{tips:"暂无评论"}))):a.html(c.render("TIPS",{tips:e.message}))}})}})});