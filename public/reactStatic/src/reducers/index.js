import { combineReducers } from 'redux'

const testReducer = (state = 0,action)=>{
  switch(action.type){
    case 'TEST' :
      return 1
    default :
      return state
  }	
}
const metrics = (state=[],action)=>{
  switch(action.type){
    case 'ADD_METRICS' :
      return [...state,action.m]  
    case 'REMOVE_METRICS' :
      return state.filter((item, index) => index !== action.i)
    case 'MODEFY_METRICS' :
      return state.map((item,index)=>{if(index==action.i){return action.m}else{return item}})
    default : 
      return state    
  }  
}
const buckets = (state=[],action)=>{
  switch(action.type){
    case 'ADD_BUCKET' :
      return [...state,action.b]  
    case 'REMOVE_BUCKET' :
      return state.filter((item, index) => index !== action.i)
    case 'MODEFY_BUCKET' :
      return state.map((item,index)=>{if(index==action.i){return action.b}else{return item}})
    default : 
      return state    
  }    
}
// const posts = (state = {
//   isFetching: false,
//   didInvalidate: false,
//   items: []
// }, action) => {
//   switch (action.type) {
//     case INVALIDATE_REDDIT:  //刷新
//       return {
//         ...state,
//         didInvalidate: true
//       }
//     case REQUEST_POSTS:  //通知reducer开始请求
//       return {
//         ...state,
//         isFetching: true,   //正在请求的标志为true 则在请求，为false则请求完毕 应用里来控制loading的现实和隐藏
//         didInvalidate: false
//       }
//     case RECEIVE_POSTS:  //通知reducer请求成功
//       return {
//         ...state,
//         isFetching: false,
//         didInvalidate: false,
//         items: action.posts,
//         lastUpdated: action.receivedAt
//       }
//     default:
//       return state
//   }
// }
const postsByKibanaResult = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        //...state,[action.reddit]: posts(state[action.reddit], action)
      }
    default:
      return state
  }
}
const rootReducer = combineReducers({
  testReducer,
  metrics,
  buckets,
  //postsByKibanaResult
})
export default rootReducer