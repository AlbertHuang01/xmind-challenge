import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from "axios";
import {Button} from 'antd'
import 'antd/dist/antd.min.css'

// 设置 axios 请求时的 baseURL
axios.defaults.baseURL = "http://127.0.0.1:3001";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <div>
      <h1>react</h1>
      <Button type={"primary"}>按钮</Button>
    </div>
)
