const menuNodes = document.querySelectorAll('.menu')
const menus = Array.from(menuNodes)

document.addEventListener('click', (e) => {
  for (let i = 0; i < menus.length; i++) {
    if (!menus[i].contains(e.target)) {
      const contents = menus[i].querySelector('.contents')
      contents.style.display = 'none'
    }
  }
})

menus.forEach((element) => {
  element.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return
    const contents = e.currentTarget.querySelector('.contents')
    contents.style.display = 'flex'
  })
})

const containerNodes = document.querySelectorAll('.container')
const containers = Array.from(containerNodes)

containers.forEach((element) => {
  const quatity = element.children.length - 3
  let idx = 0
  markDot(element, idx)
  setInterval(() => {
    if (idx >= quatity - 1) idx = -1
      idx += 1
      nextSlide(element, idx)
      markDot(element, idx)
  }, 2500)
  
  element.addEventListener('click', ((e) => {
    const id = e.target.id
    if (id === 'next') {
      if (idx >= quatity - 1) idx = -1
      idx += 1
      nextSlide(element, idx)
    } else if (id === 'back') {
      if (idx <= 0) idx = quatity
      idx -= 1
      backSlide(element, idx)
    } else {
      const dataIDX = parseInt(e.target.getAttribute('data-idx'))
      if (isNaN(dataIDX)) return
      idx = dataIDX
      nextSlide(element, idx)
    }
    markDot(element, idx)
  }))
})

function markDot(element, idx) {
  const dots = element.querySelector('.dots')
  for (let i = 0; i < dots.children.length; i++) {
    dots.children[i].style.backgroundColor = '#fffa'
  }
  dots.children[idx].style.backgroundColor = '#fff'
}

function nextSlide(element, idx) {
  const firstSlide = element.querySelector('div:first-of-type')
  firstSlide.style.marginLeft = -100 * idx + '%'
  // firstSlide.style.transitionDuration = idx + 's'
}

function backSlide(element, idx) {
  const firstSlide = element.querySelector('div:first-of-type')
  firstSlide.style.marginLeft = -100 * idx + '%'
}