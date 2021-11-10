<template>
    <div class="container">
        <div class="row col-12 justify-content-center">
            <h1 class="my-5 col-7"> Mis datos</h1>
        </div>
        
        <div class="row col-12 justify-content-center">
            <div class="col-7">
                <b-avatar size="100px"></b-avatar>
            </div>

            <div class="col-7 my-3">
                <h2>Datos de la cuenta</h2>
                <b-list-group>
                    <b-list-group-item>Email: {{user.email}}</b-list-group-item>
                </b-list-group>
                <NuxtLink to="/cambiarContraseña" class=""><b-button class="col-12 my-3" variant="outline-primary">Cambiar contraseña</b-button></NuxtLink>
            </div>

            <div class=" col-7 my-3">    
                <h2>Datos personales</h2>
                <b-list-group v-if="editProfile">
                    <b-list-group-item>Nombre: <b-form-input v-model="user.name"></b-form-input></b-list-group-item>
                    <b-list-group-item>Apellido: <b-form-input v-model="user.lastname"></b-form-input></b-list-group-item>
                    <b-list-group-item>DNI: <b-form-input v-model="user.dni"></b-form-input></b-list-group-item>
                    <b-list-group-item>Dirección: <b-form-input v-model="user.address"></b-form-input></b-list-group-item>
                    <b-list-group-item>Telefono: <b-form-input v-model="user.phone"></b-form-input></b-list-group-item>
                     
                </b-list-group>

                <b-list-group v-else>
                    <b-list-group-item>Nombre: {{user.name}}</b-list-group-item>
                    <b-list-group-item>Apellido: {{user.lastname}}</b-list-group-item>
                    <b-list-group-item>DNI: {{user.dni}}</b-list-group-item>
                    <b-list-group-item>Direccion: {{user.address}}</b-list-group-item>
                    <b-list-group-item>Telefono: {{user.phone}}</b-list-group-item>
                </b-list-group>
            </div>

            <b-button class=" col-6 my-3" @click="toogleEdit" v-if="editProfile">Guardar cambios</b-button>
            <b-button class=" col-6 my-3" @click="toogleEdit" v-else>Editar perfil</b-button>
        </div>
        
    </div>
</template>

<script>
    export default {
        middleware: 'authenticated',
        data() {
            return {
                editProfile: false,
                user: {}
            }
        },
        methods: {
            toogleEdit(){
                if(this.editProfile){
                    this.$axios.post('/editUser', this.user)
                    .then((res) => this.printRes(res))
                    .catch(function (error) {
                        console.log(error);
                    });
                    this.$cookies.set('user-cookie', {user: this.user, loggedIn: true}, {
                        path: '/',
                        maxAge: 60 * 60 * 24 * 7
                    })
                }
                return this.editProfile = !this.editProfile;
            }
        },
        mounted() {
            this.$nextTick(() => {
                const cookieRes = this.$cookies.get('user-cookie')
                if(cookieRes !== undefined && 'loggedIn' in cookieRes && cookieRes.loggedIn == true){
                    this.user = cookieRes.user;
                }
            });
        },
    }
</script>