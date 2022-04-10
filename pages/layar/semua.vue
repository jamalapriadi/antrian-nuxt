<template>
    <div>
        <div class="row">
            <div v-for="(l,idx) in alllayar" :key="'layar'+idx" class="col-6" style="margin-bottom:20px">
                <div class="card">
                    <div class="card-header" style="font-weight:bold;text-align:center">{{l.nama}}</div>
                    <div class="card-body">
                        <div class="row" v-if="l.list">
                            <p class="text-center" style="line-height:10px">Receptionist:</p>
                            <h1 class="text-center" v-if="l.list.receptionist" style="line-height:20px;margin-bottom:25px;font-size:44px">
                                <strong>{{l.list.receptionist.nama}}</strong>
                            </h1>

                            <div v-if="l.list.success == true">
                                <p v-if="l.list.user" class="text-center">
                                    <strong v-if="l.list.user.user">Dengan User : {{l.list.user.user.name}}</strong>
                                </p>

                                <div class="card" v-if="l.list.current_antrian">
                                    <div class="card-body">
                                        <h1 class="text-center" v-if="l.list.current_antrian">
                                            <span v-if="l.list.current_antrian.antrian" style="font-size:80px">{{l.list.current_antrian.antrian.no_antrian}}</span>
                                        </h1>

                                        <div class="text-center">
                                            <p>
                                                Kategori : <span v-if="l.list.current_antrian.antrian">
                                                    <span v-if="l.list.current_antrian.antrian.type == 2">UMUM</span>
                                                    <span v-if="l.list.current_antrian.antrian.type == 1" style="color:red;font-weight:bold">DIFABEL/PRIORITAS</span>
                                                </span>
                                            </p>
                                            <p v-if="l.list.current_antrian.antrian" style="line-height:5px">
                                                Keperluan : <span v-if="l.list.current_antrian.antrian.keperluan" style="font-weight:bold;">{{l.list.current_antrian.antrian.keperluan.nama}}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="l.list.success == false" class="alert alert-danger">
                                {{l.list.message}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    auth:false,
    layout:'asli',
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
            alllayar:[],
            list:{}
        }
    },
    mounted(){
        this.allLayar()
    },
    methods:{
        allLayar(){
            this.$axios.get('/api/all-layar')
                .then(resp => {
                    this.alllayar = resp.data
                })
        }
    }
}
</script>