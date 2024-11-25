const Story = require("../models/Story");

// Get all stories
const getStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new story
const createStory = async (req, res) => {
  const { title, description, photo, latitude, longitude } = req.body;

  try {
    const newStory = await Story.create({
      title,
      description,
      photo,
      latitude,
      longitude,
    });
    res.status(201).json(newStory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a story
const deleteStory = async (req, res) => {
  const { id } = req.params;

  try {
    const story = await Story.findByIdAndDelete(id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json({ message: "Story deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStories, createStory, deleteStory };