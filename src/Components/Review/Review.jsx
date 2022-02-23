import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import ImagePreview from '../ImageUpload/ImagePreview/ImagePreview';
import ImageUpload from '../ImageUpload/ImageUpload';
import { Rate, Input, message, Button } from 'antd';
import * as api from '../../Service/camps';
import ReviewsList from '../Review/ReviewsList';
import { style } from './Review.style';
import { UserContext } from '../auth/AuthProvider';

const Review = ({ CampId, clickedPage }) => {
  const { TextArea } = Input;
  const [review, setReview] = useState({
    rate: null,
    content: '',
    imgUrl: '',
    imgName: '',
  });
  const [reviewData, setReviewData] = useState([]);
  const [totalElement, setTotalElement] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const buttonRef = useRef();

  const { user } = useContext(UserContext);

  async function detailReviewRequest(page) {
    const response = await api.getCampReview(CampId, page);
    console.log(response);
    setReviewData(response.content);
    setTotalElement(response.totalElements);
  }

  async function MemberReviewRequest(page) {
    const response = await api.getUserReview(page);
    console.log(response);
    setReviewData(response.content);
    setTotalElement(response.totalElements);
  }

  useEffect(() => {
    clickedPage === 'detail'
      ? detailReviewRequest(currentPage)
      : MemberReviewRequest(currentPage);
  }, [currentPage]);

  // 페이지 변경
  const changePage = (value) => {
    setCurrentPage(value - 1);
    clickedPage === 'detail'
      ? detailReviewRequest(value - 1)
      : MemberReviewRequest(value - 1);
  };

  /* 리뷰 삭제 */
  async function deleteTask(id) {
    const response = await api.deleteReview(id);
    console.log(response);
    // const remainingTasks = reviewData.filter((data) => id !== data.id);
    // setReviewData(remainingTasks);
  }

  // 리뷰 수정
  async function editTask(review) {
    console.log('review =', review);
    const editedTaskList = reviewData.map((data) => {
      if (review.reviewId === data.reviewId) {
        return {
          ...data,
          ...review,
        };
      }
      return data;
    });
    setReviewData(editedTaskList);

    const response = await api.changeReview(review);
    console.log(response);
  }

  // 이미지 업로드
  const setImageUpload = useCallback((file, action) => {
    if (action === 'add') {
      setReview((review) => {
        return { ...review, imgUrl: file.url, imgName: file.name };
      });
    } else {
      setReview((review) => {
        return { ...review, imgUrl: null, imgName: null };
      });
    }
  }, []);

  // 별점 수정
  const handleRateChange = (value) => {
    setReview((review) => {
      return { ...review, rate: value };
    });
  };

  // 텍스트 수정
  const handleContentChange = (e) => {
    setReview((review) => {
      return { ...review, content: e.target.value };
    });
  };

  // 리뷰 작성
  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      buttonRef.current.click();
      return;
    }

    if (review.content.length < 5) {
      buttonRef.current.click();
      return;
    }

    if (!review.rate) {
      buttonRef.current.click();
      return;
    }

    const response = await api.writeReview(CampId, review);
    setReview((review) => {
      return { ...review, rate: null, content: '', imgUrl: '', imgName: '' };
    });
    detailReviewRequest();
    console.log(response);
  }

  const warning = () => {
    if (!user) {
      message.warning('로그인한 유저만 리뷰를 작성 할 수 있습니다.');
      return;
    }

    if (review.content.length < 5) {
      message.warning('5글자 이상의 리뷰만 등록이 가능합니다.');
    }

    if (!review.rate) {
      message.warning('별점을 등록해주세요.');
    }
  };

  return (
    <Container>
      {clickedPage === 'detail' && (
        <EditForm>
          <EditTop>
            <EditLeft>
              <RateSelect>
                별점 선택
                <Rate
                  allowHalf
                  onChange={handleRateChange}
                  value={review.rate}
                />
              </RateSelect>
            </EditLeft>
            <EditRight>
              <EditButton type="submit" onClick={handleSubmit}>
                작성
              </EditButton>
            </EditRight>
          </EditTop>
          <Wrap>
            <ImageUpload setImageUpload={setImageUpload} />
            {review.imgUrl !== null && review.imgUrl !== '' && (
              <ImagePreview
                setImageUpload={setImageUpload}
                previewImg={review.imgUrl}
                previewName={review.imgName}
              />
            )}
          </Wrap>
          <TextArea
            rows={4}
            onChange={handleContentChange}
            value={review.content}
          />
        </EditForm>
      )}

      {reviewData &&
        reviewData.map((data) => (
          <ReviewsList
            reviewData={data}
            key={data.reviewId}
            deleteTask={deleteTask}
            editTask={editTask}
            clickedPage={clickedPage}
          />
        ))}

      <PaginationContent
        current={currentPage + 1}
        total={totalElement}
        pageSize={5}
        onChange={(value) => {
          changePage(value);
        }}
      />
      <Button
        ref={buttonRef}
        type="primary"
        onClick={warning}
        style={{
          display: 'none',
        }}
      />
    </Container>
  );
};

export default Review;

const {
  Container,
  EditForm,
  EditTop,
  EditLeft,
  EditRight,
  RateSelect,
  EditButton,
  Wrap,
  PaginationContent,
} = style;
