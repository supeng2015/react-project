export const addMetrics = m => ({
    type: 'ADD_METRICS',
    m
});
export const removeMetrics = i => ({
    type: 'REMOVE_METRICS',
    i
});
export const modefyMetrics = (m, i) => ({
    type: 'MODEFY_METRICS',
    m,
    i
});
export const addBucket = b => ({
    type: 'ADD_BUCKET',
    b
});
export const removeBucket = i => ({
    type: 'REMOVE_BUCKET',
    i
});
export const modefyBucket = (b, i) => ({
    type: 'MODEFY_BUCKET',
    b,
    i
});

//userInfo
const userInfo = (user) => ({
    type: "LOGIN",
    user
});
export const fetchUserInfo = user => dispatch => {
    return fetch(`http://localhost:3000/userInfo`)
        .then(response => {
            return response.json()
        })
        .catch(function (e) {
            dispatch(userInfo({
                data: null,
                status: false
            }))
        })
        .then(json => {
            if (json) {
                dispatch(userInfo(json))
            }
        })
};

export const requestPosts = kibana => ({
    type: 'REQUEST_POSTS',
    kibana
});
export const receivePosts = (kibana, json) => ({
    type: 'RECEIVE_POSTS',
    kibana,
    posts: json.responses.map(child => child),
    receivedAt: Date.now()
});
export const invalidateReddit = kibana => ({
    type: 'INVALIDATE_REDDIT',
    kibana
});
export const fetchPosts = kibana => dispatch => {
    dispatch(requestPosts(kibana))
    return fetch('http://localhost:3000/kibana')
        .then(response => response.json())
        .then(json => dispatch(receivePosts(kibana, json)))
};

//Metrics2的Action
export const changeMetricsType = (index, metricsData) => {
    return {
        type: 'CHANGE_METRICS_TYPE',
        index,
        metricsData
    }
};

export const modifyMetrics2 = (index, key, value) => {
    return {
        type: 'MODIFY_METRICS2',
        index,
        key,
        value
    }
};
export const delMetrics2 = (index) => {
    return {
        type: 'DEL_METRICS2',
        index
    }
};

export const addMetrics2 = (metricsData) => {
    return {
        type: 'ADD_METRICS2',
        metricsData
    }
};

export const resetMetrics2 = () => {
    return {
        type: 'RESET_METRICS2'
    }
};

// bucket2值的Action
export const changeBucketType = (index, bucketData) => {
    return {
        type: 'CHANGE_BUCKET_TYPE',
        index,
        bucketData
    }
};

export const modifyBucket2 = (index, key, value) => {
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

export const delBucket2 = (index) => {
    return {
        type: 'DEL_BUCKET2',
        index
    }
};

export const resetBucket2 = () => {
    return {
        type: 'RESET_BUCKET2'
    }
};

// indexType的action
export const updateIndex = (indexValue) => {
    return {
        type: 'UPDATE_INDEX',
        indexValue
    }
};

export const updateIndexArray = (indexArray) => {
    return {
        type: 'UPDATE_INDEXARRAY',
        indexArray
    }
};

export const updateType = (typeValue) => {
    return {
        type: 'UPDATE_TYPE',
        typeValue
    }
};

export const updateTypeArray = (typeArray) => {
    return {
        type: 'UPDATE_TYPEARRAY',
        typeArray
    }
};

// 更新Content的action
export const updateContent = (contentObj) => {
    return {
        type: 'UPDATE_CONTENT',
        contentObj
    }
};

// 更新Field的action
export const updateField = (fieldObj) => {
    return {
        type: 'UPDATE_FIELD',
        fieldObj
    }
};

// 更新metric结构的action
export const updateMetricField = (fieldObj)=>{
    return {
        type: 'UPDATE_METRIC_FIELD',
        fieldObj
    }
};

export const addMetricConstructor = (fieldObj)=>{
    return {
        type: 'ADD_METRIC_CONSTRUCTOR',
        fieldObj
    }
};

export const delMetricConstructor = (index)=>{
    return {
        type: 'DEL_METRIC_CONSTRUCTOR',
        index
    }
};

// 更新bucket结构的action
export const updateBucketField = (fieldObj)=>{
    return {
        type: 'UPDATE_BUCKET_FIELD',
        fieldObj
    }
};

export const addBucketConstructor = (fieldObj)=>{
    return {
        type: 'ADD_BUCKET_CONSTRUCTOR',
        fieldObj
    }
};

export const delBucketConstructor = (index)=>{
    return {
        type: 'DEL_BUCKET_CONSTRUCTOR',
        index
    }
};