import styled from 'styled-components';
import { Search } from '../organisms/search/Index';
import { IssueTable } from '../organisms/IssueTable';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { fetchIssuesAsync, resetStatus } from '../../redux/issueSlice';
import { NotificationManager } from 'react-notifications';

export const Issue = () => {
  const dispatch = useDispatch();
  const issueList = useSelector((state) => state.issues.list);
  const issueStatus = useSelector((state) => state.issues.status);
  const issueLastAction = useSelector((state) => state.issues.lastAction);
  const issueCount = useSelector((state) => state.issues.closeCount);

  useEffect(() => {
    dispatch(fetchIssuesAsync());
  }, [dispatch]);

  useEffect(() => {
    const messages = {
      failed: {
        fetch: '一覧を取得できませんでした',
        create: 'Issueを作成できませんでした',
        update: 'Issueを更新できませんでした',
        close: 'Issueをcloseできませんでした',
      },
      succeeded: {
        create: 'Issueを作成しました',
        update: 'Issueを更新しました',
        close: issueCount === null ? 'Issueをcloseしました' : `Issueを${issueCount} 件 closeしました`,
      },
    };

    if (issueStatus === 'failed' && messages.failed[issueLastAction]) {
      NotificationManager.error(messages.failed[issueLastAction], '失敗', 10000);
    } else if (issueStatus === 'succeeded' && messages.succeeded[issueLastAction] && issueLastAction !== 'fetch') {
      NotificationManager.success(messages.succeeded[issueLastAction], `${issueLastAction} 成功`, 10000);
    }
    return () => {
      dispatch(resetStatus());
    };
  }, [issueStatus, issueLastAction, issueCount, dispatch]);

  const [keyword, setKeyword] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredIssues = useMemo(() => {
    return issueList.filter((issue) => issue.title.toLowerCase().includes(keyword.toLowerCase()));
  }, [issueList, keyword]);

  const onChange = (keyword) => {
    setKeyword(keyword);
  };

  return (
    <SIssueContainer>
      <SIssueWrapper>
        <SIssueGroup>
          <Search onChange={onChange} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
          <IssueTable issues={filteredIssues} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
        </SIssueGroup>
      </SIssueWrapper>
    </SIssueContainer>
  );
};
const SIssueContainer = styled.div`
  max-width: 896px;
  margin: 0 auto;
  padding: 32px 16px;
`;

const SIssueWrapper = styled.div`
  padding: 16px 16px;
`;

const SIssueGroup = styled.div`
  padding: 16px 16px;
  margin-top: 16px;
`;
