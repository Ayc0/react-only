# React-Only

## What is React-Only

React-only is inspired by the `.visible` classes from [bootstrap 4](https://getbootstrap.com/docs/4.0/migration/#responsive-utilities) (or `.hidden` classes from [bootstrap 3](https://getbootstrap.com/docs/3.3/css/#responsive-utilities-classes)): only display a certain content for a precise screen size.

Allows you to display component only for particular screen sizes.

## How to use

### Default breakpoints

React-Only is based on the classic bootstrap breakpoints: `xs`, `sm`, `md`, `lg` and `xl`.

```javascript
import React from 'react';
import Only, { BreakpointsProvider } from 'react-only';

const App = () => (
  <BreakpointsProvider>
    <Only xs>Only visible for extra small devices (portrait phones)</Only>
    <Only sm>Only visible for small devices (landscape phones)</Only>
    <Only md>Only visible for medium devices (tablets)</Only>
    <Only lg>Only visible for large devices (desktops)</Only>
    <Only xl>Only visible for extra large devices (large desktops)</Only>
    <Only sm xl>Only visible for small AND extra large devices</Only>
  </BreakpointsProvider>
);
```

### Additional `Up` and `Down`

In addition to the regular breakpoints, you have another api defined `{breakpoint}Up` and `{breakpoint}Down`:

```javascript
import React from 'react';
import Only, { BreakpointsProvider } from 'react-only';

const App = () => (
  <BreakpointsProvider>
    <Only smUp>Visible on every device bigger or egal than "small"</Only>
    <Only mdDown>Visible on every device smaller or egal than "medium"</Only>
  </BreakpointsProvider>
);
```

### BreakpointsProvider

`BreakpointsProvider` defines the values of every breakpoints.

By default, the breakpoints are:

| Breakpoint | From   | To       |
|------------|-------:|---------:|
| xs         | 0px    | 576px    |
| sm         | 576px  | 768px    |
| md         | 768px  | 992px    |
| lg         | 992px  | 1200px   |
| xl         | 1200px | Infinity |

#### Add more breakpoints

```javascript
import React from 'react';
import Only, { BreakpointsProvider } from 'react-only';

const App = () => (
  <BreakpointsProvider additionalBreakpoints={{ customBrkPts: [263, 863] }}>
    <Only customBrkPts>Visible on every device from "263px" to "863px"</Only>
    <Only customBrkPtsUp>Visible on every device bigger than "263px"</Only>
    <Only customBrkPtsDown>Visible on every device smaller than "863px"</Only>
  </BreakpointsProvider>
);
```

#### Change default breakpoints

```javascript
import React from 'react';
import Only, { BreakpointsProvider } from 'react-only';

const App = () => (
  <BreakpointsProvider breakpoints={{ sm: [263, 863] }}>
    <Only sm>Visible on every device from "263px" to "863px"</Only>
    <Only smUp>Visible on every device bigger than "263px"</Only>
    <Only smDown>Visible on every device smaller than "863px"</Only>
  </BreakpointsProvider>
);
```

**Warning**: This **overrides completely** the default breakpoints, in this example, the other breakpoints `xs`, `md`, `lg` and `xl` **are no longer defined!**

## toCSS()

You can also use this library to set media-query in CSS-in-JS:

```javascript
import { toCSS } from 'react-only';

const style = toCSS({ xs: { width: '10px' }, lg: { width: '100px'}});
> style: {
            "width": "10px",
            "@media (min-width: 992px)": {
              "width": "100px"
            }
          }
```

**Warning: the following code does't work**

```javascript
import React from 'react';
import { BreakpointsProvider, toCSS } from 'react-only';

const App = () => (
  <BreakpointsProvider>
    <p style={toCSS({ xs: { width: '10px' }, lg: { width: '100px' } })}>Lorem Ipsum</p>
  </BreakpointsProvider>
);
```

`toCSS` is binded to the `Provider` so when `toCSS` is called, the breakpoints aren't defined yet, use in componentDidUpdate or in an event, etc. but not directly after the rendering of the Provider.

### [Styletron](https://github.com/rtsao/styletron)

`toCSS` can also be used with [styletron](https://github.com/rtsao/styletron):

```javascript
const App = styled('div', () => ({
  ...toCSS({ xs: { width: '10px' }, lg: { width: '100px'}})
}));
```
