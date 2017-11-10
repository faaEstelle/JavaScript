'use strict'

/**
 * 预加载图片函数
 * @param images 加载的图片数组或对象
 * @param callback 全部图片加载完毕后的回调函数
 * @param timeout  加载超时的时长
 */
function loadImage (images,callback,timeout) {
  var count = 0 //加载完成图片的计数器
  var success = true //图片完全加载成功的标志
  var timeoutId = 0 //超时timer的id
  var IstimeOut = false //是否超时的标志位

  for (var key in images){
    //过滤掉property上的属性
    if (!images.hasOwnProperty(key)){
      continue  //执行下一次循环
    }
    //获得每个图片元素
    //期望格式是object：{src:xxx}，若不是，则进行转换
    var item = images[key]
    if (typeof item === 'string'){
      item = images[key] = {
        src:item
      }
    }
    //如果item为空或undefined，或者拿不到ite的src
    if (!item || !item.src){
      continue
    }

    count++  //计数+1
    item.id = '_img_' + key + getId() //设置图片元素的id
    item.img = window[item.id] = new Image()  //设置图片元素的image对象    window[item.id]不是必须的，为了便于在浏览器直接调试，通过window['__img_id']可以直接访问到某个image对象。

    doLoad(item)

  }
  //遍历完成如果计数为0，直接调用callback
  if(!count){
    callback(success)
  }else if (timeout){
    timeoutId = setTimeout(onTimeOut,timeout)
  }

  /**
   * //正真进行图片加载的函数
   * @param item 图片元素对象
   */
  function doLoad (item) {
    item.status = 'loading'
    var img = item.img
    //定义图片加载成功的回调函数
    img.onload = function () {
      //只有当所有图片都加载成功时，才算成功 ；&与运算
      success = success & true
      item.status = 'loaded'
      done()
    }
    //图片加载失败的回调函数
    img.onerror = function () {
      success = false
      item.status = 'error'
      done()
    }

    //发起http(s)的请求
    img.src = item.src
    /**
     *图片加载完后的回调（不管成功失败）
     */
    function done () {
      //清理操作
      img.onload = img.onerror = null
      //兼容底版浏览器，使用try-catch
      try {

        delete window[item.id]
      }catch (e){

      }
      //每加载完一张图片计数器减一，当图片加载完成切没有超时的情况，则执行callback
      if (!--count && !IstimeOut){
        clearTimeout(timeoutId)
        callback(success)
      }
    }
  }

  /**
   * 超时函数
   */
  function onTimeOut () {
    IstimeOut = true
    callback(false)
  }
}

/**
 * 此处形成一个闭包，定义的__id不会污染全局，只是在当前闭包中定义的一个变量
 * @type {number}
 * @private
 */
var __id = 0
//保证每次的id不同
function getId () {
  return ++__id
}

module.exports = loadImage //将模块暴露出去