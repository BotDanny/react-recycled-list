# react-recycled-list

> A library for rendering large list with expensive component efficiently

[![NPM](https://img.shields.io/npm/v/react-recycled-list.svg)](https://www.npmjs.com/package/react-recycled-list) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## What is react-recycled-list?

react-recycled-list is a library for rendering large list with expensive components. Like [react-window](https://github.com/bvaughn/react-window) and [react-virtualized](https://github.com/bvaughn/react-virtualized), react-recycled-list only renders the rows that are visible to the user to improve performance. However react-recycled-list differs in that it keeps the DOM node count constant, meaning it **does not ummount** your row component when it is scrolled out of the visible window. This results in much better performance compared to traditional windowing libraries.

## [Examples, usages, and documentation](https://botdanny.github.io/react-recycled-list/)

Visit the [documentation](https://botdanny.github.io/react-recycled-list/) to see a full list of simple and advanced examples with code side by side, as well as the detailed documentation for each component.


## Install

```bash
npm install react-recycled-list
```

or

```bash
yarn add react-recycled-list
```

## Simple usage

```javascript
import { FixedList } from "react-recycled-list";

function SimpleListDemo() {

  const data = Array(1000).fill(null).map((_, index) => `index ${index}`);

  return <FixedList height={500} rowComponent={Row} data={data} rowHeight={100}/>
}

// Use React.memo or React pure component to prevent unncessary render
const Row = React.memo(function (props) {
  // the data here is the same data that is passed into the FixedList
  const { data, dataIndex, top, height } = props;

  const value = data[dataIndex];
  // Important!, make sure you inline-style your component with the the provided top, height. Also make sure to set your container element to position absolute
  return <div style={{top, height}} className="react-recycled-row">{value}</div>;
})
```

## Running the example app

After cloning the repo, cd into the example forder and run `npm start` or `yarn start`. The example is the same app as the [documentation](https://botdanny.github.io/react-recycled-list/).

## License

MIT © [BotDanny](https://github.com/BotDanny)
