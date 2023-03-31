// 防抖

const debounce = function (fn, delay) {
  let timer
  return function () {
    const th = this
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      timer = null
      fn.apply(th, args)
    }, delay)
  }
}

export default debounce
