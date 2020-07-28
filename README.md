# RekognizeMe 
We are using [Amazon Rekognition](https://aws.amazon.com/rekognition/) software to authenticate attendees to events and/or take roll.

![alt text](https://i.imgur.com/hAsWxhK.png)
![alt text](https://imgur.com/MLGyJzq)


# Features
A variety of useful features may be put in this project

* Recognizing a person's face and comparing it to a database

* Recognizing emotion

* Measuring (active) employee diversity ???

## Use Cases
Examples:

* Authenticate employees who wish to access a building, deny others.

* School taking roll for classes.

* Registering attendees at public events.

# Directory Structure
**frontend:** holds our frontend (amplify) code.

**backend:** Stores our code.

**database:** Stores our total pictures which we compare our 

 **- valid:** Valid attendees/employees

 **- samples:** Total atendees pictures. We compare this against the `valid` folder.

# AWS July Hacakthon Team 5 Members
Jacques Arroyo

Daniel Connelly

Carla Rubio

Cody Brown

Nadtakan Jones

# References

We use an open source [frontend](https://github.com/dabit3/appsync-image-rekognition) which
we modify.

# Considerations/Disclaimer

This a project was made in a limited timeframe. This project
should not be used without other means of identifying someone
to validate that a user is not gaming the system. For example,
a user may put a photo of an employee up at a camera and gain
access to a building they do not have access to.

# Setup

0. Clone the project & change into the new directory

```sh
git clone https://github.com/dabit3/appsync-image-rekognition.git

cd appsync-image-rekognition
```

1. Install dependencies 

```sh
npm install
```

2. Initialize a new AWS Amplify project

```sh
amplify init
```

3. Add auth, storage, & AppSync services

```sh
amplify add auth

amplify add api

amplify add storage

amplify add function

amplify push
```

4. Update the AppSync Schema in your dashboard to the following:

```graphql
type ImageData {
	data: String!
}

type Query {
	fetchImage(imageInfo: String!): ImageData
}
```

5. Add the new Lambda function as a data source in the AppSync API Datasources section.

6. Update the `fetchImage` resolver data source to use the new Lambda function as the datasource. Update the `fetchImage` resolver to the following:

##### Request mapping template
```js
{
    "version" : "2017-02-28",
    "operation": "Invoke",
    "payload": $util.toJson($context.args)
}
```

##### Response mapping template
```js
$util.toJson($context.result)
```

7. Update the Lambda function code to the following (make sure to replace the bucket name with your bucket name):

```js
const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})
var rekognition = new AWS.Rekognition()

exports.handler = (event, context, callback) => {
  var params = {
    Image: {
      S3Object: {
      Bucket: "<YOURBUCKETNAME>", 
      Name: "public/" + event.imageInfo
      }
    }, 
    Attributes: [
      'ALL'
    ]
  };
 
  rekognition.detectFaces(params, function(err, data) {
   if (err) {
    callback(null, {
     data: JSON.stringify(err.stack)
    })
   } else {
    const myData = JSON.stringify(data)
    callback(null, {
        data: myData
    })
   }
 });
};
```

8. Add permissions to Lambda role for Rekognition as well as S3

## Your final exports file should look something like this:

```js
const config =  {
    'aws_appsync_graphqlEndpoint': 'https://yourendpoint',
    'aws_appsync_region': 'us-east-2',
    'aws_appsync_authenticationType': 'API_KEY',
    'aws_appsync_apiKey': 'APIKEY',
    'aws_user_pools': 'enable',
    'aws_cognito_region': 'us-east-2',
    'aws_user_pools_id': 'us-east-2_YOURID',
    'aws_user_pools_web_client_id': 'YOURCLIENTID',
    'aws_cognito_identity_pool_id': 'us-east-2:YOURID',
    'aws_user_files_s3_bucket': 'YOURBUCKETNAME',
    'aws_user_files_s3_bucket_region': 'us-east-1'
  }

  export default config
```
# API
Amplify is allow you only have 1 api.

# Commands

``` amplify add function ```

After run command above to create lambda function. Then to install npm module, go to amplify/backend/function/{lamda_floder}/src

# Graphql 
You can only have one type Query in schema.graphql

type Query {
	todos: [Todo] @function(name: "todos-${env}") <-- this todos function will return a list of Todo and link to lambda function name todos(name lambda function is from -> function/myapp/src/package.json)
	getTodo(id: ID!): Todo @function(name: "todos-${env}")
}

type Todo {
  id: ID!
  name: String!
  description: String
}

# Storage
run ```amplify add storage``` to add dynamodb

run ```amplify update function``` to update permission lambda function to perform query with dynamodb

# Testing

Example query on Appsync console
run ``` amplify api console ``` then run query below.

query{
  getTodo(id:1){
    id
    name
  }
}

query{
  todos {
    id
    name
  }
}

# basic request
query listCoins {
  getCoins {
    price_usd
    name
    id
    symbol
  }
}

# request with arguments
query listCoinsWithArgs {
  getCoins(limit:3 start: 10) {
    price_usd
    name
    id
    symbol
  }
}

# query fetch image
query{
  fetchImage(imageName: "46048Screen Shot 2020-07-15 at 9.07.56 AM.png", type: "labels") {
    data
  }
}


# Reslover

# Local testing

### resources
https://www.youtube.com/watch?v=uI_S1_ucXi4
