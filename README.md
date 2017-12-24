# Feathers Fetch Service

Easily create a Fetch Service for Feathersjs.

### Installing

Installation with the npm install command:

```
$ npm install --save feathers-fetch-service
```

or with yarn command:

```
$ yarn add feathers-fetch-service
```

## Example

Here's a complete example of a Feathers server with a fetch service.

```
$ npm install --save feathers-fetch-service
```

Create a service.

```
import FetchService from 'feathers-fetch-service'

const notificationsService = new FetchService({
  name: '',
  options: {},
  base: 'http://notification.dev.awesome-app.com',
})
```

Then you can send http request with nice API:

```
async function getNotifications(limit = 5, skip) {    
  const query = {
    $limit: limit,
    $sort: {
      createdAt: -1,
    },
  }
  if (skip) {
    query.$skip = skip
  }
  const data = await notificationsService.find({
    query,
  })
  return data
}
```

```
async function createComment(story, content, comment, { req }) {
  const data = await storiesService.create({
    story,
    content,
    comment,
    createdAt: new Date(),
  }, {
    headers: req.headers,
  })
  return data
}
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Nam Hoang** - *Initial work* - [particle4dev](https://github.com/particle4dev)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
