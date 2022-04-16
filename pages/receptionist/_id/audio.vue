<template>
    <div>
        <!-- Page title -->
        <div class="page-header d-print-none">
            <div class="row align-items-center">
                <div class="col">
                    <!-- Page pre-title -->
                    <div class="page-pretitle">
                        Page
                    </div>
                    <h2 class="page-title">
                        {{title}}
                    </h2>
                </div>
                <!-- Page title actions -->
                <div class="col-auto ms-auto d-print-none">
                    <div class="btn-list">
                        <a class="btn btn-primary d-none d-sm-inline-block" @click.prevent="tambah">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                            New {{title}}
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="card" style="margin-top:20px" v-if="showTambah == true">
            <div class="card-header">Add Audio</div>
            <form @submit.prevent="store" action="/api/auth/receptionist-audio" method="post" enctype="multipart/form-data">
                <div class="card-body">
                    <div v-if="loading" class="text-center">
                        <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
                    </div>

                    <div v-if="message" :class="pesankelas" role="alert">
                        <div class="text-muted" v-html="message"></div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="control-label">No. Antrian</label>
                        <input type="text" class="form-control" v-model="state.antrian">
                    </div>
                    <div class="mb-3">
                        <label for="" class="control-label">File Audio</label>
                        <input type="file" id="audio" ref="audio" class="form-control" v-on:change="handleFileUpload">
                    </div>
                </div>
                <div class="card-footer text-end">
                    <div class="d-flex">
                        <a href="#" @click.prevent="batal" class="btn btn-link">Cancel</a>
                        <button type="submit" class="btn btn-primary ms-auto">Save</button>
                    </div>
                </div>
            </form>
        </div>

        <div style="margin-top:15px" class="card mt-20" v-if="showTambah == false">
            <div class="card-body border-bottom py-3">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th style="width:5%">No.</th>
                                <th>No. Antrian</th>
                                <th>Audio</th>
                                <th style="width:15%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(l,idx) in audios" :key="idx">
                                <td>{{(idx+1)}}</td>
                                <td>{{l.no_antrian}}</td>
                                <td>
                                    <a v-if="l.audio" href="#" class="btn btn-primary" @click.prevent="playSound(l.audio_url)">
	                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 8a3 3 0 0 1 0 6" /><path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" /><path d="M12 8h0l4.524 -3.77a0.9 .9 0 0 1 1.476 .692v12.156a0.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" /></svg>
                                        Play Sounds
                                    </a>
                                </td>
                                <td>
                                    <div class="btn-list flex-nowrap">
                                        <!-- <a class="btn btn-warning" href="#" @click.prevent="goToEdit(l)">
                                            Edit
                                        </a> -->

                                        <a class="btn btn-danger" href="#" @click="openDeleteModal(l.id)">
                                            Delete
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- <pre>{{state}}</pre> -->
    </div>
</template>

<script>
export default {
    layout:'main',
    data(){
        return {
            audios:[],
            title:"Audio",
            showTambah:false,
            backBtn:'/receptionist',
            state:{
                kode:'',
                receptionist:'',
                antrian:'',
                file:''
            },
            loading:false,
            message:'',
            pesankelas:'',
        }
    },
    mounted(){
        this.getAudio()
    },
    methods:{
        playSound (sound) {
            if(sound) {
                var audio = new Audio(sound);
                audio.play();
            }
        },
        getAudio(){
            let app=this;
            let id= app.$route.params.id;
            this.state.receptionist = id;

            this.$axios.get('/api/auth/audio-by-receptionist/'+this.state.receptionist)
                .then(resp => {
                    this.audios = resp.data.data
                })
        },

        tambah(){
            this.message = ''
            this.pesankelas = ''
            this.showTambah = true

            this.resetForm()
        },

        batal(){
            this.showTambah = false

            this.resetForm()
        },

        handleFileUpload(e){
            let files = e.target.files || e.dataTransfer.files;

            if (!files.length)
                return;

            let ukuran = files[0].size;

            if(ukuran > 20000000){
                this.$swal('Warning', 'Ukuran File tidak boleh lebih dari 20 MB' , 'warning');
                return;
            }
            
            this.state.file = e.target.files[0];
        },

        resetForm(){
            let app=this;
            let id= app.$route.params.id;
            this.state.receptionist = id;

            this.state={
                kode:'',
                receptionist:id,
                antrian:'',
                file:''
            }
        },

        store(e) {
            this.loading=true;

            let formData = new FormData();
            formData.append('kode',this.state.kode);
            formData.append('receptionist', this.state.receptionist);
            formData.append('antrian', this.state.antrian);
            formData.append('audio', this.state.file);

            console.log('kirim')
            this.$axios.post('/api/auth/receptionist-audio', formData).then(response => {
                this.loading=false;
                if(response.data.success==true){
                    // this.resetForm()
                    
                    this.showTambah=false
                    this.message = response.data.message;
                    this.pesankelas='alert alert-success';

                    this.getAudio()
                }else{
                    this.pesankelas='alert alert-danger';
                    this.message = response.data.errors;
                }
            });
        },

        goToEdit(l){
            this.showTambah = true
            this.state={
                kode:l.id,
                receptionist:l.receptionist_id,
                antrian:l.no_antrian,
                file:''
            }
        },

        openDeleteModal(id)
        {
            this.$swal({
                title: 'Hapus?',
                text: 'Apakah anda yakin ingin Menghapus data ini?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Hapus!',
                cancelButtonText: 'Tidak',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if(result.value) {
                    this.$axios.delete('/api/auth/receptionist-audio/'+id)
                        .then(response => {
                            if(response.data.success==true){
                                this.$swal('Sukses', response.data.message , 'success');
                            }else{
                                this.$swal('Gagal', response.data.message , 'error');
                            }

                            this.getAudio()
                        })
                } else {
                    this.$swal('Cancelled', 'Data gagal dihapus', 'info')
                }
            })
        }
    }
}
</script>