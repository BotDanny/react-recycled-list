import React from 'react';
import { FixedList, RowProps } from 'react-recycled-list';

import GeneralPage from './GeneralPage';

export default function ScrollIndicator() {
  return <GeneralPage code={code} Demo={ScrollIndicatorDemo} />;
}

function ScrollIndicatorDemo() {
  const data = Array(1000)
    .fill(null)
    .map((_, index) => `item ${index}`);

  return (
    <FixedList
      height={500}
      rowComponent={Row}
      data={data}
      rowHeight={100}
      useScrollIndicator
    />
  );
}

const Row = React.memo(function (props: RowProps) {
  const { data, dataIndex, isScrolling, top, height } = props;
  const value = isScrolling ? 'scrolling' : data[dataIndex];
  return (
    <div style={{ top, height }} className='react-recycled-row'>
      {value}
    </div>
  );
});

const code = `import { FixedList } from "react-recycled-list";

// If your row component is expensive to render, you can consider rendering a lighter component when scrolling

function ScrollIndicatorDemo() {
  const data = Array(1000).fill(null).map((_, index) => \`index \${index}\`);

  return <FixedList height={500} rowComponent={Row} data={data} rowHeight={100} useScrollingIndicator/>
}

const Row = React.memo(function (props: RowProps) {
    const { data, dataIndex, isScrolling, top, height } = props;
    const value = isScrolling? "scrolling" : data[dataIndex];
    return <div style={{top, height}} className="react-recycled-row">{value}</div>;
});`;
