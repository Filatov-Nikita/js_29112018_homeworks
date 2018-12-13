import {Parody, ParodyDom} from '../parody';
import InputNumber from './input-number';

export default class Cart extends Parody{
    constructor(props){
        super(props);

        this.initState.state = {
            products: [
                {price: 1000, rest: 10, current: 1},
                {price: 2000, rest: 5, current: 2}
            ]
        };
    }

    onChange(ind, val){
        this.initState.state.products[ind].current = val;
    }

    render(){
        let sum = this.initState.state.products.reduce((total, item) => {
            return total + item.price * item.current;
        }, 0);

        let inputs = this.initState.state.products.map((item, i) => {
            return <InputNumber min={1} max={item.rest} value={item.current}
                                change={this.onChange.bind(this, i)}/>
        });

        return super.render(
            <div>
                {inputs}
                <hr/>
                <div>{sum}</div>
            </div>
        );
    }
}
