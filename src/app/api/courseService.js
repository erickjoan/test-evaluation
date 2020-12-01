import baseApi from './baseApi'
import { COURSE_ENDPOINT } from '../core/appConstants'

const getCourseUrl = (id) => `${COURSE_ENDPOINT}/${id}`

class CourseService {
  static fetchCourses = () => baseApi.get(COURSE_ENDPOINT)

  static fetchCourse = async (id) => baseApi.get(getCourseUrl(id))

  static addCourse = async (course) => baseApi.post(COURSE_ENDPOINT, course)

  static updateCourse = async (course) => baseApi.put(COURSE_ENDPOINT, course)

  static deleteCourse = async (id) => baseApi.delete(getCourseUrl(id))
}

export default CourseService
