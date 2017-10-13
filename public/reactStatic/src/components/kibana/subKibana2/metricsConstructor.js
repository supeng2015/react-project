export default {
    types: ['Count', 'Average', 'Sum', 'Median', 'Min', 'Max', 'Standard Deviation', 'Unique Count', 'Percentiles', 'Percentile Ranks'],
    content: {
        'Count': {
            CustomLabel: ''
        },
        'Average': {
            field: ['--','age', 'number'],
            CustomLabel: ''
        },
        'Sum': {
            field: ['--','age', 'number'],
            CustomLabel: ''
        },
        'Median': {
            field: ['--','age', 'number'],
            CustomLabel: ''
        },
        'Min': {
            field: ['--','postDate', 'age', 'num'],
            CustomLabel: ''
        },
        'Max': {
            field: ['--','postDate', 'age', 'num'],
            CustomLabel: ''
        },
        'Standard Deviation': {
            field: ['--','age', 'number'],
            CustomLabel: ''
        },
        'Unique Count': {
            field: ['--','postDate', 'age', 'num'],
            CustomLabel: ''
        },
        'Percentiles': {
            field: ['--','age', 'number'],
            Percents: '',
            CustomLabel: ''
        },
        'Percentile Ranks': {
            field: ['--','age', 'number'],
            Values: true,
            CustomLabel: ''
        }

    }
}