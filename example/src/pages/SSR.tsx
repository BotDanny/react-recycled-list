import React from 'react';
import Highlight from 'react-highlight.js';

export default function SSR() {
  return (
    <>
      <div className='code-section half-section'>
        <div className='code-wrapper'>
          <Highlight language='js'>{code}</Highlight>
        </div>
      </div>
    </>
  );
}

const code = `import { FullWindowFixedList } from "react-recycled-list";

function FullWindowDemo() {

    const data = Array(1000).fill(null).map((_, index) => \`index \${index}\`);

    // FixedList and VariableList supports SSR out of the box
    // However for FullWindowFixedList and FullWindowVariableList you must provide a prop called serverSideHeight that determines the initial render height
    // For example if serverSideHeight is 1000 and your row height is 100, then there will be 10 (visible row) + 2 (off screen row by default) rendered in the server
    // Once the component loads on a web page the component will automatically adjust its height and rows to fit the window

    return <FullWindowFixedList rowComponent={Row} data={data} rowHeight={100} serverSideHeight={1080}/>
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
