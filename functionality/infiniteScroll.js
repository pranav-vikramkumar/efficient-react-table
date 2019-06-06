import {renderUptoNthChunk} from './'
//Infinite scroll
export const handleScroll = (parent, e) => {
  const bottom =
    e.target.scrollHeight - Math.ceil(e.target.scrollTop) <=
    e.target.clientHeight;
  if (bottom) {
    renderUptoNthChunk(parent, parent.state.renderedUpto + 1);
  }
};
