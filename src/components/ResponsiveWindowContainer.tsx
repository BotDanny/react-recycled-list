import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { ResponsiveContainerProps } from './ResponsiveContainer';
interface ResponsiveWindowContainerProps extends ResponsiveContainerProps {
  /**
   * A React ref object that points to the element used to attach scroll listener. defaults to window
   */
  scrollRef?: React.MutableRefObject<any>;
}

export default function ResponsiveWindowContainer(
  props: ResponsiveWindowContainerProps
) {
  const {
    render,
    debounceResize,
    debounceInterval,
    serverSideHeight,
    scrollRef
  } = props;
  const targetRef = React.useRef<HTMLDivElement>();
  const { width, height } = useResizeDetector({
    refreshMode: debounceResize ? 'debounce' : undefined,
    refreshRate: debounceInterval ? debounceInterval : 100,
    targetRef: 'scrollRef' in props ? scrollRef : targetRef
  });
  const [hasMounted, setHasMounted] = React.useState(false);
  const [reRender, forceRerender] = React.useState(true);
  React.useLayoutEffect(() => {
    if (serverSideHeight !== undefined) {
      setHasMounted(!hasMounted);
    }
  }, []);
  React.useLayoutEffect(() => {
    forceRerender(!reRender);
  }, [scrollRef?.current, scrollRef]);
  return (
    <React.Fragment>
      {render({
        width: width || 0,
        height: height || (!hasMounted && serverSideHeight) || 0
      })}

      <div
        ref={targetRef as React.RefObject<HTMLDivElement>}
        style={{ position: 'fixed', height: '100vh', width: '100vw' }}
      />
    </React.Fragment>
  );
}
