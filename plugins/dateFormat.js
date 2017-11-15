import Vue from 'vue'

// dateformat YYYY-MM-DD
Vue.filter('toYMD', (date) => {
    if (!date) return date
    date = new Date(date)
    return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours() >= 12 ? '下午':'上午'}`
})