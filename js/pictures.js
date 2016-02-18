'use strict'

var filtersBlock = document.querySelector('.filters');

/*1 - перебор всех элементов в струкруре данных и отрисовка загруженных картинок*/
var container = document.querySelector('.pictures');
var activeFilter = 'filter-popular';
var pictures = [];
var picturesNode = document.querySelector('.pictures');

var filters = document.querySelectorAll('.filters-radio');
for (var i = 0; i<filters.length; i++) {
    filters[i].onclick = function(evt) {
       //return alert('hello!');
        var clickedElementID = evt.target.id;
        setActiveFilter(clickedElementID);
    };
}


loadPictures();
//fetchPictures();

/*отрисовка каритинок функцией*/
function renderPictures(pictures){
    container.innerHTML = '';
    
    pictures.forEach(function(picture) {
        var element = getElementFromTemplate(picture);
        container.appendChild(element);
    });
}


/*Установка выбранного фильтра*/
function setActiveFilter(id) {
    if (activeFilter === id) {
        return;
    }
    
    //подсветить выбранный фильтр
    
    
    //отсортировать и отфильтровать картинки по выбранному параметру, вывести на страницу
    var filteredPictures = pictures.slice(0);
    
    
    switch (id) {
        //список фотографий, в том виде, в котором он был загружен 
        case 'filter-popular ': 
        return filteredPictures;
        break;    
        // сделанных за последние две недели, отсортированные по убыванию даты (поле date) 
        case 'filter-new':  
        filteredPictures = filteredPictures.sort(function(a,b) {
            var dateA = new Date(a.date);
            var dateB = new Date(b.date);
            return (dateB - dateA);
        }); 
        break;    
        //отсортированные по убыванию количества комментариев 
        case 'filter-discussed':
        filteredPictures = filteredPictures.sort(function(a,b) {
            return (b.comments - a.comments);
        });
        break;
    }
    
    activeFilter = id;
    renderPictures(filteredPictures);
}


/**
* загрузить фотографии и отобразить загрузку в интерфейсе
*/
function loadPictures(callback) {
    picturesNode.classList.add('pictures-loading'); 
    fetchPictures(function(loadedPictures) {
        picturesNode.classList.remove('pictures-loading');
        pictures = loadedPictures;
        //обработка загруженных данных 
        renderPictures(loadedPictures);
    });
}




/**
 * загрузить и сохранить картинки
 */
function fetchPictures(callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '//o0.github.io/assets/json/pictures.json')
    xhr.onload = function(evt) {
        var rawData = evt.target.response;
        var loadedPictures = JSON.parse(rawData);
        callback(loadedPictures);
        }
       
    
    xhr.send();
    xhr.onreadystatechange = function(){
         if (xhr.status != 200){
            picturesNode.classList.add('pictures-failure')
         };
    };
};



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
    
    backgroundImage.src = '/'+'24321-kekstagram'+'/' + data.url; 
   
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
var FILTERS_TIMEOUT = 3000;

FiltersLoadTimeout = setTimeout(function() {
           filtersBlock.classList.remove('hidden');
},FILTERS_TIMEOUT);