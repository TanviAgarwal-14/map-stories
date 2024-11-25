const express = require("express");
const Story = require("../models/Story");
const router = express.Router();

// @route   POST /api/stories
// @desc    Create a new story
router.post("/", async (req, res) => {
  try {
    const { title, description, photo, location } = req.body;
    const story = new Story({
      title,
      description,
      photo,
      location,
    });
    await story.save();
    res.status(201).json(story);
  } catch (err) {
    res.status(500).json({ error: "Failed to create story" });
  }
});

// @route   GET /api/stories
// @desc    Get all stories
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});

// @route   GET /api/stories/:id
// @desc    Get a single story by ID
router.get("/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch story" });
  }
});

// @route   DELETE /api/stories/:id
// @desc    Delete a story
router.delete("/:id", async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ error: "Story not found" });
    res.status(200).json({ message: "Story deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete story" });
  }
});

module.exports = router;
