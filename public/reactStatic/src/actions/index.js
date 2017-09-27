export const addMetrics = m =>({
  type:'ADD_METRICS',
  m
})
export const removeMetrics = i =>({
  type:'REMOVE_METRICS',
  i
})
export const modefyMetrics = (m,i) =>({
  type : 'MODEFY_METRICS',
  m,
  i
})
export const addBucket = b =>({
  type : 'ADD_BUCKET',
  b
})
export const removeBucket = i =>({
  type:'REMOVE_BUCKET',
  i
})
export const modefyBucket = (b,i) =>({
  type:'MODEFY_BUCKET',
  b,
  i
})

export const requestPosts = kibana => ({
  type: 'REQUEST_POSTS',
  kibana
})
export const receivePosts = (kibana, json) => ({
  type: 'RECEIVE_POSTS',
  kibana,
  posts: json.data.map(child => child.data),
  receivedAt: Date.now()
})
export const invalidateReddit = kibana => ({
  type: 'INVALIDATE_REDDIT',
  kibana
})
export const fetchPosts = kibana => dispatch => {
  dispatch(requestPosts(kibana))
  return fetch(`http://localhost:3000/artical`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(kibana, json)))
}


// bucket2的Action
export const changeBucketType = (index,bucketData) => {
    return {
        type: 'CHANGE_BUCKET_TYPE',
        index,
        bucketData
    }
};

export const modifyBucket2 = (index,key,value) => {
  return {
      type: 'MODIFY_BUCKET2',
      index,
      key,
      value
  }
};

export const addBucket2 = (bucketData) => {
    return {
        type: 'ADD_BUCKET2',
        bucketData
    }
};

