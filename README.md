# 项目介绍

react_cli_lg 是一个快速启动 react 的脚手架

## 技术栈

react + redux + react-router + vite + ES6/7 + sass + antd + typescript

# 项目运行

```
git clone https://github.com/lvguangai/react_cli_lg.git

cd react_cli_lg

npm install (安装依赖包)

npm run vite (访问)

npm run build (项目打包)

访问: http://localhost:5173/

```

# 依赖库文档

[Classnames](github.com/JedWatson/classnames)
[ahooks](https://ahooks.gitee.io/zh-CN/hooks/use-event-listener)

# 目标功能

- [√] '路由' -- 已完成
- [√] '请求封装' -- 已完成
- [√] 'antd css 降级' -- 已完成
- [x] '代理配置' -- 进行中

# 项目布局

```
.react_cli_lg
├── public                                      // 打包资源放置
├── src                                         // 源码目录
│   ├── component                               // 公共组件
│   ├── config                                  // 静态数据资源配置
│   ├── pages                                   // 页面组件
│   ├── redux                                   // redux的状态管理
│   ├── router
│   │   └── index.js                            // 路由配置
│   ├── service                                 // 数据交互统一调配
│   │   └── config.js                           // 请求资源统一拦截处理
│   ├── static(assets)                          // 存放静态资源（image， js）
│   ├── utils                                   // 工具类
│   ├── App.js                                  // 页面入口文件
│   ├── index.js                                // 程序入口文件，加载各种公共组件
│   ├── setupProxy.js                           // 请求代理设置
├── gitignore                                   // git屏蔽提交模块
├── env.dev(pro)                                // 环境变量配置
├── .eslintrc                                   // 代码规范配置
├── prettierrc                                  // 代码美化配置
├── tsconfig                                    // typescript配置
.
```
