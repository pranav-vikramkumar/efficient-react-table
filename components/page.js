import React from "react";
import {Row} from "./rows/row";
import _ from "lodash";
export class Page extends React.Component {
  shouldComponentUpdate(prevProps) {
    return !_.isEqual(this.props, prevProps);
  }
  render = () => {    
    return (
      
      <div className="ert-page">
        {this.props.pageData &&
          this.props.pageData.map((row, index) => (
            <Row
              key={"row-" + index}
              columnDefinitions={this.props.columnDefinitions}
              rowStyler={this.props.rowStyler}
              rowData={row}
            />
          ))}
      </div>
    );
  };
}
