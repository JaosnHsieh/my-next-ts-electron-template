## My next typescript electron template

`cd my-shared && yarn watch`

`cd frontend && yarn dev`

`cd electron && yarn build && yarn start`

## Expectation

1. Shared a typescript library for both `electron` and `frontend ( react )`.

## Problems

1. Symlinks in node_modules by `Lerna + Yarn` or `npm workspace` is having issue when packing symlinks into executables on electron-builder.

2. Correctly setting up esm, cjs released files.

## Solution

1. Use `npm install <folder>` in `package.json` to share the local `my-shared`

2. Use `parcel` to handle the insufficient of `tsc` that cannot produce `esm` for `nodejs` at the moment.

## Caveat

1. Need to run `yarn upgrade my-shared` on `frontend` or `electron` whenever the file changed in `my-shared`.

references:

https://github.com/yarnpkg/yarn/issues/4070

https://github.com/lerna/lerna/issues/2352

https://github.com/electron-userland/electron-builder/issues/1376

https://docs.npmjs.com/cli/v8/using-npm/workspaces

https://parceljs.org/recipes/react/

https://www.npmjs.com/package/@tsconfig/node16

https://parceljs.org/getting-started/library/#typescript

https://docs.npmjs.com/cli/v8/commands/npm-install
