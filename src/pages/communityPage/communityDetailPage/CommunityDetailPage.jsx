import React, { useContext, useEffect, useState } from 'react';
import { style } from './communityDetailPage.style';
import PostComments from './postComments/PostComments';
import { MessageFilled } from '@ant-design/icons';
import { useLocation } from 'react-router';
import parse from 'html-react-parser';
import * as api from '../../../service/api';
import { UserContext } from '../../../components/auth/AuthProvider';
import CommunityDetailSkeleton from '../../../components/skeleton/communityDetailSkeleton/CommunityDetailSkeleton';

const CommunityDetailPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState(null);
  const [postType, setPostType] = useState();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const postId = params.get('postId');

  const { user } = useContext(UserContext);
  const { state } = useLocation();

  useEffect(() => {
    getDetailPost();
  }, []);

  async function getDetailPost() {
    try {
      setIsLoading(true);
      const response = await api.getCommunityDetailPost(postId);
      setPostData(response);
      setReceivedPostType(response.postType);
      setIsLoading(false);
    } catch (e) {
      throw new Error(e);
    }
  }

  function setReceivedPostType(postType) {
    switch (postType) {
      case 'free':
        setPostType('캠퍼수다');
        return;
      case 'picture':
        setPostType('캠핑한장');
        return;
      case 'question':
        setPostType('궁금해요');
        return;
      default:
        return;
    }
  }

  console.log(postData);

  return (
    <>
      {!isLoading && postData ? (
        <Container>
          <Wrap>
            <Title>{postData.title}</Title>
            <PostType>{postType}</PostType>
          </Wrap>
          <Wrap>
            <UserWrap>
              <AvatarImg src={postData.memberImgUrl} alt="userImage" />
              <UserName>{postData.nickname}</UserName>
              <Time>{state}</Time>
            </UserWrap>
            {user && postData.memberId === user.data.memberId && (
              <PostActionWrap>
                <HandlePost>수정</HandlePost>
                <HandlePost>삭제</HandlePost>
              </PostActionWrap>
            )}
          </Wrap>
          <ContentWrap>
            <Content>{parse(postData.content)}</Content>
            <ImageWrap>
              {postData.imgUrlList.map((img, index) => (
                <ImageContent
                  src={img}
                  alt="ImageContent"
                  key={index}
                ></ImageContent>
              ))}
            </ImageWrap>
          </ContentWrap>
          <PostReact>
            <LikeWrap>
              <Like>
                <LikeIcon
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1817 0C13.923 0 11.964 1.32942 11 3.27142C10.036 1.32942 8.07697 0 5.81826 0C2.60477 0 0 2.69143 0 6.01173C0 12.5676 11 20 11 20C11 20 22 12.5676 22 6.01173C22 2.69143 19.3952 0 16.1817 0Z" />
                </LikeIcon>
              </Like>
              <LikeCount>{postData.likeCnt}</LikeCount>
            </LikeWrap>
            <CommentWrap>
              <MessageFilled />
              <CommentCount>{postData.commentCnt}</CommentCount>
            </CommentWrap>
          </PostReact>
          <PostComments />
        </Container>
      ) : (
        <CommunityDetailSkeleton />
      )}
    </>
  );
};

export default CommunityDetailPage;

const {
  Container,
  Wrap,
  Title,
  PostType,
  UserWrap,
  AvatarImg,
  UserName,
  Time,
  PostActionWrap,
  HandlePost,
  ContentWrap,
  Content,
  ImageWrap,
  ImageContent,
  PostReact,
  LikeWrap,
  Like,
  LikeIcon,
  LikeCount,
  CommentWrap,
  CommentCount,
} = style;
