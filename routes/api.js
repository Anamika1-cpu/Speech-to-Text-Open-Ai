const multer = require("multer");
const express = require("express");

const { Configuration, OpenAIApi } = require("openai");

const router = express.Router();
const upload = multer();

const configuration = new Configuration({
  apiKey: "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",
});

async function transcribe(buffer) {
  const openai = new OpenAIApi(configuration);
  const response = await openai.createTranscription(
    buffer,
    "whisper-1",
    "prompt:Converting audio to text",
    "json",
    1,
    "en"
  );
  return response;
}

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

router.post("/", upload.any("file"), (req, res) => {
  audio_file = req.files[0];
  buffer = audio_file.buffer;
  buffer.name = audio_file.originalname;
  const response = transcribe(buffer);

  response
    .then((data) => {
      res.send({
        type: "post",
        transcription: data.data.text,
        audioFileName: buffer.name,
      });
    })
    .catch((err) => {
      res.send({
        type: "post",
        message: err,
      });
    });
});

module.exports = router;
