var addBtn = document.getElementById('add')
var listUl = document.querySelector('.menu-list')
var itemInput = document.getElementById('menu')



function addMenu () {
  var item = itemInput.value
  if (item !== ''){
   var newList = document.createElement('li')
    newList.textContent = item
   var delSpan = document.createElement('button')
    delSpan.textContent = 'delete'

    newList.appendChild(delSpan)
    listUl.appendChild(newList)

    itemInput.value = ''
    itemInput.focus()

    delSpan.onclick=function (e) {
      listUl.removeChild(newList)
    }
  }
}
addBtn.addEventListener('click',addMenu)