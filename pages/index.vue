<template>
    <div>
        <div v-for="(l,idx) in $auth.user.data.role" :key="'per'+idx">
            <operation v-if="l.name == 'Operation'" />
            <dashboard v-if="l.name == 'Admin'" />
        </div>
        <!-- <pre>{{$auth.user.data}}</pre> -->

        
    </div>
</template>

<script>
export default {
    layout:'main',
    data(){
        return {
            barChartData: {
                labels: [],
                datasets: [
                    {
                        label: "Visualizaciones",
                        data: [],
                        // backgroundColor: "rgba(20, 255, 0, 0.3)",
                        borderColor: "rgba(100, 255, 0, 1)",
                        borderWidth: 2,
                    },
                ],
            },
            barChartOptions: {
                responsive: true,
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    //   text: "Google analytics data",
                    fontSize: 24,
                    fontColor: "#6b7280",
                },
                tooltips: {
                    backgroundColor: "#17BF62",
                },
                scales: {
                    xAxes: [
                        {
                            display:false,
                            gridLines: {
                                display: false,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                // beginAtZero: true,
                                // max: 700,
                                min: 0,
                                // stepSize: 1,
                            },
                            gridLines: {
                                display: true,
                            },
                        },
                    ],
                },
            }
        }
    }
}
</script>