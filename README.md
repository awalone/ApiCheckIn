# ApiCheckIn
## Description :
 A school project for geolocation android/ios app using with ionic 2 framework

# Getting started :

- You need to clone the project repository on a folder somewhere on your computer :
```bash
$ git clone https://github.com/Keylan117/ApiCheckIn.git
```
		
##Requirements : 

To get the dependencies, you need to download and install Node.JS on your computer from : https://nodejs.org/en/download/

**Note :** 
	By default, Node.JS will be installed (for macOS) at: /usr/local/bin/node
	We will need a component of Node.JS named “npm” wich is installed by default (for macOS) at : /usr/local/bin/npm
	npm works in a terminal and manage dependences for applications.
	It also allows to install Node.JS available applications/packages from the npm repository.

**Warning : If you already had Node.JS installed on your system, you may need to execute the command <code>npm cache clean</code> before installing packages.**

Then use NPM to install the Ionic and Cordova frameworks as global packages on your system :

 **Warning again (sorry) : You may need to run this command as root/administrator**
 
```bash
$ npm install -g ionic cordova
```


##Installation of dependencies :

When you installed requirements, navigate to your directory of project (where you cloned the repository) and install dependencies packages by typing the following commands :

```bash
$ npm install
```

##Add a platform :

Before testing the app. You need to add an IOS or Android platform to the project :

(Replace **android** with **ios** after **ionic platform add** according to your preferences)

```bash
$ ionic platform add android
```

##Test/run the application :

In your web browser with :

```bash
$ ionic serve
```

Or as native app with :

(Replace **android** with **ios** after **ionic run** according to your preferences)

```bash
$ ionic run android
```

**Note :** 
	You can deploy the app on your device (For Android : connect it as Usb Debug mode and allow installation installation apps from unknown sources 


