<template>
    <div>
        <div class="row">
            <div class="col-6">
                <div class="card">
                    <div class="card-body" style="position: relative;">
                        <h3 class="card-title">Kategori Antrian</h3>

                        <div class="rapor__chart">
                            <donat-report v-if="renderComponent" :barChartData="barChartData" :barChartOptions="barChartOptions" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-6">
                <div class="card">
                    <div class="card-body" style="position: relative;">
                        <h3 class="card-title">Keperluan</h3>

                        <div class="rapor__chart">
                            <donat-report v-if="renderComponent2" :barChartData="keperluanChartData" :barChartOptions="barChartOptions" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DonatReport from "~/components/chart/Donat.vue";
export default {
    components:{
        DonatReport
    },
    data(){
        return {
            renderComponent:false,
            renderComponent2:false,
            barChartData: {
                labels: ['Prioritas', 'Umum'],
                datasets: [
                    {
                        backgroundColor: ['#41B883', '#E46651'],
                        data: [0, 0]
                    }
                ]
            },
            keperluanChartData: {
                labels: [],
                datasets: [
                    {
                        backgroundColor: ['#41B883', '#E46651'],
                        data: [0, 0]
                    }
                ]
            },
            barChartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    mounted(){
        this.getKategoriAntrian()  
        this.getKeperluan()
    },
    methods:{
        getKategoriAntrian(){
            this.$axios.get('/api/auth/kategori-antrian')
                .then(resp => {
                    var prioritas = resp.data.prioritas
                    var umum = resp.data.umum

                    this.barChartData= {
                        labels: ['Prioritas', 'Umum'],
                        datasets: [
                            {
                                backgroundColor: ['#41B883', '#E46651'],
                                data: [prioritas,umum]
                            }
                        ]
                    }

                    this.$nextTick(() => {
                        this.renderComponent = true;
                    });
                })
        },

        getKeperluan(){
            this.$axios.get('/api/auth/report-keperluan')
                .then(resp => {
                    var labels = []
                    var datas =[]

                    for(var a=0; a<resp.data.length; a++)
                    {
                        labels.push(resp.data[a].nama)
                        datas.push(resp.data[a].jumlah)
                    }

                    this.keperluanChartData= {
                        labels: labels,
                        datasets: [
                            {
                                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16',"#316cc4"],
                                data: datas
                            }
                        ]
                    }

                    this.$nextTick(() => {
                        this.renderComponent2 = true;
                    });
                })
        }
    }
}
</script>