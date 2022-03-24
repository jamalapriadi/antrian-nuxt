<template>
    <div>
        <div slot="pageheader">
            <!-- Page title -->
            <div class="page-header d-print-none">
                <div class="row align-items-center">
                    <div class="col">
                        <h2 class="page-title">
                            {{title}}
                        </h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="steps">
            <a href="#" v-bind:class="classStep(0)" data-bs-toggle="tooltip" title="Step 1 Setup User">
                Setup User
            </a>
            <a href="#" v-bind:class="classStep(1)" data-bs-toggle="tooltip" title="Step 2 Setup Profile">
                Setup Profile
            </a>
            <span href="#" v-bind:class="classStep(2)" data-bs-toggle="tooltip" title="Step 3 Review">
                Review
            </span>
        </div>

        <b-form @submit.prevent="onSubmit" @reset="onReset">
            <div class="card">
                <div class="card-body" v-if="active_tab == 0">
                    <div class="mb-3">
                        <label for="" class="form-label">Name</label>
                        <input type="text" class="form-control" v-model="state.nama">
                    </div>

                    <div class="mb-3">
                        <label for="" class="form-label">Email</label>
                        <div class="input-group mb-2">
                            <span class="input-group-text">
                                @
                            </span>
                            <input class="form-control" placeholder="Email" v-model="state.email"/>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="form-label">Password</label>
                        <input type="password" class="form-control" placeholder="Password" v-model="state.password"/>
                    </div>

                    <div class="mb-3">
                        <label for="" class="form-label">Password Confirmation</label>
                        <input type="password" class="form-control" placeholder="Password Confirmation" v-model="state.password_confirm"/>
                    </div>

                    <div class="mb-3">
                        <label for="" class="form-label">Foto</label>
                        <input class="form-control" type="file" id="upload_photo" ref="file" accept="image/*" title="Ganti Foto" v-on:change="onFileChange"/>

                        <div class="uploadphoto">
                            <img v-if="state.image_url != ''" :src="state.image_url" alt="">
                            <div v-else class="preview" style="margin-top:10px">
                                <img v-if="show_preview == true" :src="state.file" alt="photo" class="img-fluid" style="width:120px"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-body" v-if="active_tab == 1">
                    <div class="mb-3">
                        <label for="" class="form-label">Alamat</label>
                        <input type="text" class="form-control" v-model="state.alamat">
                    </div>

                    <div class="mb-3">
                        <label for="" class="form-label">Phone</label>
                        <input type="text" class="form-control" v-model="state.phone">
                    </div>

                    <div class="mb-3">
                        <label for="" class="form-label">Tgl Lahir</label>
                        <input type="date" class="form-control" v-model="state.tgl_lahir">
                    </div>

                    <div class="mb-3">
                        <label for="" class="form-label">Tgl. Registrasi</label>
                        <input type="date" class="form-control" v-model="state.tgl_registrasi">
                    </div>

                    <div class="mb-3">
                        <label for="" class="form-label">Valid Thru</label>
                        <input type="date" class="form-control" v-model="state.valid_thru">
                    </div>
                </div>

                <div class="card-body" v-if="active_tab == 2">
                    <div class="card-title">User Review</div>
                    <div class="mb-2">
                        Nama: <strong>{{state.nama}}</strong>
                    </div>
                    <div class="mb-2">
                        Email: <strong>{{state.email}}</strong>
                    </div>
                    <div class="mb-2">
                        Alamat: <strong>{{state.alamat}}</strong>
                    </div>
                    <div class="mb-2">
                        Phone: <strong>{{state.phone}}</strong>
                    </div>
                    <div class="mb-2">
                        Tgl. Lahir: <strong>{{state.tgl_lahir}}</strong>
                    </div>
                    <div class="mb-2">
                        Tgl. Registrasi: <strong>{{state.tgl_registrasi}}</strong>
                    </div>
                    <div class="mb-2">
                        Valid Thru: <strong>{{state.valid_thru}}</strong>
                    </div>
                    <div class="mb2">
                        <div class="uploadphoto">
                            <img v-if="state.image_url != ''" :src="state.image_url" alt="">
                            <div v-else class="preview" style="margin-top:10px">
                                <img v-if="show_preview == true" :src="state.file" alt="photo" class="img-fluid" style="width:120px"/>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card-footer text-end">
                    <div class="d-flex">
                        <nuxt-link :to="backBtn" class="btn btn-link">Cancel</nuxt-link>
                        <a href="#" v-if="active_tab > 0" @click.prevent="kembali" class="btn btn-warning">Back</a>
                        <a href="#" @click.prevent="selanjutnya" class="btn btn-primary ms-auto">{{btnText}}</a>
                    </div>
                </div>
            </div>
        </b-form>
    </div>
</template>

<script>
export default {
    layout:'main',
    data(){
        return{
            title:"Create New Member",
            backBtn:"/member",
            btnText:"Next",
            active_tab:0,
            state:{
                nama:'',
                email:'',
                password:'',
                password_confirm:'',
                file:'',
                file_preview:'',
                image_url:'',
                image:'',
                alamat:'',
                phone:'',
                tgl_lahir:'',
                tgl_registrasi:'',
                valid_thru:'',
                status:''
            },
            show_preview:false
        }
    },
    methods:{
        classStep(t){
            if(t == this.active_tab){
                return 'step-item active'
            }else{
                return 'step-item'
            }
        },

        onSubmit(){

        },

        onReset(){

        },

        selanjutnya(){
            if(this.active_tab == 0){
                this.active_tab++;
                this.btnText = "Next"
            }else if(this.active_tab == 1){
                this.active_tab++;
                this.btnText = "Finish!"
            }else if(this.active_tab == 2){
                
            }
        },

        kembali(){
            this.active_tab--;
        },

        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;

            let ukuran = files[0].size;

            if(ukuran > 1000000){
                this.$swal('Warning', 'Ukuran file image tidak boleh lebih dari 1 MB' , 'warning');
                return;
            }

            if(files[0]['type']==='image/jpeg' || files[0]['type']==='image/png' || files[0]['type']==='image/jpg'){
                this.createImage(files[0]);
            }else{
                this.$swal('Warning', 'Format file tidak diketahui' , 'warning');
                return;
            }
        },
        
        createImage(file) {
            let reader = new FileReader();
            let vm = this;
            reader.onload = (e) => {
                vm.state.file = e.target.result;
                vm.show_preview = true;
            };
            reader.readAsDataURL(file);
        },
    }
}
</script>