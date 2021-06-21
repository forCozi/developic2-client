import styled from '@emotion/styled';
import BlogWithNavLayout from '../../../components/Layout/BlogWithNavLayout';
import BlogUserInfo from '../../../components/Result/BloggerInfo';
import { loadBlogUserAction } from '../../../modules/blog';
import wrapper from '../../../modules/store';
import { authServersiceAction } from '../../../utils/getServerSidePropsTemplate';

const BlogUserInfoContainer = styled.section`
  min-height: 550px;
  max-width: 850px;
  margin: 0 auto;
  font-family: 'Noto Serif KR';
`;

export default function BlogInfo(): JSX.Element {
  return (
    <BlogWithNavLayout>
      <BlogUserInfoContainer>
        <BlogUserInfo />
      </BlogUserInfoContainer>
    </BlogWithNavLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  await authServersiceAction(context);
  const { dispatch } = context.store;
  if (!context.params) return;
  await dispatch(loadBlogUserAction(context.params.userId as string));
});
