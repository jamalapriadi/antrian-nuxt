<template>
    <div>
        <message :finish="isFinish" :success="success" :message="message" />

        <nuxt-card-datatable 
            :title="title" 
            :fields="fields" 
            :addLink="addLink" 
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
            @openQr="handleOpenQr" />

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
        await store.dispatch('merchant/get_data')
    },
    computed:{
        ...mapState('merchant',{
            fields: state=> state.fields,
            per_page: state=> state.per_page,
            lists: state => state.lists,
            meta: state => state.meta,
            isFinish: state => state.isFinish,
            addLink: state => state.addLink,
            btnAction: state => state.btnAction,
            success: state => state.success,
            message: state => state.message,
            hsearch: state => state.search,
            edit_data_form: state => state.edit_data_form
        })
    },
    data(){
        return{
            title:'Merchant',
            mylinkuser:'',
            logoBarcode:'',
            namaqr:''
        }
    },
    methods:{
        ...mapActions('merchant',['change_page','change_per_page','change_search_key','goToEdit','openDeleteModal']),

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