 <template>
  <div>
    <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
            {{showDismissibleAlertText}}
    </b-alert>
    <b-alert variant="success" :show="successAlert">Usuario logueado correctamente</b-alert>
  <div class="container my-5 justify-content-center d-flex">
    
   <b-form @submit="onSubmit" v-if="show" class="col-4">
      <b-form-group
        id="input-group-1"
        label="Email:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Ingrese su email"
          required
        ></b-form-input>
      </b-form-group>



      <div>
        <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
            <b-input-group>
              <b-form-input id="input-2"
          v-model="form.password"
          placeholder="Ingres e su contraseña"
          :type="type"
          required></b-form-input>
              <b-input-group-append>
              <b-button  @click="showPassword"><BIconEye /></b-button>
              </b-input-group-append>
          </b-input-group>
      </b-form-group>
      </div>



      <b-button type="submit" variant="primary" class="col-12 my-2">Iniciar sesión</b-button>
      <nuxt-link to="/registro" prefetch ><b-button variant="outline-primary" class="col-12 text-center">Crear cuenta</b-button></nuxt-link>
    </b-form>

  </div>
  </div>
</template>

<script>
import {BIconEye, BIconArrowUp, BIconArrowDown } from 'bootstrap-vue'

  export default {
    middleware: 'loginRedirect',
    layout: 'login',
    components: {
            BIconEye,
            BIconArrowUp,
            BIconArrowDown
        },
    data() {
      return {
        type: 'password',
        showDismissibleAlert: false,
        showDismissibleAlertText: '',
        successAlert:false,
        form: {
          email: '',
          password: '',
        },
        show: true
      }
    },
    mounted() {
    this.$nextTick(() => {
      const cookieRes = this.$cookies.get('user-cookie')
      if(cookieRes !== undefined && 'loggedIn' in cookieRes && cookieRes.loggedIn == true){
        console.log('Logueado')
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
      printRes(res){
            
            if(res.data.status == 0){
              this.showDismissibleAlert = false
              this.successAlert = true
                this.$cookies.set('user-cookie', {user: res.data.user, loggedIn: true}, {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7
                })
                setTimeout(()=>{
                  this.$router.push('/')
                }, 1000)
            }else if(res.data.status == 1){
              this.showDismissibleAlertText = 'Contraseña erronea'
              this.showDismissibleAlert = true
            }else{
              this.showDismissibleAlertText = 'Email no encontrado'
              this.showDismissibleAlert = true
            }
      },
      onSubmit(event) {
        event.preventDefault()
        this.$axios.post('/login', this.form)
        .then((res) => this.printRes(res))
        .catch(function (error) {
            console.log(error);
        });
      },
      
    }
  }
</script>