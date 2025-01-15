# Generate compiled ProtoBuf

Running the script will generate statically-compiled protobufs for decoding `application/protobuf` events. Generate them by running:

```
./update.sh
```

In order to build, the following repos are cloned

- https://github.com/googleapis/google-cloudevents
- https://github.com/googleapis/googleapis
- https://github.com/google/protobuf

The script relies on the [protobufjs-cli](https://github.com/protobufjs/protobuf.js/tree/master/cli#pbts-for-typescript) package to create the compiled js/ts files.
