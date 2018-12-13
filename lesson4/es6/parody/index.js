/* global HTMLElement */
export class Parody{
    constructor(props){
        if(typeof props !== "object"){
            props = {};
        }

        this.props = props;
        this.isMount = false;
        this.targetNode;
        this.state = {}
        this.initState = this.watchObj(this.state, this)

    }

    watchObj(obj, that) {
        return new Proxy(obj, {
            get(target, name) {
                let prop = target[name];
                if(typeof prop === 'function') {
                    return prop;
                }
                if(typeof prop === 'object') {
                    return that.watchObj(prop, that);
                }
                return prop;
            },
            set(target, name, value) {
                target[name] = value;
                that.render();
                return true;
            }
        })
    }


    bindMount(selector){
        this.isMount = true;
        this.targetNode = document.querySelector(selector);
        return this;
    }

    render(node){
        if(this.isMount){
            this.targetNode.innerHTML = '';
            this.targetNode.appendChild(node);
        }

        return node;
    }
}

export function ParodyDom(tag, props, ...children){
    //console.log('parody');

    if(typeof tag === "function"){
        return (new tag(props)).render();
    }

    // console.log('tag', tag);
    // console.log(props);
    // console.log(children);

    let node = document.createElement(tag);

    children.forEach((child) => {
        if(Array.isArray(child)) {
            child.forEach((el => parceChildren(el, node)));
        } else {
            parceChildren(child, node);
        }
    });

    Object.assign(node, props);

    return node;
}

function parceChildren(child, node) {
    if(child instanceof HTMLElement){
        node.appendChild(child);
    }
    else{
        let textNode = document.createTextNode(child);
        node.appendChild(textNode);
    }
}

// <div className="a">
// 	<input />
//   <span>
//   	<p></p>
//     <header></header>
//   </span>
// </div>


// React.createElement(
//     "div",
//     { className: "a" },
//     React.createElement("input", null),
//     React.createElement(
//       "span",
//       null,
//       React.createElement("p", null),
//       React.createElement("header", null)
//     )
//   );
