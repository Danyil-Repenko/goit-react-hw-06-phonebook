import { createSlice, nanoid } from "@reduxjs/toolkit";

const contactsInitialState = [
    { name: "Mark", number: "763367797", id: 1 },
    { name: "Carlos", number: "765-45786777", id: 2 },
    { name: "Anton Datsyk", number: "2365-456-777", id: 3 },
    { name: "Rostyslav", number: "765-456-007", id: 4 },
    { name: "Volodymyr Repenko", number: "765-406-777", id: 5 }
]

const contactSlice = createSlice({
    name: 'contacts',
    initialState: contactsInitialState,
    reducers: {
        addContact: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare({ name, number }) {
                return {
                    payload: {
                        name,
                        number,
                        id: nanoid(),
                    }
                }
            }
        },
        deleteContact(state, action) {
            const index = state.findIndex(task => task.id === action.payload);
            state.splice(index, 1);
        },
    }
})

export const { addContact, deleteContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer