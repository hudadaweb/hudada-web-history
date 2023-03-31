# testmail
这是一个基于vue2的独立的前端项目，项目展示了一个通讯录示例
为了满足测试需求，使用vuex来处理组件之间的数据交互，当然也用到了正常的组件间传值
项目中为了提升性能vant组件库做了按需引入，对模糊查询做了防抖处理，对页面组件做了按需加载处理。
在存储搜索记录时，由于是一个独立的前端项目，我将数据存储于localStorage中，通过时间戳来管理记录
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
