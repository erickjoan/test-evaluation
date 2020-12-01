import createReducer from './reducerUtils'
import {
  LOADING_COURSE,
  LOADING_COURSES,
  FETCH_COURSE,
  FETCH_COURSES,
  UPDATE_COURSE,
  ADD_COURSE,
  DELETE_COURSE,
} from '../actions/actionTypes'

const initialState = {
  courses: [],
  course: null,
  loadingCourse: false,
  loadingCourses: false,
}

const loadingCourses = (state, payload) => {
  return { ...state, loadingCourses: payload.loading }
}

const loadingCourse = (state, payload) => {
  return { ...state, loadingCourse: payload.loading }
}

const fetchCourses = (state, payload) => {
  return { ...state, courses: payload.courses }
}

const fetchCourse = (state, payload) => {
  return { ...state, course: payload.course }
}

const addCourse = (state, payload) => {
  return { ...state, courses: payload.courses }
}

const updateCourse = (state, payload) => {
  return { ...state, courses: payload.courses }
}

const deleteCourse = (state, payload) => {
  return { ...state, courses: payload.courses }
}

export default createReducer(initialState, {
  [LOADING_COURSE]: loadingCourse,
  [LOADING_COURSES]: loadingCourses,
  [FETCH_COURSE]: fetchCourse,
  [FETCH_COURSES]: fetchCourses,
  [UPDATE_COURSE]: updateCourse,
  [ADD_COURSE]: addCourse,
  [DELETE_COURSE]: deleteCourse,

})
