import React, { useCallback, useState } from 'react';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from '@pages/SignUp/styles';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const LogIn = () => {
  const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [logInError, setLogInError] = useState(false);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post(
          'http://localhost:3095/api/users/login',
          { email, password },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          mutate(res.data, false); //OPTIMISTIC UI (true) : 먼저 성공했다고 생각하고나서 점검하는것
        })
        .catch((error) => {
          setLogInError(error.response?.status === 401);
        });
    },
    [email, password, mutate],
  );
  if (data === undefined) {
    return <div>로딩중...</div>;
  }
  if (data) {
    //data에 내정보가 들어있으면 실행 : 로그인하는순간 바로 워크스페이스 채널로 이동
    return <Redirect to="/workspace/channel" />;
  }
  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};
export default LogIn;
