import { STUDENT_ENDPOINT } from '../core/appConstants'
import baseApi from './baseApi'

const getStudentUrl = (id) => `${STUDENT_ENDPOINT}/${id}`

class StudentService {
  static fetchStudents = () => baseApi.get(STUDENT_ENDPOINT)

  static fetchStudent = (id) => baseApi.get(getStudentUrl(id))

  static addStudent = (student) => baseApi.post(STUDENT_ENDPOINT, student)

  static updateStudent = (student) => baseApi.put(STUDENT_ENDPOINT, student)

  static uploadStudentPhoto = (id, photo) => baseApi.postForm(`${STUDENT_ENDPOINT}/subir/${id}`, photo)

  static removeStudent = (id) => baseApi.delete(getStudentUrl(id))
}

export default StudentService
