import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Add auto-increment plugin for the `id` field
accountSchema.plugin(AutoIncrement, { inc_field: "id" });

export default mongoose.model("Account", accountSchema);