import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PenIcon, SaveIcon, Trash, TrashIcon } from 'lucide-react';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const initialComments = [
    {
        id: uuidv4(),
        avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
        name: 'John Doe',
        comment: 'This is an awesome product!',
    },
    {
        id: uuidv4(),
        avatar: 'https://xsgames.co/randomusers/avatar.php?g=female',
        name: 'Jane Smith',
        comment: 'I highly recommend this!',
    },
];

function ProductComments() {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');
    const [editingComment, setEditingComment] = useState<string | null>(null);
    const [editedComment, setEditedComment] = useState('');

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            setComments([
                ...comments,
                {
                    id: uuidv4(),
                    avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
                    name: 'Anonymous',
                    comment: newComment,
                },
            ]);
            setNewComment('');
        }
    };

    const handleEditComment = (id: string, comment: string) => {
        setEditingComment(id);
        setEditedComment(comment);
    };

    const handleSaveComment = (id: string) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === id ? { ...comment, comment: editedComment } : comment
            )
        );
        setEditingComment(null);
        setEditedComment('');
    };

    const handleDeleteComment = (id: string) => {
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
    };

    return (
        <div className="pb-4 space-y-4 w-full">
            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="space-y-2">
                <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full resize-none"
                />
                <Button type="submit" className="w-full bg-primary text-white">
                    Post Comment
                </Button>
            </form>

            <div className="max-h-96 overflow-y-auto space-y-4 p-2 border-t border-gray-200">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="flex flex-col items-start space-x-3 p-3 border-b border-gray-200 rounded-md"
                    >
                        <div className="flex-1 space-y-1 w-full">
                            <div className='flex justify-between w-full flex-shrink-0 items-center'>
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={comment.avatar}
                                        alt={`${comment.name} avatar`}
                                        className="w-10 h-10 rounded-full"
                                    />

                                    <h4 className="font-semibold">{comment.name}</h4>
                                </div>
                                <div className="flex space-x-2">
                                    {editingComment === comment.id ? (
                                        <Button
                                            size={'icon'}
                                            variant={'ghost'}
                                            onClick={() => handleSaveComment(comment.id)}
                                            className="text-green-500"
                                        >
                                            <SaveIcon className='w-4 h-4' />
                                            <span className="sr-only">Save</span>
                                        </Button>
                                    ) : (
                                        <Button
                                            size={'icon'}
                                            variant={'ghost'}
                                            onClick={() => handleEditComment(comment.id, comment.comment)}
                                            className="text-primary-foreground"
                                        >
                                            <PenIcon className='w-4 h-4' />
                                            <span className="sr-only">Edit</span>
                                        </Button>
                                    )}
                                    <Button
                                        size={'icon'}
                                        variant={'ghost'}
                                        onClick={() => handleDeleteComment(comment.id)}
                                        className="text-destructive"
                                    >
                                        <TrashIcon className='w-4 h-4' />
                                        <span className="sr-only">Delete</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Textarea
                            className="w-full resize-none mt-5 min-h-[60px] p-1 border-none focus:outline-none"
                            value={
                                editingComment === comment.id ? editedComment : comment.comment
                            }
                            onChange={(e) => setEditedComment(e.target.value)}
                            readOnly={editingComment !== comment.id}
                            rows={2}
                        />

                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductComments;
