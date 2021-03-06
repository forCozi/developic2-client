import { BlogPicstory } from '../blog';
import { Subscriber } from '../user';

export type ListState = {
  pageData:
    | Record<string, never>
    | FeedPageDataType
    | DiscoverPageDataType
    | MainPageDataType
    | SearchPageDataType;
  getSearchList: { loading: boolean; data: null | unknown; error: null | unknown };
  getArchiveList: { loading: boolean; data: null | unknown; error: null | unknown };
  getFeedList: { loading: boolean; data: null | unknown; error: null | unknown };
  getWriterList: { loading: boolean; data: null | unknown; error: null | unknown };
  getHashtagList: { loading: boolean; data: null | unknown; error: null | unknown };
  getTaggedPostList: { loading: boolean; data: null | unknown; error: null | unknown };
  getPostList: { loading: boolean; data: null | unknown; error: null | unknown };
  loadMore: boolean;
  hasMore: boolean;
};

export type PostUser = {
  id: number;
  nickname: string;
  avatar: string;
  introduce: string;
  last_post?: Date;
  hasMoreSearchs?: boolean;
  subscribers?: Subscriber[];
  writers?: Subscriber[];
  Posts?: SearchUserPost[];
};

export type SearchPageDataType = {
  post: PostType[];
  writer: PostUser[];
  picstory: BlogPicstory[];
};

export type PostType = {
  id: number;
  title: string;
  summary: string;
  hits: number;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  User: PostUser;
  likers?: { id: number }[];
  HashTags?: { id: number; name: string }[];
};

export type ArchiveDataType = {
  id: number;
  poster: string;
  cost: number;
  title: string;
  author: string;
  startDate: string;
  endDate: string;
  User: {
    id: number;
    email: string;
    name: string;
    avatar: string;
  };
};

export type MainPageDataType = {
  archive: ArchiveDataType[];
  writer: PostUser[];
  post: PostType[];
};

export type HashtagType = {
  id: number;
  name: string;
};
export type FeedPageDataType = {
  writer: PostUser[];
  post: PostType[];
};
export type DiscoverPageDataType = {
  hashtag: HashtagType[];
  post: PostType[];
};
export type GetWriterListPayload = {
  type: 'suber' | 'all';
  limit?: number;
  userId?: number;
};
export type GetHashTagListPayload = {
  sort?: 'recent' | 'popular';
  term?: 'all' | 'year' | 'month' | 'week' | 'day';
  limit?: number;
  offset?: number;
};

export type GetTaggedPostListPayload = {
  sort?: 'recent' | 'popular';
  limit?: number;
  offset?: number;
  HashtagId?: number;
  HashtagName?: string;
};

export type GetPostListPayload = {
  sort?: 'recent' | 'popular';
  term?: 'all' | 'year' | 'month' | 'week' | 'day';
  limit?: number;
  offset?: number;
};

export type GetArchiveListPayload = {
  limit?: number;
  offset?: number;
  User?: PostUser;
  likers?: { id: number }[];
};

export type SearchUserPost = {
  id: number;
  thumbnail: string;
};

export type LoadSearchListPayload = {
  query: string | string[] | undefined;
  sort?: 'recent' | 'popular';
  type: 'post' | 'writer' | 'picstory';
  offset?: number;
  limit?: number;
  term?: 'all' | 'month' | 'week' | 'day';
};
