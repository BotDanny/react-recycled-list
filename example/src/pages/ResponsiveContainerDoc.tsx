import { AppBar, Box, Divider, Tab, Tabs, Typography } from '@material-ui/core';
import { TabPanel } from './Performance';
import React from 'react';
import Highlight from 'react-highlight.js';
import listPropsImg from './listProps.png';
import { Link } from 'react-router-dom';

export default function ResponsiveContainerDoc() {
  return (
    <div className='why-page'>
      <Box p={1} pl={5} pr={5}>
        <Highlight language='js'>{code1}</Highlight>
      </Box>
      <Divider className='divider' />
      <Box pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          render:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            {'({height: number, width: number}): any'}
          </span>
          , <span className='required'>required*</span>
        </Typography>
      </Box>
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          A function that renders the list based on the given height and width.
          The given height and width is the height and width of the parent
          element of ResponsiveContainer.
        </Typography>
      </Box>
      <Box pb={3} pt={0} pl={5} pr={5}>
        <Highlight language='js'>{dataCode}</Highlight>
      </Box>
      <Divider className='divider' />
      <Box pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          debounceResize:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            boolean, default = false
          </span>
        </Typography>
      </Box>
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          If set true the list will adjust its height and width only when the
          user stops resizing.
        </Typography>
      </Box>
      <Divider className='divider' />
      <Box pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          debounceInterval:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            number
          </span>
        </Typography>
      </Box>
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          How many milisecond to wait after the the user stops resizing to
          triger the resizing (re-computation) of the list.
        </Typography>
      </Box>
      <Divider className='divider' />
      <Box pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          debounceInterval:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            number
          </span>
        </Typography>
      </Box>
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          How many milisecond to wait after the the user stops resizing to
          triger the resizing (re-computation) of the list.
        </Typography>
      </Box>
      <Divider className='divider' />
      <Box pl={5} pr={5}>
        <Typography variant='h6' style={{ fontWeight: 500 }}>
          serverSideHeight:{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            number
          </span>
        </Typography>
      </Box>
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          The initial rendered height of the list. This will determine how many
          rows are rendered on the server side. Once the page loads the height
          will be adjusted to the height of its the global window object or the
          element that scrollRef points to (if set).
        </Typography>
      </Box>
      <Divider className='divider' />
    </div>
  );
}

const code1 = `import { ResponsiveContainer } from "react-recycled-list;`;

const dataCode = `const renderList = (sizeInfo) => {
    const { width, height } = sizeInfo;
    const column = width > 1200 ? 2 : 1;
    return (
      <FullWindowFixedList
                      windowHeight={height}
                      rowComponent={Row}
                      data={data}
                      rowHeight={100}
                      column={column}
              />
    );
};`;
