import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: [
      {
        name: '张三',
        py: 'zhnagsan',
        id: '01'
      },
      {
        name: '李四',
        py: 'lisi',
        id: '02'
      },
      {
        name: '王五',
        py: 'wangwu',
        id: '03'
      },
      {
        name: '赵六',
        py: 'zhaoliu',
        id: '04'
      },
      {
        name: '钱七',
        py: 'qainqi',
        id: '05'
      },
      {
        name: '王三',
        py: 'wangsan',
        id: '06'
      },
      {
        name: '刘巴',
        py: 'liuba',
        id: '07'
      },
      {
        name: '杨大',
        py: 'yangda',
        id: '08'
      },
      {
        name: '黄瑶',
        py: 'huangyao',
        id: '09'
      },
      {
        name: '吴勇',
        py: 'wuyong',
        id: '10'
      },
      {
        name: '周丽',
        py: 'zhouli',
        id: '11'
      },
      {
        name: '徐达',
        py: 'xuda',
        id: '12'
      },
      {
        name: '孙权',
        py: 'sunquan',
        id: '13'
      },
      {
        name: '马路',
        py: 'malu',
        id: '14'
      },
      {
        name: '胡大大',
        py: 'hudada',
        id: '15'
      },
      {
        name: '郭襄',
        py: 'guoxiang',
        id: '16'
      },
      {
        name: '何以',
        py: 'heyi',
        id: '17'
      },
      {
        name: '林栋',
        py: 'lindong',
        id: '18'
      },
      {
        name: '高要',
        py: 'gaoyao',
        id: '19'
      }
    ], // 联系人
    tempContacts: [], // 筛选后的联系人
    indexArr: [], // 索引集合
    mailList: [], // 通讯录
    contactsSort: [] // 排序后的联系人列表
  },
  getters: {
  },
  mutations: {
    // 进行联系人按字母分组排序
    dataLetterSort (state) {
      const list = []
      const resault = []
      state.tempContacts.forEach((item, i, arr) => {
        // 首字母大写
        const letter = item.py.substr(0, 1).toUpperCase()
        // 创建分组
        if (!(letter in list)) {
          list[letter] = []
        }
        // 分组添加数据
        list[letter].push(item)
      })
      // 转换 格式 进行 排序；
      for (const key in list) {
        resault.push({
          letter: key,
          list: list[key]
        })
      }
      resault.sort(function (x, y) {
        return x.letter.charCodeAt(0) - y.letter.charCodeAt(0)
      })
      // 转换 数据 格式
      state.mailList = resault
      state.indexArr = []
      state.contactsSort = []
      for (let i = 0; i < resault.length; i++) {
        if (resault[i].list.length > 0) {
          // 取出排序后的索引字母
          state.indexArr[i] = resault[i].letter
          // 取出排序后的联系人
          resault[i].list.forEach((item) => {
            state.contactsSort.push(item)
          })
        }
      }
    },
    // 搜索框筛选
    searchMail (state, str) {
      // 存储筛选后的联系人
      state.tempContacts = state.contacts.filter(item => item.name.includes(str))
    }
  },
  actions: {
  },
  modules: {
  }
})
