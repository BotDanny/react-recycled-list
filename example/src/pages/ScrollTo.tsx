import React from 'react';
import { FixedList, RowProps } from 'react-recycled-list';
import GeneralPage from './GeneralPage';
import { Button } from '@material-ui/core';

export default function ScrollTo() {
  return <GeneralPage code={code} Demo={ScrollToDemo} />;
}

function ScrollToDemo() {
  const data = Array(1000)
    .fill(null)
    .map((_, index) => `item ${index}`);
  const ref = React.useRef<FixedList>() as React.RefObject<FixedList>;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: 10
        }}
      >
        <Button
          variant='contained'
          color='secondary'
          style={{ textTransform: 'none' }}
          onClick={() => ref.current?.scrollTo(350)}
        >
          Scroll to scrollTop 350
        </Button>
        <Button
          variant='contained'
          color='secondary'
          style={{ textTransform: 'none' }}
          onClick={() => ref.current?.scrollToRow(9)}
        >
          Scroll to 10th row
        </Button>
        <Button
          variant='contained'
          color='secondary'
          style={{ textTransform: 'none' }}
          onClick={() => ref.current?.scrollToRow(-1)}
        >
          Scroll to last row
        </Button>
        <Button
          variant='contained'
          color='secondary'
          style={{ textTransform: 'none' }}
          onClick={() => ref.current?.scrollToDataIndex(86)}
        >
          Scroll to 87th data
        </Button>
      </div>
      <FixedList
        height={300}
        rowComponent={Row}
        data={data}
        rowHeight={100}
        column={4}
        ref={ref}
      />
    </div>
  );
}

const Row = React.memo(function (props: RowProps) {
  const { data, dataIndex, dataEndIndex, top, height } = props;
  const rowData = data.slice(dataIndex, dataEndIndex);

  const columnStyle = {
    width: '25%',
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

function ScrollToDemo() {
    const data = Array(1000).fill(null).map((_, index) => \`item \${index}\`);
    const ref = React.useRef();
    return (
        <div>
                        <button onClick={() => ref.current?.scrollTo(350)} />
                        <button onClick={() => ref.current?.scrollToRow(9)} />
                        <button onClick={() => ref.current?.scrollToRow(-1)} />
                        <button onClick={() => ref.current?.scrollToDataIndex(86)} />
                        <FixedList height={300} rowComponent={Row} data={data} rowHeight={100} column={4} ref={ref}/>
                </div>
    )
}

const Row = React.memo(function (props) {
    const { data, dataIndex: dataStartIndex, dataEndIndex, top, height } = props;
    const rowData = data.slice(dataStartIndex, dataEndIndex);

    const columnStyle = {
        width: "25%",
        textAlign: "center",
    };
    return (
        <div style={{top, height}} className="react-recycled-row">
                            {rowData.map((item) => <div style={columnStyle} key={item}>{item}</div>)}
                 </div>
    )
});`;
