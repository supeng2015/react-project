export default {
    // 切换图表后，重置store中的初始值
    // 该值用于传给后台
    "Data Histogram": {
        type: "Data Histogram",
        field: "",
        interval: "",
        label: ""
    },
    "Histogram":{
        type: "Histogram",
        field: "",
        interval: "",
        showEmpty: false,
        label: ""
    },
    "Range":{
        type: "Range",
        field: "",
        fromTo: [{from: 0, to: 0}],
        label: ""
    },
    "Data Range": {
        type: "Data Range",
        field: "",
        fromTo: [{from: 0, to: 0}],
        label: ""
    },
    "IPv4 Range": {
        type: "IPv4 Range",
        field: "",
        fromTo: [{from: 0, to: 0}],
        mask: [""],
        label: ""
    },
    "Terms": {
        type: "Terms",
        field: "",
        orderBy: [],
        order: ["Descending"],
        size: "",
        label: ""
    },
    "Filter": {
        type: "Filter",
        filter: [{name:"filter",value:""}]
    },
    "Significant Terms": {
        type: "Significant Terms",
        field: "",
        size: "",
        label: ""
    }
}