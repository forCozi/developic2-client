import { createSlice } from '@reduxjs/toolkit';
import { BlogUserData, loadBlogUserAction } from '../blog';
import {
  authAction,
  loginAction,
  logOutAction,
  signupAction,
  verificationAction,
  socialRequestAction,
  socialLoginAction,
  userDetailInfoAction,
  updateUserIntroAction,
  updateUserInfoAction,
  updatePasswordAction,
  destroyUserAction,
  addPostLikeAction,
  removePostLikeAction,
  unSubscribeAction,
  subscribeAction,
  unSubscribeListAction,
  subscribeListAction,
  loadBlogFollowListAction,
} from './thunk';
import { User, UserState } from './type';

// 초기 상태
const initialState: UserState = {
  login: { loading: false, data: null, error: null },
  logout: { loading: false, data: null, error: null },
  signup: { loading: false, data: null, error: null },
  socialRequest: { loading: false, data: null, error: null },
  auth: { loading: false, data: null, error: null },
  verification: { loading: false, data: null, error: null },
  userIntro: { loading: false, data: null, error: null },
  updateUser: { loading: false, data: null, error: null },
  destroyUser: { loading: false, data: null, error: null },
  addPostLike: { loading: false, data: null, error: null },
  removePostLike: { loading: false, data: null, error: null },
  userData: null,
  addBlogFollow: { loading: false, data: null, error: null },
  removeBlogFollow: { loading: false, data: null, error: null },
  loadBlogFollowList: { loading: false, data: null, error: null },
  loadBlogUser: { loading: false, data: null, error: null },
  addBlogFollowList: { loading: false, data: null, error: null },
  removeBlogFollowList: { loading: false, data: null, error: null },
  addSubscribe: { loading: false, data: null, error: null },
  removeSubscribe: { loading: false, data: null, error: null },
  getSubWriter: { loading: false, data: null, error: null },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginAction.pending, state => {
        state.login.loading = true;
        state.login.data = null;
        state.login.error = null;
      })
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.login.loading = false;
        state.login.data = payload;
        state.login.error = null;
        state.userData = payload;
      })
      .addCase(loginAction.rejected, (state, { payload }) => {
        state.login.loading = false;
        state.login.data = null;
        state.login.error = payload;
      })
      .addCase(signupAction.pending, state => {
        state.signup.loading = true;
        state.signup.data = null;
        state.signup.error = null;
      })
      .addCase(signupAction.fulfilled, (state, { payload }) => {
        state.signup.loading = false;
        state.signup.data = payload;
        state.signup.error = null;
      })
      .addCase(signupAction.rejected, (state, { payload }) => {
        state.signup.loading = false;
        state.signup.data = null;
        state.signup.error = payload;
      })
      .addCase(verificationAction.pending, state => {
        state.verification.loading = true;
        state.verification.data = null;
        state.verification.error = null;
      })
      .addCase(verificationAction.fulfilled, (state, { payload }) => {
        state.verification.loading = false;
        state.verification.data = payload;
        state.verification.error = null;
      })
      .addCase(verificationAction.rejected, (state, { payload }) => {
        state.verification.loading = false;
        state.verification.data = null;
        state.verification.error = payload;
      })
      .addCase(socialRequestAction.pending, state => {
        state.socialRequest.loading = true;
        state.socialRequest.data = null;
        state.socialRequest.error = null;
      })
      .addCase(socialRequestAction.fulfilled, (state, { payload }) => {
        state.socialRequest.loading = false;
        state.socialRequest.data = payload;
        state.socialRequest.error = null;
        state.userData = payload;
      })
      .addCase(socialRequestAction.rejected, (state, { payload }) => {
        state.socialRequest.loading = false;
        state.socialRequest.data = null;
        state.socialRequest.error = payload;
      })
      .addCase(socialLoginAction.pending, state => {
        state.login.loading = true;
        state.login.data = null;
        state.login.error = null;
      })
      .addCase(socialLoginAction.fulfilled, (state, { payload }) => {
        state.login.loading = false;
        state.login.data = payload;
        state.login.error = null;
        state.userData = payload;
      })
      .addCase(socialLoginAction.rejected, (state, { payload }) => {
        state.login.loading = false;
        state.login.data = null;
        state.login.error = payload;
      })
      .addCase(authAction.pending, state => {
        state.auth.loading = true;
        state.auth.data = null;
        state.auth.error = null;
      })
      .addCase(authAction.fulfilled, (state, { payload }) => {
        state.auth.loading = false;
        state.auth.data = payload;
        state.auth.error = null;
        state.userData = payload;
      })
      .addCase(authAction.rejected, (state, { payload }) => {
        state.auth.loading = false;
        state.auth.data = null;
        state.auth.error = payload;
        state.userData = null;
      })
      .addCase(logOutAction.pending, state => {
        state.logout.loading = true;
        state.logout.data = null;
        state.logout.error = null;
      })
      .addCase(logOutAction.fulfilled, (state, { payload }) => {
        state.logout.loading = false;
        state.logout.data = payload;
        state.logout.error = null;
        state.login.data = null;
        state.userData = null;
      })
      .addCase(logOutAction.rejected, (state, { payload }) => {
        state.logout.loading = false;
        state.logout.data = null;
        state.logout.error = payload;
      })
      .addCase(userDetailInfoAction.pending, state => {
        state.userIntro.loading = true;
        state.userIntro.data = null;
        state.userIntro.error = null;
      })
      .addCase(userDetailInfoAction.fulfilled, (state, { payload }) => {
        state.userIntro.loading = false;
        state.userIntro.data = payload;
        state.userIntro.error = null;
      })
      .addCase(userDetailInfoAction.rejected, (state, { payload }) => {
        state.userIntro.loading = false;
        state.userIntro.data = null;
        state.userIntro.error = payload;
      })
      .addCase(updateUserInfoAction.pending, state => {
        state.updateUser.loading = true;
        state.updateUser.data = null;
        state.updateUser.error = null;
      })
      .addCase(updateUserInfoAction.fulfilled, (state, { payload }) => {
        state.updateUser.loading = false;
        state.updateUser.data = 'success';
        state.updateUser.error = null;
        (state.userData as User).nickname = payload.nickname;
        (state.userData as User).gender = payload.gender;
        (state.userData as User).birth = payload.birth;
        (state.userData as User).avatar =
          payload.avatar.indexOf('/resize/400') !== -1
            ? payload.avatar.replace('/resize/400', '/original')
            : payload.avatar;
      })
      .addCase(updateUserInfoAction.rejected, (state, { payload }) => {
        state.updateUser.loading = false;
        state.updateUser.data = null;
        state.updateUser.error = payload;
      })
      .addCase(updatePasswordAction.pending, state => {
        state.updateUser.loading = true;
        state.updateUser.data = null;
        state.updateUser.error = null;
      })
      .addCase(updatePasswordAction.fulfilled, (state, { payload }) => {
        state.updateUser.loading = false;
        state.updateUser.data = payload;
        state.updateUser.error = null;
      })
      .addCase(updatePasswordAction.rejected, (state, { payload }) => {
        state.updateUser.loading = false;
        state.updateUser.data = null;
        state.updateUser.error = payload;
      })
      .addCase(updateUserIntroAction.pending, state => {
        state.updateUser.loading = true;
        state.updateUser.data = null;
        state.updateUser.error = null;
      })
      .addCase(updateUserIntroAction.fulfilled, (state, { payload }) => {
        state.updateUser.loading = false;
        state.updateUser.data = 'success';
        state.updateUser.error = null;
        state.userIntro.data = payload;
        (state.userData as User).introduce = payload.summary as string;
      })
      .addCase(updateUserIntroAction.rejected, (state, { payload }) => {
        state.updateUser.loading = false;
        state.updateUser.data = null;
        state.updateUser.error = payload;
      })
      .addCase(destroyUserAction.pending, state => {
        state.destroyUser.loading = true;
        state.destroyUser.data = null;
        state.destroyUser.error = null;
      })
      .addCase(destroyUserAction.fulfilled, (state, { payload }) => {
        state.destroyUser.loading = false;
        state.destroyUser.data = payload;
        state.destroyUser.error = null;
        state.userData = null;
      })
      .addCase(destroyUserAction.rejected, (state, { payload }) => {
        state.destroyUser.loading = false;
        state.destroyUser.data = null;
        state.destroyUser.error = payload;
      })
      .addCase(addPostLikeAction.pending, state => {
        state.addPostLike.loading = true;
        state.addPostLike.data = null;
        state.addPostLike.error = null;
      })
      .addCase(addPostLikeAction.fulfilled, (state, { payload }) => {
        state.addPostLike.loading = false;
        state.addPostLike.data = payload;
        state.addPostLike.error = null;
        (state.userData as User).likedPosts = (state.userData as User).likedPosts.concat({
          id: payload.PostId,
        });
      })
      .addCase(addPostLikeAction.rejected, (state, { payload }) => {
        state.addPostLike.loading = false;
        state.addPostLike.data = null;
        state.addPostLike.error = payload;
      })
      .addCase(removePostLikeAction.pending, state => {
        state.removePostLike.loading = true;
        state.removePostLike.data = null;
        state.removePostLike.error = null;
      })
      .addCase(removePostLikeAction.fulfilled, (state, { payload }) => {
        state.removePostLike.loading = false;
        state.removePostLike.data = payload;
        state.removePostLike.error = null;
        (state.userData as User).likedPosts = (state.userData as User).likedPosts.filter(
          post => post.id !== payload.PostId
        );
      })
      .addCase(removePostLikeAction.rejected, (state, { payload }) => {
        state.removePostLike.loading = false;
        state.removePostLike.data = null;
        state.removePostLike.error = payload;
      })
      // 로드 블로그 유저 정보
      .addCase(loadBlogUserAction.fulfilled, (state, { payload }) => {
        state.loadBlogUser.loading = false;
        state.loadBlogUser.data = payload;
        state.loadBlogUser.error = null;
      })
      .addCase(subscribeAction.pending, state => {
        state.addSubscribe.loading = true;
        state.addSubscribe.data = null;
        state.addSubscribe.error = null;
      })
      .addCase(subscribeAction.fulfilled, (state, { payload }) => {
        state.addSubscribe.loading = false;
        state.addSubscribe.data = payload;
        state.addSubscribe.error = null;
        if (state.userData) {
          state.userData.writers?.push({ id: payload.writerId });
        } //  로그인 유저의 작가구독목록에 추가
        if ((state.loadBlogUser.data?.suberCount as number) >= 0) {
          (state.loadBlogUser.data as BlogUserData).suberCount += 1;
        } // 블로그 유저의 구독자수 +1 증가
      })
      .addCase(subscribeAction.rejected, (state, { payload }) => {
        state.addSubscribe.loading = false;
        state.addSubscribe.data = null;
        state.addSubscribe.error = payload;
      })
      .addCase(unSubscribeAction.pending, state => {
        state.removeSubscribe.loading = true;
        state.removeSubscribe.data = null;
        state.removeSubscribe.error = null;
      })
      .addCase(unSubscribeAction.fulfilled, (state, { payload }) => {
        state.removeSubscribe.loading = false;
        state.removeSubscribe.data = payload;
        state.removeSubscribe.error = null;
        if (state.userData) {
          state.userData.writers = state.userData.writers?.filter(
            writer => writer.id !== payload.writerId
          ); // 로그인 유저의 작가구독목록에서 제거
        }
        if ((state.loadBlogUser.data?.suberCount as number) >= 0) {
          (state.loadBlogUser.data as BlogUserData).suberCount -= 1;
        } // 블로그 유저의 구독자수 -1 감소
      })
      .addCase(unSubscribeAction.rejected, (state, { payload }) => {
        state.removeBlogFollow.loading = false;
        state.removeBlogFollow.data = null;
        state.removeBlogFollow.error = payload;
      })
      .addCase(loadBlogFollowListAction.pending, state => {
        state.loadBlogFollowList.loading = true;
        state.loadBlogFollowList.data = null;
        state.loadBlogFollowList.error = null;
      })
      .addCase(loadBlogFollowListAction.fulfilled, (state, { payload }) => {
        state.loadBlogFollowList.loading = false;
        state.loadBlogFollowList.data = payload;
        state.loadBlogFollowList.error = null;
      })
      .addCase(loadBlogFollowListAction.rejected, (state, { payload }) => {
        state.loadBlogFollowList.loading = false;
        state.loadBlogFollowList.data = null;
        state.loadBlogFollowList.error = payload;
      })
      .addCase(subscribeListAction.pending, state => {
        state.addBlogFollowList.loading = true;
        state.addBlogFollowList.data = null;
        state.addBlogFollowList.error = null;
      })
      .addCase(subscribeListAction.fulfilled, (state, { payload }) => {
        state.addBlogFollowList.loading = false;
        state.addBlogFollowList.data = payload;
        state.addBlogFollowList.error = null;
        if (state.userData) {
          state.userData.writers?.push({ id: payload.writerId });
        } // 구독 리스트에서 로그인 유저의 작가구독목록에 추가
      })
      .addCase(subscribeListAction.rejected, (state, { payload }) => {
        state.addBlogFollowList.loading = false;
        state.addBlogFollowList.data = null;
        state.addBlogFollowList.error = payload;
      })
      .addCase(unSubscribeListAction.pending, state => {
        state.removeBlogFollowList.loading = true;
        state.removeBlogFollowList.data = null;
        state.removeBlogFollowList.error = null;
      })
      .addCase(unSubscribeListAction.fulfilled, (state, { payload }) => {
        state.removeBlogFollowList.loading = false;
        state.removeBlogFollowList.data = payload;
        state.removeBlogFollowList.error = null;
        if (state.userData) {
          state.userData.writers = state.userData.writers?.filter(
            writer => writer.id !== payload.writerId
          );
        } // 구독 리스트에서 로그인 유저의 작가구독목록에서 제거
        if (
          state.userData?.id === state.loadBlogUser.data?.id &&
          (state.loadBlogUser.data?.suberCount as number) >= 0
        ) {
          (state.loadBlogUser.data as BlogUserData).writerCount -= 1;
        } // 로그인 유저 아이디와 불러온 블로그 유저의 아이디가 같으면 구독 해지시에만, 관심작가 수 -1
      })
      .addCase(unSubscribeListAction.rejected, (state, { payload }) => {
        state.removeBlogFollowList.loading = false;
        state.removeBlogFollowList.data = null;
        state.removeBlogFollowList.error = payload;
      });
  },
});
export default userSlice.reducer;
