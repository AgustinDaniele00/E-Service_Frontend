<template>
    <div class="container">
        <div class="col-12 my-5">
            <h2>Mis Servicios</h2>
            <div class="col-12 p-0">
                <b-table :items="services" :fields="fields" striped responsive="sm">
                    <template #cell(actions)="data">
                        <b-button v-if="data['item']['status']" @click="changeStatus(data['item']['serviceId'], 0)">Pausar servicio</b-button>
                        <b-button v-else @click="changeStatus(data['item']['serviceId'], 1)">Reactivar servicio</b-button>
                        <b-button @click="openCOnfirmationDeleteDialog(data['item']['serviceId'])">Eliminar</b-button>
                        <b-button :href="'/miServicios/'+data['item']['serviceId']">Editar</b-button>
                    </template>
                </b-table>

                <div>
                    <b-button href="/crearServicio" class="float-right my-3">Agregar servicio</b-button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Swal from 'sweetalert2';

    export default {
        middleware: 'authenticated',
         mounted: async function(){
            
            const cookieRes = this.$cookies.get('user-cookie')
            this.user = cookieRes.user.userId;
            
           
            const rawServices = await this.$axios.$get('/getServices/'+cookieRes.user.userId)
            if(rawServices.status == 0){
                this.services = rawServices.services
                console.log(this.services)
            }
            
        },
        data() {
            return {
                user: null,
                services:null,
                fields: [
                    {
                        key: 'serviceName',
                        label: 'Nombre',
                    },
                    {
                        key: 'actions',
                        label: 'Acciones',
                    },
                ],
                items: [
                
                ]
            }
        },
        methods: {
            async changeStatus(id, status){
                var res = await this.$axios.$post('/updateServiceStatus', {id:id, status:status})
                console.log(res)
                if(res.status == 0){
                    const cookieRes = this.$cookies.get('user-cookie')
                    this.user = cookieRes.user.userId;
                    var provs = [];
                    var url ='/getServices/'+cookieRes.user.userId;
                    console.log(url)
                    const rawServices = await this.$axios.$get(url)
                    if(rawServices.status == 0){
                        this.services = rawServices.services
                        console.log(this.services)
                    }else{
                        this.services = []
                    }
                }
            },
            openCOnfirmationDeleteDialog(id){
                Swal.fire({
                    title: 'Esta seguro que desea eliminar este servicio?',
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: 'Eliminar',
                    cancelButtonText: 'Cancelar'
                    }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        this.deleteService(id);
                        Swal.fire('Servicio eliminado', '', 'success')
                    } 
                })
            },
            async deleteService(id){
                var res = await this.$axios.$post('/deleteService', {id:id})
                console.log(res)
                if(res.status == 0){
                    const cookieRes = this.$cookies.get('user-cookie')
                    this.user = cookieRes.user.userId;
                    var url ='/getServices/'+cookieRes.user.userId;
                    console.log(url)
                    const rawServices = await this.$axios.$get(url)
                    if(rawServices.status == 0){
                        this.services = rawServices.services
                        console.log(this.services)
                    }else{
                        this.services = []
                    }
                }
            }
        }
    }
</script>