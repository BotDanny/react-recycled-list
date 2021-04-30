import React from 'react';
import { FixedList, RowProps } from 'react-recycled-list';
import Highlight from 'react-highlight.js';
import { AppBar, Box, Tab, Tabs, Typography } from '@material-ui/core';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function ScrollRestoration() {
  const [value, setValue] = React.useState(0);
  const [prevScrol, setPrevScrollTop] = React.useState(0);
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  return (
    <div>
      <AppBar position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          <Tab label='tab 1' />
          <Tab label='tab 2' />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className='demo-section half-section'>
          <SimpleList
            initialScrollTop={prevScrol}
            setPrevScrollTop={setPrevScrollTop}
          />
        </div>
        <div className='code-section half-section'>
          <div className='code-wrapper'>
            <Highlight language='js'>{code}</Highlight>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant='h6'>
          Go back to tab 1 and the scroll position should restore
        </Typography>
      </TabPanel>
    </div>
  );
}

function SimpleList(props: any) {
  const { setPrevScrollTop, initialScrollTop } = props;
  const data = Array(1000)
    .fill(null)
    .map((_, index) => `item ${index}`);

  const onUnmount = (scrollTop: number) => {
    setPrevScrollTop(scrollTop);
  };

  return (
    <FixedList
      height={500}
      rowComponent={Row}
      data={data}
      rowHeight={100}
      initialScrollTop={initialScrollTop}
      onUnmount={onUnmount}
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

const code = `import { FixedList } from "react-recycled-list";

export default function Tabs() {
    // App bar and tab navigation are not included in the code here
    const [prevScrol, setPrevScrollTop] = React.useState(0);
    return (
      <div>
                    <TabPanel value={value} index={0}>
                            <ScrollRestorationDemo
                                initialScrollTop={prevScrol}
                                setPrevScrollTop={setPrevScrollTop}
                            />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                            Go back to tab 1 and the scroll position should restore
                    </TabPanel>
            </div>
    );
  }

function ScrollRestorationDemo( props ) {
    const { setPrevScrollTop, initialScrollTop } = props;
    const data = Array(1000).fill(null).map((_, index) => \`item \${index}\`);
  
    const onUnmount = (scrollTop: number) => {
      setPrevScrollTop(scrollTop);
    };
  
    return (
      <FixedList
                    height={500}
                    rowComponent={Row}
                    data={data}
                    rowHeight={100}
                    initialScrollTop={initialScrollTop}
                    onUnmount={onUnmount}
                />
    );
  }

// Use React.memo or React pure component to prevent unncessary render
const Row = React.memo(function (props) {
  // the data here is the same data that is passed into the FixedList
  const { data, dataIndex, top, height } = props;

  const value = data[dataIndex];
  // Important!, make sure you inline-style your component with the the provided top, height. Also make sure to set your container element to position absolute
  return <div style={{top, height}} className="react-recycled-row">{value}</div>;
})`;
