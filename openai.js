const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function gerarResposta(mensagens) {
  const resposta = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: mensagens,
  });

  return resposta.choices[0].message.content;
}

module.exports = gerarResposta;
