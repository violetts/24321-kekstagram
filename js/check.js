
/*getMessage(a:*, b:*=):string*/

function getMessage(a,b) {
    if(typeof a == 'boolean') {
        if(a){
            return 'Переданное GIF-изображение анимировано' +
                    'и содержит '+ b +' кадров';
        }
        return 'Переданное GIF-изображение не анимировано'
    } 
    
    if(typeof a == 'number') {
        return 'Переданное SVG-изображение содержит ' +
                a + ' объектов и ' +b * 4 + ' атрибутов'
    }
    
   
    if(Array.isArray(a)) {
        if(Array.isArray(b)) {
            var result = 0;
            for(var i=0;i<a.length;i++) {
                   result+=a[i]*b[i];
                }
            return 'Общая площадь артефактов сжатия: '  + 
                    result + ' пикселей' ;
        }
       var result = 0;
       for (var i=0;i<a.length;i++) {
            result+=a[i];
       }    
     return 'Количество красных точек во всех' + 
             'строчках изображения: ' + result;
    } 
}
































