import React from 'react';
import 'whatwg-fetch';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/graph';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import './dependency/macarons';
import config from "../../config"
import Table from "../HomePage/Table/Table";
import './relationship.scss';
import SearchComponent from "./SearchComponent/SearchComponent";
import TabComponent from "./TabComponent/TabComponent";
import TabItem from "./TabComponent/TabItem";
import DoubleSearch from "./SearchComponent/DoubleSearch";

class Relationship extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: {
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
                        show: true,
                        formatter: '{c}'
                    }
                },
                edgeLabel: {
                    normal: {
                        show: true,
                        formatter: '{c}'
                    }
                },
                circular: {
                    rotateLabel: false,
                },
                force: {
                    initLayout: 'circular',
                    repulsion: 100,
                    gravity: 0.025,
                    edgeLength: [20, 200]
                },
                roam: true,
                symbolSize: 30,
                nodes: [],
                edges: []
            }],
            res: '',
            message: '',
            tabItem: ["单公司关系图", "多公司关系图"],
            currentTab: 0
        }
    }

    fetchByTwoId(id1, id2){
        fetch("http://" + config.nodejsIp + ":3000/relationship/byTwoId?id=" + id1 + "," + id2)
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                if (res[0] === "error") {
                    this.setState({
                        isSearching: false,
                        message: "数据库连接异常！"
                    });
                } else {
                    let length = res.length;
                    if (length !== 0) {
                        this.setState({
                            res,
                            message: "搜索完毕"
                        });
                        // 配置echarts
                        let option = this.state.option;
                        let series = [...this.state.defaultSeries];
                        series[0].nodes = this.getNodes(res[0].node, 'id', 'name');
                        series[0].edges = this.getEdges(res[0].edge, 'source', 'target', 'property');
                        option.series = series;
                        this.setState({
                            option
                        });
                        setTimeout(() => {
                            // 使用配置项和数据显示图表
                            let dom = this.refs.chartDom;
                            let myChart = echarts.init(dom, 'macarons');
                            myChart.setOption(this.state.option);
                        }, 0)
                    } else {
                        this.setState({
                            message: "未搜索到结果"
                        });
                    }
                }
            })
    }

    fetchByTwoName(name1, name2){
        fetch("http://" + config.nodejsIp + ":3000/relationship/byTwoName?id=" + name1 + "," + name2)
            .then((response) => {
                return response.json()
            })
            .then((res) => {
                let length = res.length;
                if (length !== 0) {
                    this.setState({
                        res,
                        message: "搜索完毕"
                    });
                    // 配置echarts
                    let option = this.state.option;
                    let series = [...this.state.defaultSeries];
                    series[0].nodes = this.getNodes(res[0].node, 'id', 'name');
                    series[0].edges = this.getEdges(res[0].edge, 'source', 'target', 'property');
                    option.series = series;
                    this.setState({
                        option
                    });
                    setTimeout(() => {
                        // 使用配置项和数据显示图表
                        let dom = this.refs.chartDom;
                        let myChart = echarts.init(dom, 'macarons');
                        myChart.setOption(this.state.option);
                    }, 0)
                } else {
                    this.setState({
                        message: "未搜索到结果"
                    });
                }
            })
    }

    // company1,company2 对象 {_id:公司名,company_id:公司Id}
    doubleSearch(company1, company2) {
        return new Promise((resolve, reject) => {
            let id1 = company1.company_id;
            let id2 = company2.company_id;

            // 如果Id都存在就直接查询两个Id的关系
            if (id1 && id2) {
                this.setState({
                    message: "搜索中..."
                });
                resolve(this.fetchByTwoId(id1, id2))
            } else {
                let name1 = company1._id;
                let name2 = company2._id;

                // 如果没有id，至少我们还有公司名，用公司名查询吧
                if(name1 && name2){
                    resolve(this.fetchByTwoName(name1, name2))
                }else{
                    // 如果都没有
                    alert("请输入搜索关键词！");
                    resolve();
                }
            }
        })
    }

    search(keyword) {
        return new Promise((resolve, reject) => {
            let id = keyword;
            if (id) {
                this.setState({
                    message: "搜索中..."
                });
                fetch("http://" + config.nodejsIp + ":3000/relationship/byOneName?id=" + id)
                    .then((response) => {
                        return response.json();
                    })
                    .then((res) => {
                        if (res[0] === "error") {
                            this.setState({
                                message: "数据库连接异常！"
                            });
                        } else {
                            let length = res.length;
                            if (length !== 0) {
                                if (length === 100) {
                                    this.setState({
                                        res,
                                        message: "搜索结果数量过多，该页仅显示" + length + "条"
                                    });
                                } else {
                                    this.setState({
                                        res,
                                        message: "搜索到" + length + "条"
                                    });
                                }
                            } else {
                                this.setState({
                                    message: "未搜索到结果，请确认你的关键字！"
                                });
                            }
                        }
                        resolve();
                    })
            } else {
                alert("请输入搜索关键词！");
                resolve();
            }
        })
    }

    clickHandle(i) {
        return () => {
            let res = this.state.res;
            let option = this.state.option;
            let series = [...this.state.defaultSeries];
            series[0].nodes = this.getNodes(res[i].node, 'id', 'name');
            series[0].edges = this.getEdges(res[i].edge, 'source', 'target', 'property');
            option.series = series;
            this.setState({
                option
            });
            setTimeout(() => {
                // 使用配置项和数据显示图表
                let dom = this.refs.chartDom;
                let myChart = echarts.init(dom, 'macarons');
                // let myChart = echarts.init(dom);
                myChart.setOption(this.state.option);
            }, 0)
        }
    }

    getNodes(nodesArr, nameKey, valueKey) {
        let result = [];
        for (let i = 0; i < nodesArr.length; i++) {
            result[i] = {name: nodesArr[i][nameKey], value: nodesArr[i][valueKey]};
            if (nodesArr[i]["property"] === "企业名称") {
                result[i].itemStyle = {
                    normal: {
                        color: "#ff8029"
                    }
                }
            }
        }
        return result;
    }

    getEdges(edgsArr, sourceKey, targetKey, valueKey) {
        let result = [];
        for (let i = 0; i < edgsArr.length; i++) {
            result[i] = {source: edgsArr[i][sourceKey], target: edgsArr[i][targetKey]};
            if (valueKey) {
                result[i].value = edgsArr[i][valueKey];
            }
        }
        return result;
    }

    tabBtnClick(index) {
        this.setState({
            message: '',
            res: '',
            currentTab: index
        })
    }

    render() {
        let {res, tabItem, currentTab} = this.state;
        let data = "";
        if (res) {
            data = res.map((item, index) => {
                return {
                    number: index + 1,
                    company_name: item.company_name
                };
            });
        }
        return (
            <div className="result">
                <TabComponent currentTab={currentTab} tabItem={tabItem} tabBtnClick={this.tabBtnClick.bind(this)}>
                    <TabItem key={0}>
                        <SearchComponent searchHandle={this.search.bind(this)}/>
                        <div className="container">
                            <div>{this.state.message}</div>
                        </div>
                        <Table data={data} clickHandle={this.clickHandle.bind(this)} hasTHeader={false}/>
                        <div ref="chartDom" style={{width: "100%", height: "600px"}}/>
                    </TabItem>
                    <TabItem key={1}>
                        <DoubleSearch searchHandle={this.doubleSearch.bind(this)}/>
                        <div className="container">
                            <div>{this.state.message}</div>
                        </div>
                        <div ref="chartDom" style={{width: "100%", height: "600px"}}/>
                    </TabItem>
                </TabComponent>
            </div>
        )
    }
}

export default Relationship