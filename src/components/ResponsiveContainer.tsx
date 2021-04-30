import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames } from './utils';
export interface ResponsiveContainerProps {
  render: (sizeInfo: { width: number; height: number }) => React.ReactNode;
  className?: string;
  debounceResize?: boolean;
  debounceInterval?: number;
  serverSideHeight?: number;
}

export default function ResponsiveContainer(props: ResponsiveContainerProps) {
  const {
    render,
    className,
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
      className={classNames('react-recycled-responsive-container', className)}
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
