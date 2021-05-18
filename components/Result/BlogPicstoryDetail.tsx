import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import { MdBook, MdFavorite, MdRemoveRedEye } from 'react-icons/md';
import { BlogPicstory, blogPicstoryDetailData, Post } from '../../modules/blog';
import { PicstoryDataType } from '../../utils/data';
import { countSum } from '../../utils/utils';
import SquareBtn from '../Button/SquareBtn';
import { BlogPicstoryCardBox } from '../Card/styles';
import ConfirmRemoveModal from '../Modal/ConfirmRemoveModal';
import PicstoryEditModal from '../Modal/PicstoryModal';
import { v4 as uuidv4 } from 'uuid';

const BlogPicstoryDetailContainer = styled(BlogPicstoryCardBox)`
  border-bottom: 1px solid ${({ theme }) => theme.grayScale[2]};
  box-shadow: none;
  height: 300px;
  cursor: auto;
  h2 {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: bold;
  }
  article {
    p {
      margin-bottom: 28px;
    }
  }
`;

type PicstoryCardPropsType = {
  picstoryDetailData: blogPicstoryDetailData;
};
export default function BlogPicstoryDetailBox({
  picstoryDetailData,
}: PicstoryCardPropsType): JSX.Element {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const posts = picstoryDetailData.Posts;

  const likeCounts = posts.map((post: Post) => post.likeCount);
  const likeCountSum = countSum(likeCounts as number[]);

  const hits = posts.map((post: Post) => post.hits);
  const viewCountSum = countSum(hits);

  const onToggleEditModal = useCallback(() => {
    setEditModalOpen(state => !state);
  }, []);

  const onToggleRemoveModal = useCallback(() => {
    setRemoveModalOpen(state => !state);
  }, []);

  return (
    <BlogPicstoryDetailContainer>
      <article>
        <div className="picstory__description">
          <h2>{picstoryDetailData.title}</h2>
          <div className="picstory__stats">
            <div>
              <MdBook />
              <span>
                {picstoryDetailData.Posts ? picstoryDetailData.Posts.length : 0}
              </span>
            </div>
            <div>
              <MdFavorite />
              <span>{likeCountSum && likeCountSum}</span>
            </div>
            <div>
              <MdRemoveRedEye />
              <span>{viewCountSum && viewCountSum}</span>
            </div>
          </div>
        </div>
        <p>{picstoryDetailData.description}</p>
        <div className="picstory__btn">
          <SquareBtn onClick={onToggleEditModal}>편집</SquareBtn>
          <SquareBtn onClick={onToggleRemoveModal}>삭제</SquareBtn>
        </div>

        <ul className="picstory__recent-img">
          {posts &&
            posts.slice(0, 6).map(picstoryImgItem => (
              <li className="img__box" key={uuidv4()}>
                <img src={picstoryImgItem.thumbnail} alt="picstory__recent-img" />
              </li>
            ))}
        </ul>
      </article>
      {editModalOpen && (
        <PicstoryEditModal onClose={onToggleEditModal} onRemove={onToggleRemoveModal} />
      )}
      {removeModalOpen && (
        <ConfirmRemoveModal
          sectionTitle="픽스토리를"
          description="픽스토리에 포함된 글은 삭제되지 않습니다."
          onClose={onToggleRemoveModal}
        />
      )}
    </BlogPicstoryDetailContainer>
  );
}
