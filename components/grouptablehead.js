import React from 'react';

export class GroupTableHead extends React.Component {

	constructor(props){
		super(props);		
	}
	
	render() {
		return (
				<thead> 
					<tr>
						<td className="bold"> Group Name </td>
						<td className="bold center"> Users </td>
						<td className="bold center"> Apps </td>
						<td className="bold center"> SOs </td>
						<td className="bold"> Description </td>
					</tr>
				</thead>
			);
	}
}
