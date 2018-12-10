import * as serverApi from './db';

function all(onSuccess, onError){
    serverApi.all((response) => {
        let info = JSON.parse(response);

        if(info.code === 200){
            onSuccess(info.data);
        }
        else{
            onError(info.status);
        }
    });
}

function one(id, onSuccess, onError){
    serverApi.get(id, (response) => {
        let info = JSON.parse(response);

        if(info.code === 200){
            onSuccess(info.data);
        }
        else{
            onError(info.status);
        }
    });
}

function remove(id, onSuccess, onError){
    serverApi.remove(id, (response) => {
        let info = JSON.parse(response);

        if(info.code === 200){
            onSuccess(info.data);
        }
        else{
            onError(info.status);
        }
    });
}

export {all, one, remove};