
//requestAnimationFrame有兼容性问题
var DEFAULT_INTERVAL = 1000 / 60
var requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback,callback.interval||DEFAULT_INTERVAL) //低版本的IE返回值
    }

})() //立即执行的requestAnimationFrame，拿到正真的浏览器支持的requestAnimationFrame，在接下来的执行中就不比在进行兼容性检测

var cancelAnimationFrame = (function () {
  return window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    function (id) {
      return window.clearTimeout(id)
    }
})()

//TimeLine的状态管理
var STATE_INITAL = 0
var STATE_START = 1
var STATE_STOP = 2


/**
 * 时间轴类
 * @constructor
 */
function TimeLine () {
  this.animationHandler = 0;
  this.state = STATE_INITAL
}

/**
 * 时间轴上每一次执行的回调函数，定义时为空方法
 * TimeLime会在合适的时间调用，是需要每个TimeLine实例去实现
 * @param time 从动画开始到当前执行的时间
 */
TimeLine.prototype.onenterfram = function (time) {
  
}
/**
 * 动画开始
 * @param interval 每次回调的间隔时间
 */
TimeLine.prototype.start = function (interval) {
   if (this.state === STATE_START){
     return
   }
   this.state = STATE_START
  this.interval = interval || DEFAULT_INTERVAL
  startTimeLine(this,+new Date())
}
/**
 * 动画停止
 */
TimeLine.prototype.stop = function () {

}
/**
 * 重新开始动画
 */
TimeLine.prototype.restart = function () {

}

/**
 * 时间轴动画启动函数
 * @param timeLine 时间轴实例类
 * @param startTime 动画开始时间
 */
function startTimeLine (timeLine,startTime) {
  timeLine.startTime = startTime
  nextTick.interval = timeLine.interval
  //记录上一次回调的时间戳
  var lastTick = +new Date()
  /**
   * 每一帧执行的函数
   */
  function nextTick () {
    var now = +new Date()
    timeLine.animationHandler = requestAnimationFrame(nextTick)
  }


}
