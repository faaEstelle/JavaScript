// webpack执行的配置文件
module.exports = {
  entry: {
    animation: './FrameAnimation/animation.js'
  },
  output: {
    path: _dirname + '/built',//当前目录的地址，创建一个built目录
    filename: '[name].js', //文件名及后缀
    library: 'animation',
    libraryTarget: 'umd'  //支持CMD/AMD
  }
}