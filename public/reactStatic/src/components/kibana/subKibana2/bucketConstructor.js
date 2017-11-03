// 生成html结构的数据
export default function () {
    return {
        types: ["Date Histogram", "Histogram", "Range","Date Range","IPv4 Range","Terms","Filter","Significant Terms"],
        content: {
            "Date Histogram": {
                field: ["--data--"],
                interval: ["--select a valid interval--", "Millisecondly","Secnodly","Minutely", "Hourly", "Daily", "Weekly","Monthly", "Yearly"],
                label: true,
                fieldType: "date"
            },
            "Histogram": {
                field: ["--number--", "bytes", "machine.ram", "phpmemory"],
                interval: true,
                min_doc_count: true,
                label: true,
                fieldType: "number"
            },
            "Range": {
                field: ["--number--", "bytes", "machine.ram", "phpmemory"],
                ranges: true,
                label: true,
                fieldType: "number"
            },
            "Date Range": {
                type: "Date Range",
                field: ["--date--", "@timestamp", "relatedContent.article:modeified_time","relatedContent.article:published_time","utc_time"],
                ranges: true,
                label: true,
                fieldType: "date"
            },
            "IPv4 Range": {
                type: "IPv4 Range",
                field: ["--IP--"],
                ranges: true,
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
                fieldType: "all"
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
