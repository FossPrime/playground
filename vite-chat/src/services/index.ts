import { Application } from '../declarations'
import users from './users/users.service'
import messages from './messages/messages.service'
import path from 'path'
import { tmpdir } from 'os'
// Don't remove this comment. It's needed to format import lines nicely.

export const services = (app: Application) => {
  const nedbPath = path.join(tmpdir(), app.get('nedb'))
  const nedbStamp = '-' + new Date().toISOString().replace(/\.\d{3}Z/, 'Z') // Still ISO 8601
  app.set('nedbPath', nedbPath + nedbStamp)

  app.configure(users)
  app.configure(messages)
}

export default services
