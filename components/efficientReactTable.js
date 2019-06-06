import React from "react";
import { Page } from "./page";
import { HeaderRow } from "./rows";
import { sort, renderUptoNthChunk,handleScroll,validateProps } from "../functionality";
import "../styling/efficientReactTable.css";
import _ from "lodash";

export class EfficientReactTable extends React.Component {
  constructor(props) {
    super(props);
    this.chunks = [];
    this.initialState = {
      chunks: [],
      renderedUpto: -1,
      sortList: [],
      data: []
    };
    this.state = this.initialState;
  }

  componentWillMount() {
    this.setState(this.initialState, () => {
      this.chunks = _.chunk(this.props.data, this.props.pageSize);  
      if(this.chunks.length <= this.props.thresholdPageCount)    
        renderUptoNthChunk(this, this.chunks.length);
      else{
        renderUptoNthChunk(this, this.props.thresholdPageCount-1);
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ renderedUpto: -1, data: nextProps.data }, () => {
      this.chunks = _.chunk(nextProps.data, nextProps.pageSize);
      if(this.chunks.length <= nextProps.thresholdPageCount)    
        renderUptoNthChunk(this, this.chunks.length);
      else{
        renderUptoNthChunk(this, nextProps.thresholdPageCount-1);
      }
    });
  }

  //After sort
  reloadChunksFromData = (data, pageSize) => {
    this.setState({ data: data }, () => {
      this.chunks = _.chunk(data, this.props.pageSize);
      renderUptoNthChunk(this, this.state.renderedUpto);
    });
  };  

  render = () => {
    const validationResult = validateProps(this.props);
    
    return validationResult==="SUCCESS"?(
      <div className="ert">
        <HeaderRow
          columnDefinitions={this.props.columnDefinitions}
          sortList={this.state.sortList}
          sorter={columnName => {
            sort(this, columnName);
          }}
        />
        <div
          className="page-container"
          style={{ maxHeight: this.props.maxHeight, overflowY:"scroll" }}
          onScroll={event => handleScroll(this,event)}
        >
          {this.state.chunks.map((chunk, index) => (
            <Page
              key={"page-" + index}
              columnDefinitions={this.props.columnDefinitions}
              rowStyler={this.props.rowStyler}
              pageData={chunk}
            />
          ))}
        </div>
      </div>
    ):validationResult;
  };  
}
EfficientReactTable.defaultProps = {
  maxHeight: 200,
  pageSize: 20,
  thresholdPageCount:20
};
