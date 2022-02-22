import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { style } from './CampLike.style';
import * as api from '../../Service/camps';

const CampLike = ({ likeCount, campId }) => {
  const [isLike, setIsLike] = useState(false);

  const getCamplikeList = async () => {
    try {
      setIsLike(false);
      const response = await axios('http://localhost:3001/myCampsLikes');
      const data = response.data;
      data.forEach((data) => {
        data.campId === campId && setIsLike(true);
      });
      return data;
    } catch (error) {
      throw new Error('Failed to load data');
    }
  };

  const onCampLike = async (id) => {
    const response = await api.campLike(id);
    console.log(response);
  };

  useEffect(() => {
    getCamplikeList();
  }, []);

  return (
    <LikeWrap>
      <Like
        onClick={() => {
          onCampLike(campId);
        }}
      >
        <LikeIcon
          isLike={isLike}
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.1817 0C13.923 0 11.964 1.32942 11 3.27142C10.036 1.32942 8.07697 0 5.81826 0C2.60477 0 0 2.69143 0 6.01173C0 12.5676 11 20 11 20C11 20 22 12.5676 22 6.01173C22 2.69143 19.3952 0 16.1817 0Z" />
        </LikeIcon>
      </Like>
      {likeCount && <LikeCount>{likeCount}</LikeCount>}
    </LikeWrap>
  );
};

export default CampLike;

const { LikeWrap, Like, LikeIcon, LikeCount } = style;