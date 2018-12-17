/* global fetch FormData */

export async function all(){
    let data = await makeRequest('/js-hw-api/articles.php');
    return data;
}

export async function one(id){
    let data = await makeRequest(`/js-hw-api/articles.php?id=${id}`);
    return data;
}

export async function remove(id){
    let data = await makeRequest(`/js-hw-api/articles.php?id=${id}`, {
        method: 'DELETE'
    });

    return data;
}

export async function add(article){
    let formData = new FormData();

    for(let name in article){
        formData.append(name, article[name]);
    }

    let data = await makeRequest('/js-hw-api/articles.php', {
        method: 'POST',
        body: formData
    });

    return data;
}

export async function edit(id, article){
    let forServer = {
        ...article,
        id
    };

    let data = await makeRequest('/js-frontend-api/articles.php', {
        method: 'PUT',
        body: JSON.stringify(forServer)
    });

    return data;
}

function makeRequest(url, options = {}){
    options.headers = {
        'Autorization': 'be28e70e36f635fe8efd77171826ea68'
    }
    return fetch(url, options).then((response) => {
        if(response.status !== 200){
            return response.text().then((text) => {
                throw new Error(text);
            })
        }

        return response.json();
    });
}

/*
    GET articles.php -> все статьи в виде массива
    GET articles.php?id=int -> одна статья в виде объекта || 404
    POST articles.php body-formData(title, content) -> id || validation errors
    DELETE articles.php?id=int  -> true || false
    PUT articles.php body-json -> true || false
*/
