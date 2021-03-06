import styled from '@emotion/styled';
import Head from 'next/head';
import React, { useEffect } from 'react';
import PageLabel from '../../components/Label/PageLabel';
import PageWithNavLayout from '../../components/Layout/PageWithNavLayout';
import NoticeList from '../../components/List/NoticeList';
import useCS from '../../modules/cs/hooks';
import { CSNavData } from '../../utils/data';

const NoticeContainer = styled.section`
  @media ${({ theme }) => theme.viewPortSize.mobile} {
    padding: 0 10px;
    .cs__left {
      div {
        padding-left: 0;
      }
      h1 {
        font-size: 32px;
      }
      p {
      }
    }
    .cs__right {
      margin: 20px 0 30px 0;
    }
  }
`;

export default function Notice(): JSX.Element {
  const { getNoticeDispatch, getCs } = useCS();

  useEffect(() => {
    getNoticeDispatch({ limit: 8, offset: 0 });
  }, []);
  if (!getCs.data) return <></>;
  return (
    <PageWithNavLayout pageName="고객센터" pageDesc="Customer Center" navData={CSNavData}>
      <Head>
        <title>고객센터 | 공지사항</title>
      </Head>
      <NoticeContainer>
        <div className="cs__left">
          <PageLabel
            width={450}
            text="NOTICE"
            desc="서비스 안내, 오류, 기타 공지사항을 전해드립니다."
          />
        </div>
        <div className="cs__right">
          <NoticeList data={getCs.data} getDataDispatch={getNoticeDispatch} />
        </div>
      </NoticeContainer>
    </PageWithNavLayout>
  );
}
