<template>
  <div>
    <div>
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="3000"
        controls
        indicators
        background="#ccc"
        img-width="1024"
        img-height="200"
        style="text-shadow: 1px 1px 2px #000;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
        >

        <b-carousel-slide :img-src="require('~/assets/'+data[0])" v-for="(data, index) in carouselData" :key="index">
          <h1>{{data[1]}}</h1>
          <p>{{data[2]}}</p>
        </b-carousel-slide>

        
      </b-carousel>
    </div>
    

    <div class="container ">

        <div class="col-12 my-5" v-if="carouselServices.length > 0">
          <h2>Descubrí</h2>
          <VueSlickCarousel v-bind="slickSettings">
            <div v-for="(service, index) in carouselServices" :key="index" class="p-2">
              <b-card
                :title="service['serviceName']"
                :img-src="'http://localhost:4001/services_images/'+service.image"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
              >
                <b-card-text>
                  {{service['description']}}
                </b-card-text>

                <b-button :href="'/servicio/'+service.serviceId" variant="primary">Mostrar más</b-button>
              </b-card>
            </div>
          </VueSlickCarousel>
          <div class="d-flex justify-content-center">
            <b-button href="/servicios" variant="primary">Explorar servicios</b-button>
          </div>
        </div>


        <div class="col-12 my-5" v-if="category0.length > 0">
          <h2>Belleza y cuidado personal</h2>
          <VueSlickCarousel v-bind="slickSettings">
            <div v-for="(service, index) in category0" :key="index" class="p-2">
              <b-card
                :title="service['serviceName']"
                :img-src="'http://localhost:4001/services_images/'+service.image"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
              >
                <b-card-text>
                  {{service['description']}}
                </b-card-text>

                <b-button :href="'/servicio/'+service.serviceId" variant="primary">Mostrar más</b-button>
              </b-card>
            </div>
          </VueSlickCarousel>

        </div>

        <div class="col-12 my-5" v-if="category1.length >0">
          <h2>Limpieza</h2>
          <VueSlickCarousel v-bind="slickSettings">
            <div v-for="(service, index) in category1" :key="index" class="p-2">
              <b-card
                :title="service['serviceName']"
                :img-src="'http://localhost:4001/services_images/'+service.image"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
              >
                <b-card-text>
                  {{service['description']}}
                </b-card-text>

                <b-button :href="'/servicio/'+service.serviceId" variant="primary">Mostrar más</b-button>
              </b-card>
            </div>
          </VueSlickCarousel>
        </div>

        <div class="col-12 my-5" v-if="category2.length > 0">
          <h2>Educativos</h2>
          <VueSlickCarousel v-bind="slickSettings">
            <div v-for="(service, index) in category2" :key="index" class="p-2">
              <b-card
                :title="service['serviceName']"
                :img-src="'http://localhost:4001/services_images/'+service.image"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
              >
                <b-card-text>
                  {{service['description']}}
                </b-card-text>

                <b-button :href="'/servicio/'+service.serviceId" variant="primary">Mostrar más</b-button>
              </b-card>
            </div>
          </VueSlickCarousel>
        </div>

<div class="col-12 my-5" v-if="category3.length > 0">
          <h2>Editoriales </h2>
          <VueSlickCarousel v-bind="slickSettings">
            <div v-for="(service, index) in category3" :key="index" class="p-2">
              <b-card
                :title="service['serviceName']"
                :img-src="'http://localhost:4001/services_images/'+service.image"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
              >
                <b-card-text>
                  {{service['description']}}
                </b-card-text>

                <b-button :href="'/servicio/'+service.serviceId" variant="primary">Mostrar más</b-button>
              </b-card>
            </div>
          </VueSlickCarousel>
        </div>

        <div class="col-12 my-5" v-if="category4.length > 0">
          <h2>Telecomunicaciones </h2>
          <VueSlickCarousel v-bind="slickSettings">
            <div v-for="(service, index) in category4" :key="index" class="p-2">
              <b-card
                :title="service['serviceName']"
                :img-src="'http://localhost:4001/services_images/'+service.image"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
              >
                <b-card-text>
                  {{service['description']}}
                </b-card-text>

                <b-button :href="'/servicio/'+service.serviceId" variant="primary">Mostrar más</b-button>
              </b-card>
            </div>
          </VueSlickCarousel>
        </div>

        <div class="col-12 my-5" v-if="category5.length > 0">
          <h2>Industriales </h2>
          <VueSlickCarousel v-bind="slickSettings">
            <div v-for="(service, index) in category5" :key="index" class="p-2">
              <b-card
                :title="service['serviceName']"
                :img-src="'http://localhost:4001/services_images/'+service.image"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
              >
                <b-card-text>
                  {{service['description']}}
                </b-card-text>

                <b-button :href="'/servicio/'+service.serviceId" variant="primary">Mostrar más</b-button>
              </b-card>
            </div>
          </VueSlickCarousel>
        </div>

        <div class="col-12 my-5">
          <h2>Categorias</h2>
          <div>
            <div class="row">
                <div class="col-lg-4 col-md-5 p-0"><b-list-group-item href="/servicios/0">Belleza y cuidado personal</b-list-group-item></div>
                <div class="col-lg-4 col-md-5 p-0"><b-list-group-item href="/servicios/1">Servicios de limpieza</b-list-group-item></div>
                <div class="col-lg-4 col-md-5 p-0"><b-list-group-item href="/servicios/2">Servicios educativos</b-list-group-item></div>
                <div class="col-lg-4 col-md-5 p-0"><b-list-group-item href="/servicios/3">Servicios editoriales</b-list-group-item></div>
                <div class="col-lg-4 col-md-5 p-0"><b-list-group-item href="/servicios/4">Servicios de telecomunicaciones</b-list-group-item></div>
                <div class="col-lg-4 col-md-5 p-0"><b-list-group-item href="/servicios/5">Servicios industriales</b-list-group-item></div>
                
            </div>
          </div>
        </div>
        
    </div >

  </div> 
</template>

<script>
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  export default {
    components: { VueSlickCarousel },
    middleware: 'authenticated',

    data() {
      return {
        slickSettings:{
          "dots": false,
          "arrows":true,
          "focusOnSelect": false,
          "infinite": true,
          "speed": 500,
          "slidesToShow": 4,
          "slidesToScroll": 4,
          "touchThreshold": 5,
        },
        slide: 0,
        sliding: null,
        carouselData:[
          ['banner_carousel.jpg', 'Lo nuevo', 'Encuntra los servicios más recientes'],
          ['banner_carousel.jpg', 'Servicios cercanos', 'Encuentra los servicios por cercanía']
        ],
        carouselServices:[],
        user: null
      }
    },
    mounted() {
      this.$nextTick(() => {
        const cookieRes = this.$cookies.get('user-cookie')
        this.user = cookieRes.user.userId
       this.$axios.get('/getAllServices')
      .then((res) => {
        this.carouselServices= res.data.services.filter((service)=> service.user != this.user);
      })
      .catch(function (error) {
          console.log(error);
      });
      });
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
    },
    computed:{
      category0: function(){
          return this.carouselServices.filter(service => service.category == 0);
      },
      category1: function(){
          return this.carouselServices.filter(service => service.category == 1);
      },
      category2: function(){
          return this.carouselServices.filter(service => service.category == 2);
      },
      category3: function(){
          return this.carouselServices.filter(service => service.category == 3);
      },
      category4: function(){
          return this.carouselServices.filter(service => service.category == 4);
      },
      category5: function(){
          return this.carouselServices.filter(service => service.category == 5);
      },
      
    }
  }
</script>

<style>
 .slick-next:before {
    color: black;
}
.slick-prev:before {
    color: black;
}

.card-img, .card-img-top {
    height: 200px;
}
</style>