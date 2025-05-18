const state ={
    isCollapse: false,
    selectMenu: []
}

const mutations = {
    collapseMenu(state){
        // 取反
        state.isCollapse = !state.isCollapse
    },
    // 记录点击的tag数据
    addMenu(state,payload){
        // 对数据进行去重
        // 如果item.path === payload.path 说明能找到这个tag的索引，否则就等于-1，压入state
       if (state.selectMenu.findIndex(item => item.path === payload.path) === -1) {
            state.selectMenu.push(payload)
        }
    },
    closeMenu(state,payload){
        // 找到点击tab的索引
       const index =  state.selectMenu.findIndex(val => val.name === payload.name )
        // 通过索引删除数组指定元素
        state.selectMenu.splice(index,1)


    }
}

export default {
    state,
    mutations
}
