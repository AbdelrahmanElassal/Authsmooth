import { Router } from 'express';
import {signup_get , login_get , signup_post , login_post , logout_get} from '../controllers/authcmooController.js';

const router = Router();

router.get('/signup', signup_get);
router.post('/signup', signup_post);
router.get('/login', login_get);
router.post('/login', login_post);
router.get('/logout', logout_get);
export default router; 