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

        <div class="card" v-if="list.success == true">
            Pilih
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
            message:''
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
        }
    }
}
</script>