export default function (type) {
    switch (type){
        case "Date Histogram":
            return {
                type: "Date Histogram",
                typeName: "date_histogram",
                field: "",
                interval: "",
                label: ""
            };
        case "Histogram":
            return {
                type: "Histogram",
                typeName: "histogram",
                field: "",
                interval: "",
                min_doc_count: false,
                label: ""
            };
        case "Range":
            return {
                type: "Range",
                typeName: "range",
                field: "",
                ranges: [{from: 0, to: 0}],
                label: ""
            };
        case "Date Range":
            return {
                type: "Date Range",
                typeName: "date_range",
                field: "",
                ranges: [{from: 0, to: 0}],
                label: ""
            };
        case "IPv4 Range":
            return {
                type: "IPv4 Range",
                typeName: "ip_range",
                field: "",
                ranges: [{from: 0, to: 0}],
                mask: [""],
                label: ""
            };
        case "Terms":
            return {
                type: "Terms",
                typeName: "terms",
                field: "",
                orderBy: "",
                order: "Descending",
                size: "",
                label: ""
            };
        case "Filter":
            return {
                type: "Filter",
                typeName: "filter",
                filter: [{name:"filter",value:""}]
            };
        case "Significant Terms":
            return {
                type: "Significant Terms",
                typeName: "significant_terms",
                field: "",
                size: "",
                label: ""
            };
        default:
            return {
                type: "Date Histogram",
                typeName: "date_histogram",
                field: "",
                interval: "",
                label: ""
            }
    }
}