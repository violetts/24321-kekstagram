
/*getMessage(a:*, b:*=):string*/

function getMessage(a,b){
    
    if(typeof a == 'boolean'){
        if(a){
            return "Переданное GIF-изображение анимировано и содержит "+ b +" кадров";
        }return "Переданное GIF-изображение не анимировано"
     }        
       
    if(typeof a == 'number'){
            return "Переданное SVG-изображение содержит " + a + " объектов и " +b * 4+ " атрибутов";
    } 

    
    if(a=pngNum){
    //значения массивов взяла из upload-stat.min.js    
    var pngNum=[23,11,75,88,14];
    var pngSum=0;    
       for (var i=0;i<pngNum.length;i++){
       pngSum+=pngNum[i];
       }    
    } return 'Количество красных точек во всех строчках изображения: ' + pngSum ;

     
    if(a=jpgNumA, b=jpgNumB){
    //значения массивов взяла из upload-stat.min.js      
    var jpgNumA=[10,2,8,15];
    var jpgNumB=[4,20,5,3];
    var jpgSum=0;           
       for(var i=0;i<jpgNumA.length;i++)
       for(var i=0;i<jpgNumB.length;i++){
           jpgSum+=jpgNumA[i]*jpgNumB[i];
        }
    }return 'Общая площадь артефактов сжатия: ' + jpgSum+ ' пикселей' ;
}































