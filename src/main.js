import Vue from 'vue'
import App from './app.vue'
import './plugins/element.js'
import router from './router'
import VueRouter from 'vue-router'
import store from './store'
import db from './db/datastore'

Vue.use(VueRouter)

Vue.config.productionTip = false

Vue.prototype.$imgSrc = (name) => {
    let imgSrc = null
    if (process.env.NODE_ENV === 'development') {
        imgSrc = require('./assets/' + name)
    } else {
        imgSrc = require('./assets/' + name)
    }
    return imgSrc
}

Vue.prototype.$db = db

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
