<template>
    <div>

        <div class="card" v-if="list.success == false">
            <div class="card-header">Set Receptionist</div>
            <div class="card-body">
                <b-spinner v-if="loading" variant="success" type="grow" label="Spinning"></b-spinner>

                <div v-if="message" class="alert alert-info" role="alert">
                    <div class="text-muted" v-html="message"></div>
                </div>

                <div class="form-group">
                    <label for="" class="control-label">Pilih Receptionist</label>
                    <select name="receptionist" id="receptionist" class="form-select" v-model="state.receptionist">
                        <option v-for="(l,idx) in operations" :key="idx" :value="l.id">{{l.nama}}</option>
                    </select>
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
                    </div>
                </div>
            </div>

            <div class="col-lg-8 col-12">
                <div v-if="result">
                    <div v-if="result.success == true" class="card">
                        <div class="card-header text-center" style="text-align:center">Antrian Selanjutnya</div>
                        <div class="card-body">
                            <div v-if="loading" class="text-center">
                                <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
                            </div>
                            <h1 class="text-center" v-if="result.current_antrian">
                                <span v-if="result.current_antrian.antrian" style="font-size:80px">{{result.current_antrian.antrian.no_antrian}}</span>
                            </h1>

                            <div class="text-center">
                                <p>
                                    Kategori : <span v-if="result.current_antrian.antrian">
                                        <span v-if="result.current_antrian.antrian.type == 2">UMUM</span>
                                        <span v-if="result.current_antrian.antrian.type == 1" style="color:red;font-weight:bold">DIFABEL/PRIORITAS</span>
                                    </span>
                                </p>
                                <p v-if="result.current_antrian.antrian" style="line-height:5px">
                                    Keperluan : <span v-if="result.current_antrian.antrian.keperluan" style="font-weight:bold;">{{result.current_antrian.antrian.keperluan.nama}}</span>
                                </p>
                            </div>

                            <hr>

                            <div class="text-center" v-if="start_pelayanan == false">
                                <!-- <a href="#" class="btn btn-warning">
	                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 8a3 3 0 0 1 0 6" /><path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" /><path d="M12 8h0l4.524 -3.77a0.9 .9 0 0 1 1.476 .692v12.156a0.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" /></svg>
                                    Panggil Antrian
                                </a> -->
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
                                    <textarea name="alamat" id="alamat" cols="30" rows="3" class="form-control" placeholder="Alamat" v-model="mulai.alamat"></textarea>
                                </div>

                                <div class="mb-3">
                                    <label for="" class="form-label">Catatan</label>
                                    <textarea name="catatan" id="catatan" cols="30" rows="5" class="form-control" placeholder="Catatan" v-model="mulai.catatan"></textarea>
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
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:{},
            operations:[],
            state:{
                receptionist:''
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
            errors2:[]
        }
    },
    mounted(){
        this.cekJoinReceptionist()
        this.getAvailableReceptionist()
    },
    methods:{
        cekJoinReceptionist(){
            this.$axios.get('/api/auth/get-receptionist')
                .then(resp => {
                    this.list = resp.data

                    this.receptionist_id = resp.data.receptionist.id

                    this.getListAntrian()
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
                    }else{
                        this.result = resp.data
                        this.current_antrian = {}
                        this.other_antrian = []
                    }
                })
        },
        getAvailableReceptionist(){
            this.$axios.get('/api/auth/available-receptionist')
                .then(resp => {
                    this.operations = resp.data.data
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
        }
    }
}
</script>