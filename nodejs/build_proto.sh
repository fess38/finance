#!/usr/bin/env bash
set -e

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

sed -i "" "s/module\.exports = \$root/export \{ \$root as default \}/g" ${workdir}/model.js
