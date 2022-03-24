<template>
    <div>
        <div class="page-header d-print-none">
            <div class="row align-items-center">
                <div class="col">
                    <h2 class="page-title">
                        Set User Merchant - {{list.nama}}
                    </h2>
                </div>
            </div>
        </div>

        <div class="text-center" v-if="loading">
            <div class="spinner-grow text-green" role="status"></div>
        </div>

        <div v-if="pesan" class="alert alert-info" role="alert">
            <div class="text-muted" v-html="pesan"></div>
        </div>

        <div class="card">
            <div class="table-responsive">
                <table class="table card-table table-vcenter text-nowrap datatable">
                    <thead>
                        <tr>
                            <th class="w-1">No.</th>
                            <th class="w-1">Nama</th>
                            <th class="w-1">Email</th>
                            <th class="w-1">Role</th>
                            <th class="w-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(l,idx) in users" :key="idx">
                            <td>{{(idx+1)}}</td> 
                            <td>{{l.name}}</td>
                            <td>{{l.email}}</td>
                            <td>
                                <span v-for="(k,ix) in l.role" :key="'r'+ix">{{k.name}}</span>
                            </td>
                            <td>
                                <!-- <input class="form-check-input m-0 align-middle" type="checkbox" aria-label="Select all invoices"> -->
                                <b-form-checkbox
                                        :id="'checkbox-'+idx"
                                        :name="'checkbox-'+idx"
                                        :checked="cek[idx]"
                                        value="Y"
                                        unchecked-value="N"
                                        @change="pilih(l.id, $event)"
                                    >
                                        
                                    </b-form-checkbox>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    layout:'main',
    async fetch({store}){
        await store.dispatch('merchant/alluser')
    },
    computed:{
        ...mapState('merchant',{
            backBtn: state=> state.backBtn,
            forms: state=> state.forms,
            errors: state=> state.errors,
            isFinish: state => state.isFinish,
            success: state => state.success,
            message: state => state.message,
            nmodel: state => state.nmodel,
            users: state => state.users
        })
    },
    data(){
        return {
            kode:'',
            title:"Add User To Merchant",
            btnText: "Update",
            perm:[],
            cek:[],
            selected:[],
            list:[],
            loading:false,
            pesan:''
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        ...mapActions('merchant',['update','show','alluser']),

        getData(){
            let app=this;
            let id= app.$route.params.id;
            this.kode = id;

            this.show(id)
            this.$axios.get('/api/auth/merchant/'+id)
                .then(resp => {
                    this.list = resp.data.data 

                    for(var a=0; a<this.users.length; a++){
                        this.cek.push('N')
                        this.perm.push({
                            id:this.users[a].id,
                            cek:'N'
                        })
                    }

                    if(this.list.user.data)
                    {
                        for(var a=0; a<this.list.user.data.length; a++)
                        {
                            this.selected.push({
                                id:this.list.user.data[a].id,
                                pilih:'Y'
                            })
                        }
                    }
                    

                    for(var a=0; a<this.users.length; a++){
                        for(var b=0; b<this.selected.length; b++)
                        {
                            if(this.users[a].id == this.selected[b].id)
                            {
                                this.cek[a] = 'Y'
                            }
                        }
                    }
                })
        },

        handleSubmit(val){
            this.update(val)
        },

        pilih(id,e){
            this.pesan = ''
            if(e == 'Y')
            {
                this.loading = true
                this.$axios.post('/api/auth/assign-user-merchant',{
                    merchant:this.kode,
                    users:id,
                    status:'Y'
                }).then(resp => {
                    this.loading = false
                    this.pesan = resp.data.message
                })
            }else{
                this.loading = true

                this.$axios.post('/api/auth/assign-user-merchant',{
                    merchant:this.kode,
                    users:id,
                    status:'N'
                }).then(resp => {
                    this.loading = false
                    this.pesan = resp.data.message
                })
            }
        },
    }
}
</script>