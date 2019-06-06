import _ from "lodash";

export const sort = (parent, columnName) => {
  let currentSortOrder = getCurrentSortOrder(parent.state.sortList, columnName);
  let nextSortStatus = getNextSortOrder(currentSortOrder, columnName);
  let nextSortList = getNextSortList(
    [...parent.state.sortList],
    nextSortStatus,
    columnName
  );
  let cleanNextSortList = removeRedundantColumns(nextSortList);
  let { keys, values } = getKeyValues(cleanNextSortList);  
  let sortedData = _.orderBy(parent.state.data, keys, values);
  
  parent.setState({ sortList: cleanNextSortList }, () =>
    parent.reloadChunksFromData(sortedData)
  );
};

const getCurrentSortOrder = (list, columnName) => {
  let currentSortStatus = list.find(
    sortOrder => sortOrder.column === columnName
  );
  let currentSortOrder =
    (currentSortStatus && currentSortStatus.sortOrder) || "";
  return currentSortOrder;
};

const getNextSortOrder = (currentSortOrder, columnName) => {
  let nextSortStatus = { column: columnName, sortOrder: "asc" };
  switch (currentSortOrder) {
    case "asc":
      nextSortStatus = { column: columnName, sortOrder: "desc" };
      break;
    case "desc":
      nextSortStatus = { column: columnName, sortOrder: undefined };
      break;
    default:
      nextSortStatus = { column: columnName, sortOrder: "asc" };
  }
  return nextSortStatus;
};

const getNextSortList = (list, nextSortStatus, columnName) => {
  let nextSortList = [...list];
  if (!nextSortList.some(sortStatus => sortStatus.column === columnName)) {
    nextSortList.push(nextSortStatus);
  } else {
    nextSortList.find(sortOrder => sortOrder.column === columnName).sortOrder =
      nextSortStatus.sortOrder;
  }
  return nextSortList;
};

const removeRedundantColumns = list => {
  return list.filter(entry => entry.sortOrder);
};

const getKeyValues = list => {
  let keys = [];
  let values = [];
  list.forEach(entry => {
    keys.push(entry.column);
    values.push(entry.sortOrder);
  });
  return { keys: keys, values: values };
};
