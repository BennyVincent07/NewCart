import React from "react";
class Input extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }

    handleChange(e)
    {
        const value=e.target.value;
        if(value!==""){
            this.props.searchFunc(true,value);
        }
        else{
            this.props.searchFunc(false,value);
        }
    }
    handleClick(e)
    {  
        if(e.target.checked)
            this.props.checkboxFunc(true);
        else
            this.props.checkboxFunc(false);
    }

    render()
    {
        return(
            <div className="searchBox">
                <input className="textbox" type="Text" onChange={this.handleChange}placeholder="Search Item"/>
                <input className="checkbox"  type="checkbox" onClick={this.handleClick} id="Instock"/>
                <label htmlFor ="Instock">InStock</label>
            </div>
        );
    }
}
export default Input;