/*水平柱状图组件对象*/
var H5ComponentBar = function (name, cfg) {
  var component = new H5ComponentBase(name, cfg)

  $.each(cfg.data, function (idx, item) {
    var line = $('<div class="line"></div>')
    var name = $('<div class="name">' + item[0] + '</div>')
    var progress = $('<div class="progress"></div>')
    var progressBar = $('<div class="progress-bar"></div>')
    var per = $('<div class="per">' + item[1] * 100 + '%' + '</div>')
    progressBar.width(item[1] * 100 + '%')
    var bgColor = ''
    if (item[2]) {
      bgColor = 'style="background-color:' + item[2] + '"'
    }
    progressBar.html('<div class="bg"' + bgColor + '></div>')
    progress.append(progressBar).append(per)

    line.append(name).append(progress)

    component.append(line)
  })
  return component
}