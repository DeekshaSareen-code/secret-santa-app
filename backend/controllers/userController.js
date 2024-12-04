import User, { find } from '../models/user';
import { createTransport } from 'nodemailer';
import { get } from 'axios';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// ChatGPT API for generating random Christmas quotes
async function getChristmasQuote() {
  const response = await get('https://api.openai.com/v1/completions', {
    headers: {
      'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
      'Content-Type': 'application/json',
    },
    data: {
      model: 'gpt-3.5-turbo',
      prompt: 'Generate a random Christmas quote.',
      max_tokens: 60,
    },
  });
  return response.data.choices[0].text.trim();
}

const addUser = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const user = new User({ name, email, phone });
    await user.save();

    res.status(200).json({ message: 'User added successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error adding user' });
  }
};

const getUsers = async (req, res) => {
  const users = await find();
  res.status(200).json(users);
};

const sendSecretSantaEmails = async () => {
  const users = await find();
  const shuffledUsers = [...users];
  shuffleArray(shuffledUsers);  // Shuffle array to create random pairs

  for (let i = 0; i < users.length; i++) {
    const recipient = shuffledUsers[i];
    const sender = shuffledUsers[(i + 1) % users.length];

    // Send email with recipient info
    const quote = await getChristmasQuote();

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: sender.email,
      subject: 'Your Secret Santa Match!',
      text: `Hello ${sender.name},\n\nYou are the Secret Santa for ${recipient.name}. Here's a Christmas quote to get you in the festive spirit: "${quote}"`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export default {
  addUser,
  getUsers,
  sendSecretSantaEmails,
};
