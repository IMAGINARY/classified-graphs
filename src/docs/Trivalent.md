# Using _Nauty_ to generate trivalent graphs

There is a great piece of software called _nauty_, written by Brendan McKay, which contains something called _gtools_. There is an official website (https://pallini.di.uniroma1.it/).

On Mac OS X it can be installed using

`brew install nauty`

For us there are a few important parts:

- `geng` generates small graphs (but not multigraphs) subject to certain conditions
- `multig` generates small multigraphs with given underlying graph
- `showg` translates the highly-compressed graph6 format to a more human- (and also machine-)readable form (only relevant for non-multigraphs).

## Examples

Generating trivalent graphs without multiple edges:

- `geng -cd3D3 2` for 2 vertices (there are none!).
- `geng -cd3D3 4` for 4 vertices.
- `geng -cd3D3 6` for 6 vertices.
- `geng -cd3D3 8` for 8 vertices.

  The number of such graphs is given as [OEIS:A002851](https://oeis.org/A002851).

To get a more human-readable form we can print the adjacency matrices:

- `geng -cd3D3 8 | showg -a`

Generating trivalent graphs with multiple edges:

- `geng -cd1D3 2 | multig -l3A` for 2 vertices.
- `geng -cd1D3 4 | multig -l3A` for 4 vertices.
- `geng -cd1D3 6 | multig -l3A` for 6 vertices.
- `geng -cd1D3 8 | multig -l3A` for 8 vertices.

  The number of such graphs is given as [OEIS:A005967](https://oeis.org/A005967).

## Use in the app

We run `geng -cd1D3 8 | multig -l3A` to generate all trivalent graphs on 8 vertices, of which there are 71

The output is the adjacency matrix, written as an upper triangular matrix (because it is symmetric) on a single line. So for 8 vertices, the first line is

`'8 0 0 0 0 0 2 1 0 1 0 0 0 0 1 0 1 0 0 0 1 0 1 0 0 0 1 1 0 0 1 0 0 1 0 0 0'`

meaning there are 8 vertices, and then the upper triangular part of the adjacency matrix is given.

We hard-code the output manually in the script `make-trivalent-graphs.ts`.
