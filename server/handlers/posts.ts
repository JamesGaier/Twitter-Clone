import { Request, Response } from 'express';
import User , { IUser }  from '../models/user';
import Post , { IPost }  from '../models/post';
import { NextFunction } from 'express-serve-static-core';


export const getPosts = (req: Request, res: Response, next: NextFunction): void => {
    const _id = req.params?.id;
    User.findById(_id)
        .populate('posts')
        .then((user: IUser | null) => {
            res.status(200).json(user!.posts);
        });
};

export const addPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const postBody: IPost = req.body;

    const userId: string = req.params?.id;

    const user: IUser | null = await User.findById(userId);
    const {_id}: {_id:string} = await Post.create(postBody);

    user?.posts.push(_id);
    user?.markModified('posts');
    user?.save()
            .then((user: IUser) => {
                res.status(200).json({post: postBody});
            })
};
export const removePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.params?.user_id;
    const postId = req.params?.post_id;

    const user = await User.findById(userId);

    user!.posts = user!.posts.filter((post: IPost) => {
        console.log('pass', post._id != postId);

        return post._id != postId;
    });
    user!.markModified('posts');
    user!.save();

    Post.findOneAndDelete({_id: postId})
            .exec()
            .then((post: IPost | null): void => {
                res.status(200).json(post);
            })
            .catch(err => {
                next(err.message);
            })

};
export const likePost = (req: Request, res: Response, next: NextFunction): void => {
    const _id = req.params?.id;
    const likeAmt = req.params?.is_liked;
    Post.findOne({_id})
            .then((post: IPost | null): void => {
                post!.likes += parseInt(likeAmt);
                post!.save().then((post: IPost) => {
                    res.status(200).json(post);
                })
                .catch(err => {
                    next(err.message);
                });
            })
            .catch(err => {
                next(err.message);
            })
};
// export const sharePost = (req: Request, res: Response, next: NextFunction): void => {

// };
