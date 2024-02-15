// index.js

// Callbacks
const handleClick = (ramen) => {
  let ramenDetail = document.querySelector('div#ramen-detail')
  ramenDetail.children[0].src = ramen.image
  ramenDetail.children[1].innerText = ramen.name
  ramenDetail.children[2].innerText = ramen.restaurant
};

const addSubmitListener = () => {
  // Add code
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
  .then(response => response.json())
  .then(ramens => {
    ramens.forEach(ramen => {
      let image = document.createElement('img')
      image.src = ramen.image
      document.querySelector('div#ramen-menu').appendChild(image)
      image['source'] = {...ramen}
      image.addEventListener('click', e => {
        handleClick(e.target['source'])
      })
    })
  })
};

const main = () => {
  displayRamens()
  // Invoke addSubmitListener here
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
