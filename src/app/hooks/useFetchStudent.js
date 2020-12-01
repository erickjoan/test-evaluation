import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import StudentService from '../api/studentService'

const useFetchStudent = (id) => {
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (id)
    StudentService.fetchStudent(id)
        .then((response) => {
          setStudent(response)
        })
        .catch((error) => {
          toast.error(error)
        })
    setLoading(false)
  }, [id])

  return [student, loading]
}

export default useFetchStudent
