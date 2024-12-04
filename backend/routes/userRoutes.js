import { Router } from 'express';
import { addUser, getUsers, sendSecretSantaEmails } from '../controllers/userController';

const router = Router();

router.post('/', addUser);  // Add a new user
router.get('/', getUsers);  // Get all users
router.post('/send', sendSecretSantaEmails);  // Send Secret Santa emails

export default router;
