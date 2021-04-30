import React from 'react';
import Highlight from 'react-highlight.js';
export default function GeneralPage(props: { code: string; Demo: any }) {
  const { code, Demo } = props;
  return (
    <>
      <div className='demo-section half-section'>
        <Demo />
      </div>
      <div className='code-section half-section'>
        <div className='code-wrapper'>
          <Highlight language='js'>{code}</Highlight>
        </div>
      </div>
    </>
  );
}

export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRamdomRowHeightAndColumn(dataLength: number) {
  const heights: number[] = [];
  const columns: number[] = [];
  let nextDataIndex = 0;
  for (let i = 0; nextDataIndex < dataLength; i++) {
    heights[i] = randInt(60, 140);
    const column = randInt(1, 4);
    const tempNextDataIndex = nextDataIndex + column;
    columns[i] =
      tempNextDataIndex > dataLength ? dataLength - nextDataIndex : column;
    nextDataIndex = tempNextDataIndex;
  }

  return [heights, columns];
}
