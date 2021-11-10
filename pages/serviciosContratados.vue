<template>
    <div class="container">
        <div class="col-12 my-5">
            <h2>Servicios contratados</h2>
            <div class="col-12 p-0">
                <b-table :items="services" :fields="fields" striped responsive="sm">
                    <template #cell(actions)="data">
                        <b-button @click="openConfirmationContractDialog(data.item.userServicesId)">Cancelar contratación</b-button>
                    </template>
                     <template #cell(contractDate)="data">
                        {{data.item.contractDate.slice(0,10)}}
                    </template>
                    <template #cell(contacted)="data">
                        <p v-if="data.item.contacted">
                            Si
                        </p>
                        <p v-else>
                            No
                        </p>
                    </template>
                </b-table>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
    export default {
        middleware: 'authenticated',
        mounted() {
            this.$nextTick(() => {
            const cookieRes = this.$cookies.get('user-cookie')
            this.user = cookieRes.user.userId
            console.log(this.user)
            this.$axios.get('/getContractServices/'+cookieRes.user.userId)
            .then((res) => {
                this.services =res.data.services;
            })
            .catch(function (error) {
                console.log(error);
            });
            });
    },
    methods: {
        openConfirmationContractDialog(userServicesId){
             Swal.fire({
                    title: 'Esta seguro que desea cancelar la contratación?',
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: 'Cancelar',
                    cancelButtonText: 'Cerrar'
                    }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        this.cancelContract(userServicesId)
                    } 
                })
        },
            cancelContract(userServicesId){
                this.$axios.post('/cancelServiceContract', {id: userServicesId})
                .then((res) => {
                    this.services = this.services.filter(service => service.userServicesId != userServicesId);
                })
                .catch(function (error) {
                    console.log(error);
                });
            } 
    },
        data() {
            return {
                user: null,
                services:null,
                fields: [
                    {
                        key: 'serviceName',
                        label: 'Nombre del servicio',
                    },
                    {
                        key: 'contractDate',
                        label: 'Fecha de contratación',
                    },
                    {
                        key: 'contacted',
                        label: 'Contactado',
                    },
                    {
                        key: 'actions',
                        label: 'Acciones',
                    },
                ],
                items: [
                
                ]
            }
        }
    }
</script>