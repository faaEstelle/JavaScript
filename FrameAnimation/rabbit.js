var imgUrl = 'rabbit-big.png'
var positions = ['0,-854', '-174,-852', '-349,-852', '-524,-852', '-698 -852', '-873 -848']
var ele = document.getElementById('rabbit')

animation(ele, positions, imgUrl)

/**
 *帧动画
 * @param ele：要操作的DOM对象
 * @param positions：图片位置数组
 * @param imgUrl：图片资源路径
 */
function animation (ele, positions, imgUrl) {
  ele.style.backgroundImage = 'url(' + imgUrl + ')'
  ele.style.backgroundRepeat = 'no-repeat'
  //当前索引（位置）
  var index = 0

  function run () {

    var position = positions[index].split(' ')
    console.log(position)
    ele.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px'
    index++
    if (index >= positions.length) {
      index = 0
    }
    setTimeout(run, 40)
  }

  run()
}