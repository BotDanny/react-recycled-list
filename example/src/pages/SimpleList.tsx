import React from 'react';
import { FixedList, RowProps } from 'react-recycled-list';
import GeneralPage from './GeneralPage';

export default function SimpleList() {
  return <GeneralPage code={code} Demo={SimpleListDemo} />;
}

function SimpleListDemo() {
  const data = Array(1000)
    .fill(null)
    .map((_, index) => `item ${index}`);

  return (
    <FixedList height={500} rowComponent={Row} data={data} rowHeight={100} />
  );
}

const Row = React.memo(function (props: RowProps) {
  const { data, dataIndex, top, height } = props;
  const value = data[dataIndex];
  return (
    <div style={{ top, height }} className='react-recycled-row' inlist>
      {value}
    </div>
  );
});

const code = `import { FixedList } from "react-recycled-list";

function SimpleListDemo() {

  const data = Array(1000).fill(null).map((_, index) => \`index \${index}\`);

  return <FixedList height={500} rowComponent={Row} data={data} rowHeight={100}/>
}

// Use React.memo or React pure component to prevent unncessary render
const Row = React.memo(function (props) {
  // the data here is the same data that is passed into the FixedList
  const { data, dataIndex, top, height } = props;

  const value = data[dataIndex];
  // Important!, make sure you inline-style your component with the the provided top, height. Also make sure to set your container element to position absolute
  return <div style={{top, height}} className="react-recycled-row">{value}</div>;
})`;
