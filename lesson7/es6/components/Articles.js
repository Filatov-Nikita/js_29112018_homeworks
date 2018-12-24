import React from 'react';
import * as ArticlesModel from '../server';

export default class extends React.Component {

    state = {
        articles: [],
        open: false,
        title: '',
        content: ''
    };

    componentWillMount = async () => {
        let articles = await ArticlesModel.all();
        return this.setState({ articles });
    }

    onDelete = async (articleId, indexArr) => {
        let result = await ArticlesModel.remove(articleId);

        if(result !== true) {
            throw new Error(result);
        }

        const articles = [...this.state.articles];
        articles.splice(indexArr, 1);

        return this.setState({ articles });
    }

    onAdd = async () => {
        const title = this.state.title;
        const content = this.state.content;

        if(title === '' || content === '') {
            throw new Error('Не заполнены поля');
        }

        let result = await ArticlesModel.add({
            title,
            content
        });

        if(result.res !== true) {
            throw new Error(result.res);
        }

        let article = await ArticlesModel.one(result.id);

        //надо ли здесь проверку что прищло в article ?
        //И где теперь обрабоать все исключения ?

        const newArticles = [...this.state.articles];
        newArticles.push(article);
        return this.setState({ articles: newArticles });
    }

    changeTitle = (e) => {
        this.setState({title: e.target.value});
    }

    changeContent = (e) => {
        this.setState({content: e.target.value});
    }

    addForm = () => {

        if(!this.state.open) {
            return
        }

        return (
            <div>
                Title <input onChange={this.changeTitle} name="title" type="text" /><br/>
                Content <input onChange={this.changeContent} name="content" type="text" /><br/>
                <button onClick={() => this.onAdd()}>Сохранить</button>
            </div>
        );
    }

    render() {
        const articles = this.state.articles.map((item, index) => {
            return (
                <li key={item.id}>
                    {item.title}
                    <button onClick={() => this.onDelete(item.id, index)}>Удалить</button>
                </li>
            );
        });

        return (
            <div>
                <ul>
                    {articles}
                </ul>
                <button onClick={() => this.setState({open: true})}>Add</button>
                {this.addForm()}
            </div>
        )
    }

}
