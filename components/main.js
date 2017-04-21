import React from 'react';

import {SliderMenu} from './slidermenu';
import {GroupTableHead} from './grouptablehead';
import {GroupTableBody} from './grouptablebody';

export class MainDiv extends React.Component {

	constructor(props){
		super(props);
		this.state = {
		      condition: false,
	    };	
	    this.sliderHandleClick = this.sliderHandleClick.bind(this);
	}

	sliderHandleClick()
	{
		this.setState( { condition : !this.state.condition } );
	}

	render() {
		return (
			<div>
				<SliderMenu slider={this.sliderHandleClick} condition={this.state.condition}/>
				<div className={this.state.condition ? 'content short' :'content'}>
					<main>
						<div className="main-title">
							<h1>Groups</h1>
						</div>
						<div className="panel z-depth-1">
							<table className="highlight responsive-table table--first">
								<GroupTableHead />	
				              	<GroupTableBody groups={this.state.groups}/>	
				             </table>
						</div>
					</main>
				</div>
             </div>
			);
	}
}


