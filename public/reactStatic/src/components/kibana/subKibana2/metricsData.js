export default function(type){
    switch (type) {
        case 'Count':
            return {
                type: 'Count',
                typeName: 'value_count',
                label: ''
            };
        case 'Average':
            return {
                type: 'Average',
                typeName: 'avg',
                field: '',
                label: ''
            };
        case 'Sum':
            return {
                type: 'Sum',
                typeName: 'sum',
                field: '',
                label: ''
            };
        case 'Median':
            return {
                type: 'Median',
                typeName: 'percentiles',
                field: '',
                label: ''
            };
        case 'Min':
            return {
                type: 'Min',
                typeName: 'min',
                field: '',
                label: ''
            };
        case 'Max':
            return {
                type: 'Max',
                typeName: 'max',
                field: '',
                label: ''
            };
        case 'Standard Deviation':
            return {
                type: 'Standard Deviation',
                typeName: 'extended_stats',
                field: '',
                label: ''
            };
        case 'Unique Count':
            return {
                type: 'Unique Count',
                typeName: 'cardinality',
                field: '',
                label: ''
            };
        case 'Percentiles':
            return {
                type: 'Percentiles',
                typeName: 'percentiles',
                field: '',
                Percents: [1, 5, 25, 50, 75, 95, 99],
                label: ''
            };
        case 'Percentile Ranks':
            return {
                type: 'Percentile Ranks',
                typeName: 'percentile_ranks',
                field: '',
                Values: [],
                label: ''
            };
        default:
            return {
            type: 'Count',
            typeName: 'value_count',
            label: ''
        };
    }
}