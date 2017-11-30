/*饼图组件对象*/
var H5ComponentPie = function (name, cfg) {
  var component = new H5ComponentBase(name, cfg)
  var h = cfg.height
  var w = cfg.width

  var r = w / 2
  //底图层
  var cas = document.createElement('canvas')
  var ctx = cas.getContext('2d')
  cas.width = ctx.width = w
  cas.height = ctx.height = h
  component.append(cas)
  ctx.beginPath()
  ctx.fillStyle = '#eee'
  ctx.strokeStyle = '#eee'
  ctx.lineWidth = 1
  ctx.arc(r, r, r, 0, 2 * Math.PI)
  ctx.fill()
  ctx.stroke()

  //数据层
  var cas = document.createElement('canvas')
  var ctx = cas.getContext('2d')
  cas.width = ctx.width = w
  cas.height = ctx.height = h
  component.append(cas)
  ctx.lineWidth = 1
  var start = 1.5 * Math.PI
  var all = 2 * Math.PI
  var end = 0
  //
  var step = cfg.data.length
  for (var i = 0; i < step; i++) {
    var item = cfg.data[i]

    //项目文本
    var text = $('<div class="text"></div>')
    text.text(item[0])
    end = start + all * item[1]
    text.append('<div class="per">' + item[1] * 100 + '%' + '</div>')
    //文本坐标
    var x = r + Math.sin((.5 * Math.PI - start + .5 * Math.PI - end) / 2) * r
    var y = r + Math.cos((.5 * Math.PI - start + .5 * Math.PI - end) / 2) * r
    if (x > r) {
      text.css('left', x / 2)
    } else {
      text.css('right', (w - x) / 2)
    }
    if (y > r) {
      text.css('top', y / 2)
    } else {
      text.css('bottom', (h - y) / 2)
    }
    // text.css('left',x/2).css('top',y/2)
    text.css('color', item[2])
    component.append(text)

    ctx.fillStyle = ctx.strokeStyle = item[2]
    ctx.beginPath()
    ctx.moveTo(r, r)

    ctx.arc(r, r, r, start, end)
    ctx.fill()
    ctx.stroke()
    start = end
  }
  //蒙版动画层
  var cas = document.createElement('canvas')
  var ctx = cas.getContext('2d')
  cas.width = ctx.width = w
  cas.height = ctx.height = h
  component.append(cas)
  ctx.lineWidth = 1

  var draw = function (per) {
    ctx.clearRect(0, 0, w, h)
    ctx.beginPath()
    ctx.moveTo(r, r)
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 1
    ctx.arc(r, r, r + 1, 1.5 * Math.PI, 1.5 * Math.PI + 2 * Math.PI * per)
    ctx.fill()
    ctx.stroke()
  }

  component.on('onLoad', function () {
    var s = 1
    for (var i = 0; i < 100; i++) {
      setTimeout(function () {
        s -= 0.01
        draw(s)
      }, i * 10)  //以渐变的时间间隔执行动画，使动画有过渡的效果
    }
  })
  component.on('onLeave', function () {
    var s = 0
    for (var i = 0; i < 100; i++) {
      setTimeout(function () {
        s += 0.01
        draw(s)
      }, i * 10)  //以渐变的时间间隔执行动画，使动画有过渡的效果
    }
  })

  return component
}