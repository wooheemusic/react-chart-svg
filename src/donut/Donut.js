import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { Spring, config } from 'react-spring';

// these will be extracted..
function na(length, callback, ...args) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(callback(i, ...args));
  }
  return arr;
}

function x(ratio) {
  return -Math.cos(2 * Math.PI * ratio);
}
function y(ratio) {
  return -Math.sin(2 * Math.PI * ratio);
}

function hex() {
  return `#${Math.random()
    .toString(16)
    .slice(2, 8)}`;
}

class DonutSvg extends Component {
  render() {
    // console.log('DonutSvg');
    const {
      data,
      outerRadius: o,
      colors: cl,
      viewBox: v,
      half,
      ...rest
    } = this.props;
    const l = data.length;

    let m = 0;
    const c = [];
    for (let i = 0; i < l; i++) {
      c.push((m += rest[`s${i}`]));
    }

    const h1 = half ? 0.5 : 1;
    const vb = v || (half ? '-1.5 -1.5 3 1.7' : '-1.5 -1.5 3 3');

    return (
      <svg viewBox={vb} {...rest}>
        {na(l, (i) => {
          const s = i === 0 ? 0 : c[i - 1] * h1;
          const e = i === l ? 1 : c[i] * h1;
          const d = data[i];
          return (
            <Fragment key={i.toString()}>
              <path
                fill="transparent"
                stroke={cl[i]}
                strokeWidth={o}
                d={`M ${x(s)} ${y(s)} A 1 1 0 ${e - s > 0.5 ? 1 : 0} 1 ${x(e)} ${y(e)}`}
              />
              <text
                textAnchor="middle"
                x={x((e + s) / 2)}
                y={y((e + s) / 2)}
                style={{
                  fontSize: o / 2,
                  opacity: d ? 1 : 0,
                  transform: `translate(0, ${o / 5}px)`,
                }}
              >
                {d}
              </text>
            </Fragment>
          );
        })}
        Sorry, your browser does not support inline SVG.
      </svg>
    );
  }
}

// data: [10, 20, 30, 40]
export default class Donut extends Component {
  constructor(props) {
    super(props);

    const defaultOuterRadius = 0.2;

    this.outerRadius = Number(props.outerRadius) || defaultOuterRadius;
    if (this.outerRadius > 1 || this.outerRadius <= 0) {
      this.outerRadius = defaultOuterRadius;
    }
  }

  render() {
    // console.log('Donut');
    const {
      props: {
        data, config: config_, colors, ...rest
      },
      outerRadius,
    } = this;

    const l = data ? data.length : 0;
    if (!l) {
      return null;
    }

    const colors_ = [];
    for (let i = 0; i < l; i++) {
      colors_[i] = colors ? colors[i] || hex() : hex();
    }

    const init = {};
    for (let i = 0; i < l; i++) {
      // init.push(0);
      init[`s${i}`] = 0;
    }

    const sum = data.reduce((a, b) => a + b) || 1;
    const scaledData = {};
    for (let i = 0; i < l; i++) {
      // scaledData.push(data[i] / sum);
      scaledData[`s${i}`] = data[i] / sum;
    }

    return (
      <Spring
        from={{ ...init }}
        to={{ ...scaledData }}
        config={config_ || config.default}
        children={springProps => (
          <DonutSvg
            {...springProps}
            outerRadius={outerRadius}
            data={data}
            colors={colors_}
            {...rest}
          />
        )}
      />
    );
  }
}
