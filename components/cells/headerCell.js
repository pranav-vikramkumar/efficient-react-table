import React from "react";
import _ from "lodash";
import "font-awesome/css/font-awesome.min.css";
export class HeaderCell extends React.Component {
  shouldComponentUpdate(prevProps) {
    return !_.isEqual(this.props, prevProps);
  }
  render = () => {
    return this.props.columnDefinition.show === false ? null : (
      <div
        className="ert-header-col"
        style={{ width: this.props.columnDefinition.width || 100 }}
      >
        <div className="heading">
          {this.props.columnDefinition.HeaderCell ? (
            this.props.columnDefinition.HeaderCell({
              value: this.props.data
            })
          ) : (
            this.props.columnDefinition.Header
          )}
        </div>

        {this.props.columnDefinition.sortable ? (
          <div
            className="sort-order"
            onClick={() => {
              this.props.sorter(this.props.columnDefinition.accessor);
            }}
          >
            {this.props.sortOrder === "asc" ? (
              <i className="fa fa-sort-up" />
            ) : null}
            {this.props.sortOrder === "desc" ? (
              <i className="fa fa-sort-down" />
            ) : null}
            {!this.props.sortOrder ? <i className="fa fa-sort" /> : null}
          </div>
        ) : null}
      </div>
    );
  };
}
