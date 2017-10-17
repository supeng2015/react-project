import React from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';


class Histogram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'ECharts 入门示例',
            legend: ['销量'],
            key: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
            series: {
                name: '销量',
                data: [5, 20, 36, 10, 10, 20]
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
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {},
            yAxis: {},
            series: [{
                name: '',
                type: 'bar',
                data: []
            }]
        };

        option.title.text = this.state.title;
        option.legend.data = this.state.legend;
        if(this.props.type === "xAxis"){
            option.xAxis.data = this.state.key;
        }else{
            option.yAxis.data = this.state.key;
        }
        option.series[0].name = this.state.series.name;
        option.series[0].data = this.state.series.data;

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    render() {
        return (
            <div ref="chartDom" style={{width: "100%", height: "400px"}}/>
        )
    }
}

export default Histogram