## Catalog Server

This is Node JS server for storing remote containers URLs in JSON files.
Every mini-app that could work as a host has its own endpoint with JSON.
JSON files have next structure:

```
{
    <platform>: {
        <host_app_version>: {
            <remote_container_name>: <remote_container_bundle_url>
        }
    }
}
```

Since ScriptLocatorResolver is an async function, we could fetch URLs there and use the response in `Federated.createURLResolver`

## Setup

Install dependencies for all apps in root directory of this monorepo:
```
yarn bootstrap
```

### Run

Start dev server for all apps in root directory of this monorepo:
```
yarn start
```
Or start catalog server only:
```
yarn start:catalog
```