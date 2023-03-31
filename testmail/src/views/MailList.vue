<template>
  <div class="mail-list">
    <div class="search-content">
      <van-icon name="search" />
      <input type="text" v-model="value" @input="change" placeholder="Search..." />
    </div>
    <div class="letter-content" v-if="mailList.length > 0">
      <div class="mail-sort" ref="mailSort">
        <div class="mail-sort-content" v-for="(item, index) in mailList" :key="index">
          <h2 :class="current === index ? 'active' : ''">{{ item.letter }}</h2>
          <ul>
            <li v-for="(itemList, index)  in item.list" :key="index" @click="showDetail(itemList.id)">
              {{ itemList.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mail-index">
      <ul>
        <li v-for="(item, index) in indexArr" :key="index" @click="handleToIndex(index)"
          :class="current === index ? 'active' : ''">
          {{ item }}
        </li>
      </ul>
    </div>
    <MailDetail :id="id" :show="show" @close="closeCh()" @koId="koId()" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import MailDetail from '@/components/MailDetail.vue'
import debounce from '@/libs/tool/'
export default {
  name: 'MailList',
  components: {
    MailDetail
  },
  data () {
    return {
      value: '', // 输入框值
      current: null, // 选中的索引序号
      show: false, // 控制模态框显示
      id: '' // 联系人主键id
    }
  },
  computed: {
    ...mapState(['indexArr', 'mailList', 'tempContacts'])
  },
  created () {
    // 默认查询全部联系人
    this.filterBtn('')
  },
  methods: {
    ...mapMutations(['dataLetterSort', 'searchMail']),
    // 输入框改变触发
    change: debounce(function () {
      this.filterBtn(this.value)
    }, 300
    ),

    /**
     * 过滤
     * @param {*} str 输入框的值
     */
    filterBtn (str) {
      this.searchMail(str)
      this.dataLetterSort()
      const info = {
        str: str, // 搜索的值
        result: this.mailList // 搜搜的结果
      }
      this.saveOneDayRecord(info)
    },

    /**
     * 存储当前一天的搜索记录
     * @param {*} info 当前的搜索记录
     */
    saveOneDayRecord (info) {
      const end = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime() // 当天23：59：59秒 转换成的毫秒数
      const start = new Date().getTime() // 当前时间的毫秒数
      let recordList = [] // 存储搜索记录
      if (localStorage.getItem('endTime')) { // 首先判断本地有没有存入当天23：59：59秒的毫秒数
        if (start > localStorage.getItem('endTime')) { // 当前时间毫秒数大于当天23：59：59秒 条件成立
          // 清除操作
          localStorage.remove('endTime')
          localStorage.remove('recordList')
        }
      } else {
        localStorage.setItem('endTime', end) // 存入当天晚上23：59：59秒的毫秒数
      }
      // 先取出之前的搜索记录
      if (JSON.parse(localStorage.getItem('recordList'))) {
        recordList = JSON.parse(localStorage.getItem('recordList'))
      }
      recordList.push(info)
      localStorage.setItem('recordList', JSON.stringify(recordList))
    },

    /**
     * 点击右侧索引，左侧列表也滚动到指定的位置
     * @param {*} index 右侧字母的下表索引
     */
    handleToIndex (index) {
      this.current = index
      const mailItemDemo = this.$refs.mailSort.getElementsByClassName('mail-sort-content')
      let allHeight = 0
      // 计算需要滚动的高度
      for (let i = 0; i < index; i++) {
        allHeight += mailItemDemo[i].offsetHeight
      }
      allHeight = 8 * index + allHeight
      // 触发滚动
      this.$refs.mailSort.parentNode.scrollTop = allHeight
    },

    // 展示详情
    showDetail (id) {
      this.show = true
      this.id = id
    },
    // 关闭弹窗
    closeCh () {
      this.show = false
    },
    // 置空id
    koId () {
      this.id = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  color: red;
}

.mail-list {
  width: 30%;
  margin-left: 35%;
  padding: 3rem;
  border: 0.1rem solid;
  position: relative;
}

.search-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 0.05rem solid;
  padding: 0.1rem;

  input {
    border: none;
    margin-left: 0.5rem;
  }
}

.letter-content {
  display: flex;
  height: 29rem;
  overflow: auto;

  .mail-sort {
    flex: 1;

    .mail-sort-content {
      display: flex;
      flex-direction: column;
      margin-bottom: 0.5rem;

      h2 {
        display: flex;
        padding: 0.1rem 0;
        font-size: 0.5rem;
        font-weight: 600;
        text-align: left;
        border-bottom: 0.1rem solid #333;
      }

      ul {
        li {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-bottom: 0.05rem solid;
          padding: 0.3rem;
        }
      }
    }
  }
}

.mail-index {
  width: 1rem;
  right: 0.5rem;
  top: 12rem;
  position: absolute;

  li {
    cursor: pointer;
  }
}
</style>
