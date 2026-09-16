# Packing-List

## Prerequisites

To run this packing list app locally, you’ll need:

### 1. Node.js and npm

Node.js includes npm (the package manager).

- Download: [https://nodejs.org/](https://nodejs.org/) (LTS version recommended)
Note: for clone repository, check under line 60 'Installateion'.  

- Check install:

```bash
node -v
npm -v

* For update npm flobally: 
npm install npm@latest -g

```

### 2. Need Git

Needed to clone the repo.

Download: [https://git-scm.com/](https://git-scm.com/)
Check install:

```bash
`git --version` 
```

### 3. Expo (via this project)

You don’t need a global Expo install. After npm install, use:

```bash
npx expo start` 
```



### 4. A way to open the app (pick one)

- Option A — Phone (easiest)

Install Expo Go from the App Store (iOS) or Google Play (Android)
Scan the QR code from the terminal after npx expo start

- Option B — iOS Simulator (Mac only)

Install Xcode from the Mac App Store
Open Device Hub (Xcode 27+) or Simulator and boot an iPhone
Then press i in the Expo terminal

- Option C — Android Emulator

Install Android Studio
Set up an emulator, then press a in the Expo terminal

- Option D — Web

Press w in the Expo terminal after starting the project

## Installation



### 1. Clone the repo

```bash
git clone git@github.com:NoCinnamon/Packing-List.git
```



### 2. Install project package

```bash
npm install
```

  
Note: you dont need a global Expo install.

### 3. Start the app

```bash
npx expo start
```

Then open it with one of the options in Prerequisites section 4 (Expo Go, simulator, emulator, or web).

## Usage

This app can be used as a quick reminding list, espacially for trip packing.
Examples:
  

Home screen — enter a trip name and add items:
<br>  
Adding items to the packing list:
<img src="assets/images/homeScreen.png" alt="homeScreen" width="300" /> 
<br>
<img src="assets/images/HS-addingList.png" alt="HS-addingList.png" width="300" /> 
<br>
Check list screen:
<img src="assets/images/secondScreenList.png" alt="second screen with list created" width="300" /> 
<br>
Share the list:
<img src="assets/images/expo-share.png" alt="package expo=sharing" width="300" /> 
<br>
Delete All confirmation:
<img src="assets/images/deleteAllAlert.png" alt="delete all" width="300" /> 

## App scetch:

<img src="assets/images/scetch.jpeg" alt="scetch" width="300" /> 
