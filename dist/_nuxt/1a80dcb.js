(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{240:function(e,t,o){"use strict";o.r(t);var r={middleware:"authenticated",data:function(){return{editProfile:!1,user:{}}},methods:{toogleEdit:function(){var e=this;return this.editProfile&&(this.$axios.post("/editUser",this.user).then((function(t){return e.printRes(t)})).catch((function(e){console.log(e)})),this.$cookies.set("user-cookie",{user:this.user,loggedIn:!0},{path:"/",maxAge:604800})),this.editProfile=!this.editProfile}},mounted:function(){var e=this;this.$nextTick((function(){var t=e.$cookies.get("user-cookie");void 0!==t&&"loggedIn"in t&&1==t.loggedIn&&(e.user=t.user,console.log(t.user))}))}},n=o(36),component=Object(n.a)(r,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"container"},[o("h1",{staticClass:"my-5"},[e._v(" Mis datos")]),e._v(" "),o("div",{staticClass:"row col-12 justify-content-center"},[o("div",{staticClass:"col-7"},[o("b-avatar",{attrs:{size:"100px"}})],1),e._v(" "),o("div",{staticClass:"col-7 my-3"},[o("h2",[e._v("Datos de la cuenta")]),e._v(" "),o("b-list-group",[o("b-list-group-item",[e._v("Email: "+e._s(e.user.email))])],1),e._v(" "),o("NuxtLink",{attrs:{to:"/cambiarContraseña"}},[o("b-button",{staticClass:"col-12 my-3",attrs:{variant:"outline-primary"}},[e._v("Cambiar contraseña")])],1)],1),e._v(" "),o("div",{staticClass:" col-7 my-3"},[o("h2",[e._v("Datos personales")]),e._v(" "),e.editProfile?o("b-list-group",[o("b-list-group-item",[e._v("Nombre: "),o("b-form-input",{model:{value:e.user.name,callback:function(t){e.$set(e.user,"name",t)},expression:"user.name"}})],1),e._v(" "),o("b-list-group-item",[e._v("Apellido: "),o("b-form-input",{model:{value:e.user.lastname,callback:function(t){e.$set(e.user,"lastname",t)},expression:"user.lastname"}})],1),e._v(" "),o("b-list-group-item",[e._v("DNI: "),o("b-form-input",{model:{value:e.user.dni,callback:function(t){e.$set(e.user,"dni",t)},expression:"user.dni"}})],1),e._v(" "),o("b-list-group-item",[e._v("Dirección: "),o("b-form-input",{model:{value:e.user.address,callback:function(t){e.$set(e.user,"address",t)},expression:"user.address"}})],1),e._v(" "),o("b-list-group-item",[e._v("Telefono: "),o("b-form-input",{model:{value:e.user.phone,callback:function(t){e.$set(e.user,"phone",t)},expression:"user.phone"}})],1)],1):o("b-list-group",[o("b-list-group-item",[e._v("Nombre: "+e._s(e.user.name))]),e._v(" "),o("b-list-group-item",[e._v("Apellido: "+e._s(e.user.lastname))]),e._v(" "),o("b-list-group-item",[e._v("DNI: "+e._s(e.user.dni))]),e._v(" "),o("b-list-group-item",[e._v("Direccion: "+e._s(e.user.address))]),e._v(" "),o("b-list-group-item",[e._v("Telefono: "+e._s(e.user.phone))])],1)],1),e._v(" "),e.editProfile?o("b-button",{staticClass:" col-6 my-3",on:{click:e.toogleEdit}},[e._v("Guardar cambios")]):o("b-button",{staticClass:" col-6 my-3",on:{click:e.toogleEdit}},[e._v("Editar perfil")])],1)])}),[],!1,null,null,null);t.default=component.exports}}]);