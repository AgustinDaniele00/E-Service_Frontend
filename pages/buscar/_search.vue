<template>
    <div class="container">
        <div class="col-12 row mt-5">
            <div class="col-4">
            
             <div v-if="ubications.length > 0">
                <h2>Ubicacion</h2>
                <b-list-group>
                    <b-list-group-item  v-for="(ubi, index) in ubications" :key="'ubi'+index" :class="[ubication == ubi.id ?'selected':'d', 'btnOrder']" @click="filterUbi(ubi.id)">{{ubi.name}}</b-list-group-item>
                </b-list-group>
            </div>

            <div v-if="categories.length > 0">
                <h2>Categorias</h2>
                <b-list-group>
                    <b-list-group-item  v-for="(cat, index) in categories" :key="'cat'+index" :class="[category == cat.id ?'selected':'d', 'btnOrder']" @click="filterCat(cat.id)">{{cat.name}}</b-list-group-item>
                </b-list-group>
            </div>
            
            <div>
                <h2>Precio</h2>
                <b-list-group>
                    <b-list-group-item @click="priceOrder=0" :class="[priceOrder == 0 ?'selected':'d', 'btnOrder']" >Menor a mayor precio</b-list-group-item>
                    <b-list-group-item @click="priceOrder=1" :class="[priceOrder == 1 ?'selected':'d', 'btnOrder']">Mayor a menor precio</b-list-group-item>
                    <b-list-group-item class="">
                        <div class="row justify-content-around">
                            <b-form-input type="text" placeholder="Min" class="col-4 " v-model="minPrice"></b-form-input>
                            <b-form-input type="text" placeholder="Max" class="col-4" v-model="maxPrice"></b-form-input>
                            <b-button class="col-3" @click="searchMinMaxPrice">Buscar</b-button>
                        </div>
                    </b-list-group-item>
                </b-list-group>
            </div>
        </div>
        <div class="col-8 mt-5" v-if="services != null">
            <b-card class="mb-4" :img-src="'http://localhost:4001/services_images/'+service.image" img-width="200" img-alt="Card image" img-right v-for="(service, index) in services" :key="index">
                <b-card-text class="">
                    <p>{{service['serviceName']}}</p>

                    <p>{{service['price']}}</p> 

                    <b-button :href="'/servicio/'+service['serviceId']" variant="primary" class="boton">Mostrar más</b-button>
                </b-card-text>
            </b-card>
        </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        middleware: 'authenticated',
        data() {
            return {
                ubications: [],
                ubication: null,
                categories: [],
                category:null,
                priceOrder: null,
                minPrice: null,
                maxPrice: null,
                rawServices: null,
                user: null
            }
        },
        methods:{
            searchMinMaxPrice(){
                this.priceOrder = 2;
            },
            filterCat(catId){
                if(catId==this.category){
                    this.category=null;
                }else{
                    this.category=catId;
                }
            },
            filterUbi(ubiId){
                if(ubiId==this.ubication){
                    this.ubication=null;
                }else{
                    this.ubication=ubiId;
                }
            }
        },
        computed:{
            services: function(){
                var filtered = this.rawServices;
                if(this.priceOrder == 0){
                    var servicesData = this.rawServices;
                    function comparar ( a, b ){ return a.price - b.price; }
                    servicesData.sort( comparar ); 
                   filtered = servicesData;
                }else if(this.priceOrder == 1){
                    var servicesData = this.rawServices;
                    function comparar ( b, a ){ return a.price - b.price; }
                    servicesData.sort( comparar ); 
                    filtered = servicesData;
                }else if(this.priceOrder == 2){
                    if(this.minPrice == null || this.minPrice == ''){
                         filtered = filtered.filter(service => service.price <= this.maxPrice);
                    
                    }else if(this.maxPrice == null || this.maxPrice == ''){
                         filtered = filtered.filter(service => service.price >= this.minPrice);
                        
                    }else{
                        filtered = filtered.filter(service => service.price >= this.minPrice && service.price <= this.maxPrice);
                        
                    }
                }
                if(this.category != null){
                    filtered = filtered.filter(service => service.category==this.category);
                }

                if(this.ubication != null){
                    filtered = filtered.filter(service => service.province==this.ubication);
                }
                
                return filtered;
            }
        },
        mounted(){
            this.$nextTick(async () => {
                const cookieRes = this.$cookies.get('user-cookie')
        this.user = cookieRes.user.userId
        const provinces = await this.$axios.$get('https://apis.datos.gob.ar/georef/api/provincias?orden=nombre&max=5000')
            this.$axios.get('/searchServices/'+this.$route.params.search)
            .then((res) => {
                this.rawServices = res.data.services.filter((service)=> service.user != this.user);
                var cats = [
                        'Belleza y cuidado personal',
                        'Servicios de limpieza',
                        'Servicios educativos',
                        'Servicios editoriales',
                        'Servicios de telecomunicaciones',
                        'Servicios industriales'
                    ]
                this.rawServices.forEach(service => {
                        var flag = false;
                        var flag2 = false;
                        this.categories.forEach(cat => {
                            if(cat.id == service.category){
                                flag = true
                            }
                        });
                        this.ubications.forEach(ubi => {
                            if(ubi.id == service.province){
                                flag2 = true
                            }
                        });
                        if(!flag){
                            this.categories.push({id:service.category, name: cats[service.category]})
                        }
                        if(!flag2){
                            this.ubications.push({id:service.province, name: provinces.provincias.find(prov => prov.id == service.province).nombre})
                        }
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
            });
        },
        
    }
</script>

<style>
    .selected{
        background-color: rgb(42, 111, 175);
        color: white;
    }
    .btnOrder{
        cursor: pointer;
    }
</style>