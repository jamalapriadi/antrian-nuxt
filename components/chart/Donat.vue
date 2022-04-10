<template>
    <div>
        <DoughnutChart :data="barChartData" :options="barChartOptions" id="chart" :height="200"/>
    </div>
</template>

<script>
import DoughnutChart from "~/components/vue-chart/DoughnutChart.vue";
export default {
    components:{
        DoughnutChart
    },
    props:{
        barChartData:{
            type:Object,
            required: true
        },
        barChartOptions:{
            type:Object,
            required: true
        }
    }
}
</script>