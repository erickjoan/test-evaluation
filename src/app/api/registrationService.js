import baseApi from './baseApi'
import { REGISTRATION_ENDPOINT } from '../core/appConstants'

class RegistrationService {
  static fetchRegistrations = () => baseApi.get(REGISTRATION_ENDPOINT)

  static fetchRegistration = (id) => baseApi.get(`${REGISTRATION_ENDPOINT}/${id}`)

  static createRegistration = (registration) => baseApi.post(REGISTRATION_ENDPOINT, registration)
}

export default RegistrationService
