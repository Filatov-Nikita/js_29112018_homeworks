import * as serverApi from './db';

function parseResponse(text){
    try{
        let responce = JSON.parse(text);

        if(responce.code !== 200){
            throw new Error('Код ответа не 200!');
        }

        return responce.data;
    }
    catch(e){
        throw new Error('Некорректный формат ответа от севера!');
    }
}

function all() {
    return serverApi.all().then((response) => {
            return parseResponse(response);
        });
}

function one(id) {
    return serverApi.get(id).then((response) => {
        return parseResponse(response);
    });
}

function remove(id) {
    return serverApi.remove(id).then((response) => {
        return parseResponse(response);
    });
}

export {all, one, remove};
