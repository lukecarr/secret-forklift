<img src="https://i.imgur.com/jfrPJpQ.png?1" alt="Secret Forklift" align="right" />

# Secret Forklift

![NPM](https://img.shields.io/npm/v/secret-forklift)
![NPM Bundle Size](https://img.shields.io/bundlephobia/min/secret-forklift)
![NPM Weekly Downloads](https://img.shields.io/npm/dw/secret-forklift)
![Code Style](https://img.shields.io/badge/code%20style-airbnb-blueviolet)

AWS Parameter Store loader for Node.js. Load secrets, tokens, and application configuration variables from AWS Systems Manager's Parameter Store into your Node.js app!

## Install

```bash
npm i secret-forklift
```

## Requirements

Before using Secret Forklift, ensure that you have the AWS Node.js SDK installed. You can do this with `npm i aws-sdk`. You will also need to configure the SDK for your usage scenario (AWS credentials and AWS region).

## Usage

Before any of your application logic, import Secret Forklift and call `loadSync()`:  

```js
require('secret-forklift').loadSync();
...
```

The `loadSync()` method can also be supplied with options to configure Secret Forklift. The default options are:  

```js
{
  // This is the path in AWS Systems Manager's Parameter Store where parameters
  // will be loaded from.
  path: process.env.AWS_PARAM_STORE_PATH || '',
  
  // When set to true, this instructs the loader method to override any parameters
  // that are already set (from .env files, etc.).
  override: true,
  
  // This function takes in a string (the name of the parameter from AWS) and
  // formats it to your preference. By default, hyphens are converted to underscores
  // and then the whole name is converted to uppercase.
  formatter: function(name) {
    return name.replace(/-/g, '_').toUpperCase();
  },
  
  // This function loads the parameter retrieved from AWS. The default implementation
  // loads parameters into the process.env object which is globally access in Node.
  loader: function(name, value) {
  	if ((Object.prototype.hasOwnProperty.call(process.env, name) && this.override)
      || !Object.prototype.hasOwnProperty.call(process.env, name)) {
      process.env[name] = value;
    }
  }
}
```

### Asynchronous

An asynchronous loading method (`load()`) is also supplied which returns a `Promise<void>` when the parameters have been successfully loaded.
