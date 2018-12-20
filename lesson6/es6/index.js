import * as ArticlesModel from './articles';
import 'babel-polyfill';

async function list() {
    let articles = await ArticlesModel.all();
    let el = document.querySelector('.list');
    for(let item of articles) {
        let p = document.createElement('p');
        p.innerHTML = item.title;
        p.addEventListener('click', async () => {
            let res = await ArticlesModel.remove(item.id_article);
            let remove = document.querySelector('.remove');
            if(res.res) {
                remove.innerHTML = 'Статья с id ' +  item.id_article + ' удалена';
            } else {
                remove.innerHTML = res.errors;
            }
        });
        el.appendChild(p);
    }
}
async function auth() {
    let login = document.querySelector('.login').value;
    let password = document.querySelector('.password').value;

    let res = await ArticlesModel.auth(login, password);
    if(res.res && res.token) {
        localStorage.setItem('accessToken', res.token);
        let hello = document.querySelector('.hello');
        hello.innerHTML = `Привет ${res.name}`;
        let form = document.querySelector('.authForm');
        form.style.display = 'none';
    } else {
        let err = document.querySelector('.authForm__errors');
        err.innerHTML = res.errors;
    }
}
let getAll = document.querySelector('.getAll');
let authBtn = document.querySelector('.authForm__btn');

authBtn.addEventListener('click',
    () => auth()
        .then(() => {})
        .catch((e) => {
            console.log(e.stack);
        })
    );
getAll.addEventListener(
    'click',
    () => list()
        .then(() => {})
        .catch((e) => {
            console.log(e.stack);
        })
    );
