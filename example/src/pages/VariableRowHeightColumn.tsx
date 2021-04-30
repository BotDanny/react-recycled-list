import React from 'react';
import { VariableList, RowProps } from 'react-recycled-list';
import GeneralPage, { generateRamdomRowHeightAndColumn } from './GeneralPage';

export default function VariableRowHeightColumn() {
  return <GeneralPage code={code} Demo={VariableRowHeightColumnDemo} />;
}

function VariableRowHeightColumnDemo() {
  const data = Array(1000)
    .fill(null)
    .map((_, index) => `item ${index}`);

  const [rowHeights, rowColumns] = generateRamdomRowHeightAndColumn(
    data.length
  );

  return (
    <VariableList
      height={400}
      rowComponent={Row}
      data={data}
      rowHeight={80}
      rowColumns={rowColumns}
      rowHeights={rowHeights}
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

const code = `import { VariableList } from "react-recycled-list";

// Function for generating randow row heights and columns
// Each row will have height between 60 and 140 px and column between 1 and 4
function generateRamdomRowHeightAndColumn(dataLength: number) {
    const heights: number[] = [];
    const columns: number[] = [];
    let nextDataIndex = 0;
    for (let i = 0; nextDataIndex < dataLength; i++) {
      heights[i] = randInt(60, 140);
      const column = randInt(1, 4);
      const tempNextDataIndex = nextDataIndex + column;
      columns[i] =
        tempNextDataIndex > dataLength ? dataLength - nextDataIndex : column;
      nextDataIndex = tempNextDataIndex;
    }
  
    return [heights, columns];
}
  
function VariableRowHeightColumnDemo() {
    const data = Array(totalNumberOfItems).fill(null).map((_, index) => \`item \${index}\`);
    // For demo purposes I used a random generator. You can however define it whatever you want it to be.
    // The key takeaway is the length of rowHeights must equal to the length of rowColumns
    // And the total number of column calculated from rowColumns must be equal to the length of data
    const [rowHeights, rowColumns] = generateRamdomRowHeightAndColumn(data.length)
  
    return <VariableList height={400} rowComponent={Row} data={data} rowHeight={100} rowColumns={rowColumns} rowHeights={rowHeights}/>
}
  
const Row = React.memo(function (props) {
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
