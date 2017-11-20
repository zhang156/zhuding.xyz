<template>
  <div class="calendar">
    <div class="calendar_head clear">
      <span class="calendar_head_title">{{ currDate }}</span>
      <span class="calendar_control">
        <i class="iconfont icon-shang" @click="toLastMonth"></i><i class="iconfont icon-shang" @click="toNextMonth"></i>
      </span>
    </div>

    <div class="calendar_body">
      <div class="calendar_body_title">
        <span v-for="(item, index) in days" :key="index">{{ item }}</span>
      </div>

      <div class="calendar_body_date">
        <div v-for="(item, index) in 6" :key="item" class="date_list">
          <div v-for="(sub_item, sub_index) in dateData.slice(index*7, index*7+7)" 
            :key="`data${sub_index}`" class="date_sub_item">
            <div @click="selectDate(sub_item,index*7+sub_index)" 
              :class="{'noCur': sub_item.type!=='cur','active': activeDate===sub_item.date}">{{ sub_item.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calendar',
  data () {
    return {
      days: ['一', '二', '三', '四', '五', '六', '日'],
      dateData: [],
      currYear: new Date().getFullYear(),
      currMonth: new Date().getMonth() + 1,
      activeDate: this.toYMD(new Date())
    }
  },
  computed: {
    currDate () {
      return this.currYear + '年' + this.currMonth + '月'
    }
  },
  created () {
     /* 
      * 默认加载包括当月的日期 
      * 1. 本月日期必须完整包含
      * 2. 必须同时拥有3个月的数据
      */
      this.date_init(new Date());
  },
  methods: {
    selectDate (item, index) {
      this.activeDate = item.date
      // 筛选此日期的文章

    },
    toLastMonth () {
      if (this.currMonth === 1) {
        --this.currYear
        this.currMonth = 12
      } else {
        --this.currMonth
      }
      this.date_init(new Date(this.currYear + '-' + this.currMonth))
    },
    toNextMonth () {
      if (this.currMonth === 12) {
        ++this.currYear
        this.currMonth = 1
      } else {
        ++this.currMonth
      }
      this.date_init(new Date(this.currYear + '-' + this.currMonth + '-01'))
    },
    date_init(date) {
      if (!(date instanceof Date)) return 
      // 获取本月的天数
      var curDays = this.getMonthDays(date, date.getMonth()),
          lastDays = 0,
          nextDays = 0
      // 判断本月的第一天是否是周一
      var isMonday = new Date(new Date(date).setDate(1)).getDay() === 1
      var lastMonthArr = [],
          curMonthArr = [],
          nextMonthArr = []
      
      if (isMonday) {
        // 本月第一天周一则本月从第二行排列 展示第一月7天数据
        lastDays = 7
        var arrLength = this.getMonthDays(date, date.getMonth()-1)
        lastMonthArr = Array.apply(null, Array(arrLength)).map((item, index) => {
          if (arrLength - index - 1 < 7) {
            return {
              value: index + 1,
              date: this.toYMD(new Date(new Date(date).setMonth(date.getMonth()-1, index+1))),
              type: 'last'
            }
          }
        })
        lastMonthArr = lastMonthArr.slice(arrLength-lastDays)
      } else {
        // 非周一则本月从第一行排列
        var day = (new Date(new Date(date).setDate(1))).getDay() || (new Date(new Date(date).setDate(1))).getDay() + 7
        lastDays = day - 1
        var arrLength = this.getMonthDays(date, date.getMonth()-1)
        lastMonthArr = Array.apply(null, Array(arrLength)).map((item, index) => {
          if (arrLength - index < day) {
            return {
              value: index + 1,
              date: this.toYMD(new Date(new Date(date).setMonth(date.getMonth()-1, index+1))),
              type: 'last'
            }
          }
        })
        lastMonthArr = lastMonthArr.slice(arrLength-lastDays)
      }

      curMonthArr = Array.apply(null, Array(curDays)).map((item, index) => {
        return {
          value: index + 1,
          date: this.toYMD(new Date(new Date(date).setMonth(date.getMonth(), index+1))),
          type: 'cur'
        }
      })
      nextDays = 42 - (curDays + lastDays)
      nextMonthArr = Array.apply(null, Array(nextDays)).map((item, index) => {
        if (index < nextDays)
          return {
            value: index + 1,
            date: this.toYMD(new Date(new Date(date).setMonth(date.getMonth()+1, index+1))),
            type: 'next'
          }
      })
      this.dateData = lastMonthArr.concat(curMonthArr).concat(nextMonthArr)
    },
    getMonthDays (date, month) {
      if (!(date instanceof Date)) return 0

      var lastMonth = new Date(date).setMonth(month, 1)
      var curMonth = new Date(date).setMonth(month + 1, 1)
      return (curMonth - lastMonth)/1000/3600/24
    },
    toYMD (date) {
      return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .calendar {
    padding: .5rem .5rem;
    background: #fff;
    border-radius: 4px;

    .calendar_head {
      padding: .5rem .5rem 1rem;

      .calendar_head_title {
        float: left;
        vertical-align: middle;
      }

      .calendar_control {
        float: right;
        vertical-align: middle;

        .iconfont {
          font-size: 1.5rem;

          &:hover {
            cursor: pointer;
          }
        }

        .iconfont:nth-child(1) {
          margin-right: 1rem;
        }

        .iconfont:nth-child(2) {
          display: inline-block;
          transform: rotateZ(180deg);
        }
      }
    }

    .calendar_body {
      .calendar_body_title {
        display: flex;
        padding: 0 0 .6rem;

        > span {
          flex: 1;
          text-align: center;
        }
      }

      .calendar_body_date {
        .date_list {
          display: flex;
          padding: .1rem 0;

          .date_sub_item {
            flex: 1;
            text-align: center;
            overflow: hidden;

            > div {
              display: inline-block;
              text-align: center;
              height: 2.4rem;
              line-height: 2.4rem;
              width: 2.4rem;
              border-radius: 100%;
              cursor: pointer;

              &.active {
                background-color: hsla(0,0%,77%,.4);
              }

              &.noCur {
                color: #ccc;
              }

              &:hover {
                background-color: hsla(0,0%,77%,.2)
              }
            }
          } 
        }
      }
    }
  }
</style>

