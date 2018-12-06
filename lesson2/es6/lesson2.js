import {watchObj, EmailParser} from './module';

let div = document.createElement('div');
document.body.appendChild(div);

let cleverDiv = watchObj(div, function(prop, val){
    console.log(prop, val);
});

cleverDiv.innerHTML = '<strong>HTML</strong><em>Changed</em>';
/*
    в консоли:
    innerHTML <strong>HTML</strong><em>Changed</em
*/

cleverDiv.style.color = 'red';
cleverDiv.querySelector('em').style.color = 'green';

let parser = new EmailParser(' inFo@ntschool.ru');
console.log(parser.name);
console.log(parser.domain);
console.log(parser.isCorrect);

parser.email = 'some@nz';
console.log(parser.name);
console.log(parser.domain);
console.log(parser.isCorrect);
