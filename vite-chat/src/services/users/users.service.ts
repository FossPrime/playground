// Initializes the `users` service on path `/users`
import { Params, ServiceInterface } from '@feathersjs/feathers'

import { Application } from '../../declarations'
import { Users } from './users.class'
import createModel from '../../models/users.model'
import hooks from './users.hooks'
import { UserData, UserQuery, UserResult } from '../../schema/users.schema'

type UserService = ServiceInterface<UserResult, UserData, Params<UserQuery>>

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    users: UserService
  }
}

export default function (app: Application) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate
  }

  try {
    app.service('users')
  } catch (_e) {
    // Initialize our service with any options it requires
    app.use('users', new Users(options, app) as UserService)

    // Get our initialized service so that we can register hooks
    const service = app.service('users')

    service.hooks(hooks)
  }
}
