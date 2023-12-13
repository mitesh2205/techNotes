import { useGetUsersQuery } from './userApiSlice'
import React from 'react'
import User from './User'

const UsersList = () => {

  const {
    data: users,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetUsersQuery()

  let content;

  if (isLoading) content = <div> Loading... </div>

  if (isError) {
    content = <div> {error} </div>
  }

  if (isSuccess) {
    const { ids } = users;
    const tableContent = ids?.length
      ? ids.map(userId => <User key={userId} userId={userId} />) 
      : <div> No users found </div>

    content = (
      <table className='table-auto w-full'>
        <thead>
          <tr>
            <th className='px-4 py-2'> Username </th>
            <th className='px-4 py-2'> Role </th>
            <th className='px-4 py-2'> Edit  </th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'> Users </h1>
      {content}
    </div>
  )
}

export default UsersList