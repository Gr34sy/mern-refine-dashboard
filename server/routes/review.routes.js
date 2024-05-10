import express from 'express';

import { getAllReviews, getReviewById, createReview, deleteReview, updateReview } from '../controllers/review.controller.js';

const router = express.Router();

router.route('/').get(getAllReviews);
router.route('/:id').get(getReviewById);
router.route('/').post(createReview);
router.route('/:id').patch(updateReview);
router.route('/:id').delete(deleteReview);

export default router;