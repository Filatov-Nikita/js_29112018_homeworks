/* global fetch FormData */

export async function all(){
    return await new makeRequest1('/js-hw-api/articles.php');
}

export async function one(id){
    return await new makeRequest1(`/js-hw-api/articles.php?id=${id}`);
}

export async function remove(id){
   return await makeRequest1.delete(`/js-hw-api/articles.php?id=${id}`);
}

export async function add(article){
    let formData = new FormData();

    for(let name in article){
        formData.append(name, article[name]);
    }

   return await makeRequest1.post('/js-hw-api/articles.php', formData);

}

export async function edit(id, article){
   return await makeRequest1.put('/js-hw-api/articles.php', {
        ...article,
        id
    });
}


class makeRequest1 {
    constructor(url, options = {}) {
        return makeRequest1.request(null, null, url, options);
    }

    static makeOptions = (options) => {
        makeRequest1.options = options;
    }

    static post = (url, data, options = {}) => {
        return makeRequest1.request('POST', data, url, options);
    }

    static put = (url, data, options = {}) => {
        return makeRequest1.request('PUT', data, url, options);
    }

    static delete = (url, options = {}) => {
        return makeRequest1.request('DELETE', null, url, options);
    }

    static request = (method = null, data = null, url, options = {}) => {
        options = {
            ...options,
            ...makeRequest1.options
        }

        switch(method) {
            case 'POST': {
                options.method = 'POST';
                options.body = data;
                break;
            }
            case 'PUT': {
                options.method = 'PUT';
                options.body = JSON.stringify(data);
                break;
            }

            case 'DELETE': {
                options.method = 'DELETE';
                break;
            }
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
}

makeRequest1.makeOptions({headers:{'Autorization': 'be28e70e36f635fe8efd77171826ea68'}})
