#!/usr/bin/env bash

# build model.js
node node_modules/protobufjs/cli/bin/pbjs \
  -t static-module \
  -w commonjs \
  -o src/app/model.js \
  ../kotlin/src/main/proto/model.proto

# build model.d.ts
node node_modules/protobufjs/cli/bin/pbts -o src/app/model.d.ts src/app/model.js

# fix imports
sed '1s/^/import { Long } from "protobufjs";/' src/app/model.d.ts > temp.txt && mv temp.txt src/app/model.d.ts
