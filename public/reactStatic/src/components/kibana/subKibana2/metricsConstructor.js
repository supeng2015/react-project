export default {
    types: ['Count', 'Average', 'Sum', 'Median', 'Min', 'Max', 'Standard Deviation', 'Unique Count', 'Percentiles', 'Percentile Ranks'],
    content: {
        'Count': {
            label: ''
        },
        'Average': {
            field: ['--','age', 'number'],
            label: ''
        },
        'Sum': {
            field: ['--','age', 'number'],
            label: ''
        },
        'Median': {
            field: ['--','age', 'number'],
            label: ''
        },
        'Min': {
            field: ['--','postDate', 'age', 'num'],
            label: ''
        },
        'Max': {
            field: ['--','postDate', 'age', 'num'],
            label: ''
        },
        'Standard Deviation': {
            field: ['--','age', 'number'],
            label: ''
        },
        'Unique Count': {
            field: ['--','postDate', 'age', 'num'],
            label: ''
        },
        'Percentiles': {
            field: ['--','age', 'number'],
            Percents: '',
            label: ''
        },
        'Percentile Ranks': {
            field: ['--','age', 'number'],
            Values: true,
            label: ''
        }
    }
}