import { Router } from 'express';

import {
  logoutUser,
  registerUser,
  loginUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
} from '../controllers/user.controller.js';

const router = Router();

import { verifyJWT } from '../middlewares/auth.middleware.js';

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

//secured routes

router.route('/logout').post(verifyJWT, logoutUser);

router.route('/refresh-token').post(refreshAccessToken);

router.route('/change-password').post(verifyJWT, changeCurrentPassword);

router.route('/current-user').get(verifyJWT, getCurrentUser);

export default router;
