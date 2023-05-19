<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


## Folder structure

```
.
├── src
│   ├── config
│   ├── databases
│   ├── core
│   │   ├── entities
│   │   ├── exceptions
│   │   ├── http
│   │   │   ├── controllers
│   │   │   └── guards
│   │   ├── repositories
│   │   │   ├── criterias
│   │   │   └── eloquents
│   │   ├── requests
│   │   ├── services
│   │   ├── tests
│   │   └── transformers
│   ├── mails
│   │   ├── adapters
│   │   ├── constants
│   │   ├── interfaces
│   │   ├── mails
│   │   └── services
│   └── users                   -> Module user
│       ├── entities            -> Contains entities
│       ├── enums               -> Contains enums
│       ├── http
│       │   ├── controllers     -> Contains controllers
│       │   ├── guards          -> Contains guards
│       │   ├── midlewares      -> Contains midlewares
│       │   └── requests        -> Contains request
│       ├── mails               -> Contains emails
│       ├── repositories        -> Contains repositories
│       ├── resources           -> Contains information such as views, fonts, css...
│       │   └── mails           -> Contains views for email
│       ├── services            -> Contains services
│       ├── tests               -> Contains unit test, e2e test
│       └── transformers        -> Contains transformers
└── test

```

### File structure conventions

Some code examples display a file that has one or more similarly named companion files. For
example, `hero.controller.ts` and `hero.service.ts`

### Single responsibility

Apply the single responsibility principle (SRP) to all components, services, and other symbols. This helps make the app
cleaner, easier to read and maintain, and more testable.

## Code Rule

Nestjs is inspired by Angular, so you can use some rules from Angular.

##### Small functions

Do define small functions

Consider limiting to no more than 75 lines.

Consider limiting files to 400 lines of code.

#### Naming

##### General Naming Guidelines

Do use consistent names for all symbols.

Do follow a pattern that describes the symbol's feature then its type. The recommended pattern is `feature.type.ts`.

##### Separate file names with dots and dashes

Do use dashes to separate words in the descriptive name.

Do use dots to separate the descriptive name from the type.

Do use consistent type names for all components following a pattern that describes the component's feature then its
type. A recommended pattern is `feature.type.ts`.

Do use conventional type names including `.service, .component, .pipe, .module`, and `.directive`. Invent additional
type names if you must but take care not to create too many.

##### Symbols and file names

Do use consistent names for all assets named after what they represent.

Do use upper camel case for class names.

Do match the name of the symbol to the name of the file.

Do append the symbol name with the conventional suffix (such as Component, Directive, Module, Pipe, or Service) for a
thing of that type.

Do give the filename the conventional suffix (such as `.component.ts`, `.directive.ts`, `.module.ts`, `.pipe.ts`,
or `.service.ts`) for a file of that type.

##### Unit test

Do name test specification files the same as the component they test.

Do name test specification files with a suffix of `.spec.ts`

##### E2E test

Do name end-to-end test specification files after the feature they test with a suffix of `.e2e-spec.ts`

## Database rule
Normally, naming the database will be an underscore (like `user_plan`), but to synchronize the entire standard on the system with NestJs, we will use camelCase for column and PascalCase for table.
Example: `user_plan` -> `userPlan` or `UserPlan`
>This will cause some problems when querying pure, be careful with it.

#### Table name: 

* Must be singular

* Must be a noun

* Must be PascalCase

#### Column name

* Must be camelCase

#### Index name

* columnNameTableNameIndex

#### Foreign key

* columnNameTableNameFk

## Datetime

* All inputs and outputs must be in universal time.

* Must be timestamp

## Requirements

> All APIs must have an e2e test.
>
>Complex functions must have unit tests.
>

#### Version

> Postgres: 11

## Docker

```$xslt
docker-compose up -d
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Typeorm Helper

##### Make migration
```shell script
# create migration
npm run typeorm:create-migration create-user-table
```

```shell script
# generate migration
npm run typeorm:run-migrations
```

```
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Document api

#### Use swagger
```shell script
localhost:<port_app>/documents
```

## Response

#### Success

Return a data object

```json

```

#### Validate error - 422

```json
{
  "message": null,
  "errors": {
    "email": {
      "messages": [
        "email should not be empty"
      ]
    },
    "password": {
      "messages": [
        "password must be longer than or equal to 15 characters",
        "password must be a string"
      ]
    },
    "test": {
      "children": {
        "email": {
          "messages": [
            "email should not be empty"
          ]
        },
        "password": {
          "messages": [
            "password must be longer than or equal to 15 characters",
            "password must be a string"
          ]
        }
      },
      "messages": []
    }
  }
}
```

#### Entities not found - 404
```json
{
    "message": "Enterprise not found",
    "errors": null
}
```

#### Unauthorized - 401
```json
{
    "message": "Unauthorized",
    "errors": null
}
```


### OVERVIEW
The identity web service function is to handle all the logic related to user authentication and management. This web service will be reachable by any other web services part of the portali application backend.

### Technical Requirements
These are the technical requirements that as was able to identify:
1. JWT authentication: the frontend application will identify request using JWT
2. Registration: user login, registration and password recovery process
3. Custom user model: extra fields will be added to the default Django user model
4. Social authentication: process to authenticate through social networks
5. User groups and permissions: define and organize user access
6. Authentication companion app: Django app to install on every service that will interact with the authentication service.

### MILESTONES

BaseApplication

This is about implementing the base application.
Tasks:
1. Create the base application: create a dockerized basic django application with a functional swagger interface and DRF

Registration
This milestone is about anything related to the login, registration and password recovery process.
Tasks:

1. Add JWT authentication: make use of djangorestframework-jwt
2. Setup emailing: Setup the email service to use with the platform or connect to an external
service
3. Add custom user model: add a custom user model with the following additional fields:
user type (string, predefined choices) and marketing (Boolean)
4. Setup DRF registration: setup drf-registration to make the registration and the password
recovery functional


User model and permission
This is about user access (groups and permission). We will use default Django views permission,
define custom groups and also implement a few custom permissions.
Tasks:
1. Add the custom group: Add the following groups: member, member-employee, client,
client-employee, vendor, customer, invited
2. Associate endpoint permissions to groups
3. Create custom user permission: “user can’t view other users not associated with him”
4. Create custom document permission: “user can only view document associated with him”


Social Login
Adding social login to the application
Tasks:
1. Setup drf-social-oauth2 for Google
2. Setup drf-social-oauth2 for LinkedIn

Companion app
This is an entire Django application that will serve as an authentication service SDK. It will be
installed in any other service part of the backend. This will ensure that the authentication process
and the user management is centralized and remains coherent.


Additional information needed
As of now, these are the element that I would need more information about:
- Permission “have access to payment”
- Relationship between users based on their type
- Information about the email server/service
- Details about Google and LinkedIn API credentials for authentication
- Is CICD needed here? (this might impact the deliverable)