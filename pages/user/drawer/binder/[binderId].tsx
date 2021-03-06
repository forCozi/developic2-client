import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import SquareBtn from '../../../../components/Button/SquareBtn';
import PageWithNavLayout from '../../../../components/Layout/PageWithNavLayout';
import PhotoBinderGallery from '../../../../components/List/PhotoBinderGallery';
import BinderEditModal from '../../../../components/Modal/BinderModal';
import ConfirmRemoveModal from '../../../../components/Modal/ConfirmRemoveModal';
import Incomplete from '../../../../components/Result/Incomplete';
import useModal from '../../../../hooks/useModal';
import useDrawer from '../../../../modules/drawer/hooks';
import { DrawerNavData } from '../../../../utils/data';
const BinderDetailContainer = styled.div`
  display: flex;
  .left__section {
    position: relative;
    width: 372px;
    margin-right: 50px;
    article {
      position: sticky;
      top: 90px;
      width: 100%;

      color: ${({ theme }) => theme.textColor.initial};

      h2 {
        font-size: 30px;
        margin-bottom: 20px;
      }
      p {
        line-height: 2;
        color: ${({ theme }) => theme.textColor.lighten};
      }
      span {
        font-size: 14px;
        color: ${({ theme }) => theme.textColor.lighten};
      }
      .btn__group {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .binder__detail__img__list {
    flex: 1;
    position: relative;
    margin-bottom: 100px;
    .is-empty {
      margin-top: 40px;
      text-align: center;
    }
  }
  @media ${({ theme }) => theme.viewPortSize.mobile} {
    flex-direction: column;
    .left__section {
      width: 100%;
      margin-right: 0px;
    }
    .binder__detail__img__list {
      margin-top: 20px;
    }
  }
`;

export default function BinderId(): JSX.Element {
  const router = useRouter();
  const {
    getBinderDetail,
    removeBinderPhotoDispatch,
    removePhotoBinderDispatch,
    getPhotoBinderDetailDispatch,
  } = useDrawer();
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [RemoveBinderModal, onToggleRemoveModal] = useModal(ConfirmRemoveModal, {
    title: '????????? ??????',
    description: '?????????????????? ?????? ???????????????????',
    onConfirm: useCallback(() => {
      if (!getBinderDetail.data) return;
      removePhotoBinderDispatch(getBinderDetail.data.id);
      router.replace('/user/drawer/binder');
    }, [getBinderDetail.data]),
  });

  const onToggleEditModal = useCallback(() => {
    setEditModalOpen(prev => !prev);
  }, []);

  const onToggleSelectPhoto = useCallback(
    id => {
      const isSelected = selectedPhotos.findIndex(v => v === id);
      isSelected !== -1
        ? setSelectedPhotos(selectedPhotos.filter(v => v !== id))
        : setSelectedPhotos(selectedPhotos.concat(id));
    },
    [selectedPhotos]
  );

  const removePhotos = useCallback(() => {
    if (!getBinderDetail.data) return;
    removeBinderPhotoDispatch({
      BinderId: getBinderDetail.data.id,
      photoIdArr: selectedPhotos,
    });
  }, [selectedPhotos, getBinderDetail.data]);

  useEffect(() => {
    getPhotoBinderDetailDispatch(+(router.query.binderId as string));
  }, []);

  if (getBinderDetail.error)
    return (
      <Incomplete title="????????? ???????????????." desc="?????? ?????? ????????????!" type="error" />
    );
  if (!getBinderDetail.data) return <></>;

  return (
    <PageWithNavLayout pageName="??? ??????" pageDesc="My Drawer" navData={DrawerNavData}>
      <Head>
        <title>????????? | {getBinderDetail.data.title}</title>
      </Head>
      <BinderDetailContainer>
        <div className="left__section">
          <article>
            <h2>{getBinderDetail.data.title}</h2>
            <p>{getBinderDetail.data.description}</p>
            <span>{getBinderDetail.data.PostImages.length}?????? ??????</span>
            <div className="btn__group">
              <SquareBtn onClick={onToggleEditModal}>??????</SquareBtn>
              <SquareBtn onClick={removePhotos}>????????????</SquareBtn>
            </div>
          </article>
        </div>
        <div className="binder__detail__img__list">
          {getBinderDetail.data.PostImages.length === 0 ? (
            <div className="is-empty">???????????? ????????? ?????????.</div>
          ) : (
            <PhotoBinderGallery
              photos={getBinderDetail.data.PostImages}
              selectedPhotos={selectedPhotos}
              onToggleSelectPhoto={onToggleSelectPhoto}
            />
          )}
        </div>
      </BinderDetailContainer>
      {editModalOpen && (
        <BinderEditModal
          binderData={{
            title: getBinderDetail.data.title,
            description: getBinderDetail.data.description,
          }}
          onClose={onToggleEditModal}
          onRemove={onToggleRemoveModal}
        />
      )}
      <RemoveBinderModal />
    </PageWithNavLayout>
  );
}
