/*基本图文组件对象*/
var H5ComponentBase = function (name, cfg) {
  var cfg = cfg || {}
  //给每个组件添加id
  var id = ('h5_c_' + Math.random()).replace(',', '_')
  var typeClass = ' h5_component_' + cfg.type
  var component = $('<div class="h5_component  h5_component_name_' + name + typeClass + ' " id="' + id + ' ">')
  cfg.text && component.text(cfg.text)
  cfg.width && component.width(cfg.width / 2)
  cfg.height && component.height(cfg.height / 2)

  cfg.css && component.css(cfg.css)
  cfg.bg && component.css('backgroundImage', 'url(' + cfg.bg + ')')

  if (cfg.center === true) {
    component.css({
      marginLeft: (cfg.width / 4 * -1) + 'px',
      left: '50%'
    })
  }   //...更多自定义参数

  component.on('onLoad', function () {
    console.log('base')
    //样式分类规划
    component.addClass(typeClass + '_load').removeClass(typeClass + '_leave')
    //进入动画
    cfg.animationIn && component.animate(cfg.animationIn)
    return false
  })
  component.on('onLeave', function () {
    component.addClass(typeClass + '_leave').removeClass(typeClass + '_load')
    cfg.animationOut && component.animate(cfg.animationOut)
    return false
  })

  return component
}