<template>
    <div>
        <message :finish="isFinish" :success="success" :message="message" />

        <div v-for="(l,idx) in menus" :key="idx" style="margin-bottom:10px">
            <a v-if="state.type == '' || state.type == l.id" href="#" @click.prevent="jenisAntrian(l)" :class="l.class" style="padding:20px;font-weight:bold">
                {{l.nama}}
            </a>
        </div>
        
        <div v-if="state.type">
            <div class="hr-text" style="color:#fff">Pilih Keperluan - {{select_menu.nama}}</div>
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
            <h3 class="text-center" style="font-size:46px">{{company}}</h3>
            <hr>
            <!-- <p class="text-center" style="line-height:14px;font-size:32px;">{{cetak.created_at}}</p> -->
            <p class="text-center" style="line-height:14px;font-size:32px;">No. Antrian</p>
            <h1 class="text-center" style="font-weight:bold; font-size:42px;">
                {{cetak.no_antrian}}
            </h1>
            <p class="text-center" style="line-height:14px;font-size:32px;">Keperluan</p>
            <p class="text-center" v-if="cetak.keperluan" style="font-size:32px">
                <strong>{{cetak.keperluan.nama}}</strong>
            </p>
            <hr>
            <p class="text-center" style="font-size:32px">Terima Kasih</p>
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
                    class:'btn btn-light btn-large btn-square w-100'
                },
                {
                    id:1,
                    nama:'DIFABEL/PRIORITAS',
                    class:'btn btn-danger btn-large btn-square w-100'
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
                    this.menus[a].class = 'btn btn-danger btn-large btn-square w-100'
                }else if(this.menus[a].id == 2){
                    this.menus[a].class = 'btn btn-light btn-large btn-square w-100'
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
                            // this.$htmlToPaper('printMe');
                            
                            window.open(process.env.LARAVEL_ENDPOINT+'/api/antrian/'+this.cetak.id+'/pdf');
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

<style>
body{
    background-color:#133a1e !important;
}

.bg-hijau{
    background-color: #419f64;
}

.text-white{
    color:#fff;
}

@media print {
  @page {
    size: auto
  }
}
</style>