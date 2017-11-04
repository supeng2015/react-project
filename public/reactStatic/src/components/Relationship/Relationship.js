import React from 'react';
import 'whatwg-fetch';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/graph';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import './dependency/macarons';
import NormalInput from "../kibana/subKibana2/NormalInput/NormalInput";
import config from "../../config"
import Table from "../HomePage/Table/Table";
import './relationship.scss';
import SearchComponent from "./SearchComponent/SearchComponent";

class Relationship extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            option:{
                title: {
                    text: '展示关系图'
                },
                tooltip: {},
                series: []
            },
            defaultSeries: [{
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
            }],
            res: '',
            message: ''
        }
    }

    search(keyword){
        let id = keyword;
        if(id){
            this.setState({
                isSearching: true,
                message: "搜索中..."
            });
            fetch("http://"+ config.nodejsIp +":3000/relationship?id=" + id)
                .then((response) => {
                    return response.json();
                })
                .then((res) =>{
                    if(res[0] === "error"){
                        this.setState({
                            isSearching: false,
                            message: "数据库连接异常！"
                        });
                    }else{
                        let length = res.length;
                        if(length !== 0){
                            if(length === 100){
                                this.setState({
                                    res,
                                    isSearching: false,
                                    message: "搜索结果数量过多，该页仅显示" + length + "条"
                                });
                            }else{
                                this.setState({
                                    res,
                                    isSearching: false,
                                    message: "搜索到" + length + "条"
                                });
                            }
                        }else{
                            this.setState({
                                isSearching: false,
                                message: "未搜索到结果，请确认你的关键字！"
                            });
                        }
                    }
                })
        }else{
            alert("请输入搜索关键词！");
        }

    }

    clickHandle(i){
        return ()=>{
            let res = this.state.res;
            let option = this.state.option;
            let series = [...this.state.defaultSeries];
            series[0].nodes = this.getNodes(res[i].node, 'id', 'name');
            series[0].edges= this.getEdges(res[i].edge, 'source', 'target','property');
            option.series = series;
            this.setState({
                option
            });
            setTimeout(()=>{
                // 使用配置项和数据显示图表
                let dom = this.refs.chartDom;
                let myChart = echarts.init(dom, 'macarons');
                // let myChart = echarts.init(dom);
                myChart.setOption(this.state.option);
            },0)
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

    render() {
        let {isSearching} = this.state;
        let res = this.state.res;
        let data = "";
        if(res){
            data = res.map((item, index)=>{
                return {
                    number: index + 1,
                    company_name:item.company_name
                };
            });
        }
        return (
            <div className="result">
                <SearchComponent searchHandle={this.search.bind(this)}/>
                <div className="container">
                    <div>{this.state.message}</div>
                </div>
                <Table data={data} clickHandle={this.clickHandle.bind(this)} hasTHeader={false}/>
                <div ref="chartDom" style={{width: "100%", height: "600px"}}/>
            </div>
        )
    }
}

export default Relationship