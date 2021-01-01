import Login from './components/user/login'
import Register from './components/user/register'
import Main from './components/main/main'
import VueRouter from 'vue-router'

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
        {path: '/', name: 'login', component: Login},
        {path: '/register', name: 'register', component: Register},
        {path: '/main', name: 'name', component: Main}
    ]
})

export default router