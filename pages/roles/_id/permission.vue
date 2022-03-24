<template>
    <div>
        <div class="page-header d-print-none">
            <div class="row align-items-center">
                <div class="col">
                    <h2 class="page-title">
                        Set Permissions - {{list.name}}
                    </h2>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">Pilih Permission</div>
            <div class="card-body">
                <div class="row">
                    <div class="col-3" v-for="(l,idx) in permissions" :key="idx">
                        <div class="mb-3">
                            <div>
                                <label class="form-check">
                                    <!-- <input class="form-check-input" type="checkbox" name="perm[]" @change="pilih(l.id, $event)">
                                    <span class="form-check-label">{{l.name}}</span> -->
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
                    <nuxt-link to="/roles" class="btn btn-link">Cancel</nuxt-link>
                    <a href="#" class="btn btn-primary ms-auto" @click.prevent="savePermission">Save</a>
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
        await store.dispatch('role/allpermission')
    },
    computed:{
        ...mapState('role',{
            backBtn: state=> state.backBtn,
            forms: state=> state.forms,
            errors: state=> state.errors,
            isFinish: state => state.isFinish,
            success: state => state.success,
            message: state => state.message,
            permissions: state => state.permissions
        })
    },
    data(){
        return {
            kode:'',
            title:"Update Role",
            btnText: "Update",
            perm:[],
            cek:[],
            selected:[],
            list:[]
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        ...mapActions('role',['show','allpermission']),

        getData(){
            let app=this;
            let id= app.$route.params.id;
            this.kode = id;

            this.$axios.get('/api/auth/role/'+this.kode)
                .then(resp => {
                    this.list = resp.data.data

                    for(var a=0; a<this.permissions.length; a++){
                        this.cek.push('N')
                        this.perm.push({
                            id:this.permissions[a].id,
                            cek:'N'
                        })
                    }

                    for(var a=0; a<this.list.permissions.length; a++)
                    {
                        this.selected.push({
                            id:this.list.permissions[a].id,
                            pilih:'Y'
                        })
                    }

                    for(var a=0; a<this.permissions.length; a++){
                        for(var b=0; b<this.selected.length; b++)
                        {
                            if(this.permissions[a].id == this.selected[b].id)
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

        savePermission(){
            this.$axios.post('/api/auth/set-role-permission/'+this.kode, this.selected)
                .then(resp => {
                    this.$swal('Success', 'Permission berhasil diset', 'info')
                })
        }
    }
}
</script>