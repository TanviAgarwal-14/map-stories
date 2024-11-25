const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photos: [{ type: String }], // Array of photo URLs
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
}, { timestamps: true });

storySchema.index({ location: "2dsphere" }); // Geospatial indexing
module.exports = mongoose.model("Story", storySchema);
module.exports = Story;
