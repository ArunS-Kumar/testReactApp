import React from 'react';
import Request from 'superagent';

export class GroupTableBody extends React.Component {

	constructor(props){
		super(props);
		this.state = {
		      groups: [],
	    };	
	}

	componentWillMount(){
		var url = 'http://grouprestapi.com/api/getGroups';

		Request.get(url).then((response) => {
	 	 	this.setState( { groups : response.body.groups } );
		})
	}
	
	render() {
		var groups = this.state.groups.map((elem, i) => {
			return <tr id={elem.id} key={i}>
						<td className="bold" > {elem.name} </td>
						<td className="center" > 5 </td>
						<td className="center" > 564 </td>
						<td className="center" > 3666 </td>
						<td className="with-icons" > {elem.description}
							<div className="icons">
								<a href="#" className="delete-row" data-rowid="1">
									<img src="asset/img/icons/delete.svg" alt="" height="19" />
								</a>
								<a href="#" className="edit-row" data-rowid="1">
									<img src="asset/img/icons/edit.png" alt="" height="19" />
								</a>
							</div>
						</td>
					</tr>
		});

		return (
				<tbody> 
					{groups}
				</tbody>
			);
	}
}
