import React from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

class PieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '某站点用户访问来源',
            legend: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
            series:{
                name: '访问来源',
                data:[{value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}]
            }
        }
    }

    componentDidMount(){
        let dom = this.refs.chartDom;
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(dom);

        let option = {
            title : {
                text: '',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: []
            },
            series : [
                {
                    name: '',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        option.title.text = this.state.title;
        option.legend.data = this.state.legend;
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

export default PieChart