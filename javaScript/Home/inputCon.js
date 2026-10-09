//Input container enable

export const postBox = document.querySelector('.js-post_container'); //Get Element

//Closing posting box clicking outside
document.addEventListener('click', (event) => {
    const isOpen = postBox.style.display = 'flex';
    if(isOpen){
        const isClickInside = postBox.contains(event.target) || addButton.contains(event.target);
        if(!isClickInside){
                postBox.style.display = 'none';
        }
    }
});


function updateInputHeight() {
  if (!postBox) return;

  const height = postBox.getBoundingClientRect().height;

  document.documentElement.style.setProperty(
    '--input-height',
    `${height}px`
  );
}

updateInputHeight();
window.addEventListener('resize', updateInputHeight);