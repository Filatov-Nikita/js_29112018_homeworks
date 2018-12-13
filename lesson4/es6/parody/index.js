/* global HTMLElement */
export class Parody{
    constructor(props){
        if(typeof props !== "object"){
            props = {};
        }

        this.props = props;
        this.isMount = false;
        this.targetNode;
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
    if(typeof tag === "function"){
        return (new tag(props)).render();
    }
    console.log(tag);
    console.log(props);
    console.log(children);
    
    let node = document.createElement(tag);

    children.forEach((child) => {
        if(child instanceof HTMLElement){
            node.appendChild(child);
        }
        else{
            let textNode = document.createTextNode(child);
            node.appendChild(textNode);
        }
    });

    Object.assign(node, props);

    return node;
}