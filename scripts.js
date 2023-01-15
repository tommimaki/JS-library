
const read = document.querySelector("#read");
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const form = document.querySelector('form')
const body = document.querySelector('body')
const openFormBtn = document.querySelector('#openFormBtn')
const formContainer = document.querySelector('.formDiv')
    
const container = document.querySelector('.cardContainer');
 let boxArray = [];

//constructor
function readbox(read, title, author, pages){
    this.read = read;
    this.title = form.title.value;
    this.author = form.author.value;
    this.pages = form.pages.value;
}


function openForm(){
    formContainer.style.display = "block";

    //todo tausta tummaksi
    container.style= 'filter: brightness(50%)';

}


function closeForm() {
    formContainer.style.display = "none";
    container.style= 'filter: brightness(100%)';
  }

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const box = new readbox(read.checked, title.value, author.value, pages.value);
    boxArray.push(box)
    clearInputs();
    setData();
    closeForm();
    render();
})

function render(){
    const cards = document.querySelectorAll('.cardDiv'); 
    const container = document.querySelector('.cardContainer')
    cards.forEach((card) =>{
    container.removeChild(card)})

    for(let i = 0; i < boxArray.length; i++){
        let index = i;
        createCard(boxArray[i], index);
    }
}


function clearInputs() {
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
}


//createcard
function createCard(item, index){
    
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('cardDiv')

    const bookInfo = document.createElement('div')
    bookInfo.classList.add('bookInfo')
    
    
    const title = document.createElement('p')
    title.textContent = `title = ${item.title}`
    const titleDivider = document.createElement('hr')
    titleDivider.classList.add('divider')
    title.append(titleDivider)
    bookInfo.append(title)
   

    const author = document.createElement('p')
    author.textContent = `author = ${item.author}`
    const authorDivider = document.createElement('hr')
    authorDivider.classList.add('divider')
    author.append(authorDivider)
    bookInfo.append(author)
   
 

    const pages = document.createElement('p')
    pages.textContent = `pages = ${item.pages}`
    const pagesDivider = document.createElement('hr')
    pagesDivider.classList.add('divider')
    pages.append(pagesDivider)

    bookInfo.append(pages)
   

    cardDiv.append(bookInfo)


    const bookButtons = document.createElement('div')
    bookButtons.classList.add('bookButtons')
    const readBtn = document.createElement('button');
    readBtn.classList.add('readBtn')    

   

    if(item.read===false) {
        readBtn.textContent = 'Not Read';
        readBtn.style.backgroundColor = '#e04f63';
    }else {
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = '#04AA6D'
    }
 
    bookButtons.append(readBtn)

    readBtn.addEventListener('click', () => { 
        item.read = !item.read; 
        (console.log('CLICK' + `${index}`))
        setData(); 
        render();
    }); 

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removeBtn') 
    // removeBtn.textContent = 'Remove'; 
    removeBtn.innerHTML = (`<span class="material-symbols-outlined">
    delete
    </span>`); 
    removeBtn.setAttribute('id', 'removeBtn');
    // removeBtn.appendChild = ('<i class="fa-solid fa-trash-can"></i>');
    bookButtons.appendChild(removeBtn);
    cardDiv.append(bookButtons)

    removeBtn.addEventListener('click', () => {
        boxArray.splice(boxArray.indexOf(item),1);
        setData()
        render();
    });

   
    container.append(cardDiv);

}

// setting Library to be stored in local storage
function setData() {
    localStorage.setItem(`boxArray`, JSON.stringify(boxArray));
}

// //pulls books from local storage when page is refreshed
function restore() {
    if(!localStorage.boxArray) {
        render();
    }else {
        let objects = localStorage.getItem('boxArray') // gets information from local storage to use in below loop to create DOM/display
        objects = JSON.parse(objects);
        boxArray = objects;
        render();
    }
}

restore();