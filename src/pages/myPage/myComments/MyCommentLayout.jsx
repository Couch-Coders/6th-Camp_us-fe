import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../components/auth/AuthProvider';
import * as api from '../../../service/api';
import MyComments from './MyComments';
import { Pagination } from 'antd';
import { NotMyCommentsNotification } from '../../../components/notice/Notice';
import styled from 'styled-components';
import CommunityPostSkeleton from '../../../components/skeleton/communityPostSkeleton/CommunityPostSkeleton';

export default function MyCommentLayout() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [totalElement, setTotalElement] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //MyCommentsRequest(currentPage);
  }, [user, currentPage]);

  // 나의 댓글 리스트 조회
  async function MyCommentsRequest(page) {
    setIsLoading(true);
    const response = await api.getMyCampsLikes(page);
    setData(response.content);
    setTotalElement(response.totalElements);
    setIsLoading(false);
  }

  // 페이지 변경
  const changePage = (value) => {
    setCurrentPage(value - 1);
  };

  return (
    <>
      {!isLoading && data.length === 0 ? (
        <NotMyCommentsNotification />
      ) : isLoading ? (
        <>
          <CommunityPostSkeleton />
          <CommunityPostSkeleton />
          <CommunityPostSkeleton />
        </>
      ) : (
        <>
          <MyComments /* data={data} MyPostsRequest={MyPostsRequest} */ />
          <PaginationContent
            current={currentPage + 1}
            total={totalElement}
            pageSize={5}
            onChange={(value) => {
              changePage(value);
            }}
          />
        </>
      )}
    </>
  );
}

const PaginationContent = styled(Pagination)`
  text-align: center;
  .ant-select-selector {
    display: none;
  }
`;