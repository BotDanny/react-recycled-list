import React from 'react';
import GeneralPage from './GeneralPage';
import { FullWindowFixedList, RowProps } from 'react-recycled-list';

export default function CustomWindow() {
  return <GeneralPage code={code} Demo={CustomWindowDemo} />;
}

function CustomWindowDemo() {
  const scrollRef = React.useRef();
  const listRef = React.useRef<any>();
  const [_, setComponentHasMounted] = React.useState(false);
  React.useLayoutEffect(() => {
    setComponentHasMounted(true);
    listRef.current.setCustomScrollRef();
  }, []);

  const data = Array(1000)
    .fill(null)
    .map((_, index) => `item ${index}`);

  const containerStyle = {
    height: 500,
    width: '100%',
    overflowY: 'scroll' as any
  };

  const fillerStyle = {
    textAlign: 'center' as any,
    padding: 20
  };

  return (
    <div ref={scrollRef as any} style={containerStyle}>
      <div style={fillerStyle}>some random ui</div>
      <div style={fillerStyle}>some random ui</div>
      <FullWindowFixedList
        rowComponent={Row}
        data={data}
        rowHeight={100}
        scrollRef={scrollRef}
        ref={listRef as any}
      />
      <div style={fillerStyle}>some random ui</div>
      <div style={fillerStyle}>some random ui</div>
    </div>
  );
}

const Row = React.memo(function (props: RowProps) {
  const { data, dataIndex, top, height } = props;
  const value = data[dataIndex];
  return (
    <div style={{ top, height }} className='react-recycled-row'>
      {value}
    </div>
  );
});

const code = `import { FullWindowFixedList, FullWindowVariableList } from "react-recycled-list";

function CustomWindowDemo() {
  const scrollRef = React.useRef();
  const listRef = React.useRef();

  // Important! ref.current is initially undefined. When ref.current is set you must notify FullWindowFixedList or FullWindowVariableList 
  // You can notify it by rerendering or by calling setCustomScrollRef on the list class

  const [_, setComponentHasMounted] = React.useState(false);
  React.useLayoutEffect(() => {
    // Once scrollRef.current is set, you must notify the list. You can do it by setState in a useLayoutEffect which cause rerendering
    setComponentHasMounted(true);
    // Or you can do it by calling the setCustomScrollRef method on the list
    listRef.current.setCustomScrollRef();
    // The reason that useLayoutEffect is used instead of useEffect is because we don't want the browser to paint the empty list (before scrollRef is set)
  }, []);

  const data = Array(1000).fill(null).map((_, index) => \`item \${index}\`);

  const containerStyle = {
    height: 500,
    width: "100%",
    overflowY: "scroll",
  };

  const fillerStyle = {
    textAlign: "center",
    padding: 20,
  };

  return (
    <div ref={ref} style={containerStyle}>
              <div style={fillerStyle}>some random ui</div>
              <div style={fillerStyle}>some random ui</div>
              <FullWindowFixedList
                    rowComponent={Row}
                    data={data}
                    rowHeight={100}
                    scrollRef={scrollRef}
                    ref={listRef}
              />
              <div style={fillerStyle}>some random ui</div>
              <div style={fillerStyle}>some random ui</div>
    </div>
  );
}

const Row = React.memo(function (props: RowProps) {
  const { data, dataIndex, top, height } = props;
  const value = data[dataIndex];
  return <div style={{top, height}} className="react-recycled-row">{value}</div>;
});`;
