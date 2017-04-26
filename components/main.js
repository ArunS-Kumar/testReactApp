import React from 'react';

import {SliderMenu} from './slidermenu';
import {GroupList} from './grouplist';
// import {Pagination} from './pagination';

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
						<GroupList />
					</main>
				</div>
             </div>
			);
	}
}


