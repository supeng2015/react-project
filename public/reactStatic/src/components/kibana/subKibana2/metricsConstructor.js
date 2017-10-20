export default function () {
    return {
        types: ['Count', 'Average', 'Sum', 'Median', 'Min', 'Max', 'Standard Deviation', 'Unique Count', 'Percentiles', 'Percentile Ranks'],
        content: {
            'Count': {
                label: ''
            },
            'Average': {
                field: ['--','age', 'number'],
                label: '',
                fieldType: 'number'
            },
            'Sum': {
                field: ['--','age', 'number'],
                label: '',
                fieldType: 'number'
            },
            'Median': {
                field: ['--','age', 'number'],
                label: '',
                fieldType: 'number'
            },
            'Min': {
                field: ['--','postDate', 'age', 'num'],
                label: '',
                fieldType: 'number'
            },
            'Max': {
                field: ['--','postDate', 'age', 'num'],
                label: '',
                fieldType: 'number'
            },
            'Standard Deviation': {
                field: ['--','age', 'number'],
                label: '',
                fieldType: 'number'
            },
            'Unique Count': {
                field: ['--','postDate', 'age', 'num'],
                label: '',
                fieldType: 'number'
            },
            'Percentiles': {
                field: ['--','age', 'number'],
                Percents: '',
                label: '',
                fieldType: 'number'
            },
            'Percentile Ranks': {
                field: ['--','age', 'number'],
                Values: true,
                label: '',
                fieldType: 'number'
            }
        }
    }
}