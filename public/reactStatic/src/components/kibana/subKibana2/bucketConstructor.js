// 生成html结构的数据
export default function () {
    return {
        types: ["Date Histogram", "Histogram", "Range","Date Range","IPv4 Range","Terms","Filter","Significant Terms"],
        content: {
            "Date Histogram": {
                field: ["--data--"],
                interval: ["--select a valid interval--", "Daily", "Monthly", "Yearly"],
                label: true,
                fieldType: "date"
            },
            "Histogram": {
                field: ["--number--", "bytes", "machine.ram", "phpmemory"],
                interval: true,
                showEmpty: true,
                label: true,
                fieldType: "number"
            },
            "Range": {
                field: ["--number--", "bytes", "machine.ram", "phpmemory"],
                fromTo: true,
                label: true,
                fieldType: "number"
            },
            "Date Range": {
                type: "Date Range",
                field: ["--date--", "@timestamp", "relatedContent.article:modeified_time","relatedContent.article:published_time","utc_time"],
                fromTo: true,
                label: true,
                fieldType: "date"
            },
            "IPv4 Range": {
                type: "IPv4 Range",
                field: ["--IP--"],
                fromTo: true,
                mask: true,
                label: true,
                fieldType: "ip"
            },
            "Terms": {
                type: "Terms",
                field: ["--date--"],
                orderBy: ["--orderBy--","metric:Count", "Custom Metric", "Term"],
                order: ["Descending", "Ascending"],
                size: true,
                label: true,
                fieldType: "date"
            },
            "Filter": {
                type: "Filter",
                filter: true
            },
            "Significant Terms": {
                type: "Significant Terms",
                field: ["--significant--"],
                size: true,
                label: true,
                fieldType: "keyword"
            }
        }
    }
}
