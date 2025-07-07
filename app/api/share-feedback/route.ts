import nodemailer from 'nodemailer';
import xss from 'xss';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const feedback = {
      likeApp: xss(formData.get('likeApp') as string),
      usage: xss(formData.get('usage') as string),
      watchedFilm: xss(formData.get('watchedFilm') as string),
      extendDb: xss(formData.get('extendDb') as string),
      appPurpose: xss(formData.get('appPurpose') as string),
      accuracy: xss(formData.get('accuracy') as string),
      easeOfUse: xss(formData.get('easeOfUse') as string),
      futureFeature: xss(formData.get('futureFeature') as string),
      extraMessage: xss(formData.get('extraMessage') as string),
    };

    if (!feedback) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const emailText = JSON.stringify(feedback, null, 2);

    const prettyJson = JSON.stringify(feedback, null, 2)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const emailHtml = `
  <h2>🎬 New Feedback from WhichFilm</h2>
  <pre style="background:#f4f4f4; padding: 1rem; border-radius: 5px; font-size: 14px;">
${prettyJson}
  </pre>
`;

    await transporter.sendMail({
      from: `"WhichFilm Feedback" <${process.env.GMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: '🎬 New Feedback from WhichFilm',
      text: emailText,
      html: emailHtml,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('📩 Email error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
