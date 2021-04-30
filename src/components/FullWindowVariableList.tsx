import { calculateRowPositions, mapRowIndexToDataIndex } from './utils';
import { ReactRecycledListState } from './TypeDef';
import { sortedFirstIndex, sortedLastIndex } from './utils';
import FullWindowFixedList, {
  FullWindowFixedListProps
} from './FullWindowFixedList';

interface FullWindowVariableListProps extends FullWindowFixedListProps {
  rowHeights: number[];
}

export default class FullWindowVariableList extends FullWindowFixedList<
  FullWindowVariableListProps,
  ReactRecycledListState
> {
  initializeProperties = (constructor: boolean = false) => {
    const {
      rowHeight,
      rowHeights,
      column,
      rowColumns,
      data,
      offScreenRow,
      serverSideHeight,
      scrollRef,
      rootMarginTop = 0,
      rootMarginBottom = 0
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
      if (rowColumns.length !== rowHeights.length) {
        throw Error(
          'The number of rows provided from rowHeights does not match the number of rows provided from rowColumns'
        );
      }
    } else if (column) {
      const rows = Math.ceil(data.length / column);
      if (rows !== rowHeights.length) {
        throw Error(
          'The number of rows provided from rowHeights does not match the number of rows calculated from column'
        );
      }
    } else if (rowHeights.length !== data.length) {
      throw Error(
        'The number of rows provided from rowHeights does not match the number of rows calculated from your input data'
      );
    }

    let calculatedWindowHeight = 0;
    let scrollListener;

    if (constructor && serverSideHeight !== undefined) {
      calculatedWindowHeight = serverSideHeight;
    } else if ('scrollRef' in this.props) {
      if (scrollRef?.current) {
        calculatedWindowHeight = parseInt(
          window.getComputedStyle(scrollRef.current).height
        );
        scrollListener = scrollRef;
      } else calculatedWindowHeight = 0;
    } else {
      calculatedWindowHeight = window.innerHeight;
      scrollListener = window;
    }

    calculatedWindowHeight = Math.max(
      0,
      calculatedWindowHeight - rootMarginTop - rootMarginBottom
    );

    const calculatedRowColumns = rowColumns
      ? rowColumns
      : column
      ? Array(rowHeights.length).fill(column)
      : Array(rowHeights.length).fill(1);

    const rowToDataIndexMap = mapRowIndexToDataIndex(
      calculatedRowColumns,
      data.length
    );
    const rowPositions = calculateRowPositions(rowHeights);
    const totalRows = rowHeights.length;

    const numOfVisibleRow = Math.ceil(calculatedWindowHeight / rowHeight);
    const numOfInvisibleRowOnEachDirection =
      offScreenRow || numOfVisibleRow ? 1 : 0;
    let totalNumOfRenderedRows =
      numOfVisibleRow + numOfInvisibleRowOnEachDirection * 2;
    if (totalNumOfRenderedRows > totalRows) totalNumOfRenderedRows = totalRows;
    const initialArrayTemplate = Array(totalNumOfRenderedRows).fill(null);

    const fullHeight = rowHeights.reduce((acc, current) => acc + current, 0);

    return {
      rowToDataIndexMap,
      rowPositions,
      totalRows,
      initialArrayTemplate,
      fullHeight,
      totalNumOfRenderedRows,
      numOfInvisibleRowOnEachDirection,
      rowHeights,
      windowHeight: calculatedWindowHeight,
      scrollListener
    };
  };
  constructor(props: FullWindowVariableListProps) {
    super(props);
  }

  getTopViewportRowIndex = (scrollTop: number) => {
    return sortedLastIndex(this.rowPositions, scrollTop) - 1;
  };

  getBottomViewportRowIndex = (viewportBottom: number) => {
    return sortedFirstIndex(this.rowPositions, viewportBottom) - 1;
  };

  shouldResetList = (prevProps: FullWindowVariableListProps) => {
    const {
      rowHeight,
      rowHeights,
      column,
      rowColumns,
      windowHeight,
      data,
      offScreenRow,
      scrollRef,
      rootMarginBottom,
      rootMarginTop
    } = this.props;

    return (
      prevProps.data !== data ||
      prevProps.windowHeight !== windowHeight ||
      (scrollRef && scrollRef.current !== this.scrollListener) ||
      prevProps.rowHeight !== rowHeight ||
      prevProps.rowHeights !== rowHeights ||
      prevProps.column !== column ||
      prevProps.rowColumns !== rowColumns ||
      prevProps.offScreenRow !== offScreenRow ||
      prevProps.rootMarginBottom !== rootMarginBottom ||
      prevProps.rootMarginTop !== rootMarginTop
    );
  };
}
