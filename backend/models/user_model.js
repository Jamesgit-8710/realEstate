const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const user_schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    contact:{
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    deleted_at: {
      type: Date,
      default: null
    }
  }, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

user_schema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        const salt = await bcrypt.genSalt(10);
        
        const hashedPassword = await bcrypt.hash(this.password, salt);
        
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

const users = mongoose.model("users", user_schema);

module.exports = users;