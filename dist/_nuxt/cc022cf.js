(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{235:function(e,t,r){"use strict";r.r(t);var o={middleware:"authenticated",data:function(){return{actualPassword:"",newPassword:"",repeatnewPassword:"",user:{}}},mounted:function(){var e=this;this.$nextTick((function(){var t=e.$cookies.get("user-cookie");void 0!==t&&"loggedIn"in t&&1==t.loggedIn&&(console.log("Logueado"),e.user=t.user)}))},methods:{onSubmit:function(e){var t=this;e.preventDefault(),console.log("Prev"),this.validateActualPass||this.validateNewPass||(console.log("Update"),this.$axios.post("/changePass",{password:this.newPassword,id:this.user.id}).then((function(e){return t.printRes(e)})).catch((function(e){console.log(e)})),this.$cookies.set("user-cookie",{user:this.user,loggedIn:!0},{path:"/",maxAge:604800}),setTimeout((function(){t.$router.push("/")}),1e3))}},computed:{validateActualPass:function(){return this.actualPassword!==this.user.password},validateNewPass:function(){return this.newPassword!==this.repeatnewPassword}}},n=r(36),component=Object(n.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"container my-5 justify-content-center d-flex"},[r("b-form",{staticClass:"col-4",on:{submit:e.onSubmit}},[r("b-form-group",{attrs:{id:"input-group-1",label:"Contraseña actual:","label-for":"input-1"}},[r("b-form-input",{class:{"border-danger":e.validateActualPass},attrs:{id:"input-1",placeholder:"Ingrese su contraseña actual",required:""},model:{value:e.actualPassword,callback:function(t){e.actualPassword=t},expression:"actualPassword"}}),e._v(" "),r("span",{directives:[{name:"show",rawName:"v-show",value:e.validateActualPass,expression:"validateActualPass"}],staticClass:"text-danger"},[e._v("La contraseña ingresada no es correcta")])],1),e._v(" "),r("b-form-group",{attrs:{id:"input-group-2",label:"Contraseña:","label-for":"input-2"}},[r("b-form-input",{attrs:{id:"input-2",type:"password",placeholder:"Ingrese la contraseña deseada",required:""},model:{value:e.newPassword,callback:function(t){e.newPassword=t},expression:"newPassword"}})],1),e._v(" "),r("b-form-group",{attrs:{id:"input-group-2",label:"Contraseña:","label-for":"input-2"}},[r("b-form-input",{class:{"border-danger":e.validateNewPass},attrs:{id:"input-2",placeholder:"Ingrese la contraseña deseada nuevamente",type:"password",required:""},model:{value:e.repeatnewPassword,callback:function(t){e.repeatnewPassword=t},expression:"repeatnewPassword"}}),e._v(" "),r("span",{directives:[{name:"show",rawName:"v-show",value:e.validateNewPass,expression:"validateNewPass"}],staticClass:"text-danger"},[e._v("Las contraseñas ingresadas no son iguales")])],1),e._v(" "),r("b-button",{staticClass:"col-12 my-2",attrs:{type:"submit",variant:"primary"}},[e._v("Cambiar contraseña")])],1)],1)])}),[],!1,null,null,null);t.default=component.exports}}]);