import React from 'react';

export class SliderMenu extends React.Component {

	constructor(props){
		super(props);
	    this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.slider();
	}
	
	render() {
		return (
				<div className={this.props.condition ? 'sidebar active' :'sidebar'}>
			         <i className="menu-burger" onClick={this.handleClick}><span></span></i>
			         <ul className="menu">
			            <li className="active">
			               <a href="/"><i className="icon-sidebar-menu-1"></i>Groups</a>
			            </li>
			         </ul>
			      </div>
			);
	}
}
