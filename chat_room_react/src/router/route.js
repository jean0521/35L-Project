import { Navigate } from 'react-router-dom'
import Home from '../views/home/index';
import UserLogin from '../views/user/login';
import UserRegister from '../views/user/register';
import Chat from '../views/chat';

const routesList = [
    {
        path: '/home/:id?',
        element: <Home />,
        meta:{
            title: 'Homepage',   //首页
            isLogin: true
        },
        children: []
    },
    {
        path: '/Chat',
        element: <Chat />,
        meta:{
            title: 'Homepage',   //首页
            isLogin: true
        },
        children: []
    },
    {
        path: '/',
        element: <Navigate to="/home" />,
        meta:{
            title: 'Homepage',   //首页
            isLogin: false
        },
    },
    {
        path: '/user/login',
        meta:{
            title: 'User-Login',   //用户-登录
            isLogin: false
        },
        element: <UserLogin />
    },
    {
        path: '/user/register',
        meta:{
            title: 'User-Register',   //用户-注册
            isLogin: false
        },
        element: <UserRegister />
    },
]

export default routesList;
