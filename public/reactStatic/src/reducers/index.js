import {combineReducers} from 'redux'

const testReducer = (state = 0, action) => {
    switch (action.type) {
        case 'TEST' :
            return 1
        default :
            return state
    }
}
const metrics = (state = [], action) => {
    switch (action.type) {
        case 'ADD_METRICS' :
            return [...state, action.m]
        case 'REMOVE_METRICS' :
            return state.filter((item, index) => index !== action.i)
        case 'MODEFY_METRICS' :
            return state.map((item, index) => {
                if (index == action.i) {
                    return action.m
                } else {
                    return item
                }
            })
        default :
            return state
    }
}
const buckets = (state = [], action) => {
    switch (action.type) {
        case 'ADD_BUCKET' :
            return [...state, action.b]
        case 'REMOVE_BUCKET' :
            return state.filter((item, index) => index !== action.i)
        case 'MODEFY_BUCKET' :
            return state.map((item, index) => {
                if (index == action.i) {
                    return action.b
                } else {
                    return item
                }
            })
        default :
            return state
    }
};

// 新增bucket2的reducer
const buckets2 = (state = [{
    type: "Data Histogram",
    field: "",
    interval: ""
}], action) => {
    switch (action.type) {
        case 'CHANGE_BUCKET_TYPE':
            return state.map((item,index)=>{
                if(index === action.index){
                    return action.bucketData;
                }else{
                    return item;
                }
            });
        case 'MODIFY_BUCKET2':
            const newState = [...state];
            newState[action.index][action.key]=action.value;
            return newState;
        case 'ADD_BUCKET2':
            return [...state, action.bucketData];
        default:
            return state
    }
};

const rootReducer = combineReducers({
    //rangeFromTo,
    testReducer,
    metrics,
    buckets,
    buckets2
});
export default rootReducer