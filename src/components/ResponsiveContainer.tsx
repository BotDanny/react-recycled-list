import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
export interface ResponsiveContainerProps {
  /**
   * A function that is responsible for rendering the list based on the given height and width.
   * 
   * The given height and width is the height and width of the parent element of ResponsiveContainer.
   */
  render: (sizeInfo: { width: number; height: number }) => React.ReactNode;
  /**
   * If set true the list will adjust its height and width only when the user stops resizing.
   */
  debounceResize?: boolean;
  /**
   * How many milisecond to wait after the the user stops resizing to triger the resizing (re-computation) of the list.
   */
  debounceInterval?: number;
  /**
   * The initial rendered height of the list. Only used when server side rendering is required.
   * 
   * This will determine how many rows are rendered on the server side.
   */
  serverSideHeight?: number;
}

export default function ResponsiveContainer(props: ResponsiveContainerProps) {
  const {
    render,
    debounceResize,
    debounceInterval,
    serverSideHeight
  } = props;
  const { width, height, ref } = useResizeDetector({
    refreshMode: debounceResize ? 'debounce' : undefined,
    refreshRate: debounceInterval ? debounceInterval : 100
  });
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useLayoutEffect(() => {
    if (serverSideHeight !== undefined) {
      setHasMounted(true);
    }
  }, []);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        height: '100%',
        width: '100%'
      }}
    >
      {render({
        width: width || 0,
        height: height || (!hasMounted && serverSideHeight) || 0
      })}
    </div>
  );
}
