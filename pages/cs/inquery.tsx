import styled from '@emotion/styled';
import Head from 'next/head';
import axios from 'axios';
import React, { useState } from 'react';
import CustomInput from '../../components/Input/CustomInput';
import CustomSelect from '../../components/Input/CustomSelect';
import CustomTextarea from '../../components/Input/CustomTextarea';
import PageLabel from '../../components/Label/PageLabel';
import PageWithNavLayout from '../../components/Layout/PageWithNavLayout';
import useInput from '../../hooks/useInput';
import { CSNavData } from '../../utils/data';
import useUI from '../../modules/ui/hooks';

const InqueryContainer = styled.section`
  display: flex;
  margin-bottom: 100px;
  .cs__left {
    flex: 1;
  }
  .cs__right {
    display: flex;
    justify-content: flex-end;
    form {
      width: 450px;
      & > div {
        margin-bottom: 20px;
      }
      & > p {
        position: relative;
        top: -10px;
        color: #b93939;
        text-align: end;
        font-size: ${({ theme }) => theme.fontSize.small};
      }
      .btn__group {
        display: flex;
        justify-content: flex-end;
        button {
          color: ${({ theme }) => theme.textColor.initial};
          padding: 5px 10px;
          cursor: pointer;
          font-size: 16px;
          outline: none;
          border: none;
          border-radius: 0;
          background: none;
          border-bottom: 1px solid ${({ theme }) => theme.textColor.initial};
          &:hover {
            font-weight: 600;
          }
        }
        button + button {
          margin-left: 30px;
        }
      }
    }
  }
  @media ${({ theme }) => theme.viewPortSize.mobile} {
    padding: 0 10px;
    flex-direction: column;
    .cs__left {
      div {
        padding-left: 0;
        h1 {
          font-size: 32px;
        }
      }
      img {
        display: none;
      }
    }
    .cs__right {
      margin: 20px 0 30px 0;
    }
  }
`;

const inqueryType = [
  { id: 1, value: '이용문의' },
  { id: 2, value: '전시정보 수정요청' },
  { id: 3, value: '기타문의' },
];
const initialState = {
  email: '',
  contact: '',
  content: '',
};
export default function Inquery(): JSX.Element {
  const [error, setError] = useState(initialState);
  const [btnText, setBtnText] = useState('전송');
  const [type, setType] = useState(inqueryType[0].value);
  const [email, onChangeEmail, setEmail] = useInput('');
  const [contact, onChangeContact, setContact] = useInput('');
  const [content, onChangeContent, setContent] = useInput('');
  const { toastOpenDispatch } = useUI();

  const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };
  const onSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      setError({ ...initialState, email: '이메일을 입력해주세요.' });
      return;
    } else if (!contact.trim()) {
      setError({ ...initialState, contact: '연락처를 입력해주세요.' });
      return;
    } else if (!content.trim()) {
      setError({ ...initialState, content: '문의내용을 입력해주세요.' });
      return;
    }
    setBtnText('전송중..');
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_HOST}/cs/inquery`, {
        email,
        contact,
        content,
        type,
      })
      .then(() => {
        toastOpenDispatch('소중한 의견 감사합니다.');
        setType(inqueryType[0].value);
        setEmail('');
        setContact('');
        setContent('');
        setBtnText('전송');
        setError(initialState);
      });
  };
  return (
    <PageWithNavLayout pageName="고객센터" pageDesc="Customer Center" navData={CSNavData}>
      <Head>
        <title>고객센터 | 문의</title>
      </Head>
      <InqueryContainer>
        <div className="cs__left">
          <PageLabel
            width={490}
            text="여러분의 소중한 의견을 전달해 주세요"
            desc="빠른 시일 내에 응답해 드리겠습니다."
          />
          <img src="/cs_banner.png" alt="cs_banner.png" />
        </div>
        <div className="cs__right">
          <form onSubmit={onSend}>
            <CustomInput title="이메일" value={email} onChange={onChangeEmail} />
            <p>{error.email}</p>
            <CustomInput title="연락처" value={contact} onChange={onChangeContact} />
            <p>{error.contact}</p>
            <CustomSelect
              title="문의유형"
              value={type}
              onChange={onChangeType}
              data={inqueryType}
            />
            <CustomTextarea title="문의내용" value={content} onChange={onChangeContent} />
            <p>{error.content}</p>
            <div className="btn__group">
              <button type="submit">{btnText}</button>
              <button type="reset">초기화</button>
            </div>
          </form>
        </div>
      </InqueryContainer>
    </PageWithNavLayout>
  );
}
