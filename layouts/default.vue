<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info" v-if="userLoggedIn">
        <b-navbar-brand href="#">E-Service</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/">Home</b-nav-item>
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>Categorias</em>
              </template>
              <b-dropdown-item href="/servicios/0">Belleza y cuidado personal</b-dropdown-item>
              <b-dropdown-item href="/servicios/1">Servicios de limpieza</b-dropdown-item>
              <b-dropdown-item href="/servicios/2">Servicios educativos</b-dropdown-item>
              <b-dropdown-item href="/servicios/3">Servicios editoriales</b-dropdown-item>
              <b-dropdown-item href="/servicios/4">Servicios de telecomunicaciones</b-dropdown-item>
              <b-dropdown-item href="/servicios/5">Servicios industriales</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item href="/serviciosCercanos">Servicios cercanos</b-nav-item>          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-form @submit="submitForm">
              <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar servicios" v-model="search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit" >Buscar</b-button>
            </b-nav-form>

            <b-nav-item-dropdown right>
              <template #button-content>
                <b-avatar size="45px"></b-avatar> <em>{{user}}</em>
              </template>
              <b-dropdown-item href="/perfil">Perfil</b-dropdown-item>
              <b-dropdown-item href="/miServicios">Mis servicios</b-dropdown-item>
              <b-dropdown-item href="/misTurnos">Mis turnos</b-dropdown-item>
              <b-dropdown-item href="/serviciosContratados">Servicios contratados</b-dropdown-item>
              <b-dropdown-item v-on:click="logout()">Cerrar Sesión</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  data(){
    return {
      userLoggedIn: true,
      user: 'Usuario',
      search:''
    }
  },
  mounted() {
    this.$nextTick(() => {
      const cookieRes = this.$cookies.get('user-cookie')
      console.log('Comprobando si el ususario esta logueado')
      if(cookieRes !== undefined && 'loggedIn' in cookieRes && cookieRes.loggedIn == true){
        this.user = cookieRes.user.name
        console.log('Logueado')
      }else{
        console.log('El ususario no esta logueado')
      }
    });
    },
  methods: {
    submitForm(e){
      e.preventDefault()
      this.$router.push('/buscar/'+this.search)
    },
    
    logout(){
      this.$cookies.set('user-cookie', {loggedIn: false}, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
      this.$router.push('/login')
    }
  },
}
</script>