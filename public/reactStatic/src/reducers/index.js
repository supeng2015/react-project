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
const rangeFromTo = (state=[],action)=>{
  switch(action.type){
    case 'ADD_FROMTO' :
      return [...state,action.f]  
    case 'REMOVE_FROMTO' :
      return state.filter((item, index) => index !== action.i)
    case 'MODEFY_FROMTO' :
      return state.map((item,index)=>{if(index==action.i){return action.f}else{return item}})
    default : 
      return state    
  }    
}
const rootReducer = combineReducers({
  rangeFromTo,
  testReducer,
  metrics,
  buckets
})
export default rootReducer