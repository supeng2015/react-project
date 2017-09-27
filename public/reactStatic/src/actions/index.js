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

export const requestPosts = reddit => ({
  type: REQUEST_POSTS,
  reddit
})
export const receivePosts = (reddit, json) => ({
  type: RECEIVE_POSTS,
  reddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})
export const invalidateReddit = reddit => ({
  type: INVALIDATE_REDDIT,
  reddit
})
const fetchPosts = reddit => dispatch => {
  dispatch(requestPosts(reddit))
  return fetch(`https://www.reddit.com/r/${reddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(reddit, json)))
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

