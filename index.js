const buttons = document.querySelectorAll('.btn')
const list = document.getElementById('list_items')

let filters = []
let items

buttons.forEach((btn, index) => {
  btn.addEventListener('mouseenter', () => {
    btn.style.backgroundColor = 'white'
    btn.style.color = 'black'
  })

  btn.addEventListener('mouseleave', () => {
    btn.style.backgroundColor = 'black'
    btn.style.color = 'white'
  })

  btn.addEventListener('click', (e) => {
    const index = filters.indexOf(e.currentTarget.textContent.trim())
    if (index > -1) {
      filters.splice(index, 1)
      btn.classList.remove('active')
    } else {
      btn.classList.add('active')
      filters.push(e.currentTarget.textContent.trim())
    }
    displayList(items)
  })
})

function displayList(data) {
  list.innerHTML = ''
  console.log('filters', filters)
  console.log('data', data)
  data.forEach((listItem, index) => {
    if (filters.length === 0 || filters.includes(listItem.category)) {
      const itemWrapper = document.createElement('div')
      itemWrapper.classList.add('item_wrapper')
      itemWrapper.style.animationDelay = `${index * 0.2}s`

      const avatarWrapper = document.createElement('div')
      avatarWrapper.classList.add('avatar')

      const avatar = document.createElement('h1')
      avatar.textContent = listItem.fname.charAt(0) + listItem.lname.charAt(0)

      avatarWrapper.append(avatar)

      const name = document.createElement('h1')
      name.textContent = listItem.fname + ' ' + listItem.lname
      name.classList.add('name')

      const categoryWrapper = document.createElement('div')
      categoryWrapper.classList.add('btn')

      const category = document.createElement('h1')
      category.textContent = listItem.category

      categoryWrapper.append(category)

      itemWrapper.append(avatarWrapper)
      itemWrapper.append(name)
      itemWrapper.append(categoryWrapper)

      list.append(itemWrapper)
    }
  })
}

async function getList(filters) {
  try {
    const res = await fetch(
      `https://filltext.com/?rows=10&fname={firstName}&lname={lastName}&category=[${
        filters.length > 0
          ? filters.forEach((filter) => filter)
          : '"category1", "category2", "category3"'
      }]&pretty=true`
    )

    const data = await res.json()
    items = data
    displayList(data)
  } catch (e) {
    console.log('ERROR IN GETLIST', e)
  }
}

getList(filters)
