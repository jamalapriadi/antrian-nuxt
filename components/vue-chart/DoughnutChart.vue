<script>
import { Doughnut } from 'vue-chartjs'

export default {
    extends: Doughnut,
    props: ['data', 'options'],
    mounted () {
        this.renderChart(this.data, this.options)
    },
    methods: {
        renderDoughnutChart() {
            this.renderChart(this.chartData, this.chartOptions);
        }
    },
    watch: {
        chartData () {
            this.$nextTick(() => {
                this.renderDoughnutChart();
            })
        }
    }
}
</script>

<style>
</style>