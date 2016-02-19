
/** 
Прячет блок с фильтрами .filters, добавляя ему класс hidden
**/
var filters = document.querySelector('.filters');
filters.classList.add('hidden');


/*1 - перебрать все элементы в струкруре данных*/
var container = document.querySelector('.pictures');

pictures.forEach(function(picture) {
    var element = getElementFromTemplate(picture);
    container.appendChild(element);
});

/*2 - для каждого элемента создать DOM-элемент на основе шаблона*/
function getElementFromTemplate(data) {
    var template = document.querySelector('#picture-template')
    
    if('content' in template) {   
        var element = template.content.childNodes[1].cloneNode(true);
    }else{
        var element = template.childNodes[1].cloneNode(true);
    }

    element.querySelector('.picture-comments').textContent = data.comments;
    element.querySelector('.picture-likes').textContent = data.likes;
    
    var backgroundImage = new Image();
    var imgToReplace = element.querySelector('img');
    var ImageLoadTimeout;
    
    backgroundImage.onload = function() {
        clearTimeout(ImageLoadTimeout);
        //element.querySelector('img').src = backgroundImage.src;
        element.replaceChild(backgroundImage, imgToReplace).style.width = 182;
        element.style.backgroundImage = 'url(\''+ backgroundImage.src+'\')';
    }
    backgroundImage.onerror = function() {
        element.classList.add('picture-load-failure');
    }
    
    backgroundImage.src = '/24321-kekstagram/' + data.url; 
   
/*3 - добавить обработку вохможных ошибок (таймаут или отказ сервера)*/    
    var IMAGE_TIMEOUT = 1000;
    
    ImageLoadTimeout = setTimeout(function() {
        backgroundImage.src = '';
        element.classList.add('picture-load-failure');
    }, IMAGE_TIMEOUT);          
    
    
    return element;
}

/*4 - отбражение блока с фильтрами*/  
var FiltersLoadTimeout;

FiltersLoadTimeout = setTimeout(function() {
    if(getElementFromTemplate(pictures)) {
           filters.classList.remove('hidden');
    };
},3000);