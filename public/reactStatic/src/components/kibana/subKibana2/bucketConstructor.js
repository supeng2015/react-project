// 生成html结构的数据
export default function () {
    return {
        types: ["Data Histogram", "Histogram", "Range","Data Range","IPv4 Range","Terms","Filter","Significant Terms"],
        content: {
            "Data Histogram": {
                field: ["", "@timestamp", "uc_time"],
                interval: ["-- select a valid interval --", "Daily", "Monthly", "Yearly"],
                label: true
            },
            "Histogram": {
                field: ["--number--", "bytes", "machine.ram", "phpmemory"],
                interval: true,
                showEmpty: true,
                label: true
            },
            "Range": {
                field: ["--number--", "bytes", "machine.ram", "phpmemory"],
                fromTo: true,
                label: true
            },
            "Data Range": {
                type: "Data Range",
                field: ["--date--", "@timestamp", "relatedContent.article:modeified_time","relatedContent.article:published_time","utc_time"],
                fromTo: true,
                label: true
            },
            "IPv4 Range": {
                type: "IPv4 Range",
                field: ["A","B","C"],
                fromTo: true,
                mask: true,
                label: true
            },
            "Terms": {
                type: "Terms",
                field: ["--date--", "@timestamp", "relatedContent.article:modeified_time","relatedContent.article:published_time","utc_time"],
                orderBy: ["--orderBy--","metric:Count", "Custom Metric", "Term"],
                order: ["Descending", "Ascending"],
                size: true,
                label: true
            },
            "Filter": {
                type: "Filter",
                filter: true
            },
            "Significant Terms": {
                type: "Significant Terms",
                field: ["A","B","C"],
                size: true,
                label: true
            }
        }
    }
}
