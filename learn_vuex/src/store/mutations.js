export default {
    increment(state) {
        state.counter++
    },
    decrement(state) {
        state.counter--
    },
    // addCount(state,count){
    //     state.counter += count
    // },
    addCount(state, payload) {
        state.counter += payload.count
    },
    addStudent(state, stu) {
        state.students.push(stu)
    },
    updateInfo(state) {
        state.info.name = "linghuifang"
        // state.info['address']="洛杉矶"
        // Vue.set(state.info,"address","洛杉矶")
        // Vue.delete(state.info,"age")

        //错误代码，不能在这里进行一步操作
        // setTimeout(() => {
        //     state.info.name="lingyangling"
        // }, 1000);
    }
}