/*散点图组件对象*/
var H5ComponentPoint = function (name, cfg) {
  var component = new H5ComponentBase(name, cfg)
  var standard = cfg.data[0][1] //以第一个元素大小为基准
  var center = cfg.width / 8
  //输出每个点
  $.each(cfg.data, function (idx, item) {
    var point = $('<div class="point point_"' + idx + '></div>')
    var per = item[1] / standard * 100 + '%'

    point.width(per).height(per)

    item[2] && point.css('background-color', item[2])
    point.css('z-index', item[1] * 10)
    item[3] !== undefined && item[4] && point.data('left', item[3]).data('top', item[4])
    item[3] !== undefined && item[4] && point.css('left', center).css('top', center)

    var name = $('<div class="name">' + item[0] + '</div>')
    var rate = $('<div class="rate">' + item[1] * 100 + '%' + '</div>')
    name.append(rate)
    point.append(name)
    component.append(point)
    // point.css('left',point.data('left')).css('top',point.data('top'))

    //点从中心出现
    component.on('onLoad', function () {
      console.log('point')
      item[3] !== undefined && item[4] && point.delay(1).animate({'left': item[3], 'top': item[4]})
    })
    component.on('onLeave', function () {
      item[3] !== undefined && item[4] && point.animate({'left': center, 'top': center})
    })
  })

  return component
}