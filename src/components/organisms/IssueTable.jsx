import styled from 'styled-components';
import { useEffect, useState } from 'react';
import IssueModal from './IssueModal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../redux/modalSlice';
import { setDate } from '../../date';

export const IssueTable = ({ issues = [], selectedItems, setSelectedItems }) => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isOpen);

  const allSelected = issues.length > 0 && selectedItems.length === issues.length;

  useEffect(() => {
    setSelectedItems((prevSelected) => prevSelected.filter((id) => issues.some((issue) => issue.number === id)));
  }, [issues, setSelectedItems]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(issues.map((issue) => issue.number));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (issueNumber) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(issueNumber)) {
        return prevSelected.filter((id) => id !== issueNumber);
      } else {
        return [...prevSelected, issueNumber];
      }
    });
  };

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    setSelectedIssue(null);
    dispatch(closeModal());
  };

  return (
    <SIssueTableWrapper>
      <SIssueTable>
        <thead>
          <tr>
            <SIssueCheckBox>
              <input type="checkbox" checked={allSelected} onChange={handleSelectAll}></input>
            </SIssueCheckBox>
            <SIssueTableTitle></SIssueTableTitle>
            <SIssueTableTitle>ステータス</SIssueTableTitle>
            <SIssueTableTitle>作成者</SIssueTableTitle>
            <SIssueTableTitle>作成日付</SIssueTableTitle>
            <SIssueTableTitle>更新日付</SIssueTableTitle>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <SIssueTableRow key={issue.number} onClick={() => handleIssueClick(issue)}>
              <SIssueBodyCheckBox
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(issue.number)}
                  onChange={() => handleSelectItem(issue.number)}
                  onClick={(e) => e.stopPropagation()}
                ></input>
              </SIssueBodyCheckBox>
              <SIssueBodyTableTitle>
                <SIssueBodyTableLink href={issue.html_url} onClick={(event) => event.stopPropagation()}>
                  {issue.title}
                </SIssueBodyTableLink>
              </SIssueBodyTableTitle>
              <SIssueBodyTableTitle>{issue.state}</SIssueBodyTableTitle>
              <SIssueBodyTableTitle>{issue.user.login}</SIssueBodyTableTitle>
              <SIssueBodyTableTitle>{setDate(issue.created_at)}</SIssueBodyTableTitle>
              <SIssueBodyTableTitle>{setDate(issue.updated_at)}</SIssueBodyTableTitle>
            </SIssueTableRow>
          ))}
        </tbody>
      </SIssueTable>
      {selectedIssue && <IssueModal issue={selectedIssue} onClose={handleCloseModal} isOpen={isModalOpen} />}
    </SIssueTableWrapper>
  );
};

const SIssueTableWrapper = styled.div`
  overflow: scroll;
  width: auto;
`;

const SIssueTable = styled.table`
  border: 1px solid rgb(225, 228, 232);
  border-radius: 6px;
`;

const SIssueCheckBox = styled.th`
  min-width: auto;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid rgb(225, 228, 232);
`;

const SIssueTableTitle = styled.th`
  padding: 8px;
  text-align: left;
  min-width: 10em;
  border-bottom: 1px solid rgb(225, 228, 232);
`;

const SIssueTableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: rgb(235, 246, 255);
  }
`;

const SIssueBodyCheckBox = styled.td`
  min-width: auto;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid rgb(225, 228, 232);
`;

const SIssueBodyTableTitle = styled.td`
  padding: 8px;
  text-align: left;
  min-width: 10rem;
  border-bottom: 1px solid rgb(225, 228, 232);
`;

const SIssueBodyTableLink = styled.a`
  text-decoration: none;
  color: rgb(0, 0, 238);
  &:hover {
    text-decoration: underline;
  }
`;
