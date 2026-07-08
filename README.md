# 项目介绍

lg_react_cli 是一个快速启动 react 的脚手架

## 技术栈

React 19 + React Router 7 + Vite 8 + TypeScript 6 + Sass + Ant Design 6 + Axios

## 环境要求

- Node.js >= 22.13.0
- pnpm 11.7.0

> 说明：Vite 8 本身支持 Node.js >= 20.19.0 或 >= 22.12.0，但本项目固定使用 `pnpm@11.7.0`，该版本要求 Node.js >= 22.13.0，因此项目运行环境统一按 Node.js 22.13.0+ 配置。

# 项目运行

```
git clone https://github.com/lvguangai/lg_react_cli.git

cd lg_react_cli

nvm install

nvm use

npm install -g pnpm@11.7.0 --force

pnpm install

pnpm dev

pnpm build

访问: http://localhost:5173/

```

## 常用命令

```
pnpm dev       # 本地开发
pnpm build     # 类型检查并生产打包
pnpm lint      # ESLint 自动修复并检查
pnpm preview   # 预览生产构建
```

## Corepack 签名问题

如果执行 `pnpm` 或 `corepack prepare pnpm@11.7.0 --activate` 时报错：

```
Cannot find matching keyid
```

这是当前 Node 自带 Corepack 签名 key 过旧导致的，不是项目代码问题。建议直接绕开 Corepack，使用当前 Node 版本安装 pnpm：

```
nvm use
corepack disable
npm install -g pnpm@11.7.0 --force

node -v
pnpm -v
which pnpm
```

确认输出满足：

```
node -v  # v22.13.0 或更高
pnpm -v  # 11.7.0
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
