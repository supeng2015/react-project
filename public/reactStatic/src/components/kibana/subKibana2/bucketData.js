export default function (type) {
    switch (type){
        case "Data Histogram":
            return {
                type: "Data Histogram",
                field: "",
                interval: "",
                label: ""
            };
        case "Histogram":
            return {
                type: "Histogram",
                field: "",
                interval: "",
                showEmpty: false,
                label: ""
            };
        case "Range":
            return {
                type: "Range",
                field: "",
                fromTo: [{from: 0, to: 0}],
                label: ""
            };
        case "Data Range":
            return {
                type: "Data Range",
                field: "",
                fromTo: [{from: 0, to: 0}],
                label: ""
            };
        case "IPv4 Range":
            return {
                type: "IPv4 Range",
                field: "",
                fromTo: [{from: 0, to: 0}],
                mask: [""],
                label: ""
            };
        case "Terms":
            return {
                type: "Terms",
                field: "",
                orderBy: "",
                order: "Descending",
                size: "",
                label: ""
            };
        case "Filter":
            return {
                type: "Filter",
                filter: [{name:"filter",value:""}]
            };
        case "Significant Terms":
            return {
                type: "Significant Terms",
                field: "",
                size: "",
                label: ""
            };
        default:
            return {
                type: "Data Histogram",
                field: "",
                interval: "",
                label: ""
            }
    }
}