import { Router } from 'express';

import {addPost, removePost, likePost, getPosts} from '../handlers/posts';
export const router: Router = Router();

router
    .route('/post/:id')
    .get(getPosts)
    .post(addPost)


router.delete('/post/:user_id/:post_id', removePost);
router.put('/post/like/:id/:is_liked', likePost);

// router.put('/post/share/:id', sharePost);

export default router;