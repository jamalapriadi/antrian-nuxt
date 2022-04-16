<template>
    <div>
        <div slot="pageheader">
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
                    <div class="col-auto ms-auto d-print-none" v-if="btnAction">
                        <div class="btn-list">
                            <nuxt-link v-if="addLink" :to="addLink"  class="btn btn-primary d-none d-sm-inline-block">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                New {{title}}
                            </nuxt-link>

                            <a v-if="btnImport" href="#" class="btn btn-success" @click.prevent="showFormImport">
	                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v8m5.009 .783c.924 .14 1.933 .217 2.991 .217c4.418 0 8 -1.343 8 -3v-6" /><path d="M11.252 20.987c.246 .009 .496 .013 .748 .013c4.418 0 8 -1.343 8 -3v-6m-18 7h7m-3 -3l3 3l-3 3" /></svg>
                                Import {{title}}
                            </a>

                            <slot name="btnTambahan"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div style="margin-top:15px" class="card mt-20" v-if="lists.data.length > 0">
            <div class="card-body border-bottom py-3">
                <div class="d-flex">
                    <div class="text-muted">
                        Show
                        <div class="mx-2 d-inline-block">
                            <select class="form-select" @change="change_per_page($event)">
                                <option value="10">10</option>
                                <option v-if="meta.total > 10" value="25">25</option>
                                <option v-if="meta.total > 25" value="50">50</option>
                                <option v-if="meta.total > 50" value="100">100</option>
                            </select>
                        </div>
                        entries
                    </div>
                    <div class="ms-auto text-muted">
                        Search:
                        <div class="ms-2 d-inline-block">
                            <div class="input-icon mb-3">
                                <input type="search" v-model="cari" class="form-control" placeholder="Search…" @input="search($event)">
                                <span class="input-icon-addon">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="10" cy="10" r="7"></circle><line x1="21" y1="21" x2="15" y2="15"></line></svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="isFinish == 1" class="text-center">
                <h1>Loading<span class="animated-dots"></span></h1>
            </div>

            <div class="table-responsive">
                <b-table :items="lists.data" :fields="fields" show-empty>
                    <template v-slot:cell(No)="data">
                        {{ data.index + 1 }}
                    </template>

                    <template v-if="btnAction == true" v-slot:cell(namauser)="row">
                        <div class="d-flex py-1 align-items-center">
                            <span class="avatar me-2" v-bind:style="{
                                backgroundImage: 'url(' + row.item.profile_picture_url + ')',
                                }"></span>
                            <div class="flex-fill">
                                <div class="font-weight-medium">{{row.item.name}}</div>
                                <div class="text-muted"><a href="#" class="text-reset">{{row.item.email}}</a></div>
                            </div>
                        </div>
                    </template>

                    <template v-if="btnAction == true" v-slot:cell(syaratrow)="row">
                        <read-more v-if="row.item.syarat != null" more-str="read more" :text="row.item.syarat" link="#" less-str="read less" :max-chars="60"></read-more>
                    </template>

                    <template v-if="btnAction == true" v-slot:cell(imagebooklet)="row">
                        <div class="d-flex py-1 align-items-center">
                              <span class="avatar me-2" v-bind:style="{
                                    backgroundImage: 'url('+row.item.image_url+')'
                                  }"></span>
                        </div>
                    </template>

                    <template v-if="btnAction == true" v-slot:cell(roleuser)="row">
                        <div v-for="(l,idx) in row.item.role" :key="idx" class="text-muted" style="margin-right:10px;margin-bottom:10px">{{l.name}}</div>
                    </template>

                    <template v-slot:cell(alamatpelayanan)="row">
                        <read-more more-str="read more" :text="row.item.alamat" link="#" less-str="read less" :max-chars="60"></read-more>
                    </template>

                    <template v-slot:cell(catatanpelayanan)="row">
                        <read-more more-str="read more" :text="row.item.catatan" link="#" less-str="read less" :max-chars="60"></read-more>
                    </template>

                    <template v-if="btnAction == true" v-slot:cell(activeuser)="row">
                        <span v-show="row.item.active == 'Y' && row.item.email !='jamal.apriadi@gmail.com'" style="padding-top:15px">
                            <toggle-button :value="true"
                                :sync="true"
                                name="phone"
                                :labels="{checked: 'Ya', unchecked: 'No'}"
                                :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
                                @change="nonAktifUser(row.item.id)"/>
                        </span>

                        <span v-show="row.item.active == 'N' && row.item.email !='jamal.apriadi@gmail.com'" style="padding-top:15px">
                            <toggle-button :value="false"
                                name="phone"
                                :sync="false"
                                :labels="{checked: 'Ya', unchecked: 'No'}"
                                :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
                                @change="aktifUser(row.item.id)"/>
                        </span>
                    </template>

                    <template v-if="btnAction == true" v-slot:cell(activemember)="row">
                        <span v-show="row.item.active == 'Y'" style="padding-top:15px">
                            <toggle-button :value="true"
                                :sync="true"
                                name="phone"
                                :labels="{checked: 'Ya', unchecked: 'No'}"
                                :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
                                @change="nonAktifMember(row.item.id)"/>
                        </span>

                        <span v-show="row.item.active == 'N'" style="padding-top:15px">
                            <toggle-button :value="false"
                                name="phone"
                                :sync="false"
                                :labels="{checked: 'Ya', unchecked: 'No'}"
                                :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
                                @change="aktifMember(row.item.id)"/>
                        </span>
                    </template>

                    <template v-if="btnAction == true" v-slot:cell(actions)="row">
                        <div class="btn-list flex-nowrap">
                            <div class="dropdown">
                                <button class="btn dropdown-toggle align-text-top" data-bs-toggle="dropdown" aria-expanded="false">
                                    Actions
                                </button>
                                <div class="dropdown-menu dropdown-menu-end" style="">
                                    <a class="dropdown-item" href="#" @click.prevent="goToEdit(row)">
                                        Edit
                                    </a>

                                    <a class="dropdown-item" href="#" @click="openDeleteModal(row)">
                                        Delete
                                    </a>
                                </div>
                            </div>
                        </div>
                    </template>
                    
                    <template v-if="btnAction == true" v-slot:cell(actionrole)="row">
                        <div class="btn-list flex-nowrap">
                            <a href="#" class="btn btn-info" @click.prevent="goToSetPermission(row)">
                                Set Permissions
                            </a>
                            <div class="dropdown">
                                <button class="btn dropdown-toggle align-text-top" data-bs-toggle="dropdown" aria-expanded="false">
                                    Actions
                                </button>
                                <div class="dropdown-menu dropdown-menu-end" style="">
                                    <a class="dropdown-item" href="#" @click.prevent="goToEdit(row)">
                                        Edit
                                    </a>

                                    <a class="dropdown-item" href="#" @click="openDeleteModal(row)">
                                        Delete
                                    </a>
                                </div>
                            </div>
                        </div>
                    </template>

                    <template v-if="btnAction == true" v-slot:cell(actionuser)="row">
                        <div class="btn-list flex-nowrap">
                            <a href="#" class="btn btn-info" @click.prevent="goToSetRole(row)">
                                Set Role
                            </a>
                            <div class="dropdown" v-if="row.item.email !='jamal.apriadi@gmail.com'">
                                <button class="btn dropdown-toggle align-text-top" data-bs-toggle="dropdown" aria-expanded="false">
                                    Actions
                                </button>
                                <div class="dropdown-menu dropdown-menu-end" style="">
                                    <!-- <a class="dropdown-item" href="#" @click.prevent="goToEdit(row)">
                                        Edit
                                    </a> -->

                                    <a class="dropdown-item" href="#" @click="openDeleteModal(row)">
                                        Delete
                                    </a>
                                </div>
                            </div>
                        </div>
                    </template>

                    <template v-if="btnAction == true" v-slot:cell(qrmember)="row">
                        <div class="btn-list flex-nowrap">
                            <a href="#" class="btn btn-success" @click.prevent="showQrcode(row)">
	                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="6" height="6" rx="1" /><line x1="7" y1="17" x2="7" y2="17.01" /><rect x="14" y="4" width="6" height="6" rx="1" /><line x1="7" y1="7" x2="7" y2="7.01" /><rect x="4" y="14" width="6" height="6" rx="1" /><line x1="17" y1="7" x2="17" y2="7.01" /><line x1="14" y1="14" x2="17" y2="14" /><line x1="20" y1="14" x2="20" y2="14.01" /><line x1="14" y1="14" x2="14" y2="17" /><line x1="14" y1="20" x2="17" y2="20" /><line x1="17" y1="17" x2="20" y2="17" /><line x1="20" y1="17" x2="20" y2="20" /></svg>
                                QRCode
                            </a>
                        </div>
                    </template>

                    <template v-slot:cell(audio)="row">
                        <div class="btn-list flex-nowrap">
                            <a href="#" class="btn btn-info" @click.prevent="setAudio(row)">
	                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 8a3 3 0 0 1 0 6" /><path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" /><path d="M12 8h0l4.524 -3.77a0.9 .9 0 0 1 1.476 .692v12.156a0.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" /></svg>
                                {{row.item.audio.length}} Audio
                            </a>
                        </div>
                    </template>

                    <template v-slot:cell(tampillayar)="row">
                        <div class="btn-list flex-nowrap">
                            <a href="#" class="btn btn-success" @click.prevent="goToLayar(row)">
	                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 12v3a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1h9" /><line x1="7" y1="20" x2="17" y2="20" /><line x1="9" y1="16" x2="9" y2="20" /><line x1="15" y1="16" x2="15" y2="20" /><path d="M17 4h4v4" /><path d="M16 9l5 -5" /></svg>
                                Tampilkan Layar
                            </a>
                        </div>
                    </template>

                    <template v-if="btnAction == true" v-slot:cell(actionsmerchant)="row">
                        <div class="btn-list flex-nowrap">
                            <a href="#" class="btn btn-success" @click.prevent="showQrcode(row)">
	                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="6" height="6" rx="1" /><line x1="7" y1="17" x2="7" y2="17.01" /><rect x="14" y="4" width="6" height="6" rx="1" /><line x1="7" y1="7" x2="7" y2="7.01" /><rect x="4" y="14" width="6" height="6" rx="1" /><line x1="17" y1="7" x2="17" y2="7.01" /><line x1="14" y1="14" x2="17" y2="14" /><line x1="20" y1="14" x2="20" y2="14.01" /><line x1="14" y1="14" x2="14" y2="17" /><line x1="14" y1="20" x2="17" y2="20" /><line x1="17" y1="17" x2="20" y2="17" /><line x1="20" y1="17" x2="20" y2="20" /></svg>
                                QRCode
                            </a>
                            <a href="#" class="btn btn-info" @click.prevent="goToSetUser(row)">
	                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 11l2 2l4 -4" /></svg>
                                Set User
                            </a>
                            <div class="dropdown" v-if="row.item.email !='jamal.apriadi@gmail.com'">
                                <button class="btn dropdown-toggle align-text-top" data-bs-toggle="dropdown" aria-expanded="false">
                                    Actions
                                </button>
                                <div class="dropdown-menu dropdown-menu-end" style="">
                                    <a class="dropdown-item" href="#" @click.prevent="goToEdit(row)">
                                        Edit
                                    </a>

                                    <a class="dropdown-item" href="#" @click="openDeleteModal(row)">
                                        Delete
                                    </a>
                                </div>
                            </div>
                        </div>
                    </template>
                </b-table>
            </div>

            <div class="card-footer d-flex align-items-center" v-if="meta.total > meta.per_page">
                <p class="m-0 text-muted">
                    Showing 
                    <span> {{meta.per_page}} from {{meta.total}}</span>
                    entries
                </p>
                <b-pagination
                    v-model="meta.current_page"
                    :total-rows="meta.total"
                    :per-page="meta.per_page"
                    :first-text="'Prev'"
                    :last-text="'Next'"
                    first-number
                    last-number
                    align="right"
                    @change="change_page"
                    class="pagination m-0 ms-auto"
                    aria-controls="dw-datatables">

                        <template #prev-text>Prev</template>
                        <template #next-text>Next</template>
                </b-pagination>
            </div>
        </div>

        <div style="margin-top:15px" class="empty card" v-else>
            <div class="empty-img">
                <img src="~/assets//static/illustrations/undraw_printing_invoices_5r4r.svg" height="128" alt="">
            </div>
            <p class="empty-title">No results found</p>
            <p class="empty-subtitle text-muted">
                Try adjusting your search or filter to find what you're looking for.
            </p>
            <div class="empty-action" v-if="btnAction">
                <nuxt-link :to="addLink"  class="btn btn-primary d-none d-sm-inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    Add your first {{title}}
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            required:true
        },
        btnAction:{
            type: Boolean
        },
        addLink:{
            type:String
        },
        fields:{
            type:Array,
            required:true
        },
        saveUrl:{
            type:String
        },
        lists:{
            type:Object
        },
        meta:{
            type:Object
        },
        isFinish:{
            type: String
        },
        kode:{
            type:String,
            // required:true,
            default:''
        },
        hasilcari:{
            type:String
        },
        editUrl:{
            type:String
        },
        btnImport:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            cari: this.hasilcari,
            timer: undefined,
            current_title:'',
            current_image:''
        }
    },
    methods:{
        bukaImage(title,image){
            this.current_title = title
            this.current_image = image
            this.$bvModal.show('bv-modal-image')
        },

        goToEdit(val){
            // this.$emit('edit', val)
            this.$router.push({ path: this.editUrl+'/'+val.item.id+"/edit" })
        },

        goToSetUser(val){
            this.$router.push({ path: this.editUrl+'/'+val.item.id+"/user" })
        },

        showQrcode(val){
            this.$emit('openQr', val)
        },

        showFormImport(){
            this.$emit('showFormImport')
        },

        goToSetPermission(val){
            this.$router.push({ path: this.editUrl+'/'+val.item.id+"/permission" })
        },

        goToSetRole(val){
            this.$router.push({ path: this.editUrl+'/'+val.item.id+"/role" })
        },

        goToLayar(val){
            window.open('/layar/'+val.item.id, "_blank"); 
        },

        setAudio(val){
            this.$router.push({ path: 'receptionist/'+val.item.id+"/audio" })
        },

        openDeleteModal(val){
            this.$emit('delete', val)
        },

        search(e){
            clearTimeout(this.timer)

            this.timer = setTimeout(() => {
                this.$emit('search', e.target.value)
            }, 500)
        },

        change_page(val){
            this.$emit('pagination', val)
        },

        change_per_page(val){
            this.$emit('changePerPage', val)
        },

        nonAktifUser(id){
            this.$swal({
                title: 'Non Aktif User?',
                text: 'Apakah anda yakin ingin menonaktifkan user ini!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Lanjutkan!',
                cancelButtonText: 'Tidak',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if(result.value) {
                    this.$axios.post('api/auth/status-user/'+id+'?status=N')
                        .then(response => {
                            if(response.data.success==true){
                                this.$swal('Non Aktif', 'Non Aktif user berhasil' , 'success');
                            }else{
                                this.$swal('Non Aktif', 'Non aktif user gagal' , 'error');
                            }

                            this.$emit('changeStatusUser')
                        })
                } else {
                    this.$swal('Cancelled', 'User tidak di non aktifkan', 'info')
                    this.$emit('changeStatusUser')
                }
            })
        },

        aktifUser(id){
            this.$swal({
                title: 'Aktif User?',
                text: 'Apakah anda yakin ingin mengaktifkan user ini!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Lanjutkan!',
                cancelButtonText: 'Tidak',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if(result.value) {
                    this.$axios.post('api/auth/status-user/'+id+'?status=Y')
                        .then(response => {
                            if(response.data.success==true){
                                this.$swal('Aktif', 'Aktif user berhasil' , 'success');
                            }else{
                                this.$swal('Aktif', 'aktif user gagal' , 'error');
                            }

                            this.$emit('changeStatusUser')
                        })
                } else {
                    this.$swal('Cancelled', 'User tidak di aktifkan', 'info')

                    this.$emit('changeStatusUser')
                }
            })
        },

        nonAktifMember(id){
            this.$swal({
                title: 'Non Aktif User?',
                text: 'Apakah anda yakin ingin menonaktifkan member ini!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Lanjutkan!',
                cancelButtonText: 'Tidak',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if(result.value) {
                    this.$axios.post('api/auth/status-member/'+id+'?status=N')
                        .then(response => {
                            if(response.data.success==true){
                                this.$swal('Non Aktif', 'Non Aktif member berhasil' , 'success');
                            }else{
                                this.$swal('Non Aktif', 'Non aktif member gagal' , 'error');
                            }

                            this.$emit('changeStatusMember')
                        })
                } else {
                    this.$swal('Cancelled', 'Member tidak di non aktifkan', 'info')
                    this.$emit('changeStatusUser')
                }
            })
        },

        aktifMember(id){
            this.$swal({
                title: 'Aktif Member?',
                text: 'Apakah anda yakin ingin mengaktifkan member ini!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Lanjutkan!',
                cancelButtonText: 'Tidak',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if(result.value) {
                    this.$axios.post('api/auth/status-member/'+id+'?status=Y')
                        .then(response => {
                            if(response.data.success==true){
                                this.$swal('Aktif', 'Aktif member berhasil' , 'success');
                            }else{
                                this.$swal('Aktif', 'aktif member gagal' , 'error');
                            }

                            this.$emit('changeStatusMember')
                        })
                } else {
                    this.$swal('Cancelled', 'Member tidak di aktifkan', 'info')

                    this.$emit('changeStatusMember')
                }
            })
        },
    }
}
</script>