import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import StudentService from '../api/studentService'

const useFetchStudents = () => {
  const [students, setStudents] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => { 
    setLoading(true)

    StudentService.fetchStudents()
      .then((response) => {
        setStudents(response)
      })
      .catch((error) => {
        toast.error(error)
      })
    setLoading(false)
  }, [])

  return [students, loading]
}

export default useFetchStudents
