# MobileappReleaseRss

MobileappReleaseRss serve mobile app release in rss

## requirement

MobileappReleaseRss use [Serverless](https://serverless.com/) on AWS.
You need to put tokens in environment variable.

```bash
export AWS_ACCESS_KEY_ID=<your-key-here>
export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>
export AWS_DEFAULT_REGION=<your-favorite-region-here>
```

- see also: [Serverless Framework - AWS Lambda Guide - Credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)


## setup

```bash
$ yarn install
$ npx serverless deploy
...
```

#### GET

```console
$ ANDROID_APP_ID={{ favorite android app id }}
$ curl "https://xxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/dev/?android_app_id=$ANDROID_APP_ID"
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
....
```


## test

```bash
$ yarn test
```

Run only some tests

```bash
$ $(npm bin)/jest --testNamePattern falsy
```
