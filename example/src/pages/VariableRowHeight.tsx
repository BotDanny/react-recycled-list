import React from 'react';
import { VariableList, RowProps } from 'react-recycled-list';
import GeneralPage, { randInt } from './GeneralPage';

export default function VariableRowHeight() {
  return <GeneralPage code={code} Demo={VariableRowHeightDemo} />;
}

function VariableRowHeightDemo() {
  const data = Array(1000)
    .fill(null)
    .map((_, index) => `item ${index}`);

  const rowHeights = data.map((_, index) => randInt(60, 140));

  return (
    <VariableList
      height={400}
      rowComponent={Row}
      data={data}
      rowHeight={80}
      rowHeights={rowHeights}
    />
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

const code = `import { VariableList } from "react-recycled-list";

function VariableRowHeightDemo() {
    const data = Array(1000).fill(null).map((_, index) => \`item \${index}\`);

    // You define the height of each row. In this case, each row has random height between 60 and 140
    // Note the length of this array must match the total amount of rows in the list/grid

    const rowHeights = data.map((_, index) => randInt(60, 140));
    
    // The rowHeight prop here is an estimate(average) of the height of each row

    return <VariableList height={350} rowComponent={Row} data={data} rowHeight={80} rowHeights={rowHeights}/>;
}
  
const Row = React.memo(function (props) {
    const { data, dataIndex, top, height } = props;
    const value = data[dataIndex];

    return <div style={{top, height}} className="react-recycled-row">{value}</div>
});`;
