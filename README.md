# CJPG
Utility for optimizing images in a folder and save storage space. Originally served as a playground for using [Sharp](https://github.com/lovell/sharp), a high-performance image processing module for Node.

## Usage
```
node cjpg.js optimize [input] [output] --ext=JPG --format=jpeg
```
- `--ext` flag is where you specify what file format would you to want to optimize. *Defaults to **JPG***
- `--format` flag specifies what output format do you want. You can choose either **jpeg** or **png**. *Defaults to **jpeg***

See `--help` for more details.

## Requirements
- Requires the latest [NodeJS](https://nodejs.org) LTS or stable
- NPM
- Patience

## Install
1. Clone or download this repository.
2. Open command prompt / terminal pointing to the directory where `cjpg` is currently located and type `npm install`. Wait for a few seconds depending on your connection.
3. Once it's done you are ready to go.

### Notes on Windows users
You must install first `windows-build-tools` before installing `cjpeg` as the image processing module requires to be built for your installation.
To install just type in: `npm install -g windows-build-tools`

##### &copy; 2019 Ned Palacios