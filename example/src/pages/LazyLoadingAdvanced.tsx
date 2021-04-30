import React from 'react';
import { FixedList, RowProps } from 'react-recycled-list';
import GeneralPage from './GeneralPage';

export default function LazyLoadingAdvanced() {
  return <GeneralPage code={code} Demo={LazyLoadingDemo} />;
}

const numberOfItemPerPage = 20;
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
  }, 1500);
}

const initialStore: {
  data: { [key: string]: any[] };
  nextPage: number;
  isLoading: boolean;
} = {
  data: {
    1: Array(numberOfItemPerPage)
      .fill(null)
      .map(() => undefined)
  },
  nextPage: 1,
  isLoading: false
};

function LazyLoadingDemo() {
  const [store, setStore] = React.useState(initialStore);

  const onFetchDataSuccess = (newData: any[], page: number) => {
    const newStoreData: { [key: string]: any[] } = {
      ...store.data,
      [page]: newData
    };
    const nextPage = page + 1;
    const hasNextPage = nextPage <= 5;
    if (hasNextPage) {
      newStoreData[nextPage] = [undefined];
    }
    setStore({
      ...store,
      data: newStoreData,
      isLoading: false,
      nextPage: nextPage
    });
  };

  React.useEffect(() => {
    fetchData(store.nextPage, onFetchDataSuccess);
  }, []);

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
      if (store.isLoading === false && store.nextPage <= 5) {
        setStore({ ...store, isLoading: true });
        fetchData(store.nextPage, onFetchDataSuccess);
      }
    }
  };

  const listData = Object.values(store.data).flat();

  return (
    <FixedList
      height={500}
      rowComponent={Row}
      data={listData}
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

// This is a rather complicated example
// The key point is to utilize onRenderedRowChange or onVisibleRowChange to load your data

const numberOfItemPerPage = 20;
const numberOfPages = 5;

// Just a simulation of an API call
function fetchData(page, onSuccess) {
  setTimeout(() => {
    const data = [];
    const startDataIndex = (page - 1) * numberOfItemPerPage;
    const endDataIndex = startDataIndex + numberOfItemPerPage
    for (let i = startDataIndex; i < endDataIndex; i++) {
      data.push(\`item \${i + 1}\`);
    }
    onSuccess(data, page);
  }, 2000);
}

// Use a map to store the data (you do not have to do the same, the implementation is up to you)
const initialStore = {
  data: { 1: Array(numberOfItemPerPage).fill(null).map(() => undefined) },
  nextPage: 0,
  isLoading: false,
};

function LazyLoadingDemo() {
  const [store, setStore] = React.useState(initialStore);

  const onFetchDataSuccess = (newData, page) => {
    const newStoreData = { ...store.data, [page]: newData };
    // For demo purpose I set the max page to be 5
    const nextPage = page + 1
    const hasNextPage = nextPage <= numberOfPages;
    if (hasNextPage) {
      // If there is a next page, add a empty data item to the next page. This empty data item will be rendered as "loading..."
      newStoreData[nextPage] = [undefined];
    }
    setStore({ ...store, data: newStoreData, isLoading: false, nextPage: nextPage });
  };

  React.useEffect(() => {
    // Initial fetch
    fetchData(store.nextPage, onFetchDataSuccess)
  }, [])

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
    if (lastRenderedRowIndex === lastRowIndex) {
      if (store.isLoading === false) {
        setStore({ ...store, isLoading: true });
        fetchData(store.nextPage, onFetchDataSuccess)
      }
    }
  };

  const listData = Object.values(store.data).flat();

  return (
    <FixedList
              height={500}
              rowComponent={Row}
              data={listData}
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
