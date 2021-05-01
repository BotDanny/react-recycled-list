import { Box, Typography } from '@material-ui/core';
import React from 'react';

export default function WhyPage() {
  return (
    <div className='why-page'>
      <Box p={3} pb={0} pl={5} pr={5}>
        <Typography variant='h5' style={{ fontWeight: 500 }}>
          What is react-recycled-list?
        </Typography>
      </Box>
      <Box pb={2} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          react-recycled-list is a library for rendering large list with
          expensive components. Like{' '}
          <a href='https://github.com/bvaughn/react-window' target='blank'>
            react-window
          </a>{' '}
          and{' '}
          <a href='https://github.com/bvaughn/react-virtualized' target='blank'>
            react-virtualized
          </a>
          , react-recycled-list only renders the rows that are visible to the
          user to improve performance. However, react-recycled-list has a
          different approach compared to traditional windowing library. The main
          difference is that react-recycled-list keeps the integrity of the DOM
          tree, meaning it does not add or remove any DOM node. Instead,
          whenever a row goes off screen, its DOM will be “recycled” to the
          appropriate position by an update to its absolute position. This
          allows react-recycled-list to truly keep a constant amount of DOM and
          prevent unmounting which in some cases can be noticeably more
          performant than traditional windowing library.
        </Typography>
      </Box>
      <Box p={2} pb={0} pl={5} pr={5}>
        <Typography variant='h5' style={{ fontWeight: 500 }}>
          Why use react-recycled-list?
        </Typography>
      </Box>
      <Box p={3} pt={2} pb={1} pl={5} pr={5}>
        <Typography variant='body1'>
          The main reason you may want to use react-recycled-list is the extreme
          scrolling performance it provides. However, there are also other
          perks:
        </Typography>
      </Box>
      <Box p={2} pt={0} pl={5} pr={5}>
        <ul>
          <li>
            <Typography variant='body1'>
              <span style={{ fontWeight: 500 }}>Performance:</span>
            </Typography>
          </li>
          <Box p={1} pl={3}>
            <Typography variant='body1'>
              react-recycled-list prevents unmounting and remounting of row
              component when scrolling, and it utilizes an extremely effient
              data structure to track/compute position of rows in the list.
            </Typography>
          </Box>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              In the worst case scenario (when your row component is extremely
              simple), react-recycled-list will on average be at least 30% more
              performant than traditional windowing library.
            </Typography>
          </Box>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              The performance advantave of react-recycled-list increases as the
              complexity of the row component increases. If your row component
              is expensive to render, then it is very common for
              react-recycled-list to have more than 100%, 200% or even 300%+ the
              performance (in terms of scripting time and rendering time) of
              traditional windowing library. It also produces noticeably less
              flickering in fast scrolling.
            </Typography>
          </Box>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              Note: If you row component is not expensive enough for
              react-recycled-list to make a difference, you can turn on CPU
              throttle in google developer tool to simulate scrolling on devices
              with low-end hardware.
            </Typography>
          </Box>
          <li>
            <Typography variant='body1'>
              {' '}
              <span style={{ fontWeight: 500 }}>Feature:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              react-recycled-list is feature rich and includes almost everything
              you need. It provides fixed row height list/grid, variable row
              height list/grid, variable column grid, full window list/grid,
              custom window list/grid, responsive list/grid, infinite loading,
              dynamic loading, scroll restoration, server side rendering and so
              on, all in one place.
            </Typography>
          </Box>
          <li>
            <Typography variant='body1'>
              {' '}
              <span style={{ fontWeight: 500 }}>Size:</span>
            </Typography>
          </li>
          <Box p={0.5} pl={3}>
            <Typography variant='body1'>
              Despite having a complete set of features, react-recycled-list is
              quite small in size: around 10kb g-zipped, including its direct dependency.
            </Typography>
          </Box>
        </ul>
      </Box>
      <Box pt={1} pb={0} pl={5} pr={5}>
        <Typography variant='h5' style={{ fontWeight: 500 }}>
          How does it work?
        </Typography>
      </Box>
      <Box p={3} pt={2} pb={1} pl={5} pr={5}>
        <Typography variant='body1'>
          This library is inspired by this article{' '}
          <a
            href='https://engineering.monday.com/building-our-recycle-list-solution-in-react/'
            target='_blank'
          >
            here
          </a>
          . Check it out to find out how react-recycled-list works.
        </Typography>
      </Box>
      <Box pt={3} pb={0} pl={5} pr={5}>
        <Typography variant='h5' style={{ fontWeight: 500 }}>
          Caveat of react-recycled-list?
        </Typography>
      </Box>
      <Box p={0} pt={2} pl={5} pr={5}>
        <Typography variant='body1'>
          The main caveat of react-recycled-list is that you must know the
          height of each row in advance. Mechanism for determining the height of
          each row automatically is planned.
        </Typography>
      </Box>
      <Box p={3} pt={2} pb={3} pl={5} pr={5}>
        <Typography variant='body1'>
          Another caveat of react-recycled-list it that it only supports
          vertical list/scrolling. If you are looking for horizontal scrolling,
          then{' '}
          <a href='https://github.com/bvaughn/react-window' target='blank'>
            react-window
          </a>{' '}
          and{' '}
          <a href='https://github.com/bvaughn/react-virtualized' target='blank'>
            react-virtualized
          </a>{' '}
          are your best choices.
        </Typography>
      </Box>
    </div>
  );
}
