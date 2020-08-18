# Livestream with Chat

## Server Setup

Click the button,

[![Develop on Okteto](https://okteto.com/develop-okteto.svg)](https://cloud.okteto.com/deploy)

or run the following command to deploy on your favorite k8s cluster

```bash
$ kubectl -f ./k8s
```

### Develop

Update the image tags in `./chat-service/Makefile` to your liking, run the following to build your custom image, push to your image registry, and deploy to your cluster

```bash
$ make build
$ make push
$ make deploy
```

or

```bash
$ make
```

## Client Setup

### Install

```bash
$ yarn add global expo-cli
$ yarn add global react-native-cli
$ yarn
```

### Run Android
```bash
$ react-native run-android
```

### Run iOS
```bash
$ react-native run-ios
```

### Run Expo Client (Streaming Disabled)
```bash
$ expo start
```
