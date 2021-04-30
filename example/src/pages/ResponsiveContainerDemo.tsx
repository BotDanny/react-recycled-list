import React from 'react';
import { FixedList, RowProps, ResponsiveContainer } from 'react-recycled-list';
import GeneralPage from './GeneralPage';

export default function ResponsiveContainerPage() {
  return <GeneralPage code={code} Demo={ResponsiveContainerDemo} />;
}

function ResponsiveContainerDemo() {
  const data = Array(1000)
    .fill(null)
    .map((_, index) => `item ${index}`);

  const renderList = (sizeInfo: { width: number; height: number }) => {
    console.log(sizeInfo);
    const { width, height } = sizeInfo;
    const column = width > 1200 ? 2 : 1;
    return (
      <FixedList
        height={height}
        rowComponent={Row}
        data={data}
        rowHeight={100}
        column={column}
      />
    );
  };

  const resizableContainerStyle = {
    width: '100%',
    height: '50vh',
    resize: 'both',
    overflow: 'auto'
  };

  return (
    <div style={resizableContainerStyle as any}>
      <ResponsiveContainer render={renderList} />
    </div>
  );
}

const Row = React.memo(function (props: RowProps) {
  const { data, dataIndex, dataEndIndex, column, top, height } = props;
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

const code = `import { ResponsiveContainer } from "react-recycled-list";

// Try resizing the list, the column will change on the 1200px break point
// The height of the list is set to 50% of the height of the view port

function ResponsiveContainerDemo() {
    const data = Array(1000).fill(null).map((_, index) => \`item \${index}\`);
  
    const renderList = (sizeInfo) => {
      const { width, height } = sizeInfo;
      const column = width > 1200 ? 2 : 1;
      return (
        <FixedList
                        height={height}
                        rowComponent={Row}
                        data={data}
                        rowHeight={100}
                        column={column}
                />
      );
    };
    // Important! If you want to use padding, then make sure to set box-sizing to border box on the parent element of the ResponsiveContainer
    const resizableContainerStyle = {
      width: "100%",
      height: "50vh",
      resize: "both",
      overflow: "auto"
    };
  
    return (
      <div style={resizableContainerStyle}>
                        <ResponsiveContainer render={renderList} />
            </div>
    );
}

const Row = React.memo(function (props) {
    const { data, dataIndex: dataStartIndex, dataEndIndex, column, top, height } = props;
    const rowData = data.slice(dataStartIndex, dataEndIndex);

    const columnStyle = {
      width: column === 1? "100%" : "50%",
      textAlign: "center",
    };
    return (
      <div style={{top, height}} className="react-recycled-row">
                        {rowData.map((item) => <div style={columnStyle}>{item}</div>)}
            </div>
    );
});`;
