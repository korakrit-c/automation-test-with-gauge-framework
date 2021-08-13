# Automation Test with Gauge Framework
Play with gauge framework + nodejs for education purpose only

Test Challenge from [rendezvous14/test-challenges-web](https://github.com/rendezvous14/test-challenges-web)

### Install Node.js and Gauge Framework

#### Setup Node.js (macOS/Linux)

[Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/)

#### Setup Node.js (Windows)

**Step 1: Download Node.js Installer**
- Goto [Node.js downloads](https://nodejs.org/en/download/) and download Node.js for Windows

**Step 2: Install Node.js and NPM from Browser**
- Run the Node.js Installer(Windows)
  - Welcome to the Node.js setup wizard
    - Select **_Next_**
  - End-User License Agreement (EULA)
    - Check **_I accept the terms in the License Agreement_**
    - Select **_Next_**
  - Destination Folder
    - Select **_Next_**
  - Custom Setup
    - Select **_Next_**
  - Ready to install Node.js
    - Select **_Install_**
    - Note: This step requires Administrator privileges.
    - If prompted, authenticate as an Administrator.
  - Installing Node.js
    - Let the installer run to completion.
  - Completed the Node.js Setup Wizard
    - Click **_Finish_**

**Step 3: Verify Installation and Install Gauge Framework**

- Run command

```sh
node -v
```

- Update npm

```sh
npm install -g npm
```

- Install Gauge Framework

```sh
npm install -g @getgauge/cli
```

- Verify Installation

```sh
gauge --version
```

---
#### Run Gauge Framework

```sh
gauge run specs/WebUI.spec
```

