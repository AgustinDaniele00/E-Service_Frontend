<template>
    <div class="container">
        <div class=" row col-12 my-5">

            <div class="col-12 ">
                <h1>{{service.serviceName}}</h1>
                <b-list-group>
                    <b-img :src="'http://localhost:4001/services_images/'+service.image"></b-img>
                </b-list-group>
            </div>
            

            <div class="col-12 my-5">
                <h2>Datos del servicio</h2>
                <div class="row col-12 my-3">

                    <div class="col-3 p-0">
                        <h3>Ubicación</h3>
                        <p>Provincia: {{service.province}}</p>
                        <p>Ciudad: {{service.location}}</p>
                        <p>Dirección: {{service.address}}</p>
                    </div>

                    <div class="col-3">
                        <h3>Día y horario</h3>
                        <p>Días: {{days}}</p>
                        <p v-if="service.scheduleSelector < 2">{{schedule}}</p>
                        <div v-else>
                              <p >Mañana: {{schedule[0]}}</p>
                              <p >Tarde: {{schedule[1]}}</p>
                        </div>
                    </div>

                    <div class="col-3 p-0">
                        <h3>Precio</h3>
                        <p>$ {{service.price}}</p>
                    </div>

                    <div class="col-3">
                        <h3>Descripcion</h3>
                        <p>{{service.description}}</p>
                    </div>
                </div>

                <div class="col-12 p-0">
                    <b-button @click="openConfirmationContractDialog" class="my-3 float-right">Contratar</b-button>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
img{
    max-height: 400px !important;
}
.test:first-letter {
    text-transform:capitalize;
}
</style>
<script>
import Swal from 'sweetalert2';
    export default {
        middleware: 'authenticated',
        data() {
        return {
            provinces: null,
            locations: null,
            value: 5,
            service: [],
            user: null
        }
        },
        mounted() {
            this.$nextTick(async () => {
                var provs = [];
                const rawLocat = await this.$axios.$get('https://apis.datos.gob.ar/georef/api/localidades?orden=nombre&max=5000')
                const raw = await this.$axios.$get('https://apis.datos.gob.ar/georef/api/provincias?orden=nombre&max=5000')
                this.locations = rawLocat.localidades
                this.provinces = raw.provincias
                const cookieRes = this.$cookies.get('user-cookie')
                this.user = cookieRes.user.userId
                this.$axios.get('/getServiceById/'+this.$route.params.id)
                .then((res) => {
                    const prov = this.provinces.filter((prov) => prov.id == res.data.service.province)[0].nombre.toLowerCase()
                    const provCapitalized = prov.charAt(0).toUpperCase() + prov.slice(1)
                    const locat = this.locations.filter((locat) => locat.id == res.data.service.location)[0].nombre.toLowerCase()
                    const locatCapitalized = locat.charAt(0).toUpperCase() + locat.slice(1)
                    res.data.service.province = provCapitalized
                    res.data.service.location = locatCapitalized
                    this.service= res.data.service;
                })
                .catch(function (error) {
                    console.log(error);
                });
            });
    },
    methods: {
        openConfirmationContractDialog(){
             Swal.fire({
                    title: 'Esta seguro que desea contratar este servicio?',
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: 'Contratar',
                    cancelButtonText: 'Cancelar'
                    }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        this.contractService()
                    } 
                })
        },
        contractService(){
            this.$axios.post('/addContractService', {user: this.user, service: this.$route.params.id, turnUser: this.service.user})
            .then((res) => {
                setTimeout(()=>{
                  this.$router.push('/serviciosContratados')
                }, 1000)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    computed: {
        days: function(){
            if(this.service.days != undefined){
                var parsedDays = JSON.parse(this.service.days)
                var tmpDays = Object.entries(parsedDays).filter(([key, value]) => value === 'true');
                var daysString = null
                tmpDays.forEach(day => {
                    if(daysString == null){
                        daysString = day[0]
                    }else{
                        daysString = daysString+','+day[0]
                    }
                });
                return daysString;
            }
            return '';
        },
        schedule: function(){
            if(this.service.schedule != undefined){
                console.log(this.service.scheduleSelector)
                var schedule = JSON.parse(this.service.schedule)
                if(this.service.scheduleSelector == 0){
                    if(schedule['untilMorning'].slice(0,2) >= 12){
                        return 'Mañana: '+schedule['fromMorning'].slice(0,5)+'am'+' a '+schedule['untilMorning'].slice(0,5)+'pm'
                    }else{
                        return 'Mañana: '+schedule['fromMorning'].slice(0,5)+'am'+' a '+schedule['untilMorning'].slice(0,5)+'am'
                    }
                }else if(this.service.scheduleSelector == 1){
                    return 'Tarde: '+schedule['fromAfternoon'].slice(0,5)+'pm'+' a '+schedule['untilAfternoon'].slice(0,5)+'pm'
                }else if(this.service.scheduleSelector == 2){
                    if(schedule['untilMorning'].slice(0,2) >= 12){
                     return [schedule['fromMorning'].slice(0,5)+'am'+' a '+schedule['untilMorning'].slice(0,5)+'pm',schedule['fromAfternoon'].slice(0,5)+'pm'+' a '+schedule['untilAfternoon'].slice(0,5)+'pm']
                    }else{
                        return [schedule['fromMorning'].slice(0,5)+'am'+' a '+schedule['untilMorning'].slice(0,5)+'am',schedule['fromAfternoon'].slice(0,5)+'pm'+' a '+schedule['untilAfternoon'].slice(0,5)+'pm']
                    }
                }
            }
            return ''
        }
        
    }
        
    }
</script>