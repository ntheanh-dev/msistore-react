import classNames from "classnames/bind";
import { useState } from "react";
import { MdOutlineRateReview } from "react-icons/md";

import Button from "~/components/Button";
import style from "./Review.module.scss"
const cx = classNames.bind(style)
function Review() {
    const reviewData = [
        {
            content: 'My first order arrived today in perfect condition.  From the time I sent a question about the item to making the purchase, to the shipping and now the delivery, your company, Tecs, has stayed in touch.  Such great service.  I look forward to shopping on your site in the future and would highly recommend it.',
            author: 'Nguyễn Thế Anh'
        },
        {
            content: 'MSI mãi đỉnh!',
            author: 'Tran Dai Vang'
        },
        {
            content: 'Tôi đã mua lần thứ 3!',
            author: 'Do Thi Hong Ngoc'
        },
        {
            content: 'Tuyệt vờiiii!',
            author: 'Ho Huu Duc'
        },
    ]
    const [review, setReview] = useState(reviewData[0])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <div className={cx('content')}>
                    <div className={cx('icon')}>
                        <MdOutlineRateReview />
                    </div>
                    <span>
                        {review.content}
                    </span>
                </div>
                <div className={cx('author')}>
                    -{review.author}
                </div>
            </div>
            <div className={cx('bottom')}>
                <Button outline to={"comming"}>Leave us a review </Button>
                <div className={cx('changeReview')}>
                    <div className={(review === reviewData[0]) ? cx('review-active') : ' '} onClick={() => (setReview(reviewData[0]))}></div>
                    <div className={(review === reviewData[1]) ? cx('review-active') : ' '} onClick={() => (setReview(reviewData[1]))}></div>
                    <div className={(review === reviewData[2]) ? cx('review-active') : ' '} onClick={() => (setReview(reviewData[2]))}></div>
                    <div className={(review === reviewData[3]) ? cx('review-active') : ' '} onClick={() => (setReview(reviewData[3]))}></div>
                </div>
            </div>
        </div>);
}

export default Review;