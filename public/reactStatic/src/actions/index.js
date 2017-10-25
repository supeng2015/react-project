export const addMetrics = m => ({
    type: 'ADD_METRICS',
    m
})
export const removeMetrics = i => ({
    type: 'REMOVE_METRICS',
    i
})
export const modefyMetrics = (m, i) => ({
    type: 'MODEFY_METRICS',
    m,
    i
})
export const addBucket = b => ({
    type: 'ADD_BUCKET',
    b
})
export const removeBucket = i => ({
    type: 'REMOVE_BUCKET',
    i
})
export const modefyBucket = (b, i) => ({
    type: 'MODEFY_BUCKET',
    b,
    i
})

//userInfo
const userInfo = (user) => ({
    type: "LOGIN",
    user
})
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
}
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


export const requestPosts = kibana => ({
    type: 'REQUEST_POSTS',
    kibana
})
export const receivePosts = (kibana, json) => ({
    type: 'RECEIVE_POSTS',
    kibana,
    posts: json.responses.map(child => child),
    receivedAt: Date.now()
})
export const invalidateReddit = kibana => ({
    type: 'INVALIDATE_REDDIT',
    kibana
})
export const fetchPosts = kibana => dispatch => {
    dispatch(requestPosts(kibana))
    return fetch(`http://localhost:3000/kibana`)
        .then(response => response.json())
        .then(json => dispatch(receivePosts(kibana, json)))
}

//Metrics2的Action
export const addMetrics2 = (index, metricsData) => {
    return {
        type: 'ADD_METRICS2',
        index,
        metricsData
    }
}

// bucket2的Action
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
<<<<<<< HEAD
export const addMetricsData = (data) => {
    return{
        type:'ADD_METRICS_PANEL_DATA',
        data
    }
};
=======

export const updateContent = (contentObj) => {
    return {
        type: 'UPDATE_CONTENT',
        contentObj
    }
};
>>>>>>> af4cac49e59a8a4bef917fd102a889592f940487
