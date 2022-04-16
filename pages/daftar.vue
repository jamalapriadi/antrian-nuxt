<template>
    <div>
        <message :finish="isFinish" :success="success" :message="message" />

        <div v-for="(l,idx) in menus" :key="idx" style="margin-bottom:10px">
            <a v-if="state.type == '' || state.type == l.id" href="#" @click.prevent="jenisAntrian(l)" :class="l.class" style="padding:20px;font-weight:bold">
                {{l.nama}}
            </a>
        </div>
        
        <div v-if="state.type">
            <div class="hr-text">Pilih Keperluan - {{select_menu.nama}}</div>
            <div v-for="(l,idx) in keperluans" :key="idx" style="margin-bottom:10px">
                <a href="#" @click.prevent="buatAntrian(l.id)" class="btn btn-light btn-large btn-square w-100" style="padding:20px;font-weight:bold">
                    {{l.nama}}
                </a>
            </div>

            <a href="#" class="btn btn-secondary btn-large btn-square w-100" @click.prevent="kembali">
                Kembali
            </a>
        </div>

        <div id="printMe" v-if="cetak" style="display:none">
            <h3 class="text-center">{{company}}</h3>
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
            menus:[
                {
                    id:2,
                    nama:'UMUM',
                    class:'btn btn-outline-dark btn-large btn-square w-100'
                },
                {
                    id:1,
                    nama:'DIFABEL/PRIORITAS',
                    class:'btn btn-outline-danger btn-large btn-square w-100'
                }
            ],
            select_menu:{},
            state:{
                type:'',
                keperluan:''
            },
            cetak:{},
            company: process.env.NAMA_COMPANY
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

        jenisAntrian(l){
            this.state.type = l.id
            this.select_menu = l

            for(var a=0; a<this.menus.length; a++)
            {
                if(this.menus[a].id == l.id){
                    if(l.id == 1)
                    {
                        this.menus[a].class = 'btn btn-danger btn-large btn-square w-100'
                    }else if(l.id == 2)
                    {
                        this.menus[a].class = 'btn btn-dark btn-large btn-square w-100'
                    }
                }
            }
        },

        kembali(){
            this.state.type = ''
            this.select_menu = {}

            for(var a=0; a<this.menus.length; a++)
            {
                if(this.menus[a].id == 1){
                    this.menus[a].class = 'btn btn-outline-danger btn-large btn-square w-100'
                }else if(this.menus[a].id == 2){
                    this.menus[a].class = 'btn btn-outline-dark btn-large btn-square w-100'
                }
            }
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

                    setTimeout(() => {
                        this.success = false 
                        this.message = ''
                        this.state = {
                            type:'',
                            keperluan:''
                        }
                    }, 3000)
                    
                })
        },
    }
}
</script>