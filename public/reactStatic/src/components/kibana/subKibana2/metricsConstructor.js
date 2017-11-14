export default function () {
    return {
        types: ['Count', 'Average', 'Sum', 'Median', 'Min', 'Max', 'Standard Deviation', 'Unique Count', 'Percentiles', 'Percentile Ranks'],
        content: {
            'Count': {
                label: true,
                field: ['--','count1', 'count2'],
                fieldType: 'all'
            },
            'Average': {
                field: ['--','age', 'number'],
                label: true,
                fieldType: 'number'
            },
            'Sum': {
                field: ['--','age', 'number'],
                label: true,
                fieldType: 'number'
            },
            'Median': {
                field: ['--','age', 'number'],
                label: true,
                fieldType: 'number'
            },
            'Min': {
                field: ['--','postDate', 'age', 'num'],
                label: true,
                fieldType: 'number'
            },
            'Max': {
                field: ['--','postDate', 'age', 'num'],
                label: true,
                fieldType: 'number'
            },
            'Standard Deviation': {
                field: ['--','age', 'number'],
                label: true,
                fieldType: 'number'
            },
            'Unique Count': {
                field: ['--','postDate', 'age', 'num'],
                label: true,
                fieldType: 'number'
            },
            'Percentiles': {
                field: ['--','age', 'number'],
                percents: '',
                label: true,
                fieldType: 'number'
            },
            'Percentile Ranks': {
                field: ['--','age', 'number'],
                values: true,
                label: true,
                fieldType: 'number'
            }
        }
    }
}