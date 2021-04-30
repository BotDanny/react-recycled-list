import React from 'react';
import { FixedList, RowProps } from 'react-recycled-list';
import Highlight from 'react-highlight.js';
import GeneralPage from './GeneralPage';
import { Button } from '@material-ui/core';

export default function DynamicLoading() {
  return <GeneralPage code={code} Demo={DynamicLoadingDemo} />;
}

const numberOfItemPerPage = 10;
const numberOfPages = 10;
function fetchData(page: number, onSuccess: any) {
  setTimeout(() => {
    const data = [];
    const startDataIndex = (page - 1) * numberOfItemPerPage;
    for (
      let i = startDataIndex;
      i < startDataIndex + numberOfItemPerPage;
      i++
    ) {
      data.push(`item ${i + 1}`);
    }
    onSuccess(data, page);
  }, 1000);
}

type PageData = {
  [key: string]: {
    isLoading: boolean;
    hasLoaded: boolean;
    data: any[];
  };
};

function populateInitialPage() {
  const page: PageData = {};
  for (let i = 1; i <= numberOfPages; i++) {
    page[i] = {
      isLoading: false,
      hasLoaded: false,
      data: Array(numberOfItemPerPage)
        .fill(null)
        .map(() => undefined)
    };
  }
  return page;
}
const initialPagedData = populateInitialPage();

function getPageFromDataIndex(index: number) {
  return Math.floor(index / numberOfItemPerPage) + 1;
}

function DynamicLoadingDemo() {
  const [pagedData, setPagedData] = React.useState(initialPagedData);

  const onFetchDataSuccess = (newData: any[], page: number) => {
    setPagedData((pagedData) => {
      return {
        ...pagedData,
        [page]: {
          data: newData,
          hasLoaded: true,
          isLoading: false
        }
      };
    });
  };

  const onRenderedRowChange = (renderInfo: {
    firstRenderedRowIndex: number;
    firstRenderedDataIndex: number;
    lastRenderedRowIndex: number;
    lastRenderedDataIndex: number;
    lastRowIndex: number;
  }) => {
    const { firstRenderedDataIndex, lastRenderedDataIndex } = renderInfo;

    const currentTopPage = getPageFromDataIndex(firstRenderedDataIndex);
    const currentBottomPage = getPageFromDataIndex(lastRenderedDataIndex);
    const currentPages = [currentTopPage, currentBottomPage];

    if (currentTopPage === currentBottomPage) currentPages.pop();

    currentPages.forEach((page) => {
      if (!pagedData[page].hasLoaded && !pagedData[page].isLoading) {
        setPagedData({
          ...pagedData,
          [page]: { ...pagedData[page], isLoading: true }
        });

        fetchData(page, onFetchDataSuccess);
      }
    });
  };
  const dataList = React.useMemo(
    () =>
      Object.values(pagedData)
        .map(({ data }) => data)
        .flat(),
    [pagedData]
  );
  return (
    <FixedList
      height={500}
      rowComponent={Row}
      data={dataList}
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
    <div className='react-recycled-row' style={{ top, height }}>
      {displayValue}
    </div>
  );
});

const code = `import { FixedList } from "react-recycled-list";

// This is a rather complicated example
// The key point is to paginate your data, and utilize onRenderedRowChange or onVisibleRowChange to load your data

const numberOfItemPerPage = 10;
const numberOfPages = 10;
// Simulation of an API
function fetchData(page, onSuccess) {
  setTimeout(() => {
    const data = [];
    const startDataIndex = (page - 1) * numberOfItemPerPage;
    for (
      let i = startDataIndex;
      i < startDataIndex + numberOfItemPerPage;
      i++
    ) {
      data.push(\`item \${i + 1}\`);
    }
    onSuccess(data, page);
  }, 1000);
}

function populateInitialPage() {
    const page: PageData = {};
    for (let i = 1; i <= numberOfPages; i++) {
      page[i] = {
        isLoading: false,
        hasLoaded: false,
        data: Array(numberOfItemPerPage)
          .fill(null)
          .map(() => undefined),
      };
    }
    return page;
}
const initialPagedData = populateInitialPage();

function getPageFromDataIndex(index: number) {
    return Math.floor(index / numberOfItemPerPage) + 1;
}
  
function DynamicLoadingDemo() {
    const [pagedData, setPagedData] = React.useState(initialPagedData);
  
    const onFetchDataSuccess = (newData, page) => {
      // Becareful of stale state!
      setPagedData((pagedData) => {
        return {
          ...pagedData,
          [page]: {
            data: newData,
            hasLoaded: true,
            isLoading: false,
          },
        };
      });
    };
  
    const onRenderedRowChange = (renderInfo) => {
      const {
        firstRenderedDataIndex,
        lastRenderedDataIndex,
      } = renderInfo;
  
      const currentTopPage = getPageFromDataIndex(firstRenderedDataIndex);
      const currentBottomPage = getPageFromDataIndex(lastRenderedDataIndex);
      const currentPages = [currentTopPage, currentBottomPage];
  
      if (currentTopPage === currentBottomPage) currentPages.pop();
  
      currentPages.forEach((page) => {
        if (!pagedData[page].hasLoaded && !pagedData[page].isLoading) {
          setPagedData({
            ...pagedData,
            [page]: { ...pagedData[page], isLoading: true },
          });
          fetchData(page, onFetchDataSuccess);
        }
      });
    };
    const dataList = Object.values(pagedData).map(({ data }) => data).flat();

    return (
      <FixedList
                    height={500}
                    rowComponent={Row}
                    data={dataList}
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
