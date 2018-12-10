export function watchObj(el, callback) {
    return new Proxy(el, {
        get(target, name) {
            let prop = target[name];
            //Можно ли как-то не задавать жестко строки function или object
            if(typeof prop === 'function') {
                return prop.bind(target);
            }
            if(typeof prop === 'object') {
                return watchObj(prop, callback);
            }
            return prop;
        },
        set(target, name, value) {
            target[name] = value;
            callback(name, value);
            return true;
        }
    });
}

export class EmailParser {
    constructor(email) {
        this.email = this.emailHandler(email);
        this.context = this
        return new Proxy(this,
                {
                    get(target, name) {
                        const  prop = target['email'];
                        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        const correct = re.test(prop);
                        switch(name) {
                            case 'name': return correct ? prop.substr(0, prop.indexOf('@')) : null;
                                break;
                            case 'domain': return correct ? prop.substr(prop.indexOf('@') + 1) : null;
                                break;
                            case 'isCorrect':
                                return correct
                                break;
                        }
                    },
                    set(target, name, value) {
                        //правильно ли так передавать контекст ?
                        if(name === 'email') {
                            target['email'] = target['context'].emailHandler(value);
                            return true;
                        }
                        return false;
                    }
                });
    }

    emailHandler(email) {
        return String(email).trim().toLowerCase();
    }
}
