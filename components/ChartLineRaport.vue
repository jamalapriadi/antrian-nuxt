<template>
    <div>
        <LineChart :data="barChartData" :options="barChartOptions" id="chart" :height="200"/>
    </div>
</template>

<script>
import LineChart from "~/components/vue-chart/LineChart.vue";
export default {
    components:{
        LineChart
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