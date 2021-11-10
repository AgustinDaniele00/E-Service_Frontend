<template>
    <div class="container">
        <div class="row col-12 justify-content-center">
            <h1 class="my-5 col-7">Editar Servicio</h1>
        </div>
        <div class="row col-12 justify-content-center">
            <div class="col-7">
                <b-form @submit="onSubmit" v-if="show">
                    <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
                        <b-form-input
                        id="input-1"
                        v-model="form.name"
                        placeholder="Ingresar el nombre del servicio"
                        required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Ubicación:" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="form.adress"
                        placeholder="Ingresa la ubicacion del servicio"
                        required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="Descripción:" label-for="input-3">
                        <b-form-textarea
                        id="textarea"
                        v-model="form.descripcion"
                        placeholder="Escriba la descripción del servicio"
                        rows="3"
                        max-rows="6"
                        required
                        ></b-form-textarea>
                    </b-form-group>

                    <b-form-group id="input-group-15" label="Precio:" label-for="input-15">
                        <b-form-input
                        id="input-15"
                        v-model="form.price"
                        placeholder="Escriba el precio del servicio"
                        required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-15" label="Provincia:" label-for="input-15">
                           <b-form-select v-model="form.province" :options="provincesOptions" required @change="getLocationOptions"></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-16" label="Localidad:" label-for="input-16">
                           <b-form-select v-model="form.location" :options="locationOptions" required></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-4" label="Días:" label-for="input-4" >
                        <b-form-checkbox v-model="form.days.lun" name="lunes" value="true">Lunes</b-form-checkbox>
                        <b-form-checkbox v-model="form.days.mar" name="martes" value="true">Martes</b-form-checkbox>
                        <b-form-checkbox v-model="form.days.mie" name="miercoles" value="true">Miercoles</b-form-checkbox>
                        <b-form-checkbox v-model="form.days.jue" name="jueves" value="true">Jueves</b-form-checkbox>
                        <b-form-checkbox v-model="form.days.vie" name="viernres" value="true">Viernes</b-form-checkbox>
                        <b-form-checkbox v-model="form.days.sab" name="sabado" value="true">Sabado</b-form-checkbox>
                        <b-form-checkbox v-model="form.days.dom" name="domingo" value="true">Domingo</b-form-checkbox>
                    </b-form-group>

                    <b-form-group id="input-group-14" label="Categoría:" label-for="input-14">
                           <b-form-select v-model="form.categoria" :options="options" required></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-5" label="Horario:" label-for="input-5">
                        <b-form-group>
                            <b-form-checkbox v-model="form.hourSelect" name="turno" value="0">Mañana</b-form-checkbox>
                            <b-form-checkbox v-model="form.hourSelect" name="turno" value="1">Tarde</b-form-checkbox>
                            <b-form-checkbox v-model="form.hourSelect" name="turno" value="2">Mañana y Tarde</b-form-checkbox>
                        </b-form-group>
                        
                        <b-form-group class="input-group-7" label="Mañana" v-if="form.hourSelect==0 ||form.hourSelect==2">
                            <b-form-group  id="input-group-8" label="Desde:" label-for="input-8">
                                <b-form-timepicker v-model="form.fromMorning" locale="en" required></b-form-timepicker>
                            </b-form-group>
                            <b-form-group  id="input-group-9" label="Hasta:" label-for="input-9">
                                <b-form-timepicker v-model="form.untilMorning" locale="en" required></b-form-timepicker>
                            </b-form-group>
                        </b-form-group>

                        <b-form-group class="input-group-10" label="Tarde" v-if="form.hourSelect==1 ||form.hourSelect==2">
                            <b-form-group  id="input-group-11" label="Desde:" label-for="input-11">
                                <b-form-timepicker v-model="form.fromAfternoon" locale="en"></b-form-timepicker>
                            </b-form-group>
                            <b-form-group  id="input-group-12" label="Hasta:" label-for="input-12">
                                <b-form-timepicker v-model="form.untilAfternoon" locale="en"></b-form-timepicker>
                            </b-form-group>
                        </b-form-group>
                    </b-form-group>

                    <b-form-group id="input-group-13" label="Imagen:" label-for="input-13">
                        <input type="file" @change="onFileChange" />
                    </b-form-group>

                    <b-button type="submit" variant="primary">Actualizar</b-button>
                    <b-button variant="danger" href="/miServicios">Cancelar</b-button>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        middleware: 'authenticated',
        mounted: async function(){
            const cookieRes = this.$cookies.get('user-cookie')

            this.form.user = cookieRes.user.id;
            var provs = [];
            const rawLocat = await this.$axios.$get('https://apis.datos.gob.ar/georef/api/localidades?orden=nombre&max=5000')
            const raw = await this.$axios.$get('https://apis.datos.gob.ar/georef/api/provincias?orden=nombre&max=5000')
            this.rawLocations = rawLocat.localidades
            raw.provincias.forEach(province => {
                provs.push({ value: province.id, text:  province.nombre })
            });
            
            this.provincesOptions = provs
            
            this.$axios.get('/getServiceById/'+this.$route.params.id)
            .then((res) => {
                var service = res.data.service
                var serviceSchedule = JSON.parse(service.schedule);
                console.log(serviceSchedule.fromMorning)
                this.form.user = service.user;
                this.form.province = service.province;
                this.form.location = service.location;
                this.form.name = service.serviceName;
                this.form.adress = service.address;
                this.form.descripcion = service.description;
                this.form.price = service.price;
                this.form.days = JSON.parse(service.days)
                this.form.categoria = service.category;
                this.form.image = service.image;
                this.form.hourSelect = service.scheduleSelector;
                this.form.fromMorning = serviceSchedule.fromMorning;
                this.form.untilMorning = serviceSchedule.untilMorning;
                this.form.fromAfternoon = serviceSchedule.fromAfternoon;
                this.form.untilAfternoon = serviceSchedule.untilAfternoon;
                this.getLocationOptions()
                setTimeout(this.setLocationMounted(service.location), 10000)
            })
            .catch(function (error) {
                console.log(error);
            });
            
        },
        data() {
        return {
            rawLocations: [],
            locationOptions: [],
            provincesOptions: [],
            selectedFile: "",
            form: {
                id: this.$route.params.id,
                user:0,
                province: 0,
                location: 0,
                name: '',
                adress: '',
                descripcion: '',
                price: 0,
                days:{
                    lun:false,
                    mar:false,
                    mie:false,
                    jue:false,
                    vie:false,
                    sab:false,
                    dom:false,
                },
                categoria:0,
                hourSelect:0,
                image:null,
                fromMorning:'',
                untilMorning:'',
                fromAfternoon:'',
                untilAfternoon:'',
                newImage: false,
            },
            options: [
                { value: null, text: 'Por favor elija una opción' },
                { value: 0, text: 'Belleza y cuidado personal' },
                { value: 1, text: 'Servicios de limpieza' },
                { value: 2, text: 'Servicios educativos' },
                { value: 3, text: 'Servicios editoriales' },
                { value: 4, text: 'Servicios de telecomunicaciones' },
                { value: 5, text: 'Servicios industriales' },
                ],
            show: true
        }
        },
        methods: {
            onFileChange(e) {
                const selectedFile = e.target.files[0]; 
                this.selectedFile = selectedFile;
                console.log(this.selectedFile)
                this.newImage = true
            },
            onUploadFile() {
                if(this.newImage){
                    const formData = new FormData();
                    formData.append("file", this.selectedFile);
                    // sending file to the backend
                    this.$axios.$post("/upload", formData)
                    .then(res => {
                        console.log(res);
                        this.form.image = res.path
                        this.$axios.$post('/updateService', this.form)
                        setTimeout(()=>{
                                this.$router.push('/miServicios')
                        }, 1000)
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }else{
                    this.$axios.$post('/updateService', this.form)
                    setTimeout(()=>{
                            this.$router.push('/miServicios')
                    }, 1000)
                }
                
            },
            setLocationMounted(loc){
                var locs = []
                var locsRaw = this.rawLocations.filter(loc => loc.provincia.id == this.form.province);
                locsRaw.forEach(location => {
                    locs.push({ value: location.id, text:  location.nombre })
                });
                this.locationOptions = locs;
                this.form.location = loc
            },
            getLocationOptions(){
                console.log('Provincia: '+this.form.province)
                var locs = []
                var locsRaw = this.rawLocations.filter(loc => loc.provincia.id == this.form.province);
                locsRaw.forEach(location => {
                    locs.push({ value: location.id, text:  location.nombre })
                });
                this.locationOptions = locs;
            },
        onSubmit(event) {
            event.preventDefault()
            if(this.verifyDays){
                if(this.verifyDates){
                    if(this.form.image != null){
                        this.onUploadFile();
                        
                    }else{
                        alert('Debe cargar una imagen')
                    }
                }else{
                    alert('Debe seleccionar horario y fecha')
                    
                }               
            }else{
                alert('Debe seleccionar al menos un día')
            }
        },
        },
        computed:{
            verifyDays: function(){
                if(this.form.days.lun==null && this.form.days.mar==null && this.form.days.mie==null && this.form.days.jue==null && this.form.days.vie==null && this.form.days.sab==null && this.form.days.dom==null){
                    return false;
                }else{
                    return true;
                }
            },
            verifyDates: function(){
                if(this.form.hourSelect != null){
                    if(this.form.hourSelect == 0 && (this.form.fromMorning == null || this.form.untilMorning == null)){
                        return false;
                    }else if(this.form.hourSelect == 1 && (this.form.fromAfternoon == null || this.form.untilAfternoon == null)){
                        return false;
                    }else if(this.form.hourSelect == 2 && (this.form.fromAfternoon == null || this.form.untilAfternoon == null || this.form.fromMorning == null || this.form.untilMorning == null)){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    return false;
                }
            }
        }
    }
</script>