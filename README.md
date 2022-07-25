# Graph explorer

## Installation

Install dependencies

```
npm install
```

Build the project (in the `dist` folder)

```
npm run build
```

Run a local server (for development)

```
npm run serve
```

## Graph gallery creation

There is a collection of pre-defined graphs, stored as json files. Some of those files are generated algorithmically with a generator script. The script is written in TypeScript and it must be transpiled (built) into JavaScript before using it with Node.js.

Building the script

```
npm run build:graph-generator
```

Rebuilding the generator every time the generator code changes (recommended to have it running in a separate console while developing the generator)

```
npm run watch:graph-generator
```

Generating the graphs (recommended to run it in a separate console every time we want to generate json files)

```
npm run build:graphs
```

Building the frontend using the new graphs (`npm run serve` during development)

```
npm run build:frontend
```
