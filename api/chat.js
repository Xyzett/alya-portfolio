import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            reply: "Method not allowed"
        });
    }

    try {

        const genAI = new GoogleGenerativeAI(
            process.env.GEMINI_API_KEY
        );

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
`;

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const result =
            await model.generateContent(
                `${prompt}\n\nPertanyaan: ${message}`
            );

        res.status(200).json({
            reply: result.response.text()
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            reply: error.message || "Unknown error"
        });

    }
}