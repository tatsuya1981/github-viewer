import styled from 'styled-components';
import { Search } from '../organisms/search/Index';
import { IssueTable } from '../organisms/IssueTable';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { fetchIssuesAsync } from '../../redux/issueSlice';

export const Issue = () => {
  const dispatch = useDispatch();
  const issueList = useSelector((state) => state.issues.list);
  useEffect(() => {
    dispatch(fetchIssuesAsync());
  }, [dispatch]);

  console.log(issueList);
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
