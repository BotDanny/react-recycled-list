import React from 'react';
import GeneralPage from './GeneralPage';
import {
  FullWindowFixedList,
  ResponsiveWindowContainer,
  RowProps
} from 'react-recycled-list';

export default function ResponsiveCustomWindow() {
  return <GeneralPage code={code} Demo={ResponsiveCustomWindowDemo} />;
}

function ResponsiveCustomWindowDemo() {
  const scrollRef = React.useRef();
  const listRef = React.useRef<any>();
  React.useLayoutEffect(() => {
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
  const renderList = (sizeInfo: { width: number; height: number }) => {
    return (
      <FullWindowFixedList
        windowHeight={sizeInfo.height}
        rowComponent={Row}
        data={data}
        rowHeight={100}
        scrollRef={scrollRef}
        ref={listRef as any}
        column={sizeInfo.width > 1200 ? 2 : 1}
      />
    );
  };

  return (
    <div ref={scrollRef as any} style={containerStyle}>
      <div style={fillerStyle}>some random ui</div>
      <div style={fillerStyle}>some random ui</div>
      <ResponsiveWindowContainer render={renderList} scrollRef={scrollRef} />
      <div style={fillerStyle}>some random ui</div>
      <div style={fillerStyle}>some random ui</div>
    </div>
  );
}

const Row = React.memo(function (props: RowProps) {
  const { data, dataIndex, dataEndIndex, top, height, column } = props;
  const rowData = data.slice(dataIndex, dataEndIndex);

  const columnStyle = {
    width: column === 1 ? '100%' : '50%',
    textAlign: 'center' as any
  };
  return (
    <div style={{ top, height }} className='react-recycled-row'>
      {rowData.map((item) => (
        <div style={columnStyle}>{item}</div>
      ))}
    </div>
  );
});

const code = `import { FullWindowFixedList, FullWindowVariableList } from "react-recycled-list";

function ResponsiveCustomWindowDemo() {
  const data = Array(1000).fill(null).map((_, index) => \`item \${index}\`);
  const scrollRef = React.useRef();
  const listRef = React.useRef();

  // Important! ref.current is initially undefined. When ref.current is set you must notify FullWindowFixedList or FullWindowVariableList 
  // You can notify it by rerendering or by calling setCustomScrollRef on the list class

  React.useLayoutEffect(() => {
    listRef.current.setCustomScrollRef();
  }, []);

  const containerStyle = {
    height: 500,
    width: "100%",
    overflowY: "scroll",
  };

  const fillerStyle = {
    textAlign: "center",
    padding: 20,
  };

  const renderList = (sizeInfo) => {
    return (
      <FullWindowFixedList
                    windowHeight={sizeInfo.height}
                    rowComponent={Row}
                    data={data}
                    rowHeight={100}
                    scrollRef={scrollRef}
                    ref={listRef}
                    column={sizeInfo.width > 1200 ? 2 : 1}
          />
    );
  };

  return (
    <div ref={ref} style={containerStyle}>
              <div style={fillerStyle}>some random ui</div>
              <div style={fillerStyle}>some random ui</div>
              <ResponsiveWindowContainer
                    render={renderList}
                    scrollRef={scrollRef}
              />
              <div style={fillerStyle}>some random ui</div>
              <div style={fillerStyle}>some random ui</div>
    </div>
  );
}

const Row = React.memo(function (props: RowProps) {
  const { data, dataIndex, dataEndIndex, top, height, column } = props;
  const rowData = data.slice(dataIndex, dataEndIndex);

  const columnStyle = {
    width: column === 1? "100%": "50%",
    textAlign: "center" as any,
  };
  return (
    <div style={{ top, height }} className="react-recycled-row">
                  {rowData.map((item) => (
                        <div style={columnStyle}>{item}</div>
                  ))}
        </div>
  );
});;`;
