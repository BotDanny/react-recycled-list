import { Box, Typography } from '@material-ui/core';
import React from 'react';
import Highlight from 'react-highlight.js';
export default function BeforeYouBegin() {
  return (
    <div className='why-page'>
      <Box p={3} pb={0} pl={5} pr={5}>
        <Typography variant='h5' style={{ fontWeight: 500 }}>
          Make sure to style/position your component correctly!
        </Typography>
      </Box>
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          react-recycled-list uses absolute positioning to position its list
          items. You must use the style provided by react-recycled-list on your
          row component:
        </Typography>
      </Box>
      <Box pb={0} pt={0} pl={5} pr={5}>
        <Highlight language='js'>{code1}</Highlight>
      </Box>
      <Box p={3} pb={0} pl={5} pr={5}>
        <Typography variant='h5' style={{ fontWeight: 500 }}>
          Performance is slower than expected?
        </Typography>
      </Box>
      <Box p={3} pt={2} pb={1} pl={5} pr={5}>
        <Typography variant='body1'>
          It is important to memoize your row component, especially if your row
          component is expensive to render. You can do so by using React.memo or
          extending pure component:
        </Typography>
      </Box>
      <Box pb={0} pt={0} pl={5} pr={5}>
        <Highlight language='js'>{code2}</Highlight>
      </Box>
      <Box p={3} pt={2} pb={1} pl={5} pr={5}>
        <Typography variant='body1'>
          If you still find the performance slower than expected, then it is
          likely because you are in development mode and have react dev
          extensions enabled. Make sure to use a produciton build and use a
          incognito window to benchmark.
        </Typography>
      </Box>
      <Box p={3} pb={0} pl={5} pr={5}>
        <Typography variant='h5' style={{ fontWeight: 500 }}>
          A note about benchmarking performance
        </Typography>
      </Box>
      <Box p={3} pt={2} pb={1} pl={5} pr={5}>
        <Typography variant='body1'>
          It is recommended to use{' '}
          <a href='https://github.com/mrdoob/stats.js/' target='blank'>
            Stats.js
          </a>{' '}
          to monitor fps in real time. You can also use the performance monitor
          in google developer tool to inspect scripting and rendering time.
        </Typography>
      </Box>
      <Box p={3} pt={2} pb={1} pl={5} pr={5}>
        <Typography variant='body1'>
          To simulate scrolling on devices with low-end hardware, turn on CPU
          throttling in performance tab under google devloper tool. As mentioned
          above, all benchmark should be conducted using a production build.
        </Typography>
      </Box>
    </div>
  );
}

const code1 = `const Row = React.memo(function (props) {
  const { data, dataIndex, top, height } = props;
  const style={
      position: "absolute",
      top,
      height.
  }
  return <div style={style}>{data[dataIndex]}</div>;
})

// or

const Row = React.memo(function (props) {
    const { data, dataIndex, top, height } = props;
    // the css class "row" contains position: absolute
    return <div style={{top, height}} className="row">{data[dataIndex]}</div>;
})`;

const code2 = `const Row = React.memo(function (props) {
    const { data, dataIndex, top, height } = props;
    // the css class "row" contains position: absolute
    return <div style={{top, height}} className="row">{data[dataIndex]}</div>;
})`;
