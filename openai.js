const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Gera resposta da IA com histórico + prompt base
 * @param {Array} mensagens – histórico [{role, content}]
 * @param {String} prompt – prompt base opcional
 */
async function gerarResposta(mensagens = [], prompt = "") {
  try {
    const fullMessages = [];

    // Adiciona o prompt base como system (se houver)
    if (prompt && prompt.trim().length > 0) {
      fullMessages.push({ role: "system", content: prompt.trim() });
    }

    // Adiciona o restante do histórico
    fullMessages.push(...mensagens);

    const resposta = await openai.chat.completions.create({
      model: "gpt-4o-mini", // ou "gpt-4o-mini" se quiser mais barato e rápido
      messages: fullMessages,
      temperature: 0.7,
    });

    return resposta.choices[0].message.content.trim();
  } catch (err) {
    console.error("Erro ao gerar resposta:", err.message);
    return "Desculpe, não consegui te responder agora.";
  }
}

module.exports = gerarResposta;
