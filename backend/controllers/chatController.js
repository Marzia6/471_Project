import chatModel from "../models/Chat.js";

export const sendMsg = async (req, res) => {
  const { sender, receiver, content } = req.body;

  if (!sender || !receiver || !content) {
    return res.status(400).json({
      error: "All fields are required: sender, receiver, and content.",
    });
  }

  try {
    await chatModel.create({ sender, receiver, content });
    const { uid, id } = req.params;

    try {
      const messages = await chatModel
        .find({
          $or: [
            { sender: uid, receiver: id },
            { sender: id, receiver: uid },
          ],
        })
        .sort({ timestamp: 1 });

      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json("Server error");
    }
  } catch (err) {
    console.error("Error while saving message:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

export const getMessages = async (req, res) => {
  const { uid, id } = req.params;

  try {
    const messages = await chatModel
      .find({
        $or: [
          { sender: uid, receiver: id },
          { sender: id, receiver: uid },
        ],
      })
      .sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json("Server error");
  }
};

export const deleteMsg = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Message ID is required" });
  }

  try {
    const result = await chatModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: "Message not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateMsg = async (req, res) => {
  const { id, content } = req.body;

  if (!id || !content) {
    return res
      .status(400)
      .json({ error: "Message ID and content are required" });
  }

  try {
    const result = await chatModel.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ error: "Message not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Message updated successfully",
      updatedMessage: result,
    });
  } catch (error) {
    console.error("Error updating message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
