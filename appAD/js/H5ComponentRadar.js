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
  ctx.lineWidth = 3

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
    var rad = 2 * Math.PI / sides * i
    x = r + Math.sin(rad) * r
    y = r + Math.cos(rad) * r
    ctx.moveTo(r, r)
    ctx.lineTo(x, y)
  }
  ctx.strokeStyle = '#000'
  ctx.stroke()
//----数据层
  var cas = document.createElement('canvas')
  var ctx = cas.getContext('2d')
  cas.width = ctx.width = w
  cas.height = ctx.height = h
  component.append(cas)
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 3
  ctx.beginPath()
  for (var i = 0; i < sides; i++) {
    console.log(i)
    var item = cfg.data[i]
    var rad = 2 * Math.PI / sides * i
    x = r + Math.sin(rad) * r * item[1]
    y = r + Math.cos(rad) * r * item[1]
    ctx.moveTo(x, y)
    console.log(x + ';' + y)
    ctx.arc(x, y, 5, 0, 2 * Math.PI)
  }
  ctx.stroke() //绘制

  return component
}