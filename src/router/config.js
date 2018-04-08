import asyncComponent from './asyncComponent'

const _import_components = file => asyncComponent(() => import(`components/${file}`))
const _import_views = file => asyncComponent(() => import(`views/${file}`))

import NotFound from 'views/Error/404'

//含Layout视图
export const loyoutRouterMap = [
    { 
        path: '/', 
        name: '首页', 
        exact: true,
        component: _import_views('Home')
    },
    { 
        path: '/video', 
        name: '视频',
        component: _import_views('Video')
    },
    { 
        path: '/headline', 
        name: '微头条',
        component: _import_views('Headline')
    }
] 

// 不含Layout视图
export const notLoyoutRouterMap = [
    { 
        path: '/404', 
        name: '404', 
        component: NotFound
    },
    { 
        path: '/login', 
        name: '登陆', 
        component: _import_views('Login')
    },
    { 
        path: '/article/:id', 
        name: '文章', 
        component: _import_views('Article')
    },
    { 
        path: '/search', 
        name: '搜索',
        component: _import_views('Search')
    },
    { 
        path: '/account', 
        name: '我的', 
        component: _import_views('Account')
    },
    { 
        path: '/record/:type', 
        name: '收藏/历史',
        auth: true, 
        component: _import_views('Record')
    },
    { 
        path: '/mall', 
        name: '头条商城',
        auth: true, 
        component: _import_views('Mall')
    },
    { 
        path: '/msg', 
        name: '消息通知',
        auth: true, 
        component: _import_views('Msg')
    },
    { 
        path: '/jd', 
        name: '京东特供',
        auth: true, 
        component: _import_views('Jingdong')
    },
    { 
        path: '/feedback', 
        name: '用户反馈',
        auth: true, 
        component: _import_views('Feedback')
    },
    { 
        path: '/system', 
        name: '系统设置',
        auth: true, 
        component: _import_views('System')
    }
]

// 所有视图
export const routes = loyoutRouterMap.concat(notLoyoutRouterMap)