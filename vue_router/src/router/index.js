import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import ('components/Home')
const About = () => import ('components/About')
const User = () => import ('components/User')
const Profile = () => import ('components/Profile')
const HomeMessage = () => import('components/HomeMessage')
const HomeNews = () => import('components/HomeNews')

const routes = [
    {
        path:"/",
        redirect:"/home",
        meta:{
            title:"首页"
        }
    },
    {
        path:"/home",
        component:Home,
        children:[
            {
                path:"/",
                redirect:"news"
            },
            {
                path: "news",
                component: HomeNews
            },
            {
                path:"Message",
                component: HomeMessage
            }
        ],
        meta:{
            title:"首页"
        }
    },
    {
        path:'/about',
        component:About,
        meta:{
            title:"关于"
        }
    },
    {
        path:'/user/:userId',
        component:User,
        meta:{
            title:"用户"
        }
    },
    {
        path:'/profile',
        component:Profile,
        meta:{
            title:"我的"
        }
    }
]

const router = new VueRouter({
    routes,
    mode:'history',
    linkActiveClass:"active"

})

router.beforeEach((to,from,next) => {
    console.log(to);
    document.title = to.matched[0].meta.title
    next()
})

router.afterEach((to,from) =>{
    console.log('----');
})
export default router