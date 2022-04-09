<template>
    <div>
        <div class="row" v-if="list">
            <p class="text-center" style="line-height:10px">Receptionist:</p>
            <h1 class="text-center" v-if="list.receptionist" style="line-height:20px;margin-bottom:25px;font-size:44px">
                <strong>{{list.receptionist.nama}}</strong>
            </h1>

            <div v-if="list.success == true">
                <p v-if="list.user" class="text-center">
                    <strong v-if="list.user.user">Dengan User : {{list.user.user.name}}</strong>
                </p>
            </div>

            <div v-if="list.success == false" class="alert alert-danger">
                {{list.message}}
            </div>
        </div>
        <pre>{{list}}</pre>
    </div>
</template>

<script>
export default {
    auth:false,
    layout:'auth',
    data(){
        return {
            isFinish:0,
            success:false,
            errors:{},
            state:[],
            loading: false,
            messageclass: "",
            message: "",
            kode:'',
            list:{}
        }
    },
    mounted(){
        this.cekLayar()
    },
    methods:{
        cekLayar(){
            let app=this;
            let id= app.$route.params.id;
            this.kode = id;

            this.$axios.get('/api/layar/'+id)
                .then(resp => {
                    this.list = resp.data
                })
        }
    }
}
</script>