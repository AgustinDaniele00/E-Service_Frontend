<template>
    <div class="container my-5">
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
            {{showDismissibleAlertText}}
        </b-alert>
        <b-alert variant="success" :show="successAlert">Usuario creado correctamente</b-alert>
        <div class="row col-12 justify-content-center">
            <h1 class="col-5">Crear Usuario</h1>
        </div>
        <div class="row col-12 justify-content-center d-flex">
            <div class="col-5">
                <b-form @submit="onSubmit" v-if="show">

                    <div class="">
                        <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
                            <b-form-input
                            id="input-1"
                            v-model="form.name"
                            placeholder="Ingresa tu nombre"
                            required
                            ></b-form-input>
                        </b-form-group>
                    </div>

                    <div>
                        <b-form-group id="input-group-2" label="Apellido:" label-for="input-2">
                            <b-form-input
                            id="input-2"
                            v-model="form.lastname"
                            placeholder="Ingresa tu apellido"
                            required
                            ></b-form-input>
                        </b-form-group>
                    </div>
                    
                    <div>
                        <b-form-group id="input-group-3" label="DNI:" label-for="input-3">
                            <b-form-input
                            id="input-3"
                            v-model="form.dni"
                            placeholder="Ingresa tu documento"
                            required
                            ></b-form-input>
                        </b-form-group>
                    </div>

                    <b-form-group id="input-group-15" label="Provincia:" label-for="input-15">
                           <b-form-select v-model="form.province" :options="provincesOptions" required @change="getLocationOptions"></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-16" label="Localidad:" label-for="input-16">
                           <b-form-select v-model="form.location" :options="locationOptions" required></b-form-select>
                    </b-form-group>

                    <div>
                        <b-form-group id="input-group-9" label="Direccion:" label-for="input-9">
                            <b-form-input
                            id="input-9"
                            v-model="form.address"
                            placeholder="Ingresa tu direccion"
                            required
                            ></b-form-input>
                        </b-form-group>
                    </div>

                    <div>
                        <b-form-group id="input-group-4" label="Telefono:" label-for="input-4">
                            <b-form-input
                            id="input-4"
                            v-model="form.phone"
                            placeholder="Ingresa tu telefono"
                            required
                            ></b-form-input>
                        </b-form-group>
                    </div>

                    <div>
                        <b-form-group
                            id="input-group-5"
                            label="Email:"
                            label-for="input-5"
                        >
                            <b-form-input
                            id="input-5"
                            v-model="form.email"
                            type="email"
                            placeholder="Ingresa tu email"
                            required
                            ></b-form-input>
                        </b-form-group>
                    </div>

                    <div>
                        <b-form-group
                            id="input-group-6"
                            label="Validar Email:"
                            label-for="input-6"
                        >
                            <b-form-input
                            id="input-6"
                            type="email"
                            placeholder="Ingresa nuevamente tu email"
                            required
                            v-model="emailValidate"
                            :class="{'border-danger':validateEmail}"
                            ></b-form-input>
                            <span v-show="validateEmail" class="text-danger">Los e-mails ingresados no coinciden</span>
                        </b-form-group>
                    </div>

                    
                    <div>
                        <b-form-group id="input-group-7" label="Contraseña:" label-for="input-7">
                              <b-input-group>
                                <b-form-input id="input-7"
                            :type="type"
                            v-model="form.password"
                            placeholder="Ingresa tu contraseña"
                            required></b-form-input>
                                <b-input-group-append>
                                <b-button  @click="showPassword"><BIconEye /></b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                    </div>

                     <div>
                        <b-form-group id="input-group-8" label="Validar contraseña:" label-for="input-8">
                              <b-input-group>
                                <b-form-input  id="input-8"
                            placeholder="Ingresa nuevamente tu contraseña"
                            required
                            :type="type2"
                            v-model="passwordValidate"
                            :class="{'border-danger':validatePass}"></b-form-input>
                                <b-input-group-append>
                                <b-button  @click="showPassword2"><BIconEye /></b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                    </div>
                    

                    <b-button variant="primary" type="summit">Crear cuenta</b-button>
                    <b-button variant="danger" href="/login">Cancelar</b-button>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
import {BIconEye, BIconArrowUp, BIconArrowDown } from 'bootstrap-vue'
    export default {
        layout: 'login',
        components: {
            BIconEye,
            BIconArrowUp,
            BIconArrowDown
        },
        mounted: async function(){

            var provs = [];
            const rawLocat = await this.$axios.$get('https://apis.datos.gob.ar/georef/api/localidades?orden=nombre&max=5000')
            const raw = await this.$axios.$get('https://apis.datos.gob.ar/georef/api/provincias?orden=nombre&max=5000')
            this.rawLocations = rawLocat.localidades
            raw.provincias.forEach(province => {
                provs.push({ value: province.id, text:  province.nombre })
            });
            
            this.provincesOptions = provs
        },
        data() {
        return {
            type: 'password',
            type2: 'password',
            btnText: 'Mostrar contraseña',
            showDismissibleAlert: false,
            showDismissibleAlertText: '',
            successAlert:false,
            passwordValidate: '',
            emailValidate: '',
            form: {
                userId: null,
                name: '',
                lastname: '',
                phone: '',
                dni: '',
                email: '',
                password: '',
                address: '',
                province:'',
                location: '',
            },
            show: true,
            rawLocations: [],
            locationOptions: [],
            provincesOptions: [],
            
        }
        },
        methods: {
            printRes(res){
                if(res.data.status == 0){
                    //console.log(res.data.insertId)
                    this.successAlert = true
                    this.form.userId = res.data.data.insertId
                    this.$cookies.set('user-cookie', {user:this.form, loggedIn: true}, {
                        path: '/',
                        maxAge: 60 * 60 * 24 * 7
                    })
                    setTimeout(()=>{
                    this.$router.push('/')
                    }, 500)
                }else if(res.data.status == 1){
                    this.showDismissibleAlertText = 'El email ingresado ya esta registrado'
                    this.showDismissibleAlert = true
                }else {
                    this.showDismissibleAlertText = 'Hay un error en los datos ingresados o en el servidor'
                    this.showDismissibleAlert = true
                }
            },
            showPassword(e) {
                e.preventDefault()
                if(this.type === 'password') {
                    this.type = 'text'
                    this.btnText = 'Ocultar contraseña'
                } else {
                    this.type = 'password'
                    this.btnText = 'Mostrar contraseña'
                }
            },
            showPassword2(e) {
                e.preventDefault()
                if(this.type2 === 'password') {
                    this.type2 = 'text'
                    this.btnText = 'Ocultar contraseña'
                } else {
                    this.type2 = 'password'
                    this.btnText = 'Mostrar contraseña'
                }
            },
            onSubmit(event) {
                event.preventDefault()
                if(!this.validatePass && !this.validateEmail){
                    this.$axios.post('/register', this.form)
                    .then((res) => this.printRes(res))
                    .catch(function (error) {
                        console.log(error);
                    });
                }else{
                    console.log('ok')
                    console.log(this.validatePass)
                    console.log(this.validateEmail)
                }
            },
             getLocationOptions(){
                var locs = []
                var locsRaw = this.rawLocations.filter(loc => loc.provincia.id == this.form.province);
                locsRaw.forEach(location => {
                    locs.push({ value: location.id, text:  location.nombre })
                });
                console.log(locs)
                this.locationOptions = locs;
            },
        },
        computed:{
            validatePass: function(){
                if(this.form.password !== this.passwordValidate){
                    return true;
                }else{
                    return false;
                }
            },
            validateEmail: function(){
                if(this.form.email !== this.emailValidate){
                    return true;
                }else{
                    return false;
                }
            }
            
        },
    }
</script>