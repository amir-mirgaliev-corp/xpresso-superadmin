<template>
    <div class="chart-container w-full">
        <BarChart 
            :data="chartData" 
            class="h-[500px]" 
            :options="chartOptions" 
            v-if="chartData.labels.length"
        />
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import DataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, DataLabels);

export default {
    components: {
        BarChart: Bar
    },
    
    data: () => ({
        chartData: {
            labels: [],
            datasets: [
                {
                    label: 'Позиции Кофе',
                    data: [],
                    backgroundColor: [],
                    borderColor: '#FF0000',
                    borderRadius: 15,
                    barThickness: 50,
                }
            ]
        },

        chartOptions: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
            y: {
                title: {
                    display: true,
                    text: 'Выручка (сум)',
                    color: '#000000',
                    font: {
                        family: 'Inter',
                        size: 14,
                        weight: '400',
                    }
                },
                beginAtZero: true,
                ticks: {
                    stepSize: 10000,
                    color: '#000000',
                    font: {
                        family: 'Inter',
                        size: 12,
                        weight: '400',
                    },
                    callback: function(value) {
                        switch (true) {
                            case (value >= 1000000000):
                                return (value / 1000000000).toFixed(1) + 'B сум';
                            case (value >= 1000000):
                                return (value / 1000000).toFixed(1) + 'M сум';
                            case (value >= 1000):
                                return (value / 1000).toFixed(1) + 'K сум';
                            default:
                                return value + ' сум';
                        }
                    }
                },
                grid: {
                    display: true, 
                }
            },
            x: {
                title: {
                    display: false,
                },
                ticks: {
                    display: true,
                    color: '#000000',
                    font: {
                        family: 'Inter',
                        size: 12,
                        weight: '400',
                    },
                    maxRotation: 0, 
                    minRotation: 0, 
                },
                grid: {
                    display: false, 
                }
            }
        },

            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                    text: 'График продуктов',
                    color: '#000000',
                    font: {
                        family: 'Inter',
                        size: 20,
                        weight: '400',
                    }
                },
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                    color: '#000000',
                    font: {
                        family: 'Inter',
                        size: 12,
                        weight: '400',
                    },
                    callback: function(value) {
                        switch (true) {
                            case (value >= 1000000000):
                                return (value / 1000000000).toFixed(1) + 'B сум';
                            case (value >= 1000000):
                                return (value / 1000000).toFixed(1) + 'M сум';
                            case (value >= 1000):
                                return (value / 1000).toFixed(1) + 'K сум';
                            default:
                                return value + ' сум';
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.raw.toLocaleString() + ' сум';
                        }
                    }
                }
            }
        }
    }),

    props: {
        graph: {
            type: Object,
            required: true
        }
    },

    methods: {
        updateChartData() {
            console.log(this.graph);
            
            this.chartData.labels = this.graph.labels;
            this.chartData.datasets[0].data = this.graph.datasets[0].data;
            this.chartData.datasets[0].backgroundColor = this.graph.datasets[0].backgroundColor;
        }
    },

    watch: {
        graph: {
            deep: true,
            handler() {
                if (this.graph) {
                    this.updateChartData();
                }
            }
        }
    },
};
</script>

<style scoped>
.chart-container {
    position: relative;
    width: 100%; 
    height: 500px;
}
</style>
