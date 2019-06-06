import React from "react";
import {HeaderCell} from "../cells";
import _ from "lodash";
export class HeaderRow extends React.Component {
  shouldComponentUpdate(prevProps) {
    return !_.isEqual(this.props, prevProps);
  }
  render = () => (
    <div className="ert-header-row">
      {this.props.columnDefinitions.map((columnDefinition, index) => (
        <HeaderCell
          key={"header-cell-" + index}
          columnDefinition={columnDefinition}
          data={columnDefinition.accessor}
          sortOrder={
            this.props.sortList.find(
              sortOrder => sortOrder.column === columnDefinition.accessor
            ) ? (
              this.props.sortList.find(
                sortOrder => sortOrder.column === columnDefinition.accessor
              ).sortOrder
            ) : null
          }
          sorter={columnName => this.props.sorter(columnName)}
        />
      ))}
    </div>
  )
}
