#!/usr/bin/env bash

workdir=src/app/core/model

# build model.js
node node_modules/protobufjs/cli/bin/pbjs \
  -t static-module \
  -w commonjs \
  -o ${workdir}/model.js \
  ../kotlin/src/main/proto/model.proto

# build model.d.ts
node node_modules/protobufjs/cli/bin/pbts -o ${workdir}/model.d.ts ${workdir}/model.js

# fix imports
sed '1s/^/import { Long } from "protobufjs";/' ${workdir}/model.d.ts > temp.txt && mv temp.txt ${workdir}/model.d.ts
