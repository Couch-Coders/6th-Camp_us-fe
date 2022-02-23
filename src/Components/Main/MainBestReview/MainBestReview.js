import React, { useState, useEffect } from 'react';
import * as api from '../../../Service/camps';
import Image from '../../../Assets/Images/default_image.png';
import { Rate } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { Section, InnerWrapper, SectionTitle } from '../../../Styles/theme';
import {
  BestReviewList,
  BestReview,
  ReviewThumbnail,
  ReviewImg,
  ReviewContent,
  CampName,
  ReviewInfo,
  Reviewer,
  Content,
  ReviewLike,
} from './MainBestReview.styles';

function MainBestReview() {
  const [campData, setCampData] = useState([]);

  async function getCampData(page) {
    const response = await api.getBestReview(page);
    console.log(response);
    const sortResult = response.content.slice(0, 5);
    setCampData(sortResult);
  }

  useEffect(() => {
    getCampData();
  }, []);

  return (
    <Section>
      <InnerWrapper>
        <SectionTitle>BEST 리뷰</SectionTitle>
        <BestReviewList>
          {campData.map((camp) => (
            <BestReview to={`/detail?id=${camp.campId}`} key={camp.reviewId}>
              <ReviewThumbnail>
                <ReviewImg
                  src={
                    camp.imgUrl === '' || camp.imgUrl === null
                      ? Image
                      : camp.imgUrl
                  }
                ></ReviewImg>
              </ReviewThumbnail>
              <ReviewContent>
                <CampName>{camp.facltNm}</CampName>
                <ReviewInfo>
                  <Reviewer>{camp.nickname}</Reviewer>
                  <Rate disabled defaultValue={camp.rate} />
                </ReviewInfo>
                <Content>{camp.content}</Content>
              </ReviewContent>
              <ReviewLike>
                <LikeOutlined />
                {camp.likeCnt}
              </ReviewLike>
            </BestReview>
          ))}
        </BestReviewList>
      </InnerWrapper>
    </Section>
  );
}

export default MainBestReview;
