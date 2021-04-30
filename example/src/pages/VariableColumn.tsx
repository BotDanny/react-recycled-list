import React from 'react';
import { FixedList, RowProps } from 'react-recycled-list';
import GeneralPage, { randInt } from './GeneralPage';

export default function VariableColumn() {
  return <GeneralPage code={code} Demo={VariableColumnDemo} />;
}

function VariableColumnDemo() {
  const columnsInEachRow = Array(300)
    .fill(null)
    .map(() => randInt(1, 4));
  const totalNumberOfItems = columnsInEachRow.reduce(
    (acc, column) => column + acc,
    0
  );
  const data = Array(totalNumberOfItems)
    .fill(null)
    .map((_, index) => `item ${index}`);

  return (
    <FixedList
      height={400}
      rowComponent={Row}
      data={data}
      rowHeight={100}
      rowColumns={columnsInEachRow}
    />
  );
}

const Row = React.memo(function (props: RowProps) {
  const { data, dataIndex, dataEndIndex, column, top, height } = props;
  const rowData = data.slice(dataIndex, dataEndIndex);

  const widthMap: any = {
    1: '100%',
    2: '50%',
    3: '33.33%',
    4: '25%'
  };

  const columnStyle = {
    width: widthMap[column],
    textAlign: 'center'
  };
  return (
    <div style={{ top, height }} className='react-recycled-row'>
      {rowData.map((item) => (
        <div style={columnStyle as any}>{item}</div>
      ))}
    </div>
  );
});

const code = `import { FixedList } from "react-recycled-list";

function VariableColumnDemo() {

    // Define 300 rows of data, each row has a random number of column between 1 and 4

    const columnsInEachRow = Array(300).fill(null).map(() => randInt(1, 4));

    // Calculate the total amount of items/columns in the list

    const totalNumberOfItems = columnsInEachRow.reduce((acc, column) => column + acc, 0);

    // Define the data

    const data = Array(totalNumberOfItems).fill(null).map((_, index) => \`item \${index}\`);

    // It is up to you to define your data and rowColumns, but the total number of columns from rowColumn must be equal to the length of data

    return <FixedList height={400} rowComponent={Row} data={data} rowHeight={100} rowColumns={columnsInEachRow} />
}

const Row = React.memo(function (props) {

    // column is the number of column in current row. It can also be calculated as dataEndIndex - dataIndex
    
    const { data, dataIndex: dataStartIndex, dataEndIndex, column, top, height } = props;
    const rowData = data.slice(dataStartIndex, dataEndIndex);

    const widthMap = {
        1: "100%",
        2: "50%",
        3: "33.33%",
        4: "25%"
    }

    const columnStyle = {
        width: widthMap[column],
        textAlign: "center",
    };
    return (
        <div style={{top, height}} className="react-recycled-row">
                            {rowData.map((item) => <div style={columnStyle} key={item}>{item}</div>)}
                 </div>
    )
});`;
