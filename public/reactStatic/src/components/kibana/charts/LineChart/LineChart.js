import React from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '简单折线图',
            legend: ['模拟数据1', '模拟数据2'],
            series: {
                name: ['模拟数据1', '模拟数据2'],
                data: [[
                    [0, 100],
                    [10, 150],
                    [20, 120],
                    [30, 140],
                    [40, 170],
                    [50, 138]
                ], [
                    [0, 68],
                    [10, 132],
                    [20, 99],
                    [30, 165],
                    [40, 129],
                    [50, 144]
                ]]
            }
        }
    }

    componentDidMount() {
        let dom = this.refs.chartDom;
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(dom);

        // 指定图表的配置项和数据
        let option = {
            title: {
                text: ''
            },
            legend: {data: []},
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'value',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            series: [
                {
                    name: '',
                    type: 'line',
                    hoverAnimation: false,
                    data: []
                },
                {
                    name: '',
                    type: 'line',
                    hoverAnimation: false,
                    data: []
                }
            ]
        };

        option.title.text = this.state.title;
        option.legend.data = this.state.legend;
        option.series[0].name = this.state.series.name[0];
        option.series[0].data = this.state.series.data[0];
        option.series[1].name = this.state.series.name[1];
        option.series[1].data = this.state.series.data[1];
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    render() {
        return (
            <div ref="chartDom" style={{width: "100%", height: "400px"}}/>
        )
    }
}

export default LineChart