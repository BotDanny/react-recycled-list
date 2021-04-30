import React from 'react';
import { FixedList, RowProps } from 'react-recycled-list';
import GeneralPage from './GeneralPage';

export default function LazyLoadingSimple() {
  return <GeneralPage code={code} Demo={LazyLoadingDemo} />;
}

const numberOfItemPerPage = 20;
function LazyLoadingDemo() {
  const [data, setData] = React.useState(
    Array(numberOfItemPerPage)
      .fill(null)
      .map((_, index) => `item ${index + 1}`)
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const loadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newData = [...data];
      const startIndex = data.length;
      const endIndex = data.length + numberOfItemPerPage;
      for (let i = startIndex; i < endIndex; i++) {
        newData.push(`item ${i + 1}`);
      }
      setData(newData);
      setIsLoading(false);
    }, 1000);
  };

  const onRenderedRowChange = (renderInfo: {
    firstRenderedRowIndex: number;
    firstRenderedDataIndex: number;
    lastRenderedRowIndex: number;
    lastRenderedDataIndex: number;
    lastRowIndex: number;
  }) => {
    const {
      firstRenderedRowIndex,
      firstRenderedDataIndex,
      lastRenderedRowIndex,
      lastRowIndex,
      lastRenderedDataIndex
    } = renderInfo;
    if (lastRenderedDataIndex === lastRowIndex) {
      if (isLoading === false) {
        loadData();
      }
    }
  };

  return (
    <FixedList
      height={500}
      rowComponent={Row}
      data={data}
      rowHeight={100}
      onRenderedRowChange={onRenderedRowChange}
    />
  );
}

const Row = React.memo(function (props: RowProps) {
  const { data, dataIndex, top, height } = props;
  const value = data[dataIndex];
  const displayValue = value === undefined ? 'loading' : value;
  return (
    <div style={{ top, height }} className='react-recycled-row'>
      {displayValue}
    </div>
  );
});

const code = `import { FixedList } from "react-recycled-list";
const numberOfItemPerPage = 20;

function LazyLoadingDemo() {
  const [data, setData] = React.useState( Array(numberOfItemPerPage).fill(null).map((_, index) => \`item \${index + 1}\`) );
  const [isLoading, setIsLoading] = React.useState(false);

  const loadData = () => {
    setTimeout(() => {
      const newData = [...data];
      const startIndex = data.length;
      const endIndex = data.length + numberOfItemPerPage;
      for (let i = startIndex; i < endIndex; i++) {
        newData.push(\`item \${i + 1}\`);
      }
      setData(newData);
      setIsLoading(false);
    }, 1000);
  };

  const onRenderedRowChange = (renderInfo) => {
    const {
      firstRenderedRowIndex,
      firstRenderedDataIndex,
      lastRenderedRowIndex,
      lastRenderedDataIndex,
      lastRowIndex,
    } = renderInfo;
    // If the last row is rendered (NOT visible yet!) and we are not already loading data, we fetch new data
    // If you want to fetch data when the last row is visible then use onVisibleRowChange
    if (lastRenderedDataIndex === lastRowIndex) {
      if (isLoading === false) {
        loadData();
      }
    }
  };

  return (
    <FixedList
              height={500}
              rowComponent={Row}
              data={data}
              rowHeight={100}
              onRenderedRowChange={onRenderedRowChange}
        />
  );
}
const Row = React.memo(function (props: RowProps) {
  const { data, dataIndex, top, height } = props;
  const value = data[dataIndex];
  const displayValue = value === undefined ? "loading" : value;
  return <div style={{top, height}} className="react-recycled-row">{displayValue}</div>;
})`;
