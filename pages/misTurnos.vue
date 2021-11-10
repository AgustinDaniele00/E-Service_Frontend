<template>
    <div class="container">
        <div class="col-12 my-5">
            <h2>Mis turnos</h2>
            <div class="col-12 p-0">
                <b-table :items="turns" :fields="fields" striped responsive="sm">
                    <template #cell(contacted)="data">
                        <p v-if="data.item.contacted">Si</p>
                        <b-button v-else @click="openConfirmationContractDialog(data.item)">Contactado</b-button>
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
            this.$axios.get('/getTurns/'+this.user)
            .then((res) => {
                this.turns= res.data.turns;
            })
            .catch(function (error) {
                console.log(error);
            });
            });
        },
        methods: {
            openConfirmationContractDialog(turn){
             Swal.fire({
                    title: 'Marcar cliente cómo contactado?',
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'Cancelar'
                    }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        this.contactClient(turn)
                    } 
                })
        },
            contactClient(turn){
                var tmpTurns = this.turns
                tmpTurns.forEach(turnTmp => {
                    if(turn.userServicesId == turnTmp.userServicesId){
                        turnTmp.contacted = 1;
                    }
                });
                this.turns = tmpTurns
                this.$axios.post('/contactClient', {userServicesId: turn.userServicesId})
                .then((res) => {
                    console.log('ok')
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
        data() {
            return {
                user: null,
                turns:null,
                fields: [
                    {
                        key: 'serviceName',
                        label: 'Nombre del servicio',
                    },
                    {
                        key: 'name',
                        label: 'Nombre del cliente',
                    },
                    {
                        key: 'phone',
                        label: 'Telefono del cliente',
                    },
                    {
                        key: 'contacted',
                        label: 'Contactado'
                    }
                ],
                items: [
                
                ]
            }
        }
    }
</script>
