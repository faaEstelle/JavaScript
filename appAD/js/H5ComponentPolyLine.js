/*折线图组件对象*/
var H5ComponentPolyLine = function (name, cfg) {
  var component = new H5ComponentBase(name, cfg)
  var h = cfg.height
  var w = cfg.width
  var cas = document.createElement('canvas')
  var ctx = cas.getContext('2d')
  cas.width = ctx.width = w
  cas.height = ctx.height = h
  component.append(cas)
  ctx.lineWidth = 6
  ctx.strokeStyle = '#aaa'
  ctx.beginPath()
  var step = 10
  //绘制网格线
  //水平线
  for (var i = 0; i <= step; i++) {
    ctx.moveTo(0, h / 10 * i)
    ctx.lineTo(w, h / 10 * i)
  }
  //垂直线
  var stepX = cfg.data.length + 1
  for (var i = 0; i <= stepX; i++) {
    var item = cfg.data[i]
    ctx.moveTo(w / stepX * i, 0)
    ctx.lineTo(w / stepX * i, h)
    if (item) {
      //item名称
      var text = $('<div class="text"></div>')
      text.text(item[0])
      text.width(w / stepX / 2)
      text.css('left', w / stepX / 2 * (i + 1) - w / stepX / 4).css('top', h / 2)
      component.append(text)
    }

  }
  ctx.stroke()
  //绘制折线数据
  var cas = document.createElement('canvas')
  var ctx = cas.getContext('2d')
  cas.width = ctx.width = w
  cas.height = ctx.height = h
  component.append(cas)

  var draw = function (per) {
    console.log(per)
    ctx.clearRect(0, 0, w, h)
    ctx.lineWidth = 3
    ctx.strokeStyle = '#bb5ba0'
    ctx.beginPath()
    var x = 0
    var y = 0
    //画点
    $.each(cfg.data, function (idx, item) {
      x = w / stepX * (idx + 1)
      y = h - item[1] * h * per
      ctx.moveTo(x, y)
      ctx.arc(x, y, 5, 0, 2 * Math.PI)
    })
    //连线
    ctx.moveTo(w / stepX, h - cfg.data[0][1] * h * per)
    for (var i = 1; i < stepX - 1; i++) {
      x = w / stepX * (i + 1)
      y = h - cfg.data[i][1] * h * per
      ctx.lineTo(x, y)

    }
    ctx.stroke()  //结束连线的绘制

    //绘制阴影：在连线的基础上连接底部的线条后再fill()填充即可
    ctx.lineWidth = 1 //阴影填充时的线宽
    ctx.strokeStyle = 'rgba(187,91,160,0)'//将边缘线的透明度设为0
    ctx.lineTo(x, h)
    ctx.lineTo(w / stepX, h)
    ctx.fillStyle = 'rgba(187,91,160,0.2)'
    ctx.fill()

    //写数据
    ctx.font = '18px Arial'
    $.each(cfg.data, function (idx, item) {
      x = w / stepX * (idx + 1)
      y = h - item[1] * h * per
      ctx.fillStyle = item[2] ? item[2] : '#595959'
      ctx.fillText(item[1] * 100 + '%', x - 10, y - 10)
    })
    ctx.stroke()
  }

  component.on('onLoad', function () {
    var s = 0
    for (var i = 0; i < 100; i++) {
      setTimeout(function () {
        s += 0.01
        draw(s)
      }, i * 10)  //以渐变的时间间隔执行动画，使动画有过渡的效果
    }
  })
  component.on('onLeave', function () {
    var s = 1
    for (var i = 0; i < 100; i++) {
      setTimeout(function () {
        s -= 0.01
        draw(s)
      }, i * 10)
    }
  })

  return component
}