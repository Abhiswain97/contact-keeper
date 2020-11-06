import React, { useReducer } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACT,
	CONTACT_ERROR,
	CLEAR_FILTER,
	GET_CONTACT,
	CLEAR_CONTACT,
} from '../types';

const ContactState = (props) => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null,
	};

	const [state, dispatch] = useReducer(ContactReducer, initialState);

	// Get Contact
	const getContact = async (contact) => {
		try {
			const res = await axios.get('/api/contacts');
			dispatch({ type: GET_CONTACT, payload: res.data });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	// Add Contact
	const addContact = async (contact) => {
		const config = {
			headers: {
				'Content-type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/contacts', contact, config);
			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};
	// Delete Contact
	const deleteContact = async (id) => {
		try {
			await axios.delete(`/api/contacts/${id}`);
			dispatch({ type: DELETE_CONTACT, payload: id });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	// Clear Contacts
	const clearContact = () => {
		dispatch({ type: CLEAR_CONTACT });
	};
	// Set Current Contact
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	// Clear Current Contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};
	// Update Contact
	const updateContact = async (contact) => {
		const config = {
			headers: {
				'Content-type': 'application/json',
			},
		};

		try {
			const res = await axios.put(
				`/api/contacts/${contact._id}`,
				contact,
				config
			);
			dispatch({ type: UPDATE_CONTACT, payload: res.data });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	// Filter Contact
	const filterContact = (text) => {
		dispatch({ type: FILTER_CONTACT, payload: text });
	};
	// Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};
	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				addContact,
				deleteContact,
				updateContact,
				setCurrent,
				clearCurrent,
				filterContact,
				clearFilter,
				getContact,
				clearContact,
			}}>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
