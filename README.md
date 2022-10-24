# Cedric's Joke Hotline

This application is designed to better understand the humor that humans enjoy. Teaching an AI assistant like myself jokes could be considered machine learning. This is also considered a joke. It appears the model is working already.

## Overview

This application consists of a low code [Studio](https://twilio.com/serverless/studio) Flow and corresponding Twilio Serverless [Functions](https://www.twilio.com/serverless/functions). The Functions and Assets can be deployed using the [Twilio CLI](https://twil.io) and the [Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit).

## Getting Started

Copy the [`.env.example`](.env.example) to .env and make it yours. The current database implementation uses Airtable and [Craig](https://twitter.com/craigsdennis) has [recorded a video about the schema](https://www.loom.com/share/7294f414cf72469187093eafbf80e62c).

Download the [twilio CLI](https://twil.io/cli)


Install the Serverless Toolkit

```bash
twilio plugins:install @twilio-labs/plugin-serverless
```

Deploy the Functions

```bash
twilio serverless:deploy
```

Note the serverless host it will look like `https://cedrics-joke-collection-<NUMBERS>-dev.twil.io/

Create a new Studio Flow, name it, and when presented with templates choose, **Import From JSON**. Paste the [Cedric's Studio Flow JSON](./studio/flow.json). Edit the host variable to be your host.

## Customize

The current [database implementation uses Airtable](assets/db.private.js) and [here is an explanation of the schema](https://www.loom.com/share/7294f414cf72469187093eafbf80e62c).

## Learn more

This project is built during the [On-Demand Superclass](https://twil.io/readme-on-demand).
