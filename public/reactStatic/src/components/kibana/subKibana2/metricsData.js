export default (()=>{
    return{
        'Count': {
            type:'Count',
            CustomLabel: ''
        },
        'Average': {
            type:'Average',
            field: '',
            CustomLabel: ''
        },
        'Sum': {
            type:'Sum',
            field: '',
            CustomLabel: ''
        },
        'Median':{
            type:'Median',
            field: '',
            CustomLabel: ''
        },
        'Min':{
            type:'Min',
            field: '',
            CustomLabel: ''
        },
        'Max':{
            type:'Max',
            field: '',
            CustomLabel: ''
        },
        'Standard Deviation':{
            type:'Standard Deviation',
            field: '',
            CustomLabel: ''
        },
        'Unique Count':{
            type:'Unique Count',
            field: '',
            CustomLabel: ''
        },
        'Percentiles':{
            type:'Percentiles',
            field: '',
            Percents:[1,5,25,50,75,95,99],
            CustomLabel: ''
        },
        'Percentile Ranks':{
            type:'Percentile Ranks',
            field: '',
            Values:[],
            CustomLabel: ''
        }
    }
})()