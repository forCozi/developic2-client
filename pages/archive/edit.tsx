import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Layout from '../../components/Layout';
import CustomInput from '../../components/Input/CustomInput';
import Head from 'next/head';
import TitleLabel from '../../components/Label/TitleLabel';
import CustomCheckBox from '../../components/Input/CustomCheckBox';
import CustomDateInput from '../../components/Input/CustomDateInput';
import useInput from '../../hooks/useInput';
import ImageDropZone from '../../components/Input/ImageDropZone';
import useUser from '../../modules/user/hooks';
import { useRouter } from 'next/router';
import useArchive from '../../modules/archive/hooks';
import useUI from '../../modules/ui/hooks';

const ArchiveEditContainer = styled.div`
  max-width: 1150px;
  margin: 50px auto 100px auto;
  & > section {
    border-top: 1px solid ${({ theme }) => theme.grayScale[2]};
    margin-top: 50px;
    padding: 0 50px;

    & > div {
      & > p {
        font-size: ${({ theme }) => theme.fontSize.xxl};
        color: ${({ theme }) => theme.textColor.initial};
        margin: 30px 0;
      }
      & > article {
        max-width: 800px;
        margin: 0 auto;
      }
    }
    .archive__poster {
      & > article {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .archive__summary {
      margin-top: 80px;
      border-top: 1px solid ${({ theme }) => theme.grayScale[2]};
      & > article {
        & > div + div {
          margin-top: 35px;
        }
        .archive__fee {
          display: flex;
          & > div {
            display: flex;
            align-items: center;
            & > small {
              transform: translateX(-15px);
            }
          }
          & > span {
            margin-left: 25px;
            display: flex;
          }
        }
        .archive__date {
          display: flex;
          align-items: center;
          padding-top: 5px;
          color: ${({ theme }) => theme.textColor.initial};
          span {
            width: 100px;
          }
          small {
            margin: 0 15px;
          }
        }
        .archive__writer {
          display: flex;
          justify-content: space-between;
          & > div + div {
            margin-left: 20px;
          }
        }
      }
    }
    .archive__detail {
      margin-top: 80px;
      border-top: 1px solid ${({ theme }) => theme.grayScale[2]};
    }
  }
  @media ${({ theme }) => theme.viewPortSize.mobile} {
    padding: 0 10px;
    margin: 20px auto 100px auto;
    & > section {
      margin-top: 20px;
      padding: 0px;
      & > div {
        & > p {
          font-size: 16px;
          margin: 20px 0 10px 0;
        }
      }
      .archive__summary {
        margin-top: 50px;
        & > article {
          & .input__cus {
            span {
              width: 80px;
              font-size: 14px;
            }
          }
          .archive__date {
            display: flex;
            align-items: center;
            small {
              margin: 0 10px;
            }
            span {
              display: block;
              flex: 1;
              font-size: 14px;
            }
            & > div {
              width: 36%;
            }
          }
          & > .archive__fee {
            display: flex;
            & > div {
              flex: 1;
              width: auto;
              display: flex;
              align-items: center;
              .input__cus {
                width: auto;
              }
              & > small {
                transform: translateX(-15px);
              }
            }
            & > span {
              margin-left: 15px;
            }
          }
          & > .archive__writer {
            display: block;
            & > div + div {
              margin: 30px 0 0 0;
            }
          }
          & > div + div {
            margin-top: 30px;
          }
        }
      }
    }
  }
`;

const ArchiveEditorWithNoSSR = dynamic(
  () => import('../../components/Editor/ArchiveEditor'),
  {
    ssr: false,
  }
);

export default function Edit(): JSX.Element {
  const { userData } = useUser();
  const { addArchive, addArchiveDispatch } = useArchive();
  const router = useRouter();
  const [title, onChangeTitle] = useInput('');
  const [author, onChangeAuthor] = useInput('');
  const [address, onChangeAddress] = useInput('');
  const [webPage, onChangeWebPage] = useInput('');
  const [contact, onChangeContact] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cost, setCost] = useState(0);
  const [poster, setPoster] = useState('');
  const [checkFree, setCheckFree] = useState<boolean>(false);
  const [imageList, setImageList] = useState<{ imageId: number; src: string }[]>([]);
  const [description] = useState('');

  const { toastOpenDispatch } = useUI();

  const onChangeCost = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCost(+e.target.value);
    if (+e.target.value !== 0) {
      setCheckFree(false);
    }
  }, []);

  const onChangeStartDate = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  }, []);

  const onChangeEndDate = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  }, []);

  const onChangeCheckFree = useCallback(() => {
    if (checkFree === false) {
      setCost(0);
    }
    setCheckFree(prev => !prev);
  }, [checkFree]);

  const onSubmit = (content: string) => {
    if (!userData) return;
    if (!checkFree && !cost) return toastOpenDispatch('????????? ??????????????????');
    if (!webPage) return toastOpenDispatch('??????????????? ??????????????????');
    if (!contact) return toastOpenDispatch('???????????? ??????????????????');
    if (!email) return toastOpenDispatch('?????? ???????????? ??????????????????');
    if (!title) return toastOpenDispatch('??????????????? ??????????????????');
    if (!author) return toastOpenDispatch('????????? ??????????????????');
    if (!address) return toastOpenDispatch('????????? ??????????????????');
    if (!content) return toastOpenDispatch('????????? ??????????????????');
    if (!startDate || !endDate) return toastOpenDispatch('????????? ??????????????????');
    if (!poster) return toastOpenDispatch('???????????? ??????????????????');
    addArchiveDispatch({
      cost: +cost,
      webPage,
      contact,
      email,
      title,
      author,
      address,
      description: content,
      startDate,
      endDate,
      poster,
      UserId: userData.id,
      imageList: imageList.map(image => image.imageId),
    });
  };

  useEffect(() => {
    if (addArchive.data) {
      toastOpenDispatch('???????????? ?????????????????????.');
      router.replace('/archive');
      return;
    }
  }, [addArchive.data]);

  return (
    <Layout>
      <Head>
        <title>???????????? | ?????? ??????</title>
      </Head>
      <ArchiveEditContainer>
        <TitleLabel title="????????????" desc="Exhibition Archive" />
        <section>
          <div className="archive__poster">
            <p>????????? ?????????</p>
            <article>
              <ImageDropZone
                image={poster}
                setImage={setPoster}
                axiosPath="poster"
                width={248}
                height={350}
              />
            </article>
          </div>
          <div className="archive__summary">
            <p>?????? ?????? ??????</p>
            <article>
              <CustomInput title="?????? ??????" value={title} onChange={onChangeTitle} />
              <CustomInput
                title="?????? ??????"
                value={author}
                onChange={onChangeAuthor}
                placeholder="???????????? ?????? ',' ??? ???????????? ??????????????????"
              />
              <CustomInput title="?????? ??????" value={address} onChange={onChangeAddress} />
              <CustomInput
                title="?????? ?????????"
                value={webPage}
                onChange={onChangeWebPage}
              />
              <div className="archive__fee">
                <div>
                  <CustomInput
                    title="?????????"
                    width={380}
                    type="number"
                    value={cost}
                    onChange={onChangeCost}
                  />
                  <small>???</small>
                </div>
                <span>
                  <CustomCheckBox
                    title="????????????"
                    value={checkFree}
                    onChange={onChangeCheckFree}
                  />
                </span>
              </div>
              <div className="archive__date">
                <span>?????? ??????</span>
                <CustomDateInput
                  value={startDate}
                  onChange={onChangeStartDate}
                  max={endDate}
                />
                <small>~</small>
                <CustomDateInput
                  value={endDate}
                  onChange={onChangeEndDate}
                  min={startDate}
                />
              </div>
              <div className="archive__writer">
                <CustomInput
                  type="email"
                  title="?????????"
                  width={380}
                  value={email}
                  onChange={onChangeEmail}
                />
                <CustomInput
                  title="?????????"
                  width={380}
                  value={contact}
                  onChange={onChangeContact}
                  placeholder="010-0000-0000"
                />
              </div>
            </article>
          </div>
          <div className="archive__detail">
            <p>?????? ?????? ??????</p>
            <article>
              <ArchiveEditorWithNoSSR
                content={description}
                setImageList={setImageList}
                onSubmit={onSubmit}
              />
            </article>
          </div>
        </section>
      </ArchiveEditContainer>
    </Layout>
  );
}
