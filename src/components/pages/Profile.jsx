import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { githubUser } from '../../redux/user';

export const Profile = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(githubUser('tatsuya1981'));
  }, [dispatch]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <SUserContainer>
      <SUserWrapper>
        <SProfileTitle>Profile</SProfileTitle>
        <SUserProfileContainer>
          <SProfileContents>
            <SUserTitle>プロフィール</SUserTitle>
            <SUserInfo>
              <SAvatarImage src={user.avatar_url} alt="profile" />
            </SUserInfo>
          </SProfileContents>
          <SProfileContents>
            <div>
              <SUserTitle>ユーザ名</SUserTitle>
              <SUserInfo>{user.login}</SUserInfo>
            </div>
            <div>
              <SUserTitle>アカウントURL</SUserTitle>
              <SUserInfo>
                <a href={user.html_url}>{user.html_url}</a>
              </SUserInfo>
            </div>
            <div>
              <SUserTitle>フォロー数</SUserTitle>
              <SUserInfo>{user.following}</SUserInfo>
            </div>
            <div>
              <SUserTitle>フォロワー数</SUserTitle>
              <SUserInfo>{user.followers}</SUserInfo>
            </div>
            <div>
              <SUserTitle>パブリックレポジトリ数</SUserTitle>
              <SUserInfo>{user.public_repos}</SUserInfo>
            </div>
            <div>
              <SUserTitle>プライベートレポジトリ数</SUserTitle>
              <SUserInfo>{user.privateReposCount}</SUserInfo>
            </div>
          </SProfileContents>
        </SUserProfileContainer>
      </SUserWrapper>
    </SUserContainer>
  );
};

const SUserContainer = styled.div`
  max-width: 896px;
  margin: 0 auto;
  padding: 32px 16px;
`;

const SUserWrapper = styled.div`
  padding: 16px;
  margin: auto;
`;

const SProfileTitle = styled.h1`
  font-size: 2rem;
  padding: 0px;
  margin: 0px;
  text-align: left;
`;

const SUserProfileContainer = styled.div`
  margin: 32px 0;
  display: flex;
  text-align: left;
  border-radius: 6px;
  border: 1px solid rgb(225, 228, 232);
`;

const SProfileContents = styled.div`
  padding: 16px;
  width: 50%;
`;

const SUserTitle = styled.label`
  color: rgb(88, 96, 105);
`;

const SUserInfo = styled.p`
  margin: 0;
  padding: 16px 0px;
  font-size: 1.2rem;
`;

const SAvatarImage = styled.img`
  width: 120px;
  height: 120px;
  min-width: 60px;
`;
