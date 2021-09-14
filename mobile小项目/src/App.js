import React,{Suspense} from 'react'
import { BrowserRouter as Router,Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import routers from './config/routers'
import './App.css'
import store from './redux/store'

export default function App(){
    return(
        <Provider store={store}>
        <Suspense fallback={<h1 style={{color:'red'}}>正在加载中...</h1>}>
            <Router>
                {routers.map((item)=><Route key={item.path} path={item.path} component={item.component} exact={item.exact}></Route>)}
            </Router>
        </Suspense>
        </Provider>
    )
}