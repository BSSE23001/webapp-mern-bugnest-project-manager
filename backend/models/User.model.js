import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

// --- Pre-save middleware for password hashing ---
// IMPORTANT: Use a traditional 'function' here, not an arrow function,
// so 'this' correctly refers to the document being saved.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next() // If password isn't modified, move to the next middleware/save operation
  }
  // Hash the password
  this.password = await bcrypt.hash(this.password, 10)
  next() // Call next() to proceed with the save operation
})

// --- Schema method to compare passwords ---
// IMPORTANT: Use a traditional 'function' here, not an arrow function,
// so 'this' correctly refers to the user document instance.
userSchema.methods.comparePassword = async function (plainPwd) {
  return await bcrypt.compare(plainPwd, this.password)
}

export default mongoose.model('User', userSchema)
