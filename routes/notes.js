const express = require('express');
const router = express.Router();
const Note = require('../models/note');

//create new note
router.post('/', async (req, res) => {
    try{
        const { title, content } = req.body;
        const newNote = new Note({
                title,
                content
        });
        await newNote.save();
        res.status(201).json(newNote);    
    }
    catch (err){
        res.status(400).json({error: 'Error'});
    }
});

//get all
router.get('/', async (req, res) => {
    try{
        const notes = await Note.find();
        res.status(200).json(notes);
    }
    catch (err){
        res.status(400).json({error: 'Error'});
    }
});

//get note by id
router.get('/:id', async (req, res) => {
    try{
        const note = await Note.findById( req.params.id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
          }
          res.status(200).json(note);
    }
    catch(err){
        res.status(400).json({error: 'Error'});
    }
});

// Update a note
router.put('/:id', async (req, res) => {
    try {
      const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedNote) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.status(200).json(updatedNote);
    } catch (err) {
      res.status(400).json({ error: 'Error updating note' });
    }
  });
  
  // Delete a note
  router.delete('/:id', async (req, res) => {
    try {
      const deletedNote = await Note.findByIdAndDelete(req.params.id);
      if (!deletedNote) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: 'Error deleting note' });
    }
  });
  
  module.exports = router;