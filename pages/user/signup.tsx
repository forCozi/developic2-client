import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Head from 'next/head';
import styled from '@emotion/styled';
import PageLabel from '../../components/Label/PageLabel';
import TitleLabel from '../../components/Label/TitleLabel';
import CustomInput from '../../components/Input/CustomInput';
import CustomCheckBox from '../../components/Input/CustomCheckBox';
import SignupAuthModal from '../../components/Modal/SignupAuthModal';
import SquareBtn from '../../components/Button/SquareBtn';
import useInput from '../../hooks/useInput';
import useUI from '../../modules/ui/hooks';
import useUser from '../../modules/user/hooks';

const SignupContainer = styled.div`
  max-width: 1150px;
  margin: 60px auto;
  .signup__container {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    form {
      width: 350px;
      margin-left: 60px;
      margin-top: 10px;
      .signup__form {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        & > div {
          margin-bottom: 5px;
        }
        & > p {
          font-size: 12px;
          color: #b92961;
          text-align: right;
          height: 15px;
          margin-bottom: 5px;
        }
      }
      article {
        display: flex;
        justify-content: center;
        align-items: center;
        div {
          width: auto;
        }
        a {
          color: ${({ theme }) => theme.textColor.lighten};
          font-size: ${({ theme }) => theme.fontSize.small};
          padding-top: 5px;
          margin-left: 10px;
        }
      }
      .btn__wrapper {
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
        button {
          flex: 1;
          height: 35px;
        }
        button + button {
          margin-left: 30px;
        }
      }
    }
    section {
      width: 500px;
      margin-right: 60px;
      img {
        padding-top: 30px;
        width: 100%;
      }
    }
  }
  @media ${({ theme }) => theme.viewPortSize.mobile} {
    margin: 20px auto;
    padding: 0 10px;
    .signup__container {
      margin-top: 20px;
      flex-direction: column;
      form {
        width: 100%;
        margin-left: 0;
      }
      section {
        display: none;
      }
    }
  }
`;
export default function Signup(): JSX.Element {
  const { toastOpenDispatch } = useUI();
  const { signup, signupDispatch } = useUser();
  const [term, setTerm] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | boolean>(true);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | boolean>(true);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState<string | boolean>(true);
  const [name, onChangeName] = useInput('');
  const [nickname, onChangeNickname] = useInput('');

  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (
      !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(
        e.target.value
      )
    )
      setEmailError('????????? ????????? ???????????? ??????????????????.');
    else setEmailError('');
  }, []);

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (!/^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]|.*[0-9]).{8,24}$/.test(e.target.value))
      setPasswordError('8~24??? ??????????????????, ??????, ???????????? ??????????????????.');
    else setPasswordError('');
  }, []);
  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      if (e.target.value !== password)
        setPasswordCheckError('??????????????? ???????????? ??????????????????.');
      else setPasswordCheckError('');
    },
    [password]
  );
  const onChangeTerm = useCallback(() => {
    setTerm(current => !current);
  }, []);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailError || passwordError || passwordCheckError || !term) {
      return toastOpenDispatch('???????????? ???????????? ??????????????????.');
    }
    signupDispatch({ email, password, name, nickname });
  };

  useEffect(() => {
    if (signup.data) {
      setAuthOpen(state => !state);
      toastOpenDispatch('????????????????????? ??????????????????.');
    }
  }, [signup]);

  return (
    <Layout>
      <Head>
        <title>DEVELOPIC | ????????????</title>
      </Head>
      <SignupContainer>
        <TitleLabel title="????????????" desc="Sign up" />
        <div className="signup__container">
          <form onSubmit={onSubmit}>
            <div className="signup__form">
              <CustomInput
                type="email"
                title="?????????"
                onChange={onChangeEmail}
                value={email}
              />
              <p>{emailError}</p>
              <CustomInput
                type="password"
                title="????????????"
                onChange={onChangePassword}
                value={password}
              />
              <p>{passwordError}</p>
              <CustomInput
                type="password"
                title="???????????? ??????"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
              <p>{passwordCheckError}</p>
              <CustomInput title="??????" value={nickname} onChange={onChangeNickname} />
              <p></p>
              <CustomInput title="??????" value={name} onChange={onChangeName} />
              <p></p>
            </div>
            <article>
              <CustomCheckBox
                title="????????? ???????????????."
                onChange={onChangeTerm}
                value={term}
              />
              <Link href="/cs/term">????????????</Link>
            </article>
            <div className="btn__wrapper">
              <SquareBtn>?????????</SquareBtn>
              <SquareBtn type="submit">????????????</SquareBtn>
            </div>
          </form>
          <section>
            <PageLabel text="Develop + Pic" desc="?????? ?????? ????????????" />
            <img src="/cs_banner.png" alt="banner" />
          </section>
        </div>
      </SignupContainer>
      {authOpen && (
        <SignupAuthModal email={email} onClose={() => setAuthOpen(!authOpen)} />
      )}
    </Layout>
  );
}
