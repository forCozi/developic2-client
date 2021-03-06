import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const PageWithNavContainer = styled.main`
  max-width: 1150px;
  margin: 0 auto;
  .title {
    margin: 30px 0;
  }
  & > section {
    display: flex;
    justify-content: space-between;
    .cs__left {
      flex: 1;
      img {
        margin-top: 50px;
        margin-left: 30px;
        width: 500px;
      }
    }
    .cs__right {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
  @media ${({ theme }) => theme.viewPortSize.mobile} {
    width: 100%;
    & > section {
      .cs__left {
        display: none;
      }
    }
  }
  @media ${({ theme }) => theme.viewPortSize.mobile} {
    padding: 0 10px;
    .title__label {
      h4 {
        font-size: 24px;
      }
    }
    & > section {
      flex-direction: column;
    }
  }
`;

export const slideToLeft = keyframes`
from{
  transform:translateX(500px)
}
to{
  transform:translateX(0)
}
`;

export const LayoutContainer = styled.div`
  transition: background-color 0.3s;
  position: relative;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background.initial};
  padding-top: 72px;
  padding-bottom: 150px;
  @media ${({ theme }) => theme.viewPortSize.mobile} {
    overflow: hidden;
  }
`;
export const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.primary[1]};
  color: #fff;
  .inner {
    max-width: 1150px;
    height: 150px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .menu__list {
      .logo {
        display: block;
        font-size: 24px;
        font-weight: 600;
        letter-spacing: 2.88px;
      }
      p {
        margin: 10px 0;
        font-size: 12px;
      }
      ul {
        font-size: 12px;
        display: flex;
        li {
          margin-right: 10px;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .social__list {
      display: flex;
      gap: 25px;
      li {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.primary.pLight};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        cursor: pointer;
      }
    }
  }
  @media ${({ theme }) => theme.viewPortSize.mobile} {
    .inner {
      flex-direction: column;
      max-width: 100%;
      justify-content: space-evenly;
      .menu__list {
        display: flex;
        flex-direction: column;
        align-items: center;
        .logo {
          margin-top: 10px;
        }
        p {
        }
      }
    }
  }
`;
export const HeaderContainer = styled.header<{ active: boolean }>`
  top: 0;
  position: fixed;
  width: 100%;
  background-color: ${({ theme }) => theme.background.initial};
  transition: background-color 0.3s;
  z-index: 1000;
  .inner {
    max-width: 1150px;
    height: 72px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header--left {
      display: flex;
      align-items: center;
      .logo {
        display: block;
        font-size: 24px;
        font-weight: 700;
        color: ${({ theme }) => theme.textColor.initial};
        letter-spacing: 2.88px;
      }
      ul {
        margin-left: 20px;
        display: flex;
        align-items: center;
        li {
          display: inline-flex;
          align-items: center;
          padding: 5px 10px;
          cursor: pointer;
          color: ${({ theme }) => theme.textColor.initial};
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .header--right {
      display: flex;
      align-items: center;
      padding-top: 3px;
      & > span {
        color: ${({ theme }) => theme.textColor.initial};
        display: inline-block;
        padding: 5px 10px 2px 10px;
        font-weight: 600;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      & > button {
        transform: scale(0.7);
      }
      .user-menu__btn {
        display: flex;
        align-items: center;
        cursor: pointer;
        span {
          display: block;
          padding: 11px 4px;
          font-size: 14px;
          color: ${({ theme }) => theme.textColor.initial};
        }
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          object-fit: cover;
        }
        &:hover span {
          text-decoration: underline;
        }
      }
    }
  }
  transition: transform 0.3s;
  ${({ active }) =>
    !active &&
    css`
      transform: translateY(-73px);
    `};
  @media ${({ theme }) => theme.viewPortSize.mobile} {
    .inner {
      max-width: 100%;
      .header--left {
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
        .logo {
          font-size: 20px;
          padding: 5px 10px;
        }
        ul {
          margin-left: 0px;
          align-items: flex-start;
          li {
            font-size: 14px;
          }
        }
      }
      .header--right {
        position: absolute;
        right: 10px;
        & > button {
          display: none;
        }
      }
    }
  }
`;

export const UserMenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: pointer;
  z-index: 1001;
  .user-menu__drawer {
    cursor: initial;
    position: absolute;
    height: 100%;
    width: 340px;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.background.modal};
    color: ${({ theme }) => theme.textColor.initial};
    animation: ${slideToLeft} 0.4s;
    box-shadow: 0 0 2px #777;
    & > h2 {
      margin: 15px 0;
      width: 200px;
      text-align: end;
      line-height: 1.2;
      font-size: 16px;
      strong {
        font-size: 20px;
      }
    }
    & > p {
      cursor: pointer;
      display: flex;
      width: 200px;
      margin: 10px 0;
      font-weight: 500;
      padding: 10px 0;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid ${({ theme }) => theme.textColor.initial};
      svg {
        transition: 0.3s;
      }
      &:hover > svg {
        transform: translateX(20px);
      }
    }
    & > ul {
      width: 200px;
      li {
        h3 {
          font-size: 16px;
          margin-top: 15px;
          padding: 8px 0;
          border-bottom: 1px solid ${({ theme }) => theme.textColor.initial};
        }
        ul {
          width: 100%;
          li {
            cursor: pointer;
            padding: 4px 0;
            text-align: end;
            line-height: 1.6;
            font-size: 14px;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
      & > li:last-child {
        cursor: pointer;
        color: #e96363;
      }
    }
    .dark-mode__btn {
      margin-top: 40px;
    }
    .close__btn {
      position: absolute;
      top: 5%;
      left: 12%;
      font-size: 36px;
      transform: rotate(45deg);
      display: none;
    }
  }
  @media ${({ theme }) => theme.viewPortSize.mobile} {
    .user-menu__drawer {
      justify-content: center;
      width: 100%;
      & > h2,
      & > p,
      & > ul {
        width: 80%;
      }
      .dark-mode__btn {
        margin-top: 20px;
      }
      .close__btn {
        display: initial;
      }
    }
  }
`;

export const BlogUserProfileBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 1.875em;
  font-size: ${({ theme }) => theme.fontSize.base};
  .profile__top {
    text-align: center;
    margin-bottom: 1.286em;
    img {
      border-radius: 50%;
      width: 6.429em;
      height: 6.429em;
    }
    h1 {
      margin: 1em 0;
      font-weight: 600;
      font-size: ${({ theme }) => theme.fontSize.xl};
    }
    p {
      margin-bottom: 1.071em;
    }
  }
  .profile__bottom {
    display: flex;
    justify-content: space-between;
    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    strong {
      margin-bottom: 0.286em;
    }
    span {
      font-weight: ${({ theme }) => theme.fontWeight.bold};
      padding: 0.357em;
    }
    .follow__count {
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .follower {
      margin-right: 4.286em;
      strong {
      }
      span {
      }
    }
  }
  @media ${({ theme }) => theme.viewPortSize.mobile} {
    margin: 0 auto;
    margin-bottom: 1.429em;
    .profile__top {
      h1 {
        font-size: ${({ theme }) => theme.fontSize.lg};
      }
    }
  }
`;
export const PostDetailContainer = styled.div`
  max-width: 850px;
  margin: 0 auto;
  margin-bottom: 100px;
  padding: 0 16px;
  word-break: keep-all;
  .blog__head {
    margin: 0 auto;
    color: ${({ theme }) => theme.textColor.initial};
    padding-top: 150px;
    & > h1 {
      font-size: ${({ theme }) => theme.fontSize.titleSize};
    }
    & > article {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      margin-top: 40px;
      img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
      }
      strong {
        font-size: ${({ theme }) => theme.fontSize.xl};
        font-weight: ${({ theme }) => theme.fontWeight.medium};
        margin-left: 10px;
      }
      span {
        font-size: ${({ theme }) => theme.fontSize.base};
        color: ${({ theme }) => theme.textColor.lighten};
        transform: translateY(3px);
        margin-left: 10px;
      }
    }
    & > div {
      display: flex;
      justify-content: space-between;
      & > ul {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        min-height: 70px;
        align-items: flex-end;
        padding-top: 30px;
      }
      & > .post__menu {
        margin-left: 50px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        p {
          text-align: end;
          color: ${({ theme }) => theme.textColor.lighten};
          font-size: ${({ theme }) => theme.fontSize.base};
        }
        ul {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-top: 20px;
          font-size: ${({ theme }) => theme.fontSize.base};
          li {
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 5px 10px 5px 10px;
            svg {
              margin-right: 5px;
            }
          }
          li + li {
            border-left: 1px solid ${({ theme }) => theme.textColor.initial};
          }
        }
      }
    }
  }
  .blog__posting {
    margin-top: 35px;
    position: relative;
    }
  }

  @media ${({ theme }) => theme.viewPortSize.mobile} {
    .blog__head {
      & > h1 {
        font-size: 28px;
        white-space: normal;
        line-height: 1.3;
        max-height: 108px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      padding-top: 60px;
      & > article {
        margin-top: 20px;
      }
      & > div {
        flex-direction: column;
        & > ul {
          padding: 10px 0;
          min-height: auto;
          li {
            font-size: 14px;
          }
        }
      }
    }
    .blog__posting {
      & > img {
        width: 100%;
        height: auto;
        max-height: 450px;
      }
    }
  }
`;

export const ScrollBar = styled.div<{ width: number }>`
  position: fixed;
  height: 5px;
  left: 0;
  right: 0;
  top: 0;
  width: 0;
  background-color: ${({ theme }) => theme.primary[1]};
  transition: 0.4s;
  ${({ width }) =>
    width &&
    css`
      width: ${width}%;
    `}
`;

export const BlogwithProfileContainer = styled.main`
  margin: 40px auto;
  max-width: 850px;
  min-height: 650px;
  position: relative;
  color: ${({ theme }) => theme.textColor.initial};
  @media ${({ theme }) => theme.viewPortSize.tablet} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  @media ${({ theme }) => theme.viewPortSize.mobile} {
    margin: 25px auto;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: ${({ theme }) => theme.fontSize.base};
    .block {
      background: ${({ theme }) => theme.grayScale[4]};
      height: 1em;
      margin: 0 -1rem;
      box-shadow: 0px 4px 4px -4px rgb(0, 0, 0, 0.03) inset,
        0px -4px 4px -4px rgb(0, 0, 0, 0.04) inset;
    }
  }
  @media ${({ theme }) => theme.viewPortSize.mobile} {
  }
`;
export const UserProfileWithTab = styled.div`
  margin: 0 auto;
`;

export const BlogPostContainer = styled.section`
  max-width: 850px;
  margin: 0 auto;
`;

export const BlogPicstoryContainer = styled.section`
  max-width: 850px;
  margin: 0 auto;
`;

export const BlogUserInfoContainer = styled.section`
  max-width: 850px;
  margin: 0 auto;
`;
