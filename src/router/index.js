import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

// 防止重复访问同一路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
    routes: [
        {
            path: "/",
            component: () => import("components/page/BlogHome")
        },
        {
            path: "/(home|algorithm|development|other)/:id(\\d+)",
            name: "BlogHome",
            component: () => import("components/page/BlogHome")
        },
        {
            path: "/post/:pid(\\d+)",
            name: "BlogHomePost",
            component: () => import("components/page/MyPost"),
            children: [
                {
                    path: "comment/:id(\\d+)",
                    component: () => import("components/page/MyPost")
                }
            ]
        },
        {
            path: "/message/:id(\\d+)",
            name: "BlogMessage",
            component: () => import("components/page/BlogMessage")
        }
    ]
})

router.afterEach(() => {
    let pageUp = setInterval(() => {
            const speed = Math.floor(document.documentElement.scrollTop / 5)
            document.documentElement.scrollTop = document.body.scrollTop = document.documentElement.scrollTop - speed
            if (document.body.scrollTop <= 5 && document.documentElement.scrollTop <= 5) {
                clearInterval(pageUp);
                document.body.scrollTop = document.documentElement.scrollTop = 0
        }}, 16)
    //切换路由之后滚动条移到最顶部
})

export default router