<template>
    <div>

        <div class="card" v-if="list.success == false">
            <div class="card-header">Set Receptionist</div>
            <div class="card-body">
                <b-spinner v-if="loading" variant="success" type="grow" label="Spinning"></b-spinner>

                <div v-if="message" class="alert alert-info" role="alert">
                    <div class="text-muted" v-html="message"></div>
                </div>

                <div class="mb-3">
                    <label for="" class="control-label">Pilih Receptionist</label>
                    <select name="receptionist" id="receptionist" class="form-select" v-model="state.receptionist">
                        <option v-for="(l,idx) in operations" :key="idx" :value="l.id">{{l.nama}}</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="" class="control-label">Pilih Pelayanan</label>
                    <!-- <pre>{{state}}</pre> -->
                    <div v-for="(l,idx) in pelayanans" :key="'u'+idx" style="margin-top:10px">
                        <label class="form-check">
                            <b-form-checkbox
                                :id="'checkbox-'+idx"
                                :name="'checkbox-'+idx"
                                :checked="cek[idx]"
                                value="Y"
                                unchecked-value="N"
                                @change="pilih(l.id, $event)"
                            >
                                &nbsp; {{l.nama}}
                            </b-form-checkbox>
                        </label>
                    </div>
                </div>
            </div>
            <div class="card-footer text-end">
                <div class="d-flex">
                    <button type="submit" class="btn btn-primary ms-auto" @click.prevent="setReceptionist">Set Receptionist</button>
                </div>
            </div>
        </div>

        <div class="row" v-if="list.success == true">
            <div class="col-lg-4 col-12" style="margin-bottom:20px">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title" v-if="list.receptionist.receptionis">
                            Receptionist - {{list.receptionist.receptionis.nama}}
                        </h3>
                    </div>
                    <div class="card-body">
                        <dl class="row" v-if="list.receptionist">
                            <dt class="col-5">Tanggal:</dt>
                            <dd class="col-7">{{list.receptionist.tanggal}}</dd>
                            <dt class="col-5">Nama:</dt>
                            <dd class="col-7" v-if="list.receptionist.user">{{list.receptionist.user.name}}</dd>
                            <dt class="col-5">Email:</dt>
                            <dd class="col-7" v-if="list.receptionist.user">{{list.receptionist.user.email}}</dd>
                        </dl>

                        <hr>

                        <div class="text-center">
                            <a href="#" class="btn btn-danger btn-block" @click.prevent="keluarReceptionist">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
                                Keluar
                            </a>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div class="col-lg-8 col-12">
                <div v-if="result">
                    <div v-if="result.success == true" class="card" style="margin-bottom:50px;border:1px solid #fff;">
                        <div class="card-header text-center" style="text-align:center">Antrian Selanjutnya</div>
                        <div class="card-body">
                            <div v-if="loading" class="text-center">
                                <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
                            </div>
                            <h1 class="text-center" v-if="result.current_antrian">
                                <span v-if="result.current_antrian.antrian" style="font-size:80px">{{result.current_antrian.antrian.no_antrian}}</span>
                            </h1>

                            <div class="text-center">
                                <p style="color:#133a1e;font-weight:bold">
                                    Kategori : <span v-if="result.current_antrian.antrian">
                                        <span v-if="result.current_antrian.antrian.type == 2">UMUM</span>
                                        <span v-if="result.current_antrian.antrian.type == 1" style="color:red;font-weight:bold">DIFABEL/PRIORITAS</span>
                                    </span>
                                </p>
                                <p v-if="result.current_antrian.antrian" style="line-height:5px;color:#133a1e;font-weight:bold">
                                    Keperluan : <span v-if="result.current_antrian.antrian.keperluan" style="font-weight:bold;">{{result.current_antrian.antrian.keperluan.nama}}</span>
                                </p>
                            </div>

                            <hr>

                            <div class="text-center" v-if="start_pelayanan == false">
                                <a href="#" v-if="result.ada_audio == 'N'" class="btn btn-warning" @click.prevent="panggilAntrian">
	                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 8a3 3 0 0 1 0 6" /><path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" /><path d="M12 8h0l4.524 -3.77a0.9 .9 0 0 1 1.476 .692v12.156a0.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" /></svg>
                                    Panggil Antrian
                                </a>

                                <a v-if="result.ada_audio == 'Y'" href="#" class="btn btn-warning" @click.prevent="playSound(result.audio)">
	                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 8a3 3 0 0 1 0 6" /><path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" /><path d="M12 8h0l4.524 -3.77a0.9 .9 0 0 1 1.476 .692v12.156a0.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" /></svg>
                                    Panggil Antrian
                                </a>
                                <a href="#" class="btn btn-primary" @click.prevent="mulaiPelayanan(result.current_antrian.id, result.current_antrian.antrian_id)">
	                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 12v-6a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v8" /><path d="M4 18h17" /><path d="M18 15l3 3l-3 3" /></svg>
                                    Mulai Pelayanan
                                </a>

                                <a v-if="result.other_antrian.length > 0" class="btn btn-secondary" href="#" @click.prevent="antrianSelanjutnya(result.current_antrian.id, result.current_antrian.antrian_id)">
                                    Antrian Selanjutnya &nbsp;
	                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 5v14l8 -7z" /><path d="M14 5v14l8 -7z" /></svg>
                                </a>
                            </div>

                            <div v-if="start_pelayanan == true">
                                <div v-if="loading2" class="text-center">
                                    <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
                                </div>

                                <div v-if="message2" :class="messageclass2" role="alert">
                                    <div class="text-muted" v-html="message2"></div>
                                    <ul v-if="errors2.length > 0">
                                        <li v-for="(l,idx) in errors2" :key="'er'+idx">{{l}}</li>
                                    </ul>
                                </div>


                                <div class="mb-3">
                                    <label for="" class="form-label">Nama</label>
                                    <input type="text" class="form-control" placeholder="Nama" v-model="mulai.nama">
                                </div>

                                <div class="mb-3">
                                    <label for="" class="form-label">Phone</label>
                                    <input type="number" class="form-control" placeholder="Phone" v-model="mulai.phone">
                                </div>

                                <div class="mb-3">
                                    <label for="" class="form-label">Alamat</label>
                                    <client-only placeholder="loading...">
                                        <ckeditor-nuxt :config="editorConfig" v-model="mulai.alamat" />
                                    </client-only>
                                </div>

                                <div class="mb-3">
                                    <label for="" class="form-label">Catatan</label>
                                    <client-only placeholder="loading...">
                                        <ckeditor-nuxt :config="editorConfig" v-model="mulai.catatan" />
                                    </client-only>
                                </div>

                                <div class="card-footer text-end">
                                    <div class="d-flex">
                                        <a href="#" class="btn btn-link" @click.prevent="batalMulai">Cancel</a>
                                        <a href="#" @click.prevent="selesai" class="btn btn-primary ms-auto">Selesai</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="progress progress-sm card-progress">
                            <div class="progress-bar" v-bind:style="{width: progress+'%'}" role="progressbar" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100">
                                <span class="visually-hidden">{{progress}}% Complete</span>
                            </div>
                        </div>
                    </div>

                    <div v-if="result.success == false">
                        <div class="alert alert-info">{{result.message}}</div>
                    </div>
                </div>
                <!-- <pre>{{result}}</pre> -->
            </div>
        </div>

        <!-- <form @submit.prevent="panggilAntrian">
            <h1>Speech Example</h1>

            <h1>{{selectedVoice}}</h1>

            <div class="form-group" v-if="voiceList.length">
                <label for="voices">Select a voice</label>
                <select class="form-control" id="voices" v-model="selectedVoice">
                    <option v-for="(voice, index) in voiceList" :key="index" :data-lang="voice.lang" :value="index">
                        {{ voice.name }} ({{ voice.lang }})
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="your-name">Your name</label>
                <input class="form-control" id="your-name" type="text" v-model="name" required>
            </div>

            <div v-if="isLoading" class="text-center">
                <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
            </div>

            <button type="submit" class="btn btn-success">Greet</button>
        </form> -->


    </div>
</template>

<script>
export default {
    components: {
        'ckeditor-nuxt': () => { return import('@blowstack/ckeditor-nuxt') },
    },
    data(){
        return {
            list:{},
            operations:[],
            state:{
                receptionist:'',
                keperluan:[]
            },
            loading:false,
            message:'',
            receptionist_id:"",
            current_antrian:{},
            other_antrian:[],
            result:{},
            mulai:{
                user_receptionist_id:'',
                antrian_id:'',
                nama:'',
                phone:'',
                alamat:'',
                catatan:''
            },
            start_pelayanan:false,
            progress:38,
            loading2:false,
            message2:'',
            messageclass2:'',
            errors2:[],
            editorConfig: {
                simpleUpload: {
                    uploadUrl: process.env.LARAVEL_ENDPOINT+'/api/uploads',
                    headers: {
                        // 'Authorization': 'optional_token'
                        'accept': 'application/json'
                    }
                },
                removePlugins: [
                    'Title',
                    'Code',
                    'Superscript',
                    'Subscript',
                    'PageBreak',
                    'MathType'
                ],
            },
            pelayanans:[],
            cek:[],
            selected:[],
            isLoading: false,
            name: '',
            selectedVoice: 8,
            synth: window.speechSynthesis,
            voiceList: [],
            greetingSpeech: new window.SpeechSynthesisUtterance()
        }
    },
    mounted(){
        this.cekJoinReceptionist()
        this.getAvailableReceptionist()
        this.getKeperluan()

        this.voiceList = this.synth.getVoices()

        if (this.voiceList.length) {
            this.isLoading = false
        }

        this.synth.onvoiceschanged = () => {
            this.voiceList = this.synth.getVoices()
            // give a bit of delay to show loading screen
            // just for the sake of it, I suppose. Not the best reason
            setTimeout(() => {
                this.isLoading = false
            }, 800)
        }

        this.listenForSpeechEvents()
    },
    methods:{
        playSound (sound) {
            if(sound) {
                var audio = new Audio(sound);
                audio.play();
            }
        },

        cekJoinReceptionist(){
            this.message = ""
            this.$axios.get('/api/auth/get-receptionist')
                .then(resp => {
                    this.list = resp.data

                    if(resp.data.receptionist)
                    {
                        this.receptionist_id = resp.data.receptionist.id

                        this.getListAntrian()
                    }
                })
        },
        getListAntrian(){
            this.$axios.get('/api/auth/list-antrian-by-user-receptionist/'+this.receptionist_id)
                .then(resp => {
                    if(resp.data.success == true)
                    {
                        this.result = resp.data
                        this.current_antrian = resp.data.current_antrian
                        this.other_antrian = resp.data.other_antrian

                        if(this.list.success == true)
                        {
                            if(this.list.receptionist){
                                if(this.list.receptionist.receptionis)
                                {
                                    if(resp.data.current_antrian)
                                    {
                                        if(resp.data.current_antrian.antrian)
                                        {
                                            this.name = "Nomor Antrian "+resp.data.current_antrian.antrian.no_antrian+" di "+this.list.receptionist.receptionis.nama
                                        }
                                    }
                                }
                            }
                        }
                    }else{
                        this.result = resp.data
                        this.current_antrian = {}
                        this.other_antrian = []
                    }
                })
        },
        getAvailableReceptionist(){
            this.operations = []
            this.$axios.get('/api/auth/available-receptionist')
                .then(resp => {
                    this.operations = resp.data.data
                })
        },
        getKeperluan(){
            this.pelayanans = []
            this.state.keperluan = []
            this.$axios.get('/api/auth/keperluan-all')
                .then(resp => {
                    this.pelayanans = resp.data.data

                    for(var a=0;a<this.pelayanans.length;a++)
                    {
                        this.cek.push('Y')
                        this.state.keperluan.push({
                            id:this.pelayanans[a].id,
                            pilih:'Y'
                        })
                    }
                })
        },
        setReceptionist(){
            this.loading = true
            this.$axios.post('/api/auth/signin-receptionist', this.state)
                .then(resp => {
                    this.loading = false
                    if(resp.data.success == true)
                    {
                        this.cekJoinReceptionist()
                        this.message = resp.data.message
                    }else{
                        this.message = resp.data.message
                    }
                })
        },
        antrianSelanjutnya(current_id, antrian_id){
            this.loading = true
            this.$axios.post('/api/auth/change-antrian/'+current_id,{antrian_id: antrian_id})
                .then(resp => {
                    this.loading = false
                    if(resp.data.success == true)
                    {
                        this.getListAntrian()   
                    }else{
                        this.message = resp.data.message
                    }
                })
        },

        mulaiPelayanan(current_id, antrian_id){
            this.mulai = {
                user_receptionist_id:current_id,
                antrian_id:antrian_id,
                nama:'',
                phone:'',
                alamat:'',
                catatan:''
            }

            this.start_pelayanan = true
            this.progress = 72
        },

        batalMulai(){
            this.mulai = {
                user_receptionist_id:'',
                antrian_id:'',
                nama:'',
                phone:'',
                alamat:'',
                catatan:''
            }

            this.start_pelayanan = false
            this.progress = 38

            this.message2 = ''
            this.messageclass2 = ''
            this.errors2 = []
        },

        selesai(){
            this.$swal({
                title: 'Warning?',
                text: 'Apakah anda yakin ingin menyelesaikam konsultasi ini?',
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Ya, Selesai',
                confirmButtonColor: '#EC5941',
                showCloseButton: true,
                reverseButtons:true,
                showLoaderOnConfirm: true,
                customClass: {
                    actions:'text-right',
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-white'
                },
                buttonsStyling: false
            })
            .then((result) => {
                if(result.value) {
                    this.loading2 = true
                    this.$axios.post('/api/auth/selesai-pelayanan', this.mulai)
                        .then(resp => {
                            this.loading2 = false
                            if(resp.data.success == true)
                            {
                                this.message2 = resp.data.message
                                this.messageclass2 = 'alert alert-success'
                                this.errors2 = []
                                this.batalMulai()

                                this.cekJoinReceptionist()
                            }else{
                                this.message2 = resp.data.message
                                this.messageclass2 = 'alert alert-danger'
                                this.errors2 = resp.data.error
                            }
                        })
                    
                } else {
                    this.$swal('Cancelled', 'Anda masih dalam konsultasi ini', 'info')
                }
            })
        },

        keluarReceptionist(){
            this.$swal({
                title: 'Warning?',
                text: 'Apakah anda yakin ingin Keluar?',
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Ya, Keluar',
                confirmButtonColor: '#EC5941',
                showCloseButton: true,
                reverseButtons:true,
                showLoaderOnConfirm: true,
                customClass: {
                    actions:'text-right',
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-white'
                },
                buttonsStyling: false
            })
            .then((result) => {
                if(result.value) {
                    this.$axios.post('/api/auth/signout-receptionist', {
                        receptionist: this.receptionist_id
                    }).then(resp => {
                        if(resp.data.success == true)
                        {
                            this.$swal('Success', resp.data.message, 'success')
                            this.getAvailableReceptionist()
                            this.cekJoinReceptionist()
                        }else{
                            this.$swal('Gagal', resp.data.message, 'info')
                        }
                    })
                    
                } else {
                    this.$swal('Cancelled', 'Anda masih dalam konsultasi ini', 'info')
                }
            })
        },

        pilih(id,e){
            if(e == 'Y')
            {
                this.state.keperluan.push({
                    id:id,
                    pilih:'Y'
                })
            }else{
                var baru = []

                for(var a=0; a<this.state.keperluan.length; a++){
                    if(this.state.keperluan[a].id != id){
                        baru.push({
                            id:this.state.keperluan[a].id,
                            pilih:this.state.keperluan[a].pilih
                        })
                    }
                }

                this.state.keperluan = []
                this.state.keperluan = baru
            }
        },

        listenForSpeechEvents () {
            this.greetingSpeech.onstart = () => {
                this.isLoading = true
            }

            this.greetingSpeech.onend = () => {
                this.isLoading = false
            }
        },

        /**
         * Shout at the user
         */
        panggilAntrian () {
            // it should be 'craic', but it doesn't sound right
            this.greetingSpeech.text = `${this.name}`

            this.greetingSpeech.voice = this.voiceList[this.selectedVoice]
            
            this.greetingSpeech.rate = 0.76
            this.synth.speak(this.greetingSpeech)
        }
    }
}
</script>