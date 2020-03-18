import React from 'react';
const PageTitle = (props) => {
    return(
        <div className="row">
           <div className="col-md-10">
              <div className="page-title-box">
                 <h4 className="page-title">{props.title}</h4>
                 <ol className="breadcrumb">
                    <li className="breadcrumb-item active"> {props.subtitle} </li>
                 </ol>
              </div>
           </div>
        </div>
    );
}

export default PageTitle;
