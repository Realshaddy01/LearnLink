const express = require('express');
const { auth } = require('../middlewares/users.middleware');
const quizModel = require('../models/quizModel');
const quizRouter = express.Router();

quizRouter.post('/add', auth, async (req, res) => {
  try {
    if (req.body.role !== 'admin' && req.body.role !== 'teacher') {
      return res.status(401).json({ error: "You don't have access to add quizzes" });
    }

    const { courseId, title, description, questions } = req.body;
    
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: "Quiz must have at least one question" });
    }

    const newQuiz = new quizModel({
      courseId,
      title,
      description,
      questions
    });

    await newQuiz.save();
    res.status(201).json({ message: "Quiz added successfully", data: newQuiz });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong", error: err.message });
  }
});

quizRouter.get('/course/:courseId', auth, async (req, res) => {
  try {
    const { courseId } = req.params;
    const quizzes = await quizModel.find({ courseId });
    res.status(200).json({ quizzes });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong", error: err.message });
  }
});

quizRouter.get('/:quizId', auth, async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await quizModel.findById(quizId);
    
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    
    res.status(200).json({ quiz });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong", error: err.message });
  }
});

quizRouter.put('/:quizId', auth, async (req, res) => {
  try {
    if (req.body.role !== 'admin' && req.body.role !== 'teacher') {
      return res.status(401).json({ error: "You don't have access to update quizzes" });
    }

    const { quizId } = req.params;
    const { title, description, questions } = req.body;
    
    const quiz = await quizModel.findById(quizId);
    
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    
    const updatedQuiz = await quizModel.findByIdAndUpdate(
      quizId,
      { title, description, questions },
      { new: true }
    );
    
    res.status(200).json({ message: "Quiz updated successfully", data: updatedQuiz });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong", error: err.message });
  }
});

quizRouter.delete('/:quizId', auth, async (req, res) => {
  try {
    if (req.body.role !== 'admin' && req.body.role !== 'teacher') {
      return res.status(401).json({ error: "You don't have access to delete quizzes" });
    }

    const { quizId } = req.params;
    const quiz = await quizModel.findById(quizId);
    
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    
    await quizModel.findByIdAndDelete(quizId);
    
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong", error: err.message });
  }
});

module.exports = quizRouter;
