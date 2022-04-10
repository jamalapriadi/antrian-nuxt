<script>
import { Bar } from 'vue-chartjs'

export default {
    extends: Bar,
    props: ['data', 'options'],
    mounted () {
        this.renderChart(this.data, this.options)
    },
    methods: {
        renderBarChart() {
            this.renderChart(this.chartData, this.chartOptions);
        }
    },
    watch: {
        chartData () {
            this.$nextTick(() => {
                this.renderBarChart();
            })
        }
    }
}
</script>

<style>
</style>