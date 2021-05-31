import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import BlogPicstoryList from '../../components/List/BlogPicstoryList';
import SearchPageNav from '../../components/Nav/SearchPageNav';
import EmptyContent from '../../components/Result/EmptyContent';
import { SearchContentBox } from '../../components/Result/styles';
import SortTab from '../../components/Tab/SortTab';
import { SearchPageData } from '../../modules/list';
import useList from '../../modules/list/hooks';
import { SearchListOptions } from '../../utils/data';

const SearchPicstoryContainer = styled.section`
  width: 1150px;
  margin: 0 auto;
`;

export default function SearchPicstory(): JSX.Element {
  const { pageData, loadSearchListDispatch } = useList();
  const { query } = useRouter();
  useEffect(() => {
    console.log('서버로 픽스토리 검색 요청');
    if (query.keyword) {
      loadSearchListDispatch({ query: query.keyword, type: 'picstory' });
    }
  }, [query]);

  return (
    <Layout>
      <SearchPicstoryContainer>
        <SearchPageNav />
        <SearchContentBox>
          {pageData && pageData.length < 1 && (
            <EmptyContent message={'검색된 픽스토리가 없습니다.'} />
          )}
          {pageData && pageData.length >= 1 && (
            <>
              <BlogPicstoryList
                searchPicstoryData={pageData as SearchPageData['picstory']}
              />
            </>
          )}
        </SearchContentBox>
      </SearchPicstoryContainer>
    </Layout>
  );
}
