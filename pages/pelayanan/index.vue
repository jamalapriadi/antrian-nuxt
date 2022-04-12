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
            @pagination="handlePagination" >

            <!-- <div slot="btnTambahan">
                <download-excel
                    class="btn btn-default"
                    :data="json_data"
                    :fields="lists"
                    :before-generate="startDownload"
                    :before-finish="finishDownload"
                    worksheet="My Worksheet"
                    name="pelayanan.xls"
                    >
	                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4" /><line x1="12" y1="13" x2="12" y2="22" /><polyline points="9 19 12 22 15 19" /></svg>
                    Download Excel
                </download-excel>
            </div> -->

        </nuxt-card-datatable>
        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import nuxtCardDatatable from '~/components/nuxt-card-datatable.vue'

export default {
    components: { nuxtCardDatatable },
    layout:'main',
    async fetch({store}){
        await store.dispatch('pelayanan/get_data')
    },
    computed:{
        ...mapState('pelayanan',{
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
            title:'Pelayanan',
            json_data:[],
            json_fields:{
                Tanggal: 'tanggal',
                Antrian: 'antrian.no_antrian',
                Kategori: 'kategori',
                Keperluan: 'antrian.keperluan.nama',
                Nama: 'nama',
                Phone: 'phone',
                Alamat: 'alamat',
                Catatan: 'catatan'
            }
        }
    },
    methods:{
        ...mapActions('pelayanan',['change_page','change_per_page','change_search_key','goToEdit','openDeleteModal']),

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

        startDownload() {
            alert('show loading')
        },
        finishDownload() {
            alert('hide loading')
        },
    }
}
</script>