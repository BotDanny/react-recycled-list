export interface RowProps {
  /**
   * An array of data items used to populate your row components.
   *
   * This is the same data prop you passed into the list component.
   */
  data: any[];
  /**
   * Index of the current row
   */
  row: number;
  /**
   * Index of the current data item.
   * 
   * If you are using a grid, then this is the index of the first data item in this row.
   */
  dataIndex: number;
  /**
   * Index of the data item that the next row should render
   * 
   * This prop is usefull if you are using a grid.
   * 
   * Using data.slice(dataIndex, dataEndIndex) will give you the list of data items rendered for this row.
   */
  dataEndIndex: number;
   /**
   * How many column/data item does this row have
   */
  column: number;
   /**
   * Indicate if the current row is being scrolled.
   */
  isScrolling: boolean;
   /**
   * This is the css style top used to position your row component in the list.
   */
  top: number;
   /**
   * This is the css style height used to position your row component in the list.
   */
  height: number;
}

export interface ReactRecycledListProps {
  /**
   * An array of data
   *
   * An array of data items used to populate your row components. This will be passed to your row component as prop.
   */
  data: any[];
  /**
   * The height of each row in the list
   *
   * For VariableList or FullWindowVariable list, this is the estimate of the height of each row in the list.
   */
  rowHeight: number;
  /**
   * Your component to render each row in the list.
   *
   * It will receive a number of property as props.
   */
  rowComponent: React.ElementType<RowProps>;
  /**
   * The initial scroll position of the list when first rendered.
   *
   * If initialScrollTop = -1, then the list will scroll to the bottom.
   *
   * Note the initialScrollTop here is relative to the top of the list, meaning that initialScrollTop = 0 will scroll to the first row in the list but will not scroll to the top of the window.
   */
  initialScrollTop?: number;
  /**
   * How many data item each row should render.
   */
  column?: number;
  /**
   * A list of number that defines how many column each row should have.
   *
   * This is useful for variable column grid.
   * 
   * Note the sum of rowColumns must be equal to the length of the data.
   */
  rowColumns?: number[];
  /**
   * How many rows are rendered off screen in each direction
   *
   * By default there are 2 rows rendered off screen (1 in each direction).
   * 
   * Increasing the number of rows rendered off screen may reduce flickering in fast scroll (when the user scrolls too fast and the render cannot keep up). however, it does come with a performance cost.
   */
  offScreenRow?: number;
  /**
   * The props assigned to the list window. 
   *
   * Usefull for assigning className or accessibility properties. Note that you cannot assign style to it.
   */
  listWindowProps?: object;
  /**
   * The tag name assigned to the list window
   */
  listWindowTagName?: string;
  /**
   * The props assigned to the full list element.
   *
   * Usefull for assigning className or accessibility properties. Note that you cannot assign style to it.
   */
  listProps?: object;
  /**
   * The tag name assigned to the full list element.
   */
  listTagName?: string;
  /**
   * Wheather of not to use scroll indicator.
   *
   * If set to yes, then your row component will receive a prop called isScrolling which indicate if the current row is being scrolled.
   */
  useScrollIndicator?: boolean;
  /**
   * How many milisecond to wait after the user stops scrolling, before setting isScrolling to false.
   */
  scrollInterval?: number;
  /**
   * The css width applied to the list window
   *
   * Can be a string or a number
   */
  width?: string | number;
  /**
   * Callback function that is called whenever the rendered row has changed (when any row is recycled).
   */
  onRenderedRowChange?: onRenderedRowChangeCallBack;
  /**
   * Callback function that is called whenever any visible row has changed (when any row is recycled).
   */
  onVisibleRowChange?: onVisibleRowChangeCallBack;
  /**
   * Callback function that is called whenever the list component is unmounted. Usefull for scroll restoration in combination with initialScrollTop.
   */
  onUnmount?: (scrollTop: number) => void;
}

export interface RenderInfo {
  firstRenderedRowIndex: number;
  firstRenderedDataIndex: number;
  lastRenderedRowIndex: number;
  lastRenderedDataIndex: number;
  lastRowIndex: number;
}

export interface VisibilityInfo {
  firstVisibleRowIndex: number;
  firstVisibleDataIndex: number;
  lastVisibleRowIndex: number;
  lastVisibleDataIndex: number;
  lastRowIndex: number;
}

export type onRenderedRowChangeCallBack = (renderInfo: RenderInfo) => void;

export type onVisibleRowChangeCallBack = (
  visibilityInfo: VisibilityInfo
) => void;

export interface ReactRecycledListState {
  renderedRowIndex: number[];
  topRenderedRowRelativeIndex: number;
  scrollState: boolean[];
}

export const noRowRenderInfo: RenderInfo = {
  firstRenderedRowIndex: -1,
  firstRenderedDataIndex: -1,
  lastRenderedRowIndex: -1,
  lastRenderedDataIndex: -1,
  lastRowIndex: -1
};

export const noRowVisibilityInfo: VisibilityInfo = {
  firstVisibleRowIndex: -1,
  firstVisibleDataIndex: -1,
  lastVisibleRowIndex: -1,
  lastVisibleDataIndex: -1,
  lastRowIndex: -1
};
