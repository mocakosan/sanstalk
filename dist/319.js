"use strict";(self.webpackChunksanstalk=self.webpackChunksanstalk||[]).push([[319],{56319:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});var a=n(67294),l=n(16550),r=n(73727),c=n(73046),u=n(38678),o=n(9669),i=n.n(o),s=n(95591),m=n(83564);function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,l,r,c,u=[],o=!0,i=!1;try{if(r=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;o=!1}else for(;!(o=(a=r.call(n)).done)&&(u.push(a.value),u.length!==t);o=!0);}catch(e){i=!0,l=e}finally{try{if(!o&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(i)throw l}}return u}}(e,t)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}const f=function(){var e=(0,s.ZP)("/api/users",m.Z),t=e.data,n=(e.error,e.mutate,d((0,u.Z)(""),2)),o=n[0],p=n[1],f=d((0,u.Z)(""),2),E=f[0],v=f[1],h=d((0,u.Z)(""),3),y=h[0],b=h[2],g=d((0,u.Z)(""),3),k=g[0],w=g[2],j=d((0,a.useState)(!1),2),I=j[0],C=j[1],S=d((0,a.useState)(""),2),_=S[0],A=S[1],Z=d((0,a.useState)(!1),2),O=Z[0],x=Z[1],U=(0,a.useCallback)((function(e){b(e.target.value),C(e.target.value!==k)}),[k]),z=(0,a.useCallback)((function(e){w(e.target.value),C(e.target.value!==y)}),[y]),B=(0,a.useCallback)((function(e){e.preventDefault(),I||(console.log("서버로 회원가입하기"),x(!1),i().post("/api/users",{email:o,nickname:E,password:y}).then((function(e){console.log(e),x(!0)})).catch((function(e){console.log(e.response),A(e.response.data)})).finally((function(){})))}),[o,E,y,k,I]);return void 0===t?a.createElement("div",null,"로딩중..."):t?a.createElement(l.l_,{to:"/workspace/sleact/channel/일반"}):a.createElement("div",{id:"container"},a.createElement(c.h4,null,"Sleact"),a.createElement(c.l0,{onSubmit:B},a.createElement(c.__,{id:"email-label"},a.createElement("span",null,"이메일 주소"),a.createElement("div",null,a.createElement(c.II,{type:"email",id:"email",name:"email",value:o,onChange:p}))),a.createElement(c.__,{id:"nickname-label"},a.createElement("span",null,"닉네임"),a.createElement("div",null,a.createElement(c.II,{type:"text",id:"nickname",name:"nickname",value:E,onChange:v}))),a.createElement(c.__,{id:"password-label"},a.createElement("span",null,"비밀번호"),a.createElement("div",null,a.createElement(c.II,{type:"password",id:"password",name:"password",value:y,onChange:U}))),a.createElement(c.__,{id:"password-check-label"},a.createElement("span",null,"비밀번호 확인"),a.createElement("div",null,a.createElement(c.II,{type:"password",id:"password-check",name:"password-check",value:k,onChange:z})),I&&a.createElement(c.jj,null,"비밀번호가 일치하지 않습니다."),!E&&a.createElement(c.jj,null,"닉네임을 입력해주세요."),_&&a.createElement(c.jj,null,_),O&&a.createElement(c.fB,null,"회원가입되었습니다! 로그인해주세요.")),a.createElement(c.zx,{type:"submit"},"회원가입")),a.createElement(c.Ji,null,"이미 회원이신가요? ",a.createElement(r.rU,{to:"/login"},"로그인 하러가기")))}}}]);