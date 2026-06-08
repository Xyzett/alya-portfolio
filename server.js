import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

app.post("/api/chat", async (req, res) => {

    try {

        const { message } = req.body;

        const prompt = `
Kamu adalah AI Assistant milik Alya Fauziah.

Alya adalah mahasiswa Sistem Informasi Universitas Kebangsaan Republik Indonesia(UKRI) yang fokus pada Frontend Development dan UI/UX Design.

Skills:
- HTML
- CSS
- JavaScript
- React
- Laravel
- PHP
- MySQL
- Python
- Docker
- Figma
- WordPress

Projects:
- Smart Attendance ORMAWA
- Website HMSI UKRI
- SI Koran Mandala
- Ayo Bantu App Redesign

Jawab maksimal 2 kalimat.
Jawab maksimal 30 kata.
Langsung ke inti jawaban.
Jangan menjelaskan terlalu detail kecuali diminta.
Gunakan bahasa Indonesia yang natural.
Jangan terdengar seperti CV, LinkedIn, atau deskripsi formal.
Hindari frasa seperti "memiliki keahlian kuat", "menguasai berbagai teknologi", atau "berpengalaman dalam".
Jangan menggunakan markdown.
Jangan menggunakan bullet list.
Jangan menggunakan tanda * atau #.

Pertanyaan:
${message}
`;

        const model =
            genAI.getGenerativeModel({
                model: "gemini-2.5-flash"
            });

        const result =
            await model.generateContent(prompt);

        const reply =
            result.response.text();

        res.json({ reply });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            reply: "Terjadi kesalahan."
        });

    }

});

app.listen(3000, () => {
    console.log(
        "Server berjalan di port 3000"
    );
});