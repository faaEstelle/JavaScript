'use strict'
//记录动画各个步骤的状态的变量
//初始化状态，
var STATE_INITIAL = 0
//开始状态
var STATE_START = 1
//停止状态
var STATE_STOP = 2

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
 * 添加一个同步任务：提前加载图片
 * @param imgList 图片数组
 */
Animation.prototype.loadImage = function (imgList) {
  
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