// index.js

// Callbacks
const handleClick = (ramen) => {
  let ramenDetail = document.querySelector('div#ramen-detail')
  let ramenRating = document.querySelector('span#rating-display')
  let ramenComment = document.querySelector('p#comment-display')
  
  ramenDetail.children[0].src = ramen.image
  ramenDetail.children[1].innerText = ramen.name
  ramenDetail.children[2].innerText = ramen.restaurant

  ramenRating.innerText = ramen.rating
  ramenComment.innerText = ramen.comment
};

const addSubmitListener = () => {
  document.querySelector('form#new-ramen').addEventListener('submit', (e) => {
    e.preventDefault()
    let formNodes = e.target.children
    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': `${formNodes[2].value}`,
        'restaurant': `${formNodes[4].value}`,
        'image': `${formNodes[6].value}`,
        'rating': `${formNodes[8].value}`,
        'comment': `${formNodes[10].value}`
      })
    })
    .then(response => response.json())
    .then(object => object)
    displayRamens()
  })
}

const displayRamens = () => {
  clear()
  fetch('http://localhost:3000/ramens')
  .then(response => response.json())
  .then(ramens => {
    ramens.forEach(ramen => {
      let image = document.createElement('img')
      image.src = ramen.image
      let pics = document.querySelector('div#ramen-menu')
      pics.appendChild(image)
      image['source'] = {...ramen}
      image.addEventListener('click', e => {
        handleClick(e.target['source'])
      })
    })
  })
};

const clear = () => {
  document.querySelector('div#ramen-menu').innerHTML = ''
}

const main = () => {
  displayRamens()
  addSubmitListener()
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
