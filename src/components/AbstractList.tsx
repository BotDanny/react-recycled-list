import React from 'react';
import {
  noRowRenderInfo,
  noRowVisibilityInfo,
  ReactRecycledListProps,
  ReactRecycledListState,
  RowProps
} from './TypeDef';
import { RowToDataIndexMap, validateScrollTo } from './utils';

export default abstract class General<
  P extends ReactRecycledListProps,
  S extends ReactRecycledListState
> extends React.PureComponent<P, S> {
  prevScroll: number;
  prevLastVisibleRow: number;
  prevLastRenderedRow: number;
  abstract listWindowRef: any;
  abstract rowHeights: number[];
  abstract rowPositions: number[];
  abstract rowToDataIndexMap: RowToDataIndexMap;
  abstract totalNumOfRenderedRows: number;
  abstract initialArrayTemplate: null[];
  abstract totalRows: number;
  abstract fullHeight: number;
  abstract timeOut: any;
  abstract windowHeight: number;
  abstract numOfInvisibleRowOnEachDirection: number;
  abstract getTopViewportRowIndex(scrollTop: number): number;
  abstract getBottomViewportRowIndex(scrollTop: number): number;
  abstract shouldResetList(prevProps: P): boolean;
  abstract initializeProperties(): any;

  constructor(props: P) {
    super(props);
    this.prevScroll = 0;
    this.prevLastVisibleRow = -1;
    this.prevLastRenderedRow = -1;
  }

  componentDidMount() {
    const { initialScrollTop } = this.props;
    if (initialScrollTop) {
      this.manualScroll(initialScrollTop as number);
    }
  }

  componentWillUnmount() {
    const { onUnmount } = this.props;
    if (onUnmount) onUnmount(this.prevScroll);
  }

  componentDidUpdate(prevProps: P) {
    if (this.shouldResetList(prevProps)) {
      const {
        rowToDataIndexMap,
        rowPositions,
        totalRows,
        initialArrayTemplate,
        fullHeight,
        totalNumOfRenderedRows,
        numOfInvisibleRowOnEachDirection,
        windowHeight,
        rowHeights
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
      this.resetList();
    }
  }

  onListWillRecycle = (
    newRenderedRowIndex: number[],
    newScrollState: boolean[],
    newTopRenderedRowRelativeIndex: number
  ) => {
    const { useScrollIndicator, onRenderedRowChange } = this.props;
    if (useScrollIndicator) {
      this.setState({
        scrollState: newScrollState
      });
      this._debounceScrollState();
    }

    if (onRenderedRowChange) {
      if (this.totalNumOfRenderedRows === 0) {
        onRenderedRowChange(noRowRenderInfo);
        return;
      }

      const lastRenderedRowIndex =
        newRenderedRowIndex[this.mod(newTopRenderedRowRelativeIndex - 1)];
      if (lastRenderedRowIndex === this.prevLastRenderedRow) return;
      const topRowIndex = newRenderedRowIndex[newTopRenderedRowRelativeIndex];
      onRenderedRowChange({
        firstRenderedRowIndex: topRowIndex,
        firstRenderedDataIndex: this.rowToDataIndexMap[topRowIndex][0],
        lastRenderedRowIndex: lastRenderedRowIndex,
        lastRenderedDataIndex:
          this.rowToDataIndexMap[lastRenderedRowIndex][1] - 1,
        lastRowIndex: this.totalRows - 1
      });
      this.prevLastRenderedRow = lastRenderedRowIndex;
    }
  };

  onScrollChange = (scrollTop: number) => {
    const { onVisibleRowChange } = this.props;
    if (!onVisibleRowChange) return;

    if (this.totalNumOfRenderedRows === 0) {
      onVisibleRowChange(noRowVisibilityInfo);
      this.prevLastVisibleRow = -1;
      return;
    }

    let lastVisibleRowIndex = this.getBottomViewportRowIndex(
      scrollTop + this.windowHeight //view port bottom position
    );

    if (this.fullHeight < this.windowHeight) {
      lastVisibleRowIndex = this.getBottomViewportRowIndex(
        scrollTop + this.fullHeight //view port bottom position
      );
    }

    if (lastVisibleRowIndex === this.prevLastVisibleRow) return;
    const firstVisibleRowIndex = this.getTopViewportRowIndex(scrollTop);
    const firstVisibleDataIndex = this.rowToDataIndexMap[
      firstVisibleRowIndex
    ][0];

    const lastVisibleDataIndex =
      this.rowToDataIndexMap[lastVisibleRowIndex][1] - 1;
    onVisibleRowChange({
      firstVisibleRowIndex,
      firstVisibleDataIndex,
      lastVisibleRowIndex,
      lastVisibleDataIndex,
      lastRowIndex: this.totalRows - 1
    });
    this.prevLastVisibleRow = lastVisibleRowIndex;
  };

  recycle = (scrollTop: number) => {
    const {
      renderedRowIndex,
      topRenderedRowRelativeIndex,
      scrollState
    } = this.state;
    const topScroll = scrollTop - this.prevScroll > 0 ? false : true;
    this.prevScroll = scrollTop;

    this.onScrollChange(scrollTop);

    let rowsToRecycle = 0;
    if (topScroll) {
      const topRenderedRowIndex = renderedRowIndex[topRenderedRowRelativeIndex];
      const newTopRenderedRowIndex = Math.max(
        this.getTopViewportRowIndex(scrollTop) -
          this.numOfInvisibleRowOnEachDirection,
        0
      );
      rowsToRecycle = topRenderedRowIndex - newTopRenderedRowIndex;
    } else {
      const bottomRenderedRowIndex =
        renderedRowIndex[this.mod(topRenderedRowRelativeIndex - 1)];
      const viewportBottom = scrollTop + this.windowHeight;
      const newBottomRenderedRowIndex = Math.min(
        this.getBottomViewportRowIndex(viewportBottom) +
          this.numOfInvisibleRowOnEachDirection,
        this.totalRows - 1
      );

      rowsToRecycle = newBottomRenderedRowIndex - bottomRenderedRowIndex;
    }

    if (rowsToRecycle > 0) {
      const newRenderedRowIndex = [...renderedRowIndex];
      const newScrollState = [...scrollState];
      let cycle = 0;
      while (cycle < rowsToRecycle) {
        const newTopRenderedRowRelativeIndex = this.mod(
          topRenderedRowRelativeIndex + (topScroll ? -cycle - 1 : cycle)
        );

        newRenderedRowIndex[newTopRenderedRowRelativeIndex] += topScroll
          ? -this.totalNumOfRenderedRows
          : this.totalNumOfRenderedRows;

        newScrollState[newTopRenderedRowRelativeIndex] = true;

        cycle++;
      }

      const newTopRenderedRowRelativeIndex = this.mod(
        topRenderedRowRelativeIndex +
          (topScroll ? -rowsToRecycle : rowsToRecycle)
      );

      this.onListWillRecycle(
        newRenderedRowIndex,
        newScrollState,
        newTopRenderedRowRelativeIndex
      );

      this.setState({
        renderedRowIndex: newRenderedRowIndex,
        topRenderedRowRelativeIndex: newTopRenderedRowRelativeIndex
      });
    }
  };

  resetList = () => {
    const bottomRenderedRowIndex = this.totalNumOfRenderedRows - 1;
    const viewportBottom = this.getResetViewportBottom();
    const newBottomRenderedRowIndex = Math.min(
      this.getBottomViewportRowIndex(viewportBottom) +
        this.numOfInvisibleRowOnEachDirection,
      this.totalRows - 1
    );

    const rowsToRecycle = newBottomRenderedRowIndex - bottomRenderedRowIndex;

    let newRenderedRowIndex = this.initialArrayTemplate.map(
      (_, index) => index
    );
    let newScrollState = this.initialArrayTemplate.map(() => false);
    let newTopRenderedRowRelativeIndex = 0;

    if (rowsToRecycle > 0) {
      let cycle = 0;
      while (cycle < rowsToRecycle) {
        const newTopRenderedRowRelativeIndex = this.mod(cycle);
        newRenderedRowIndex[
          newTopRenderedRowRelativeIndex
        ] += this.totalNumOfRenderedRows;
        newScrollState[newTopRenderedRowRelativeIndex] = true;
        cycle++;
      }
      newTopRenderedRowRelativeIndex = this.mod(rowsToRecycle);
    }

    this.onListWillRecycle(
      newRenderedRowIndex,
      newScrollState,
      newTopRenderedRowRelativeIndex
    );
    this.onScrollChange(this.prevScroll);
    this.setState({
      renderedRowIndex: newRenderedRowIndex,
      topRenderedRowRelativeIndex: newTopRenderedRowRelativeIndex
    });
  };

  onScroll = (event: React.UIEvent<HTMLElement>) => {
    this.recycle(event.currentTarget.scrollTop);
  };

  scrollToDataIndex = (targetIndex: number) => {
    if (targetIndex === -1) {
      this.manualScroll(targetIndex);
      return;
    }
    const targetRow = Object.values(this.rowToDataIndexMap).findIndex(
      (value) => targetIndex >= value[0] && targetIndex < value[1]
    );
    validateScrollTo(targetRow);
    const targetPosition = this.rowPositions[targetRow];
    this.manualScroll(targetPosition);
  };

  scrollToRow = (targetRow: number) => {
    if (targetRow === -1) {
      this.manualScroll(targetRow);
      return;
    }
    const targetPosition = this.rowPositions[targetRow];
    validateScrollTo(targetPosition);
    this.manualScroll(targetPosition);
  };

  scrollTo = (scrollTop: number) => {
    this.manualScroll(scrollTop);
  };

  manualScroll = (targetPosition: number) => {
    if (this.listWindowRef.current) {
      if (targetPosition === -1)
        this.listWindowRef.current.scrollTop = this.fullHeight;
      else this.listWindowRef.current.scrollTop = targetPosition;
    }
  };

  mod = (n: number, m: number = this.totalNumOfRenderedRows) => {
    return ((n % m) + m) % m;
  };

  getResetViewportBottom = () => {
    return this.prevScroll + this.windowHeight;
  };

  _debounceScrollState = () => {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.setState({
        scrollState: this.initialArrayTemplate.map(() => false)
      });
    }, this.props.scrollInterval || 250);
  };

  render() {
    const {
      listTagName,
      listProps = {},
      listWindowProps = {},
      listWindowTagName,
      data,
      width,
      rowComponent
    } = this.props;
    const { renderedRowIndex, scrollState } = this.state;

    const ListTag: any = listTagName || 'div';
    const WindowTag: any = listWindowTagName || 'div';
    const RowComponent: React.ElementType<RowProps> = rowComponent;
    return (
      <WindowTag
        {...listWindowProps}
        style={{
          height: this.windowHeight,
          overflowY: 'auto',
          width: width || '100%'
        }}
        onScroll={this.onScroll}
        ref={this.listWindowRef}
      >
        <ListTag
          {...listProps}
          style={{
            height: this.fullHeight,
            position: 'relative'
          }}
        >
          {renderedRowIndex.map((absoluteRowIndex, index) => {
            const dataIndexInfo = this.rowToDataIndexMap[absoluteRowIndex];
            const startDataIndex = dataIndexInfo[0];
            const endDataIndex = dataIndexInfo[1];
            return (
              <RowComponent
                key={index}
                data={data}
                dataIndex={startDataIndex}
                dataEndIndex={endDataIndex}
                row={absoluteRowIndex}
                column={endDataIndex - startDataIndex}
                isScrolling={scrollState[index]}
                top={this.rowPositions[absoluteRowIndex]}
                height={this.rowHeights[absoluteRowIndex]}
              />
            );
          })}
        </ListTag>
      </WindowTag>
    );
  }
}
