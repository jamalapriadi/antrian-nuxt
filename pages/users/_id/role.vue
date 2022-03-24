<template>
    <div>
        <div class="page-header d-print-none">
            <div class="row align-items-center">
                <div class="col">
                    <h2 class="page-title">
                        Set Role User - {{list.name}}
                    </h2>
                </div>
            </div>
        </div>

        <!-- <pre>{{selected}}</pre> -->

        <div class="card">
            <div class="card-header">Pilih Role</div>
            <div class="card-body">
                <div class="row">
                    <div class="col-3" v-for="(l,idx) in roles" :key="idx">
                        <div class="mb-3">
                            <div>
                                <label class="form-check">
                                    <b-form-checkbox
                                        :id="'checkbox-'+idx"
                                        :name="'checkbox-'+idx"
                                        :checked="cek[idx]"
                                        value="Y"
                                        unchecked-value="N"
                                        @change="pilih(l.id, $event)"
                                    >
                                        &nbsp; {{l.name}}
                                    </b-form-checkbox>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer text-end">
                <div class="d-flex">
                    <nuxt-link to="/users" class="btn btn-link">Cancel</nuxt-link>
                    <a href="#" class="btn btn-primary ms-auto" @click.prevent="saveRole">Save</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    layout:'main',
    async fetch({store}){
        await store.dispatch('user/allroles')
    },
    computed:{
        ...mapState('user',{
            backBtn: state=> state.backBtn,
            forms: state=> state.forms,
            errors: state=> state.errors,
            isFinish: state => state.isFinish,
            success: state => state.success,
            message: state => state.message,
            roles: state => state.roles
        })
    },
    data(){
        return {
            kode:'',
            title:"Update Role User",
            btnText: "Update",
            role:[],
            cek:[],
            selected:[],
            list:[]
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        ...mapActions('role',['show','allroles']),

        getData(){
            let app=this;
            let id= app.$route.params.id;
            this.kode = id;

            this.$axios.get('/api/auth/user/'+this.kode)
                .then(resp => {
                    this.list = resp.data.data

                    for(var a=0; a<this.roles.length; a++){
                        this.cek.push('N')
                        this.role.push({
                            id:this.roles[a].id,
                            cek:'N'
                        })
                    }

                    for(var a=0; a<this.list.role.length; a++)
                    {
                        this.selected.push({
                            id:this.list.role[a].id,
                            pilih:'Y'
                        })
                    }

                    for(var a=0; a<this.roles.length; a++){
                        for(var b=0; b<this.selected.length; b++)
                        {
                            if(this.roles[a].id == this.selected[b].id)
                            {
                                this.cek[a] = 'Y'
                            }
                        }
                    }
                })
        },

        pilih(id,e){
            if(e == 'Y')
            {
                this.selected.push({
                    id:id,
                    pilih:'Y'
                })
            }else{
                var baru = []

                for(var a=0; a<this.selected.length; a++){
                    if(this.selected[a].id != id){
                        baru.push({
                            id:this.selected[a].id,
                            pilih:this.selected[a].pilih
                        })
                    }
                }

                this.selected = []
                this.selected = baru
            }
        },

        saveRole(){
            this.$axios.post('/api/auth/set-user-roles/'+this.kode, this.selected)
                .then(resp => {
                    this.$swal('Success', 'Roles berhasil diset', 'info')
                })
        }
    }
}
</script>