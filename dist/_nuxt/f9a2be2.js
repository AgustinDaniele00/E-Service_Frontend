(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{225:function(t,e,r){var content=r(234);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(68).default)("6759f5ab",content,!0,{sourceMap:!1})},226:function(t,e,r){var map={"./banner_carousel.jpg":227};function c(t){var e=o(t);return r(e)}function o(t){if(!r.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}c.keys=function(){return Object.keys(map)},c.resolve=o,t.exports=c,c.id=226},227:function(t,e,r){t.exports=r.p+"img/banner_carousel.d71248c.jpg"},233:function(t,e,r){"use strict";r(225)},234:function(t,e,r){var c=r(67)(!1);c.push([t.i,".slick-next:before,.slick-prev:before{color:#000}",""]),t.exports=c},247:function(t,e,r){"use strict";r.r(e);var c=r(228),o=r.n(c),l=(r(229),r(231),{components:{VueSlickCarousel:o.a},middleware:"authenticated",data:function(){return{slickSettings:{dots:!1,arrows:!0,focusOnSelect:!1,infinite:!0,speed:500,slidesToShow:4,slidesToScroll:4,touchThreshold:5},slide:0,sliding:null,carouselData:[["banner_carousel.jpg","Lo nuevo","Encuntra los servicios más recientes"],["banner_carousel.jpg","Servicios cercanos","Encuentra los servicios por cercanía"]],carouselServicios:[[1,"img.jpg","Servicio","Descripcion"],[2,"img.jpg","Servicio","Descripcion"],[3,"img.jpg","Servicio","Descripcion"],[4,"img.jpg","Servicio","Descripcion"],[4,"img.jpg","Servicio","Descripcion"]]}},methods:{onSlideStart:function(){this.sliding=!0},onSlideEnd:function(){this.sliding=!1}}}),n=(r(233),r(36)),component=Object(n.a)(l,(function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div",[c("div",[c("b-carousel",{staticStyle:{"text-shadow":"1px 1px 2px #000"},attrs:{id:"carousel-1",interval:3e3,controls:"",indicators:"",background:"#ccc","img-width":"1024","img-height":"200"},on:{"sliding-start":t.onSlideStart,"sliding-end":t.onSlideEnd},model:{value:t.slide,callback:function(e){t.slide=e},expression:"slide"}},t._l(t.carouselData,(function(data,e){return c("b-carousel-slide",{key:e,attrs:{"img-src":r(226)("./"+data[0])}},[c("h1",[t._v(t._s(data[1]))]),t._v(" "),c("p",[t._v(t._s(data[2]))])])})),1)],1),t._v(" "),c("div",{staticClass:"container "},[c("div",{staticClass:"col-12 my-5"},[c("h2",[t._v("Descubrí")]),t._v(" "),c("VueSlickCarousel",t._b({},"VueSlickCarousel",t.slickSettings,!1),t._l(t.carouselServicios,(function(e,r){return c("div",{key:r,staticClass:"p-2"},[c("b-card",{staticClass:"mb-2",staticStyle:{"max-width":"20rem"},attrs:{title:e[2],"img-src":"https://picsum.photos/600/300/?image=25","img-alt":"Image","img-top":"",tag:"article"}},[c("b-card-text",[t._v("\n                "+t._s(e[3])+"\n              ")]),t._v(" "),c("b-button",{attrs:{href:"/servicios/1",variant:"primary"}},[t._v("Mostrar más")])],1)],1)})),0)],1),t._v(" "),c("div",{staticClass:"col-12 my-5"},[c("h2",[t._v("Belleza y cuidado personal")]),t._v(" "),c("VueSlickCarousel",t._b({},"VueSlickCarousel",t.slickSettings,!1),t._l(t.carouselServicios,(function(e,r){return c("div",{key:r,staticClass:"p-2"},[c("b-card",{staticClass:"mb-2",staticStyle:{"max-width":"20rem"},attrs:{title:e[2],"img-src":"https://picsum.photos/600/300/?image=25","img-alt":"Image","img-top":"",tag:"article"}},[c("b-card-text",[t._v("\n                "+t._s(e[3])+"\n              ")]),t._v(" "),c("b-button",{attrs:{href:"/servicios/1",variant:"primary"}},[t._v("Mostrar más")])],1)],1)})),0)],1),t._v(" "),c("div",{staticClass:"col-12 my-5"},[c("h2",[t._v("Hotelería")]),t._v(" "),c("VueSlickCarousel",t._b({},"VueSlickCarousel",t.slickSettings,!1),t._l(t.carouselServicios,(function(e,r){return c("div",{key:r,staticClass:"p-2"},[c("b-card",{staticClass:"mb-2",staticStyle:{"max-width":"20rem"},attrs:{title:e[2],"img-src":"https://picsum.photos/600/300/?image=25","img-alt":"Image","img-top":"",tag:"article"}},[c("b-card-text",[t._v("\n                "+t._s(e[3])+"\n              ")]),t._v(" "),c("b-button",{attrs:{href:"/servicios/1",variant:"primary"}},[t._v("Mostrar más")])],1)],1)})),0)],1),t._v(" "),c("div",{staticClass:"col-12 my-5"},[c("h2",[t._v("Telecomunicaciones ")]),t._v(" "),c("VueSlickCarousel",t._b({},"VueSlickCarousel",t.slickSettings,!1),t._l(t.carouselServicios,(function(e,r){return c("div",{key:r,staticClass:"p-2"},[c("b-card",{staticClass:"mb-2",staticStyle:{"max-width":"20rem"},attrs:{title:e[2],"img-src":"https://picsum.photos/600/300/?image=25","img-alt":"Image","img-top":"",tag:"article"}},[c("b-card-text",[t._v("\n                "+t._s(e[3])+"\n              ")]),t._v(" "),c("b-button",{attrs:{href:"/servicios/1",variant:"primary"}},[t._v("Mostrar más")])],1)],1)})),0)],1),t._v(" "),c("div",{staticClass:"col-12 my-5"},[c("h2",[t._v("Categorias")]),t._v(" "),c("div",[c("div",{staticClass:"row"},[c("div",{staticClass:"col-lg-4 col-md-5 p-0"},[c("b-list-group-item",{attrs:{href:"/servicios"}},[t._v("Belleza y cuidado personal")])],1),t._v(" "),c("div",{staticClass:"col-lg-4 col-md-5 p-0"},[c("b-list-group-item",{attrs:{href:"/servicios"}},[t._v("Servicios de limpieza")])],1),t._v(" "),c("div",{staticClass:"col-lg-4 col-md-5 p-0"},[c("b-list-group-item",{attrs:{href:"/servicios"}},[t._v("Servicios educativos")])],1),t._v(" "),c("div",{staticClass:"col-lg-4 col-md-5 p-0"},[c("b-list-group-item",{attrs:{href:"/servicios"}},[t._v("Servicios editoriales")])],1),t._v(" "),c("div",{staticClass:"col-lg-4 col-md-5 p-0"},[c("b-list-group-item",{attrs:{href:"/servicios"}},[t._v("Servicios de telecomunicaciones")])],1),t._v(" "),c("div",{staticClass:"col-lg-4 col-md-5 p-0"},[c("b-list-group-item",{attrs:{href:"/servicios"}},[t._v("Servicios agropecuarios")])],1),t._v(" "),c("div",{staticClass:"col-lg-4 col-md-5 p-0"},[c("b-list-group-item",{attrs:{href:"/servicios"}},[t._v("Servicios hoteleria")])],1),t._v(" "),c("div",{staticClass:"col-lg-4 col-md-5 p-0"},[c("b-list-group-item",{attrs:{href:"/servicios"}},[t._v("Servicios industriales")])],1),t._v(" "),c("div",{staticClass:"col-lg-4 col-md-5 p-0"},[c("b-list-group-item",{attrs:{href:"/servicios"}},[t._v("Servicios de transporte")])],1)])])])])])}),[],!1,null,null,null);e.default=component.exports}}]);