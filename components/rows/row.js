import React from "react";
import { Cell } from "../cells";
import _ from "lodash";
export class Row extends React.Component {
  shouldComponentUpdate(prevProps) {
    return !_.isEqual(this.props, prevProps);
  }
  render = () => {
    return (
      <div
        className="ert-row"
        style={
          this.props.rowStyler ? this.props.rowStyler(this.props.rowData) : null
        }
      >
        {this.props.columnDefinitions.map((columnDefinition, index) => (
          <Cell
            key={"cell-" + index}
            columnDefinition={columnDefinition}
            rowData={this.props.rowData}
            data={this.props.rowData[columnDefinition.accessor]}
          />
        ))}
      </div>
    );
  };
}
