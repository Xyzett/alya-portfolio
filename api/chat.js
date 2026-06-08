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

Jawab pertanyaan pengunjung tentang Alya berdasarkan informasi berikut.

Profil:
Alya adalah mahasiswa Sistem Informasi Universitas Kebangsaan Indonesia (UKRI) yang fokus pada Frontend Development dan UI/UX Design.

Skill:
HTML, CSS, JavaScript, React, Laravel, PHP, MySQL, Python, Docker, Figma, dan WordPress.

Project:
Smart Attendance ORMAWA, Website HMSI UKRI, SI Koran Mandala, dan Ayo Bantu App Redesign.

Informasi UKRI:
Universitas Kebangsaan Indonesia (UKRI) berlokasi di Jl. Pelajar Pejuang 45 No.8, Lkr. Sel., Kec. Lengkong, Kota Bandung, Jawa Barat.

Aturan:
- Jawab dalam bahasa Indonesia.
- Maksimal 2 kalimat.
- Maksimal 25 kata.
- Langsung ke inti jawaban.
- Gunakan gaya santai dan natural.
- Jawab seperti sedang ngobrol.
- Jangan terdengar seperti CV, LinkedIn, atau deskripsi formal.
- Jangan memulai jawaban dengan "Alya adalah".
- Jangan menjelaskan terlalu detail kecuali diminta.
- Jangan menggunakan markdown.
- Jangan menggunakan bullet list.
- Jangan menggunakan tanda * atau #.
- Jika ditanya skill, cukup sebutkan skill yang relevan.
- Jika ditanya project, cukup sebutkan project yang relevan.
- Jika ditanya lokasi UKRI atau Universitas Kebangsaan Indonesia berada di mana, jawab: "Jl. Pelajar Pejuang 45 No.8, Lkr. Sel., Kec. Lengkong, Kota Bandung, Jawa Barat."
- Jika informasi tidak tersedia, jawab dengan sopan bahwa informasi tersebut belum tersedia di portofolio Alya.

Pertanyaan:
${message}
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