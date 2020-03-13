#!/usr/bin/env bash
set -e

sed -i '' 's/"jsdoc": "^3.5.5"/"jsdoc": "~3.5.5"/g' node_modules/protobufjs/package.json
# sudo npm install -g n
sudo n 11.15.0

workdir=src/app/core/model

# build model.js
node node_modules/protobufjs/cli/bin/pbjs \
  -t static-module \
  -w commonjs \
  -o ${workdir}/model.js \
  --no-delimited \
  --no-verify \
  --force-number \
  --es6 \
  ../kotlin/src/main/proto/model.proto

# build model.d.ts
node node_modules/protobufjs/cli/bin/pbts -o ${workdir}/model.d.ts ${workdir}/model.js
sudo n stable

# for correct enum import
sed -i '' 's/^export enum/export const enum/g' src/app/core/model/model.d.ts
