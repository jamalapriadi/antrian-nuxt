<script>
import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    props: ['data', 'options'],
    mounted () {
        this.renderChart(this.data, this.options)
    },
    methods: {
        renderLineChart() {
            this.renderChart(this.chartData, this.chartOptions);
        }
    },
    watch: {
        chartData () {
            this.$nextTick(() => {
                this.renderLineChart();
            })
        }
    }
}
</script>

<style>
</style>