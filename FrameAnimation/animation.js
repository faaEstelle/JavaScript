'use strict'

var loadImage = require('./ImageLoader')
var TimeLine = require('./TimeLine')

//Animation的状态管理， 记录动画各个步骤的状态的变量
//初始化状态，
var STATE_INITIAL = 0
//开始状态
var STATE_START = 1
//停止状态
var STATE_STOP = 2
//同步任务
var TASK_SYNC = 0
//异步任务
var TASK_ASYNC = 1

/**
 * 简单的函数封装，执行callback
 * @param callback  执行的函数
 */
function next (callback) {
  callback && callback()
}

/**
 * 帧动画库类
 * @constructor
 */
function Animation () {
  this.taskQueue = [] //任务链
  this.index = 0 //索引值
  this.state = STATE_INITIAL
  this.timeline = new TimeLine()
}

/**
 * Animation类的扩展：
 * 添加一个同步任务：预加载图片
 * @param imgList 图片数组
 */
Animation.prototype.loadImage = function (imgList) {
  var taskFu = function (next) {
    loadImage(imgList.slice(0), next,)
  }
  var type = TASK_SYNC
  return this._add(taskFu, type)

}
/**
 * 添加一个异步定时任务：通过定时改变图片位置实现帧动画
 * @param ele DOM对象
 * @param positions 坐标数组
 * @param imgUrl  图片地址
 */
Animation.prototype.changePosition = function (ele, positions, imgUrl) {
  var len = positions.length
  var taskFn
  var type
  if (len) {
    var $this = this
    taskFn = function (next, time) {
      if (imgUrl) {
        ele.style.backgroundImage = 'url(' + imgUrl + ')'
      }
      //获取当前图片位置索引
      var index = Math.min(time / $this.interval | 0, len - 1)
      var position = positions[index].split(' ')
      //改变当前图片背景位置
      ele.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px'
      //索引遍历完毕，执行下一个任务
      if (index === len - 1) {
        next()
      }
    }
    type = TASK_ASYNC
  } else {
    taskFn = next()
    type = TASK_SYNC
  }
  return this._add(taskFn, type)
}
/**
 * 添加一个异步定时任务：通过定时改变img标签的src属性，实现帧动画
 * @param ele  DOM对象
 * @param imgList
 */
Animation.prototype.changeImageSrc = function (ele, imgList) {

}
/**
 * 高级用法，添加一个定时异步任务
 * 该任务定义动画每帧执行的任务函数
 * @param taskFunction 自定义的每帧执行的任务函数
 */
Animation.prototype.enterFrame = function (taskFunction) {

}
/**
 * 添加一个同步任务：可以在上一个任务执行完后执行回调函数
 * @param callback 回调函数
 */
Animation.prototype.then = function (callback) {

}
/**
 * 开始执行任务：异步定义执行任务执行的间隔
 * @param interval
 */
Animation.prototype.start = function (interval) {

  if (this.state === STATE_START) {
    return this
  }
  //如果任务链中没有任务，则返回
  if (!this.taskQueue.length) {
    return this
  }
  this.state = STATE_START
  this.interval = interval
  this._runTask()
  return this
}
/**
 *添加一个同步任务，回退到上一个任务中
 * 实现重复上一个任务的效果
 * @param times 重复的次数
 */
Animation.prototype.repeat = function (times) {
  var $this = this
  var taskFn = function () {
    if (typeof times === 'undefined') {
      //无限回退到上一个任务
      $this.index--
      $this._runTask()
      return
    }
    if (times) {
      times--
      //回退
      $this.index--
      $this._runTask()
    } else {
      //达到重复的次数，跳转到下一个
      var task = $this.taskQueue[$this.index]
      $this._next(task)
    }
  }
  var type = TASK_SYNC
  return this._add(taskFn, type)
}
/**
 *添加一个同步任务，相当于repeat()更友好的接口，无限循环
 */
Animation.prototype.repeatForver = function () {
  return this.repeat()
}
/**
 * 设置当前任务执行结束后到下一个任务开始之前等待的时间
 * @param time  等待的时间
 */
Animation.prototype.wait = function (time) {
  if (this.taskQueue && this.taskQueue.length > 0) {
    this.taskQueue[this.taskQueue.length - 1].wait = time
  }
  return this
}
/**
 * 暂停当前异步定时任务
 */
Animation.prototype.pause = function () {
  if (this.state === STATE_START) {
    this.state = STATE_STOP
    this.timeline.stop()
    return this
  }
  return this
}
/**
 * 重新执行上一次pause停止的任务
 */
Animation.prototype.restart = function () {
  if (this.state === STATE_STOP) {
    this.state = STATE_START
    this.timeline.restart()
    return this
  }
  return this
}
/**
 * 释放资源
 */
Animation.prototype.dispose = function () {
  if (this.state !== STATE_INITIAL) {
    this.state = STATE_INITIAL
    this.taskQueue = null
    this.timeline.stop()
    this.timeline = null
    return this
  }
  return this
}
/**
 * 私有方法，类的内部使用
 * @param taskFun 任务方法
 * @param type 任务类型
 * @private
 */
Animation.prototype._add = function (taskFun, type) {

  this.taskQueue.push({
    taskFun: taskFun,
    type: type
  })
  //将操作后的this返回：此函数的执行结果还能继续执行当前类的方法，以这种方式达到链式调用的目的
  return this
}
/**
 * 执行任务
 * @private
 */
Animation.prototype._runTask = function () {
  if (!this.taskQueue.length || this.state !== STATE_START) {
    return
  }
  //任务执行完毕，则释放资源
  if (this.index === this.taskQueue.length) {
    this.dispose()
    return
  }
  //获得任务链上当前任务
  var task = this.taskQueue[this.index]
  if (task.type === TASK_SYNC) {
    this._syncTask(task)
  } else if (task.type === TASK_ASYNC) {
    this._asyncTask(task)
  }

}

/**
 * 同步任务
 * @param task  执行的任务对象
 */
Animation.prototype._syncTask = function (task) {
  var $this = this //在闭包中this指向发生变化，提前赋值
  var next = function () {
    //切换到下一个任务
    $this._next(task)
  }
  var taskFn = task.taskFun
  taskFn(next)
}
/**
 * 异步任务
 * @param task 执行的任务对象
 * @private
 */
Animation.prototype._asyncTask = function (task) {

  var $this = this
  /**
   * 定义每一帧执行的回调函数
   * @param time  动画从开始到当前执行的时间
   */

  var enterFrame = function (time) {
    var taskFn = task.taskFun
    var next = function () {
      //停止当前任务
      $this.timeline.stop()
      //执行下一任务
      $this._next(task)
    }
    taskFn(next, time)
  }
  this.timeline.onenterfram = enterFrame
  this.timeline.start(this.interval)
}
/**
 * 切换到下一个任务
 * 支持如果当前任务需要等待，则延时执行
 * @private
 * @param task 当前任务
 */
Animation.prototype._next = function (task) {
  this.index++
  var $this = this
  task.wait ? setTimeout(function () {
    $this._runTask()
  }, task.wait) : this._runTask()
}

module.exports = function () {
  //类似工厂创建的方法，此方法的好处是，调用时是直接拿到Animation的一个实例
  return new Animation()
}