import './App.css';
import '../src/font/font.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import StickyNote from './components/StickyNote';
import AddButton from './components/AddButton';
import Modal from './components/Modal';

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNoteSubject, setNewNoteSubject] = useState('');
  const [newNoteText, setNewNoteText] = useState('');
  const [stickyNotes, setStickyNotes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/users')
      .then(response => {
        setStickyNotes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const handleSubjectChange = (event) => {
      setNewNoteSubject(event.target.value);
    };

    const handleTextChange = (event) => {
      setNewNoteText(event.target.value);
    };
  
   
  const addStickyNote = () => {
    const newNote = {
      subject: newNoteSubject,
      text: newNoteText
    };

    axios.post('http://localhost:5001/users', newNote)
    .then(response => {
      console.log(response.data.message);
      setStickyNotes([...stickyNotes, newNote]);
      setNewNoteSubject('');
      setNewNoteText('');
      setIsModalOpen(false);
    })
    .catch(error => {
      console.log(error);
    });

    setStickyNotes([...stickyNotes, newNote]);
    setNewNoteSubject('');
    setNewNoteText('');
    setIsModalOpen(false);
  };
  
  return (
    <div className='main-container'>
      <div className='button-container'>
        <h1>mySticky</h1>
        <AddButton onClick={toggleModal}/>
        <div className='sticky-note-container'>
        {stickyNotes.map((note) => (
          <StickyNote 
            className='sticky-container' 
            key={note.id} 
            subject={note.subject} 
            text={note.text} />
        ))}
        </div>
      </div>
      {isModalOpen && (
       <Modal
        newNoteSubject={newNoteSubject}
        newNoteText={newNoteText}
        setNewNoteSubject={setNewNoteSubject}
        setNewNoteText={setNewNoteText}
        handleSubjectChange={handleSubjectChange}
        handleTextChange={handleTextChange}
        addStickyNote={addStickyNote}
      />
      )}
    </div>
  );

}

export default App;
