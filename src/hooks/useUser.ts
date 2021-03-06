import { useEffect, useState } from "react"
import { IUser } from "src/interfaces/IUser"
import { getUsers } from "src/services/getUser"

export const useUser = () => {
  const [users, setUsers] = useState([] as IUser[])
  const [temp, setTemp] = useState([] as IUser[])
  const [filteredAndSorted, setFilteredAndSorted] = useState([] as IUser[])
  const [show, setShow] = useState(false)
  const [tempEdit, setTempEdit] = useState({} as IUser)
  useEffect(() => {
    getUsers().then(user => {
      setUsers(user)
      setTemp(user)
      setFilteredAndSorted(user)
    })
  }, [])

  const filter = (value: string) => {
    const usersFiltered = users.filter((user: IUser) => {
      return (
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.address.toLowerCase().includes(value.toLowerCase()) ||
        user.phone.toLowerCase().includes(value.toLowerCase())
      )
    })
    setTemp(usersFiltered)
    setFilteredAndSorted(usersFiltered)
  }

  const sortBy = (value: string) => {
    const usersFiltered = [...temp].sort((a: IUser, b: IUser): number => {
      if (value === "Name") return a.name.localeCompare(b.name)
      if (value === "Email") return a.email.localeCompare(b.email)
      if (value === "Location") return a.address.localeCompare(b.address);
      return 0
    })
    setFilteredAndSorted(usersFiltered)
  }

  const editUser = (user: IUser) => {
    setUsers(users.map(u => (u.id === user.id ? user : u)))
    setTemp(users.map(u => (u.id === user.id ? user : u)))
  }

  const showModal = () => {
    setShow(!show)
    return show
  }

  return {
    users,
    filter,
    temp,
    editUser,
    showModal,
    setTempEdit,
    tempEdit,
    sortBy,
    show,
    filteredAndSorted
  }
}