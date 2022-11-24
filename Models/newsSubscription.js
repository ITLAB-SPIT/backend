const mongoose = require("mongoose");

const newsSubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Enter an email address."],
    unique: [true, "That email address is taken."],
  },
});

module.exports = mongoose.model("NewsSubscription", newsSubscriptionSchema);
