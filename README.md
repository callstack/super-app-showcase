# super-app-template
Monorepository template for super app development with React Native and Re.Pack.
## The problem
Sometimes small application could grow to super app, which means that it provides multiple services like payments, messaging, social network, booking, news, etc. And it's not easy to maintain it. It's hard to keep the codebase clean and to keep the app fast. The application grows in size and not all users want to keep a huge application just for a few sevices. So, we need to split the app into smaller parts and make it possible to install only the services that user needs. But somebody want all the services in one place. So super app still should be available as one application.
There are a few options to solve this problem:
- Split the app into several smaller apps, keep super app as well and move reusabale parts into libraries. But even small changes in a library could lead to a lot of work to update all the apps and redeploy all of them.
- Use a monorepository. It's a good option, but it's not always easy to set up and maintain monorepo. Also it is not so easy to divide work on the project between several team independently or provide a way for external developers to contribute only in one part of the repo or one certian application.
## The solution
This template is a monorepository with a few applications using micro-frondend architecture. It's easy to set up and maintain. These independent applications could be deployed as separate apps or as a part of super app. Developer could move these micro-frontends to separate repositories and deploy them as separate apps. That helps to divide work on the project between several team independently or provide a way for external developers to contribute only in one part of the repo or one certian application. The difference between classic monorepo and this template is runtime dependencies. This means no need to redeploy any of micro-frontends if you change something in the library. It's enough to update micro-frondtend and all the apps will use the latest version of the it.

## Structure
TBD
## How to use
TBD

## Troubleshooting
TBD