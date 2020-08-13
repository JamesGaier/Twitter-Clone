import { Router } from 'express';

import {addPost, removePost, likePost, getPosts} from '../handlers/posts';
import { auth } from '../middleware/auth';

export const router: Router = Router();

router
    .route('/post/:id')
    .get(auth, getPosts)
    .post(auth, addPost)


router.delete('/post/:user_id/:post_id', auth, removePost);
router.put('/post/like/:id/:is_liked', auth, likePost);

// router.put('/post/share/:id', sharePost);

export default router;