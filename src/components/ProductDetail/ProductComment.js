import React, { useState } from 'react';
import Rating from 'react-rating-stars-component';

function ProductComments() {
    const fakeComments = [
        { user: 'Người dùng 1', rating: 4, content: 'Sản phẩm rất tốt, tôi rất hài lòng' },
        { user: 'Người dùng 2', rating: 5, content: 'Đáng giá mỗi xu, sản phẩm chất lượng cao' },
        { user: 'Người dùng 3', rating: 3, content: 'Không tệ, nhưng có thể cải thiện được' },
        { user: 'Người dùng 4', rating: 2, content: 'Sản phẩm không như mong đợi' },
    ];
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(fakeComments);

    const handleRatingChange = (newRating) => {
        console.log('New rating:', newRating);
        setRating(newRating);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted comment:', comment);
        setComments([...comments, { user: 'Tên người dùng', content: comment }]);
        setComment('');
    };

    return (
        <div className="p-4 mt-8">
            <h2 className="text-xl font-semibold mb-4">Bình luận và đánh giá</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="mb-4">
                    <label htmlFor="rating" className="block text-lg font-medium text-gray-700 mb-1">
                        Đánh giá của bạn
                    </label>
                    <Rating
                        id="rating"
                        count={5}
                        size={50}
                        value={rating}
                        onChange={handleRatingChange}
                        activeColor="yellow"
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="comment" className="block text-lg font-medium text-gray-700 mb-1">
                            Bình luận của bạn
                        </label>
                        <textarea
                            id="comment"
                            name="comment"
                            rows="3"
                            className="w-full border rounded-md px-3 py-2"
                            value={comment}
                            onChange={handleCommentChange}
                        ></textarea>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Gửi
                    </button>
                </form>
                <div className="mt-4">
                    {comments.map((comment, index) => (
                        <div key={index} className="flex items-start mb-4">
                            <div className="flex-shrink-0">
                                <img src="user-avatar.jpg" alt="User Avatar" className="w-8 h-8 rounded-full" />
                            </div>
                            <div className="ml-3">
                                <h4 className="font-semibold">{comment.user}</h4>
                                <Rating value={comment.rating} size={24} edit={false} activeColor="yellow" />
                                <p className="text-gray-600">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductComments;
