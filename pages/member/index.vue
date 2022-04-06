<template>
    <div>
        <message :finish="isFinish" :success="success" :message="message" />

        <nuxt-card-datatable 
            :title="title" 
            :fields="fields" 
            :addLink="addLink" 
            :btnImport="btnImport"
            :btnAction="btnAction" 
            :meta="meta" 
            :lists="lists"
            :hasilcari="hsearch"
            :editUrl="edit_data_form"
            @search="handleSearch"
            @edit="handleEdit"
            @delete="handleDelete"
            @changePerPage="handlechangePerPage"
            @pagination="handlePagination"
            @showFormImport="handleFormInput"
            @openQr="handleOpenQr"
            @changeStatusMember="handleChangeStatusUser" />

        <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="Import Data User"
            no-close-on-backdrop
            hide-header-close
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleSubmitImport"
            >

            <div v-if="pesan" :class="pesanclass">
                {{pesan}}
            </div>

            <form ref="form" id="form" @submit.stop.prevent="handleSubmitImport" enctype="multipart/form-data">
                <b-spinner v-if="loading2" variant="success" type="grow" label="Spinning"></b-spinner>

                <div class="form-group">
                    <label for="" class="control-label">Import File</label>
                    <input type="file" name="file" class="form-control">
                </div>

                <div class="alert alert-info" role="alert" style="margin-top:10px">
                    <p>
                        <small>
                            Anda dapat men-downlaod 'Format DB Member' 
                            untuk memastikan data yang akan anda upload sudah sesuai dengan format yang ditentukan
                        </small> 
                        <a href='#' @click.prevent="downloadImportMember">
                            <span class='badge bg-info' style='cursor: pointer;'>
                                Klik untuk Download Format DB Member
                            </span>
                        </a>
                    </p>
                </div>
            </form>
        </b-modal>

        <b-modal id="modal-my-qrcode" hide-footer hide-header-close>
            <template #modal-title>
                {{namaqr}} QRCode
            </template>

            <center>
                <vue-qr :size="400" id="qrcode" :text="logoBarcode" qid="testid"></vue-qr>
            </center>

            <div class="text-center" style="margin-top:10px;">
                <a href="#" class="btn btn-block btn-primary" @click.prevent="downloadQr">Download</a>
            </div>
        </b-modal>
        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import nuxtCardDatatable from '~/components/nuxt-card-datatable.vue'

export default {
    components: { nuxtCardDatatable },
    layout:'main',
    async fetch({store}){
        await store.dispatch('member/get_data')
    },
    computed:{
        ...mapState('member',{
            fields: state=> state.fields,
            per_page: state=> state.per_page,
            lists: state => state.lists,
            meta: state => state.meta,
            isFinish: state => state.isFinish,
            addLink: state => state.addLink,
            btnImport: state => state.btnImport,
            btnAction: state => state.btnAction,
            success: state => state.success,
            message: state => state.message,
            hsearch: state => state.search,
            edit_data_form: state => state.edit_data_form
        })
    },
    data(){
        return{
            title:'Member',
            loading2:false,
            pesan:'',
            pesanclass:'',
            mylinkuser:'',
            logoBarcode:'',
            namaqr:''
        }
    },
    methods:{
        ...mapActions('member',['get_data','change_page','change_per_page','change_search_key','goToEdit','openDeleteModal']),

        handleEdit(val){
            // this.goToEdit(val)
            this.$router.push({ path: this.edit_data_form+'/'+val.item.id+"/edit" })
        },

        handleDelete(val){
            this.$swal({
                title: 'Warning?',
                text: 'Apakah anda yakin ingin menghapus data ini? Setelah menghapus, Anda tidak dapat mengembalikan lagi.',
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Ya, Hapus',
                confirmButtonColor: '#EC5941',
                showCloseButton: true,
                reverseButtons:true,
                showLoaderOnConfirm: true,
                customClass: {
                    actions:'text-right',
                    confirmButton: 'btn btn-danger',
                    cancelButton: 'btn btn-white'
                },
                buttonsStyling: false
            })
            .then((result) => {
                if(result.value) {
                    this.openDeleteModal(val)
                    
                } else {
                    this.$swal('Cancelled', 'Data anda masih tersimpan', 'info')
                }
            })
        },

        handleSearch(val){
            this.change_search_key(val)
        },

        handlePagination(val){
            this.change_page(val)
        },

        handlechangePerPage(val){
            this.change_per_page(val)
        },

        handleChangeStatusUser(){
            this.get_data()
        },

        handleFormInput(){
            this.pesan = ""
            this.pesanclass=""
            this.$bvModal.show('modal-prevent-closing')
        },

        resetModal(){

        },

        resetModal(){

        },

        handleSubmitImport(e){
            e.preventDefault();
            var form = document.getElementById('form');
            this.loading2 = true
            let formData = new FormData(form);
            
            this.$axios.post('/api/auth/import-member', formData).then(response => {
                this.loading2=false;
                if(response.data.success==true){
                    this.pesan = response.data.message
                    this.pesanclass = 'alert alert-success'
                }else{
                    this.pesan = response.data.message
                    this.pesanclass = 'alert alert-danger'
                }
            }).catch(error => {
                // if (error.response.status = 422) {
                //     this.errors = error.response.data;
                //     console.log(this.errors);
                // }

                // if (error.response.status = 500) {
                //     this.loading2 = false
                //     this.pesan = response.data.message
                //     this.pesanclass = 'alert alert-danger'
                // }
            });
        },

        downloadImportMember(){
            window.open(process.env.LARAVEL_ENDPOINT+"/api/export-member", "_blank");    
        },

        handleOpenQr(val){
            this.namaqr = val.item.nama
            this.logoBarcode = val.item.id
            this.$bvModal.show('modal-my-qrcode')
        },

        downloadQr(){
            var oQrcode = document.querySelector('#qrcode')
            var url = oQrcode.src
            var a = document.createElement('a')
            var event = new MouseEvent('click')

            //Download image name
            a.download = this.namaqr+' QRCode'

            //url 
            a.href = url 

            //Synthesis function, execute download 
            a.dispatchEvent(event)
        }
    }
}
</script>