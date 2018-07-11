# react-chart-svg

> dynamic svg charts

[![NPM](https://img.shields.io/npm/v/react-chart-svg.svg)](https://www.npmjs.com/package/react-chart-svg) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-chart-svg
```

## Usage

```jsx
import React, { Component } from "react";

import MyComponent from "react-chart-svg";
import { config } from "react-spring";

class Example extends Component {
  render() {
    return (
      <Donut
        half
        outerRadius={0.3}
        data={data}
        colors={["#e9002d", "#23ac0e", "#ff7a00", "gray"]}
        style={{ opacity: 1, width: "100%", height: "100%" }}
        config={config.default}
      />
    );
  }
}
```

## License

MIT © [wooheemusic](https://github.com/wooheemusic)
