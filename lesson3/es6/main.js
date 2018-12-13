import 'babel-polyfill';
import * as ArticlesModel from './articles';

async function f() {
    let articles = await ArticlesModel.all();
    let ind = Math.floor(Math.random() * articles.length);
    console.log('select index ' + ind + ', id = ' + articles[ind].id);

    let article = await ArticlesModel.one(articles[ind].id);
    let res = await ArticlesModel.remove(article.id);
    console.log('что с удалением? - ' + res);

    let all = await ArticlesModel.all();
    return all;
}

f().then((articles) => {
    console.log('articles count = ' + articles.length);
}).catch((err) => {
    console.log(err);
});
