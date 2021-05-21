# react-recycled-list

> A library for rendering large list with expensive component efficiently

[![NPM](https://img.shields.io/npm/v/react-recycled-list.svg)](https://www.npmjs.com/package/react-recycled-list) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## What is react-recycled-list?

react-recycled-list is a library for rendering large list with expensive components. Like [react-window](https://github.com/bvaughn/react-window) and [react-virtualized](https://github.com/bvaughn/react-virtualized), react-recycled-list only renders the rows that are visible to the user to improve performance. However react-recycled-list differs in that it keeps the DOM node count constant, meaning it **does not ummount** your row component when it is scrolled out of the visible window. This results in much better performance compared to traditional windowing libraries.

## Install

```bash
npm install react-recycled-list
```

or

```bash
yarn add react-recycled-list
```

## Examples, usages, and documentation

Visit the [documentation](https://www.react-recycled-list.com) to see a full list of simple and advanced examples with code side by side, as well as the detailed decumentation for each component.

## Running the example app

After cloning the repo, cd into the example forder and run `npm start` or `yarn start`. The example is the same app as the [documentation](https://www.react-recycled-list.com).

## License

MIT © [BotDanny](https://github.com/BotDanny)
