/* 内容(组织)管理对象*/
var H5 = function () {
  this.id = ('h5_' + Math.random()).replace('.', '_')
  this.el = $('<div class="h5" id="' + this.id + '"></div>').hide()
  this.page = []
  $('body').append(this.el)

  return this
}
/**
 * 添加页
 * @param name 页名
 * @param text 页文本
 * @returns {H5}
 */
H5.prototype.addPage = function (name, text) {
  var page = $('<div class="section h5_page"></div>')
  if (name !== undefined) {
    page.addClass('h5_page_' + name)
  }
  if (text !== undefined) {
    page.text(text)
  }
  this.el.append(page)
  this.page.push(page)
  console.log(this.page)
  return this
}
/**
 * 添加组件
 * @param name 组件名
 * @param cfg 组件内容object
 * @returns {H5}
 */
H5.prototype.addComponent = function (name, cfg) {
  var cfg = cfg || {}
  cfg = $.extend({
    type: 'base'
  }, cfg)
  var component
  var page = this.page.slice(-1)[0]
  switch (cfg.type) {
    case 'base':
      component = new H5ComponentBase(name, cfg)
      break
    default:
  }
  page.append(component)
  return this
}
/**
 * 使用loader函数使资源加载完之后再显现元素
 */
H5.prototype.loader = function () {
  console.log(this.el)
  var $this = this.el
  this.el.fullpage({
    onLeave: function (index, nextIndex, direction) {
      //TODO：this的指向问题
      $this.find('.h5_page').eq(index - 1).find('.h5_component').trigger('onLeave')
    },
    afterLoad: function (anchorLink, index) {
      $this.find('.h5_page').eq(index - 1).find('.h5_component').trigger('onLoad')
    }
  })
  this.page[0].find('.h5_component').trigger('onLoad')
  this.el.show()
}