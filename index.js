require("dotenv").config();
const express = require("express");
const gerarResposta = require("./openai");
const db = require("./firebase");

const app = express();
app.use(express.json());

app.post("/webhook", async (req, res) => {
  const { phone, message } = req.body;

  if (!phone || !message) {
    return res.status(400).json({ error: "Faltando número ou mensagem" });
  }

  const ref = db.collection("conversas").doc(phone);
  const doc = await ref.get();

  let historico = [];

  if (doc.exists) {
    historico = doc.data().messages || [];
  }

  historico.push({ role: "user", content: message });

  const resposta = await gerarResposta(historico);

  historico.push({ role: "assistant", content: resposta });

  await ref.set({ messages: historico }, { merge: true });

  res.json({ resposta });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});
 
