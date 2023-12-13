import { useGetNotesQuery } from './noteApiSlice'
import React from 'react'
import Note from './Note'


const NotesList = () => {

  const {
    data: notes,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetNotesQuery()

  let content;

  if (isLoading) content = <div> Loading... </div>

  if (isError) {
    content = <div> {error} </div>
  }

  if (isSuccess) {
    const { ids } = notes;
    const tableContent = ids?.length
      ? ids.map(noteId => <Note key={noteId} noteId={noteId} />) 
      : null

    content = (
      <table className='table-auto w-full'>
        <thead>
          <tr>
            <th className='px-4 py-2'> Username </th>
            <th className='px-4 py-2'> Created </th>
            <th className='px-4 py-2'> Updated  </th>
            <th className='px-4 py-2'> Title  </th>
            <th className='px-4 py-2'> Owner  </th>
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
      <h1 className='text-3xl font-bold mb-8'> Notes </h1>
      {content}
    </div>
  )
}

export default NotesList