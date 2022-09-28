const AntdDayjsWebpackPlugin =require('antd-dayjs-webpack-plugin')

module.exports = {
  webpack:{
    plugins:{
      add:[
        // 该插件用于实现替换 antd moment.js 为 day.js
        new AntdDayjsWebpackPlugin()
      ]
    }
  }
};
