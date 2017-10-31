import React from 'react';
import 'whatwg-fetch';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/graph';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
// import './dependency/macarons';

class Relationship extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            title: {
                text: 'ECharts 关系图'
            },
            tooltip: {},
            series: []
        }
    }

    getNodes(nodesArr, nameKey, valueKey){
        let result = [];
        for(let i = 0;i < nodesArr.length;i++){
            result[i] = {name: nodesArr[i][nameKey],value:nodesArr[i][valueKey]};
            if(nodesArr[i]["property"] === "企业名称"){
                result[i].itemStyle = {
                    normal: {
                        color: "#ff8029"
                    }
                }
            }
        }
        return result;
    }

    getEdges(edgsArr, sourceKey, targetKey,valueKey){
        let result = [];
        for(let i = 0;i < edgsArr.length;i++){
            result[i] = {source: edgsArr[i][sourceKey],target:edgsArr[i][targetKey]};
            if(valueKey){
                result[i].value = edgsArr[i][valueKey];
            }
        }
        return result;
    }

    componentDidMount(){
        let id = "123456789";
        fetch("http://localhost:3000/relationship?id=" + id)
            .then((response) => {
                return response.json();
            })
            .then((res) =>{
                let series = [{
                    type: 'graph',
                    layout: 'force',
                    draggable: true,
                    edgeSymbol: ['circle', 'arrow'],
                    label: {
                        normal: {
                            show:true,
                            formatter: '{c}'
                        }
                    },
                    edgeLabel: {
                        normal: {
                            show:true,
                            formatter: '{c}'
                        }
                    },
                    force: {
                        repulsion: 80,
                        edgeLength: 200
                    },
                    symbolSize: 30,
                    nodes: [],
                    edges: []
                }];
                series[0].nodes = this.getNodes(res.node, 'id', 'name');
                series[0].edges= this.getEdges(res.edge, 'source', 'target','property');
                this.setState({
                    series
                });
                setTimeout(()=>{
                    // 使用刚指定的配置项和数据显示图表
                    let dom = this.refs.chartDom;
                    // let myChart = echarts.init(dom, 'macarons');
                    let myChart = echarts.init(dom);
                    myChart.setOption(this.state);
                },0)
            })
    }

    render() {
        return (
            <div ref="chartDom" style={{width: "100%", height: "600px"}}/>
        )
    }
}

export default Relationship