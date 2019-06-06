import React from "react";
import _ from "lodash";
export class Cell extends React.Component {
  shouldComponentUpdate(prevProps) {
    return !_.isEqual(this.props, prevProps);
  }
  render = () => {
    return this.props.columnDefinition.show === false ? null : (
      <div
        className="ert-col"
        style={{ width: this.props.columnDefinition.width || 100 }}
      >
        {this.props.columnDefinition.Cell ? (
          this.props.columnDefinition.Cell({
            original: this.props.rowData,
            column: {
              ...this.props.columnDefinition,
              id: this.props.columnDefinition.accessor
            },
            value: this.props.data
          })
        ) : (
          this.props.data
        )}
      </div>
    );
  };
}
