import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    username: {
      required: true,
      type: String,
    },
    content: {
      required: true,
      type: String,
    },
    userId: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
