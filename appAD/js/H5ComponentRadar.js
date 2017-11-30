/*折线图组件对象*/
var H5ComponentRadar = function (name, cfg) {
  var component = new H5ComponentBase(name, cfg)
  var h = cfg.height
  var w = cfg.width
  var cas = document.createElement('canvas')
  var ctx = cas.getContext('2d')
  cas.width = ctx.width = w
  cas.height = ctx.height = h
  component.append(cas)
  ctx.lineWidth = 1

  var r = w / 2
  var sides = cfg.data.length
  var x = 0
  var y = 0
  // ------绘制底部背景层
  // 背景
  var isBlue = false
  for (var s = 10; s > 0; s--) {
    ctx.beginPath()
    for (var j = 0; j < sides; j++) {
      var rad = 2 * Math.PI / sides * j
      x = r + Math.sin(rad) * r * (s / 10)
      y = r + Math.cos(rad) * r * (s / 10)
      ctx.lineTo(x, y)
    }
    ctx.fillStyle = (isBlue = !isBlue) ? '#569dfd' : '#f3f0f7'
    ctx.fill()
  }
  //伞骨
  ctx.beginPath()
  for (var i = 0; i < sides; i++) {
    var item = cfg.data[i]
    var rad = 2 * Math.PI / sides * i
    x = r + Math.sin(rad) * r
    y = r + Math.cos(rad) * r
    ctx.moveTo(r, r)
    ctx.lineTo(x, y)
    //项目名
    var text = $('<div class="text"></div>')
    text.css('transition', 'all 1s ' + i * .5 + 's')//使项目名依次出现
    text.text(item[0])
    text.append('<div class="per">' + item[1] * 100 + '%' + '</div>')
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
    item[2] && text.css('color', item[2])

    // text.css('left',x/2).css('top',y/2)

    component.append(text)
  }
  ctx.strokeStyle = '#fcfcfc'
  ctx.stroke()
//----数据层
  var cas = document.createElement('canvas')
  var ctx = cas.getContext('2d')
  cas.width = ctx.width = w
  cas.height = ctx.height = h
  component.append(cas)
  ctx.strokeStyle = '#ffa4e5'
  ctx.fillStyle = 'rgba(255,164,229,0.3)'
  ctx.lineWidth = 2

  var draw = function (per) {
    ctx.clearRect(0, 0, w, h)
    ctx.beginPath()
    //连线
    for (var i = 0; i < sides; i++) {
      console.log(i)
      var item = cfg.data[i]
      var rad = 2 * Math.PI / sides * i
      x = r + Math.sin(rad) * r * item[1] * per
      y = r + Math.cos(rad) * r * item[1] * per
      ctx.lineTo(x, y)
      console.log(x + ';' + y)
    }
    ctx.fill()
    ctx.closePath()
    ctx.stroke()
    //画点
    for (var i = 0; i < sides; i++) {
      var item = cfg.data[i]
      var rad = 2 * Math.PI / sides * i
      x = r + Math.sin(rad) * r * item[1] * per
      y = r + Math.cos(rad) * r * item[1] * per
      ctx.beginPath()
      ctx.strokeStyle = '#ff51d6'
      ctx.arc(x, y, 5, 0, 2 * Math.PI)
      ctx.stroke() //绘制
    }
  }

  // //填数据
  // ctx.font = '18px Arial'
  // ctx.fillStyle='#ff51d6'
  // for (var i = 0; i < sides; i++) {
  //   var item = cfg.data[i]
  //   var rad = 2 * Math.PI / sides * i
  //   x = r + Math.sin(rad) * r * item[1]
  //   y = r + Math.cos(rad) * r * item[1]
  //   var parX = (x>r)?20:-20
  //   var parY = (y>r)?20:-20
  //   ctx.fillText(item[1]*100+'%',x+parX,y+parY)
  // }

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
      }, i * 10)  //以渐变的时间间隔执行动画，使动画有过渡的效果
    }
  })


  return component
}