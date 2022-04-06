<template>
    <div>
        <message :finish="isFinish" :success="success" :message="message" />
                
        <div v-for="(l,idx) in keperluans" :key="idx" style="margin-bottom:10px">
            <a href="#" @click.prevent="buatAntrian(l.id)" class="btn btn-light btn-large btn-square w-100" style="padding:20px;font-weight:bold">
                {{l.nama}}
            </a>
        </div>

        <div id="printMe" v-if="cetak" style="display:none">
            <h3 class="text-center">Your Company</h3>
            <hr>
            <p class="text-center" style="line-height:10px">{{cetak.created_at}}</p>
            <p class="text-center" style="line-height:10px">No. Antrian</p>
            <h1 class="text-center" style="font-weight:bold">
                {{cetak.no_antrian}}
            </h1>
            <p class="text-center" style="line-height:10px">Keperluan</p>
            <p class="text-center" v-if="cetak.keperluan">
                <strong>{{cetak.keperluan.nama}}</strong>
            </p>
            <hr>
            <p class="text-center">Terima Kasih</p>
        </div>
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
            keperluans:[],
            state:{
                keperluan:''
            },
            cetak:{}
        }
    },
    mounted(){
        this.listKeperluan()
    },
    methods:{
        listKeperluan(){
            this.$axios.get('/api/list-keperluan')
                .then(resp => {
                    this.keperluans = resp.data.data
                })
        },

        buatAntrian(id){
            this.loading = true
            this.state.keperluan = id 
            this.isFinish = 1
            this.cetak = {}

            this.$axios.post('/api/buat-antrian', this.state)
                .then(resp => {
                    this.loading = false 
                    this.isFinish = 2

                    console.log(resp);

                    if(resp.data.success == true){
                        this.success = true
                        this.message = resp.data.message
                        this.cetak = resp.data.data

                        this.$nextTick(() => {
                            this.$htmlToPaper('printMe');
                        });
                    }else{
                        this.success = false
                        this.message = resp.data.message
                        this.cetak = {}
                    }
                    
                })
        },
    }
}
</script>