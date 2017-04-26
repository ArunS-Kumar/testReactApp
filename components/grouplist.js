import React from 'react';
import Request from 'superagent';
import PropTypes from 'prop-types';
import _ from 'lodash';

export class GroupList extends React.Component {

	constructor(props){
		super(props);	
		 var exampleItems = [];

        this.state = {
            exampleItems: exampleItems,
            hideGroupName: 1,
            pageOfItems: [],
            pager: {}
        };
	}

	componentWillMount(){
		var url = 'http://grouprestapi.com/api/getGroups';
		var exampleItems = [];

		Request.get(url).then((response) => {
			exampleItems = response.body.groups.map(i => { 
				return { id: i.id, name: i.name, description: i.description }; 
			});
			this.setState( {  exampleItems: exampleItems } );	
			this.setPage(this.props.initialPage,exampleItems);
		})
	}

	editGroupname(id)
	{
		this.setState( {  hideGroupName: 0 } );	
	}

	setPage(page,exampleItems = false ) {

        if(exampleItems)
        {
            var items = exampleItems;
        } else {
            var items = this.state.exampleItems;   
        }
        
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }
        // // // get new pager object for specified page
        pager = this.getPager(items.length, page);
        // // // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        // // // update state
        this.setState({ pager: pager, pageOfItems: pageOfItems });
 
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 5;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
	
	
	render() {
		var pager = this.state.pager;

		var groups = this.state.pageOfItems.map((elem, i) => {
			return <tr id={"tr-id-"+elem.id} key={i}>
						<td className="bold" > 
							<span id="">{elem.name} </span>
							<div className={this.state.hideGroupName ? 'left edit-in-place hide' :'left edit-in-place'} >
                                <div className="input-field">
                                    <input type="text" value={elem.name} placeholder="Group Name" />
                                </div>
                            </div>
						</td>
						<td className="center" > 5 </td>
						<td className="center" > 564 </td>
						<td className="center" > 3666 </td>
						<td className="with-icons" > {elem.description}
							<div className="icons">
								<a href="#" className="delete-row" data-rowid="1" >
									<img src="asset/img/icons/delete.svg" alt="" height="19" />
								</a>
								<a href="#" className="edit-row" data-rowid="1" onClick={() => this.editGroupname(elem.id)}>
									<img src="asset/img/icons/edit.png" alt="" height="19" />
								</a>
							</div>
						</td>
					</tr>
		});

		return (

				<div>
					<div className="main-title">
						<h1>Groups</h1>
					</div>
					
					<div className="panel z-depth-1">
						<table className="highlight responsive-table table--first">
							<thead> 
								<tr>
									<td className="bold"> Group Name </td>
									<td className="bold center"> Users </td>
									<td className="bold center"> Apps </td>
									<td className="bold center"> SOs </td>
									<td className="bold"> Description </td>
								</tr>
							</thead>	
							<tbody> 
								{groups}
							</tbody>
						</table>
						 <div className="after-table-buttons">

						    <a href="#" className="btn btn-flat disabled delete-all-rows" id="btn-delete-groups"></a>
							<div className="pagination-fortanix right">
		                      <div className="main-part">
									<div className={pager.currentPage === 1 ? 'disabled to-left' : 'to-left'} >
										<a onClick={() => this.setPage(pager.currentPage - 1)}>
											<i className="material-icons">chevron_left</i>
										</a>
									</div>

		                            { pager.totalItems
										? pager.pages.map((page, index) =>
											<div key={index} className={pager.currentPage === page ? 'disabled nums' : 'nums'}>
												<a href="#" onClick={() => this.setPage(page)}>{page}</a>
											</div>
									) : '' }
		                          
									<div className={pager.currentPage === pager.totalPages ? 'disabled to-right' : 'to-right'} >
										<a onClick={() => this.setPage(pager.currentPage + 1)}>
											<i className="material-icons">chevron_right</i>
										</a>
									</div>
		                      </div>
		                  </div>
	                  </div>
						 
					</div>
				</div>
				
			);
	}
}
