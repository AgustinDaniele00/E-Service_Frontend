<template>
  <div>
  <div class="container my-5 justify-content-center d-flex">
    
   <b-form @submit="onSubmit" class="col-4">


      <b-form-group 
      id="input-group-1"
        label="Contraseña actual:"
        label-for="input-1">
            <b-input-group>
              <b-form-input 
                id="input-1"
                v-model="actualPassword"
                placeholder="Ingrese su contraseña actual"
                :type="type"
                required
                :class="{'border-danger':validateActualPass}"
          ></b-form-input>
              <b-input-group-append>
              <b-button  @click="showPassword"><BIconEye /></b-button>
              </b-input-group-append>
          </b-input-group>
          <span v-show="validateActualPass" class="text-danger">La contraseña ingresada no es correcta</span>
      </b-form-group>

      <b-form-group id="input-group-2" label="Nueva contraseña:" label-for="input-2">
            <b-input-group>
              <b-form-input 
                id="input-2"
                v-model="newPassword"
                :type="type2"
                placeholder="Ingrese la contraseña deseada"
                required
          ></b-form-input>
              <b-input-group-append>
              <b-button  @click="showPassword2"><BIconEye /></b-button>
              </b-input-group-append>
          </b-input-group>
      </b-form-group>




<b-form-group 
     id="input-group-3" label="Confirmar nueva contraseña:" label-for="input-3">
            <b-input-group>
              <b-form-input 
                id="input-3"
          v-model="repeatnewPassword"
          placeholder="Ingrese la contraseña deseada nuevamente"
          :type="type3"
          required
          :class="{'border-danger':validateNewPass}"
          ></b-form-input>
              <b-input-group-append>
              <b-button  @click="showPassword3"><BIconEye /></b-button>
              </b-input-group-append>
          </b-input-group>
          <span v-show="validateActualPass" class="text-danger">Las contraseñas ingresadas no son iguales</span>
      </b-form-group>



      <b-button type="submit" variant="primary" class="col-12 my-2">Cambiar contraseña</b-button>
<!--      <b-button variant="danger" href="/perfil" class="col-12 my-2">Cancelar</b-button>-->
    </b-form>
    </div>
  </div>
</template>

<script>
import {BIconEye, BIconArrowUp, BIconArrowDown } from 'bootstrap-vue'

export default {
    middleware: 'authenticated',
    components: {
            BIconEye,
            BIconArrowUp,
            BIconArrowDown
        },
    data() {
        return {
            actualPassword: '',
            newPassword: '',
            repeatnewPassword: '',
            user:{},
            type: 'password',
            type2: 'password',
            type3: 'password',
        }
    },
    mounted() {
        this.$nextTick(() => {
        const cookieRes = this.$cookies.get('user-cookie')
        if(cookieRes !== undefined && 'loggedIn' in cookieRes && cookieRes.loggedIn == true){
            console.log('Logueado')
            this.user = cookieRes.user;
        }
        });
    },
    methods: {
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
        showPassword3(e) {
            e.preventDefault()
            if(this.type3 === 'password') {
                this.type3 = 'text'
                this.btnText= 'Ocultar contraseña'
            } else {
                this.type3 = 'password'
                this.btnText = 'Mostrar contraseña'
            }
        },
        onSubmit(event) {
            event.preventDefault()
            console.log('Prev')
            if(!this.validateActualPass && !this.validateNewPass){
                console.log('Update')
                this.$axios.post('/changePass', {password: this.newPassword,id: this.user.userId})
                .then((res) => this.printRes(res))
                .catch(function (error) {
                    console.log(error);
                });

                this.$cookies.set('user-cookie', {user: this.user, loggedIn: true}, {
                        path: '/',
                        maxAge: 60 * 60 * 24 * 7
                })
                setTimeout(()=>{
                  this.$router.push('/')
                }, 1000)
            }
        },
    },
    computed:{
        validateActualPass: function(){
            if(this.actualPassword !== this.user.password){
                return true;
            }else{
                return false;
            }
        },
        validateNewPass: function(){
            if(this.newPassword !== this.repeatnewPassword ){
                return true;
            }else{
                return false;
            }
        },
    },
}
</script>
