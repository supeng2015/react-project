import {combineReducers} from 'redux'

const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';
const REQUEST_POSTS = 'REQUEST_POSTS';
const RECEIVE_POSTS = 'RECEIVE_POSTS';

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

//发送json组合获取返回的结果
const posts = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) => {
    switch (action.type) {
        case INVALIDATE_REDDIT:  //刷新
            return {
                ...state,
                didInvalidate: true
            }
        case REQUEST_POSTS:  //通知reducer开始请求
            return {
                ...state,
                isFetching: true,   //正在请求的标志为true 则在请求，为false则请求完毕 应用里来控制loading的现实和隐藏
                didInvalidate: false
            }
        case RECEIVE_POSTS:  //通知reducer请求成功
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}
const postsByKibanaResult = (state = {}, action) => {
    switch (action.type) {
        case INVALIDATE_REDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return {
                ...state, [action.kibana]: posts(state[action.kibana], action)
            }
        default:
            return state
    }
}

//登录用户信息
const user=(state={},action)=>{
  switch(action.type){
    case 'LOGIN' :
      return action.user
    default :
      return state        
  }    
}




//metrics2的reducer
const metrics2 = (state = [{type: 'Count', CustomLabel: ''}], action) => {

    switch (action.type) {
        case 'MODIFY_METRICS2':
            const newState = [...state];
            //更新此时这个metrics下key(例如为Percents)的新数据为新传入的value
            newState[action.index][action.key] = action.value;
            return newState;
        case 'ADD_METRICS2':
            console.log('reducer新的数据：'+JSON.stringify([...state, action.metricsData]));
            return [...state, action.metricsData];
        case 'CHANGE_METRICS_TYPE':
            //遍历state，遍历完会重新组合生成一个新的state
            return state.map((item, index) => {
                if (index === action.index) {
                    return action.metricsData;
                } else {
                    return item;
                }
            });
        case 'DEL_METRICS2':
            state.splice(action.index,1);
            return state;
        default:
            return state;
    }
};

// 新增bucket2的reducer
const buckets2 = (state = [{
    type: "Data Histogram",
    field: "",
    interval: "",
    label: ""
}], action) => {
    switch (action.type) {
        case 'CHANGE_BUCKET_TYPE':
            return state.map((item, index) => {
                if (index === action.index) {
                    return action.bucketData;
                } else {
                    return item;
                }
            });
        case 'MODIFY_BUCKET2':
            const newState = [...state];
            newState[action.index][action.key] = action.value;
            return newState;
        case 'ADD_BUCKET2':
            return [...state, action.bucketData];
        case 'DEL_BUCKET2':
            return state.filter((item, index) => {
                return action.index !== index
            });
        default:
            return state
    }
};

const rootReducer = combineReducers({
    user,
    postsByKibanaResult,
    testReducer,
    metrics,
    buckets,
    buckets2,
    metrics2
});
export default rootReducer