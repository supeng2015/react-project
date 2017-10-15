import React from 'react'
import echarts from 'echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Charts extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        let dom = this.refs.histogram;

        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(dom);

        // 指定图表的配置项和数据
        let option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    render() {
        return (
            <div>
                <div ref="histogram" style={{width: "600px",height:"400px"}} />
            </div>
        )
    }
}

export default Charts