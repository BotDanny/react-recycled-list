import React from 'react';
import {
  RowToDataIndexMap,
  calculateRowPositions,
  mapRowIndexToDataIndex
} from './utils';
import { ReactRecycledListProps, ReactRecycledListState } from './TypeDef';
import GeneralList from './AbstractList';

interface FixedListProps extends ReactRecycledListProps {
  /**
   * The height of the list.
   */
  height: number;
}

export default class FixedList extends GeneralList<
  FixedListProps,
  ReactRecycledListState
> {
  rowPositions: number[];
  rowHeights: number[];
  rowToDataIndexMap: RowToDataIndexMap;
  fullHeight: number;
  windowHeight: number;
  initialArrayTemplate: null[];
  totalNumOfRenderedRows: number;
  numOfInvisibleRowOnEachDirection: number;
  totalRows: number;
  timeOut: any;
  listWindowRef: React.RefObject<HTMLDivElement>;

  initializeProperties = () => {
    const {
      rowHeight,
      column,
      rowColumns,
      data,
      height,
      offScreenRow
    } = this.props;

    // Validate

    if (rowColumns) {
      if (
        rowColumns.reduce((acc, current) => acc + current, 0) !== data.length
      ) {
        throw Error(
          'The total number of data item calculated from rowColumns does not match the length of your input data'
        );
      }
    }

    const calculatedRowColumns = rowColumns
      ? rowColumns
      : column
      ? Array(Math.ceil(data.length / column)).fill(column)
      : Array(data.length).fill(1);
    const rowHeights = calculatedRowColumns.map(() => rowHeight);

    const rowToDataIndexMap = mapRowIndexToDataIndex(
      calculatedRowColumns,
      data.length
    );
    const rowPositions = calculateRowPositions(rowHeights);
    const totalRows = rowHeights.length;

    const numOfVisibleRow = Math.ceil(height / rowHeight);
    const numOfInvisibleRowOnEachDirection = offScreenRow || 1;
    let totalNumOfRenderedRows =
      numOfVisibleRow + numOfInvisibleRowOnEachDirection * 2;
    if (totalNumOfRenderedRows > totalRows) totalNumOfRenderedRows = totalRows;
    const initialArrayTemplate = Array(totalNumOfRenderedRows).fill(null);

    const fullHeight = rowHeights.reduce((acc, current) => acc + current, 0);
    const windowHeight = height;

    return {
      rowToDataIndexMap,
      rowPositions,
      totalRows,
      initialArrayTemplate,
      fullHeight,
      totalNumOfRenderedRows,
      numOfInvisibleRowOnEachDirection,
      rowHeights,
      windowHeight
    };
  };

  constructor(props: FixedListProps) {
    super(props);

    const {
      rowToDataIndexMap,
      rowPositions,
      totalRows,
      initialArrayTemplate,
      fullHeight,
      totalNumOfRenderedRows,
      numOfInvisibleRowOnEachDirection,
      rowHeights,
      windowHeight
    } = this.initializeProperties();

    this.rowToDataIndexMap = rowToDataIndexMap;
    this.rowPositions = rowPositions;
    this.totalRows = totalRows;
    this.initialArrayTemplate = initialArrayTemplate;
    this.fullHeight = fullHeight;
    this.totalNumOfRenderedRows = totalNumOfRenderedRows;
    this.numOfInvisibleRowOnEachDirection = numOfInvisibleRowOnEachDirection;
    this.rowHeights = rowHeights;
    this.windowHeight = windowHeight;
    this.listWindowRef = React.createRef();

    const initialRenderedRowIndex = this.initialArrayTemplate.map(
      (_, index) => index
    );
    const initialScrollState = this.initialArrayTemplate.map(() => false);

    if (!props.initialScrollTop) {
      this.onListWillRecycle(initialRenderedRowIndex, initialScrollState, 0);
      this.onScrollChange(0);
    }

    this.state = {
      renderedRowIndex: initialRenderedRowIndex,
      scrollState: initialScrollState,
      topRenderedRowRelativeIndex: 0
    };
  }

  shouldResetList = (prevProps: FixedListProps) => {
    const currentProp = this.props;
    if (prevProps === currentProp) return false;
    const {
      rowHeight,
      column,
      rowColumns,
      height,
      data,
      offScreenRow
    } = currentProp;

    return (
      prevProps.rowHeight !== rowHeight ||
      prevProps.column !== column ||
      prevProps.rowColumns !== rowColumns ||
      prevProps.height !== height ||
      prevProps.data !== data ||
      prevProps.offScreenRow !== offScreenRow
    );
  };

  getTopViewportRowIndex = (scrollTop: number) => {
    return Math.floor(scrollTop / this.props.rowHeight);
  };

  getBottomViewportRowIndex = (viewportBottom: number) => {
    let viewportBottomRow = viewportBottom / this.props.rowHeight;
    if (Number.isInteger(viewportBottomRow)) viewportBottomRow -= 1;
    else viewportBottomRow = Math.floor(viewportBottomRow);
    return viewportBottomRow;
  };
}
