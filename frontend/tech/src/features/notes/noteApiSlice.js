import {
    createSelector,
    createEntityAdapter,
} from '@reduxjs/toolkit';

import { apiSlice } from '../../app/api/apiSlice';

const notesAdapter = createEntityAdapter({});

const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => '/notes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.error;
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note._id
                    return note;
                });
                return notesAdapter.setAll(initialState, loadedNotes);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids){
                    return [
                        { type: 'Note', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Note', id }))
                    ]
                } else return [{ type: 'Note', id: 'LIST' }] 
            },
        }),
        })
    })

    export const {
        useGetNotesQuery,
    } = notesApiSlice

    // returns the query result object
    export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

    // creates memozied selector

    const selectNotesData = createSelector(
        selectNotesResult,
        notesResult => notesResult?.data
    )
    
    // getselectors creates these selectors and we rename them aliases using as const

    export const {
        selectAll: selectAllNotes,
        selectById: selectNoteById,
        selectIds: selectNoteIds,
    } = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState) 
    