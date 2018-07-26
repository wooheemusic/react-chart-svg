import React, { Component, Fragment } from 'react';
import { Donut } from 'react-chart-svg';
import { config } from 'react-spring';

class App extends Component {
  constructor(props) {
    super(props);

    this.data = [
      [10, 20, 30, 40],
      [0, 1000, 0, 2000],
      [410, 320, 230, 140, 123],
      [10, 10, 10, 10],
      [0, 0, 0, 0, 0],
    ];

    this.state = {
      index: 0,
    };
  }

  render() {
    return (
      <Fragment>
        <div
          style={{
            width: '200px',
          }}
        >
          <button
            onClick={() => {
              const nexIndex =
                this.data.length - 1 === this.state.index
                  ? 0
                  : this.state.index + 1;
              this.setState({ index: nexIndex });
            }}
          >
            switch
          </button>
          <Donut
            outerRadius={0.5}
            data={this.data[this.state.index]}
            colors={['red', 'orange']}
            style={{
              opacity: 0.5,
              width: '100%',
            }}
            // config={{ tension: 20, friction: 60 }}
          />
          <Donut
            outerRadius={0.5}
            data={this.data[this.state.index]}
            colors={['blue']}
            style={{ opacity: 0.5, width: '100%' }}
            isHalf
            config={{ tension: 20, friction: 60 }}
          />
          <Donut
            half
            outerRadius={0.5}
            data={this.data[this.state.index]}
            // colors={["red", "orange"]}
            style={{ opacity: 0.5, width: '100%' }}
            config={config.default}
          />
        </div>
      </Fragment>
    );
  }
}

export default App;
