'use strict'

var loadImage = require('./ImageLoader')

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
 * 帧动画库类
 * @constructor
 */
function Animation () {
  this.taskQueue = [] //任务链
  this.index = 0 //索引值
  this.state = STATE_INITIAL
}

/**
 * Animation类的扩展：
 * 添加一个同步任务：预加载图片
 * @param imgList 图片数组
 */
Animation.prototype.loadImage = function (imgList) {
  var taskFu = function (next) {
    loadImage(imgList.slice(0),next,)
  }
  var type = TASK_SYNC
  return this._add(taskFu,type)

}
/**
 * 添加一个异步定时任务：通过定时改变图片位置实现帧动画
 * @param ele DOM对象
 * @param positions 坐标数组
 * @param imgUrl  图片地址
 */
Animation.prototype.changePosition = function (ele,positions,imgUrl) {
  
}
/**
 * 添加一个异步定时任务：通过定时改变img标签的src属性，实现帧动画
 * @param ele  DOM对象
 * @param imgList
 */
Animation.prototype.changeImageSrc = function (ele,imgList) {

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

  if(this.state === STATE_START){
    return this
  }
  //如果任务链中没有任务，则返回
  if (!this.taskQueue.length){
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

}
/**
 *添加一个同步任务，相当于repeat()更友好的接口，无限循环
 */
Animation.prototype.repeatForver = function () {

}
/**
 * 设置当前任务执行结束后到下一个任务开始之前等待的时间
 * @param time  等待的时间
 */
Animation.prototype.wait = function (time) {

}
/**
 * 暂停当前异步定时任务
 */
Animation.prototype.pause = function () {

}
/**
 * 重新执行上一次pause停止的任务
 */
Animation.prototype.restart = function () {

}
/**
 * 释放资源
 */
Animation.prototype.dispose = function () {

}
/**
 * 私有方法，类的内部使用
 * @param taskFun 任务方法
 * @param type 任务类型
 * @private
 */
Animation.prototype._add = function (taskFun,type) {

  this.taskQueue.push({
    taskFun:taskFun,
    type:type
  })
  //将操作后的this返回：此函数的执行结果还能继续执行当前类的方法，以这种方式达到链式调用的目的
  return this
}
/**
 * 执行任务
 * @private
 */
Animation.prototype._runTask = function () {
  if(!this.taskQueue.length || this.state !== STATE_START){
    return
  }
  //任务执行完毕，则释放资源
  if (this.index === this.taskQueue.length){
    this.dispose()
    return
  }
  //获得任务链上当前任务
  var task = this.taskQueue[this.index]
  if(task.type === TASK_SYNC){
    this._syncTask(task)
  }else if(task.type === TASK_ASYNC){
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
    $this._next()
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

}
/**
 * 切换到下一个任务
 * @private
 */
Animation.prototype._next = function () {
  this.index++
  this._runTask()
}