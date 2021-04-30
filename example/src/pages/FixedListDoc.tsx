import { AppBar, Box, Divider, Tab, Tabs, Typography } from '@material-ui/core';
import { TabPanel } from './Performance';
import React from 'react';
import Highlight from 'react-highlight.js';
import listPropsImg from './listProps.png';

export default function FixedListDoc() {
  const [value, setValue] = React.useState(0);

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
          <Tab label='Props' />
          <Tab label='Methods' />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <FixedListDocProps />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FixedListMethods />
      </TabPanel>
    </div>
  );
}
export function FixedListDocProps() {
  return (
    <div className='why-page'>
      <Box p={1} pl={5} pr={5}>
        <Highlight language='js'>{code1}</Highlight>
      </Box>
      <Divider className='divider' />
      <Box pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          data: Array{'<any>'}, <span className='required'>required*</span>
        </Typography>
      </Box>
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          An array of data items used to populate your row components. This will
          be passed to your row component as prop.
        </Typography>
      </Box>
      <Box pb={3} pt={0} pl={5} pr={5}>
        <Highlight language='js'>{dataCode}</Highlight>
      </Box>
      <Divider className='divider' />
      <Box pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          rowComponent: React component,{' '}
          <span className='required'>required*</span>
        </Typography>
      </Box>
      <Box pb={0} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          Your react component for rendering each row. Make sure to memoize it
          and style it correctly with absolute positioning. It will receive the
          following props:
        </Typography>
      </Box>
      <Box p={0} pt={0} pl={5} pr={5}>
        <ul>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>top:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              This is the css style top used to position your row component in
              the list.
            </Typography>
          </Box>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>height:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              This is the css style height used to position your row component
              in the list.
            </Typography>
          </Box>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>data:</span>
            </Typography>
          </li>
          <Box p={1} pl={3}>
            <Typography variant='body1'>
              The same data prop you passed into the FixedList component.
            </Typography>
          </Box>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>dataIndex:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              The index of the data item that this row should render. If you are
              using a grid, then this is the index of the first data item in
              this row.
            </Typography>
          </Box>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>dataEndIndex:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              This is the index of the data item that the next row should
              render. This prop is usefull if you are using a grid. Using
              data.slice(dataIndex, dataEndIndex) will give you the list of data
              items rendered for this row. For example, if dataIndex is 10 and
              dataEndIndex is 12, then your row should render 2 items with data
              index 10 and 11.
            </Typography>
          </Box>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>isScrolling:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              Indicate if the current row is being scrolled. If your component
              is very expensive to render and the user is scrolling fast, you
              can render a lighter component to increase performance. When the
              user stops scrolling then you can render the full component.
            </Typography>
          </Box>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>column:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              How many column/data item does this row have. Is is calculated as
              dataEndIndex - dataIndex. If you are not using a grid, then this
              will always be 1.
            </Typography>
          </Box>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>row:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              The index of the current row. For example, if row = 0 then it
              means your component is responsible for rendering the first row in
              the list.
            </Typography>
          </Box>
        </ul>
      </Box>
      <Box pb={3} pt={0} pl={5} pr={5}>
        <Highlight language='js'>{rowCode}</Highlight>
      </Box>
      <Divider className='divider' />
      <Box pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          rowHeight:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            number
          </span>
          , <span className='required'>required*</span>
        </Typography>
      </Box>
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          The heigh of each row in the list.
        </Typography>
      </Box>
      <Divider className='divider' />
      <Box pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          height:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            number,
          </span>{' '}
          <span className='required'>required*</span>
        </Typography>
      </Box>
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>The height of the list.</Typography>
      </Box>
      <Divider className='divider' />
      <Box pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          column:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            number
          </span>
        </Typography>
      </Box>
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          How many data item each row should render.
        </Typography>
      </Box>
      <Divider className='divider' />
      <Box pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          rowColumns:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            Array{'<number>'}
          </span>
        </Typography>
      </Box>
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          This is for variable column grid. rowColumns is a list of number that
          defines how many column each row should have. Note the sum of
          rowColumns must be equal to the length of the data.
        </Typography>
      </Box>
      <Box pb={3} pt={0} pl={5} pr={5}>
        <Highlight language='js'>{rowColumnsCode}</Highlight>
      </Box>
      <Divider className='divider' />
      <Box pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          offScreenRow:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            number, default = 1
          </span>
        </Typography>
      </Box>
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          How many rows are rendered off screen in each direction. By default
          there are 2 rows rendered off screen (1 in each direction). Increasing
          the number of rows rendered off screen may reduce flickering in fast
          scroll (when the user scrolls too fast and the render cannot keep up).
          however, it does come with a performance cost.
        </Typography>
      </Box>
      <Divider className='divider' />
      <Box pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          onRenderedRowChange:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            {'(renderInfo) => void'}
          </span>
        </Typography>
      </Box>
      <Box pb={0} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          Callback function that is called whenever the rendered row has changed
          (when any row is recycled). Usefull for loading data. It will receive
          a object parameter that contains the following information:
        </Typography>
      </Box>
      <Box p={0} pt={0} pl={5} pr={5}>
        <ul>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>firstRenderedRowIndex:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              The row index of the first rendered row.
            </Typography>
          </Box>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>firstRenderedDataIndex:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              The data index of the first rendered data item.
            </Typography>
          </Box>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>lastRenderedRowIndex:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              The row index of the last rendered row.
            </Typography>
          </Box>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>lastRenderedDataIndex:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              The data index of the last rendered data item.
            </Typography>
          </Box>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>lastRowIndex:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              The row index of the last row.
            </Typography>
          </Box>
        </ul>
      </Box>
      <Box pb={3} pt={0} pl={5} pr={5}>
        <Highlight language='js'>{onRenderedRowChangeCode}</Highlight>
      </Box>
      <Divider className='divider' />
      <Box pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          onVisibleRowChange:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            {'(visibilityInfo) => void'}
          </span>
        </Typography>
      </Box>
      <Box pb={0} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          Callback function that is called whenever any visible row is changed.
          Usefull for loading data. It will receive a object parameter that
          contains the following information:
        </Typography>
      </Box>
      <Box p={0} pt={0} pl={5} pr={5}>
        <ul>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>firstVisibleRowIndex:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              The row index of the first visible row.
            </Typography>
          </Box>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>firstVisibleDataIndex:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              The data index of the first visible data item.
            </Typography>
          </Box>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>lastVisibleRowIndex:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              The row index of the last visible row.
            </Typography>
          </Box>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>lastVisibleDataIndex:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              The data index of the last visible data item.
            </Typography>
          </Box>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>lastRowIndex:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              The row index of the last row.
            </Typography>
          </Box>
        </ul>
      </Box>
      <Divider className='divider' />
      <Box pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          onUnmount:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            {'(scrollTop: number) => void'}
          </span>
        </Typography>
      </Box>
      <Box pb={0} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          Callback function that is called whenever the list component is
          unmounted. Usefull for scroll restoration in combination with
          initialScrollTop.
        </Typography>
      </Box>
      <Divider className='divider' />
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          initialScrollTop:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            number, default = 0
          </span>
        </Typography>
      </Box>
      <Box pl={5} pr={5}>
        <Typography variant='body1'>
          The initial scroll position of the list when first rendered. If
          initialScrollTop = -1, then the list will scroll to the bottom. Note
          the initialScrollTop here is relative to the top of the list, meaning
          that initialScrollTop = 0 will scroll to the first row in the list. It
          will not scroll to the top of the window.
        </Typography>
      </Box>
      <Divider className='divider' />
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          useScrollingIndicator:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            boolean, default = false
          </span>
        </Typography>
      </Box>
      <Box pl={5} pr={5}>
        <Typography variant='body1'>
          Wheather of not to use scroll indicator. If set to yes, then your row
          component will receive a prop called isScrolling which indicate if the
          current row is being scrolled.
        </Typography>
      </Box>
      <Divider className='divider' />
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          scrollInterval:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            number, default = 250
          </span>
        </Typography>
      </Box>
      <Box pl={5} pr={5}>
        <Typography variant='body1'>
          How many milisecond to wait after the user stops scrolling, before
          setting isScrolling to false.
        </Typography>
      </Box>
      <Divider className='divider' />
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          listTagName:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            string, default = "div"
          </span>
        </Typography>
      </Box>
      <Box pl={5} pr={5}>
        <Typography variant='body1'>
          The tag name assigned to the full height list
        </Typography>
      </Box>
      <Divider className='divider' />
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          listProps:
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            object, default = {'{}'}
          </span>
        </Typography>
      </Box>
      <Box pl={5} pr={5}>
        <Typography variant='body1'>
          The props assigned to the full list element. Usefull for assigning
          className or accessibility properties. Note that you cannot assign
          style to it.
        </Typography>
      </Box>
      <Box pb={3} pt={0} pl={5} pr={5}>
        <Highlight language='js'>{listPropsCode}</Highlight>
      </Box>
      <Divider className='divider' />
      <Box pb={3} pt={0} pl={5} pr={5}>
        <img src={listPropsImg} style={{ height: 200 }} />
      </Box>
      <Divider className='divider' />
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          listWindowTagName:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            string, default = "div"
          </span>
        </Typography>
      </Box>
      <Box pl={5} pr={5}>
        <Typography variant='body1'>
          The tag name assigned to the list window
        </Typography>
      </Box>
      <Divider className='divider' />
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          listWindowProps:
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            object, default = {'{}'}
          </span>
        </Typography>
      </Box>
      <Box pl={5} pr={5}>
        <Typography variant='body1'>
          The props assigned to the list window. Usefull for assigning className
          or accessibility properties. Note that you cannot assign style to it.
        </Typography>
      </Box>
      <Divider className='divider' />
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          width:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            string | number, default = {`"100%"`}
          </span>
        </Typography>
      </Box>
      <Box pb={3} pl={5} pr={5}>
        <Typography variant='body1'>
          the width assigned to the list window.
        </Typography>
      </Box>
    </div>
  );
}

export function FixedListMethods(props: any) {
  const { code } = props;
  return (
    <div className='why-page'>
      <Box p={1} pl={5} pr={5}>
        <Highlight language='js'>{code || methodsCode}</Highlight>
      </Box>
      <Divider className='divider' />
      <Box pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          scrollTo(scrollTop: number): void
        </Typography>
      </Box>
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          Scroll to the specified position according to the scrollTop value
          provided. Put scrollTop = -1 to scroll to the bottom of the list.
        </Typography>
      </Box>
      <Divider className='divider' />
      <Box pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          scrollToRow(targetRowIndex: number): void
        </Typography>
      </Box>
      <Box pb={0} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          Scroll to the specified row. Note the index starts at 0. Put
          targetRowIndex = -1 to scroll to the last row of the list.
        </Typography>
      </Box>
      <Divider className='divider' />
      <Box pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          scrollToDataIndex(targetDataIndex: number): void
        </Typography>
      </Box>
      <Box pb={0} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          Scroll to the specified row that contains the target data index. Note
          the index starts at 0. Put scrollToDataIndex = -1 to scroll to the
          last data item of the list.
        </Typography>
      </Box>
      <Divider className='divider' />
    </div>
  );
}

const code1 = `import { FixedList } from "react-recycled-list;`;

const dataCode = `const data = [{firstName: "a", lastName: "b"}, {firstName: "c", lastName: "d"}, {firstName: "e", lastName: "f"}];
function MyList() {
    //...
    return <FixedList data={data} .../>
}`;

const rowCode = `const MyRow = React.memo(function (props) {
    // This is a grid row that has 4 data items in it
    const { data, dataIndex: dataStartIndex, dataEndIndex, top, height, row, column } = props;
    const rowData = data.slice(dataStartIndex, dataEndIndex);
    const columnStyle = { width: "25%", textAlign: "center" };
    return (
        <div style={{top, height}} className="react-recycled-row">
                            {rowData.map((item) => <div style={columnStyle} key={item}>{item}</div>)}
                 </div>
    )
});`;

const rowColumnsCode = `function MyList() {
    //...
    const data = ["item 1", "item 2", "item 3", "item 4", "item 5", "item 6",];
    // Total of 3 rows. First row has 1 column, second row has 2 columns and thrid row has 1 column
    // total number of data items = 3 + 1 + 2 = 6 = length of data
    const rowColumns = [3,1,2];
    return <FixedList data={data} rowColumns={rowColumns} .../>
}`;

const onRenderedRowChangeCode = `function LazyLoadingDemo() {
    // ....
    const onRenderedRowChange = (renderInfo) => {
        const {
            firstRenderedRowIndex,
            firstRenderedDataIndex,
            lastRenderedRowIndex,
            lastRenderedDataIndex,
            lastRowIndex,
        } = renderInfo;
        // If the last row is rendered (NOT visible yet!) and we are not already loading data, then we fetch new data
        // If you want to fetch data when the last row is visible, use onVisibleRowChange
        if (lastRenderedDataIndex === lastRowIndex) {
            if (isLoading === false) {
                loadData();
            }
        }
    }
    return <FixedList onRenderedRowChange={onRenderedRowChange} .../>
}`;

const listPropsCode = `function MyList() {
    //...
    return <FixedList listProps={{className: "myList"}} .../>
}`;

const methodsCode = `function ScrollToDemo() {
    const data = Array(1000).fill(null).map((_, index) => \`item \${index}\`);
    const ref = React.useRef();
    return (
        <div>
                        <button onClick={() => ref.current?.scrollTo(350)} />
                        <button onClick={() => ref.current?.scrollToRow(9)} />
                        <button onClick={() => ref.current?.scrollToRow(-1)} />
                        <button onClick={() => ref.current?.scrollToDataIndex(86)} />
                        <FixedList height={300} rowComponent={Row} data={data} rowHeight={100} ref={ref}/>
                </div>
    )
}`;
