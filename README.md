# BZT-M335

2024-25 | Modul 335 | Mobile-Applikation realisieren

***
> **Important**

**JDK 17** is required for setup  
This app works on **Android 14.0**  
It requires an **internet connection** to load data.

***

## Setup

**Install Ionic CLI globally**

```shell
npm i -g @ionic/cli@7.2.0 native-run cordova-res
```

**Install npm packages**

```shell
cd .\broody && npm i
```

## Deploy on Mobile

**Build app**

```shell
ionic cap copy && ionic cap sync
```

**Open Android Studio**

```shell
ionic cap open android
```

## Develop

**Start development server**

```shell
ionic serve
```

## Documentation

The documentation is located in the [```docs```](./docs) folder.