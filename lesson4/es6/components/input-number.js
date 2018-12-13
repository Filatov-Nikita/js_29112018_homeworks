import {Parody, ParodyDom} from '../parody';

export default class InputNumber extends Parody{
    constructor(props){
        super(props);

        this.onChange = ('change' in props) ? props.change : function(){};
    }

    _normalizeValue(val){
        let newVal = parseInt(val);

        if(isNaN(newVal) || newVal < this.props.min){
            newVal = this.props.min;
        }
        else if(newVal > this.props.max){
            newVal = this.props.max;
        }
        
        this.onChange(newVal);
    }

    render(){
        return super.render(
            <div className="inputNumber">
                <input type="button" value="-" className="inputNumber__min"
                       onclick={() => this._normalizeValue(this.props.value - 1)} 
                />
                <input type="text" value={this.props.value} className="inputNumber__value"
                       onchange={(e) => this._normalizeValue(e.target.value)} />
                 <input type="button" value="+" className="inputNumber__plus"
                        onclick={() => this._normalizeValue(this.props.value + 1)} 
                 />
            </div>
        );
    }
}