## Styles

Developers can use "CSS Modules" or "CSS" to give styles to our application web.
We generate a hash with ccs modules for avoid repeat class names.

## CSS Modules

### Setup

Modify [`webpack.config.js`][webpackconfig]
to add the following rule:

```
  module: {
      rules: [
        {
          test: /\.module\.css$/,
          use: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  mode: "local",
                  localIdentName: isDevelopment
                    ? "[path][name]__[local]--[hash:base64:5]"
                    : "[hash:base64:5]",
                },
                importLoaders: 1,
              },
            },
          ],
        },
    ]
  }
```

Added [css-modules.d.ts] to avoid problem with typeScript
path: podcast/types/css-modules.d.ts

```ts
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export = classes;
}
```


### Usage

The syntax is very similar to CSS, but with .module. added to the filenames. Using CSS modules, we avoid problems with repeating class names. The advantage is that we can use a single variable to access the class names.

**Example*:*

**`Button.module.css`**

```css
.danger {
  background-color: red;
}
```

**`Button.tsx`**

```tsx
import React from 'react';
import * as styles from "./Button.module.css";

function Button() {  
  return <button className={styles.danger}>Click me</button>;
}
```
> For more information about CSS Modules see https://github.com/css-modules/css-modules


## Responsive design

The application **is designed to support widths starting from 320 pixels** and has been adapted to the Figma design provided in the test.
We use CSS @media queries to assign the different sizes.