import express from "express";

import { updateProfile, getProfile } from "../controllers/myProfile.controller.js";

const router = express.Router();

router.route('/:id').patch(updateProfile);
router.route('/:id').get(getProfile);

export default router;