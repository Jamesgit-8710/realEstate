const mongoose = require("mongoose");

const property_schema = new mongoose.Schema(
  {
    property_type: {
      type: String,
      enum: ['flat','pg','property'],
      required: true
    },
    amount:{
      type: Number,
      required: true
    },
    property_size:{
      type: String,
      enum: ['1','2','3','4','5'],
      required: true
    },
    building_name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      enum: ['chandigarh','noida','mohali, punjab','panchkula, haryana','hyderabad','banglore'],
      required: true
    },
    poc: {
      type: String,
      enum: ['owner','dealer'],
      required: true
    },
    poc_name: {
      type: String,
      required: true
    },
    poc_contact: {
      type: String,
      required: true
    },
    poc_email: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    uploaded_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    deleted_at: {
      type: Date,
      default: null
    }
  }, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const property = mongoose.model("properties", property_schema);

module.exports = property;