# config-extracter

A lib for resolving config in Node.js

## Supports file format

-   `.js`
-   `.ts`

## Install

```bash
>$ npm install config-extracter
#or
>$ yarn add config-extracter
#or
>$ pnpm add config-extracter
```

## Usage

```ts
import { extract } from 'config-extracter';
import * as path from 'path';

extract({
    file: [path.resolve(process.cwd(), '.config.js'), path.resolve(process.cwd(), '.config.ts')],
}).then(config => {
    if (config) {
        console.log(config);
    }
});
```

## License

[MIT](./LICENSE)
