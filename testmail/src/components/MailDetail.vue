<template>
    <div class="mask" v-if="show" @click="close()">
        <div class="detail-content">
            <van-icon name="arrow-up" size="3rem" @click.stop="go('up')" />
            <div class="datail-item" v-if="currentDetail">
                <div class="item-top">
                    <van-icon name="contact" size="6rem" />
                    <div class="pre-info">
                        <span class="name-text">{{ currentDetail.name }}</span>
                        <div class="pre-appraise">
                            <div class="fo-content">
                                <van-icon name="user-o" />
                                <span>0 followers</span>
                            </div>
                            <div class="fo-content">
                                <van-icon name="diamond-o" />
                                <span>0 starts</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item-other">
                    <div class="title">
                        <van-icon name="envelop-o" />
                        <span>Email</span>
                    </div>
                </div>
                <div class="item-other">
                    <div class="title">
                        <van-icon name="info-o" />
                        <span>Bio</span>
                    </div>
                </div>
            </div>
            <van-icon name="arrow-down" size="3rem" @click.stop="go('down')" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MailDetail',
  data () {
    return {
      currentDetail: {}, // 当前联系人详情
      indexPre: 0 // 当前联系人在排序列表中的索引下标
    }
  },

  props: {
    id: String, // 联系人id
    show: Boolean
  },
  computed: {
    ...mapState(['contactsSort'])
  },
  watch: {
    id () {
      this.currentDetail = {}
      this.makeCurrentPre()
    }
  },
  created () {
    // this.makeCurrentPre()
  },
  methods: {
    // 关闭弹窗
    close () {
      // 关闭弹窗时就将id置空防止再次点击，监听不到
      this.$emit('koId')
      this.$emit('close')
    },
    // 根据id筛选出当前联系人
    makeCurrentPre () {
      this.contactsSort.forEach((item, i, arr) => {
        if (this.id === item.id) {
          this.indexPre = i
          this.currentDetail = item
        }
      })
    },

    /**
     * 点击箭头切换联系人
     * @param {*} str 区分是上移还是下移
     */
    go (str) {
      if ((this.indexPre === 0 && str === 'up') || (this.indexPre === this.contactsSort.length - 1 && str === 'down')) {
        return
      }
      str === 'up' ? this.indexPre = this.indexPre - 1 : this.indexPre = this.indexPre + 1
      this.currentDetail = this.contactsSort[this.indexPre]
    }

  }
}
</script>

<style lang="scss" scoped>
.mask {
    z-index: 10;
    background: #ebedf0c9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .detail-content {
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .datail-item {
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            margin: 0.5rem;
            border-radius: 0.3rem;
            width: 100%;

            .item-top {
                display: flex;
                justify-content: flex-start;
                padding: 0.3rem;

                .pre-info {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: flex-start;
                    margin-left: 1rem;

                    .name-text {
                        font-size: 1.5rem;
                        color: #333;
                    }

                    .pre-appraise {
                        justify-content: flex-start;
                        display: flex;
                        font-size: 1.2rem;
                        align-items: center;

                        .fo-content {
                            margin-right: 1rem;

                            span {
                                margin-left: 0.3rem;
                            }
                        }
                    }
                }
            }

            .item-other {
                display: flex;
                flex-direction: column;
                padding: 0.5rem 1rem;
                font-size: 1.2rem;

                .title {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;

                    span {
                        margin-left: 0.5rem;
                    }
                }
            }
        }
    }

}
</style>
