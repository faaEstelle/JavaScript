var username = document.querySelector('.name')
var create = document.querySelector('.create-story')
var storyText = document.querySelector('.story-con')

function RandomStoryText (arr) {
  var random = Math.floor(Math.random() * arr.length)
  return arr[random]
}

var story = 'It was 94 farenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but he was not surprised — :insertx: weighs 300 pounds, and it was a hot day.'
var insertX = ['Willy the Goblin', 'Big Daddy', 'Father Christmas']
var insertY = ['the soup kitchen', 'Disneyland', 'the White House']
var insertZ = ['spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away']

create.addEventListener('click', SetResult)

function SetResult () {
  var newStory = story

  var Xitem = RandomStoryText(insertX)
  var Yitem = RandomStoryText(insertY)
  var Ziten = RandomStoryText(insertZ)
  console.log(Xitem)
  newStory = newStory.replace(':insertx:', Xitem)
  newStory = newStory.replace(':insertx:', Xitem)
  newStory = newStory.replace(':inserty:', Yitem)
  newStory = newStory.replace(':insertz:', Ziten)

  if (username.value !== '') {
    newStory = newStory.replace('Bob', username.value)
  }

  if (document.getElementById('uk').checked) {
    var weight = Math.round(300 * 0.0714286) + ' stone'
    var temperature = Math.round((94 - 32) * 5 / 9) + ' centigrade'
    newStory = newStory.replace('94 farenheit', temperature)
    newStory = newStory.replace('300 pounds', weight)
  }

  storyText.textContent = newStory
}