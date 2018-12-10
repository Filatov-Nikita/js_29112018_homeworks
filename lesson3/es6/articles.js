import * as serverApi from './db';

/**
 *
 * Не успел подумать как вынести повторный код
 */


function all(onSuccess, onError) {
    return new Promise(function(resolve, reject) {
        serverApi.all()
            .then((response) => {
                try{
                    let info = JSON.parse(response);
                    if(info.code === 200){
                        resolve(info.data);
                    }
                    else{ reject(info.status); }
                }
                catch(e) {
                    reject('некорректный json');
                    return;
                }
         })
         .catch((err) => {
             console.log(err);
         });
    });
}

function one(id) {
    return new Promise(function(resolve, reject) {
        serverApi.get(id)
        .then((response) => {
            try{
                let info = JSON.parse(response);
                if(info.code === 200){
                    resolve(info.data);
                }
                else{
                    reject(info.status);
                }
            }
            catch(e) {
                reject('некорректный json');
                return;
            }
        })
        .catch((err) => {
            console.log(err);
        });
    });
}

function remove(id) {
    return new Promise(function(resolve, reject) {
        serverApi.remove(id)
        .then((response) => {
            try{
                let info = JSON.parse(response);
                if(info.code === 200){
                    resolve(info.data);
                }
                else{
                    reject(info.status);
                }
            }
            catch(e) {
                reject('некорректный json');
                return;
            }
        })
        .catch((err) => {
            console.log(err);
        });
    });
}

export {all, one, remove};
