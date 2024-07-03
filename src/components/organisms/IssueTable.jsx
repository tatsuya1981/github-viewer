import styled from 'styled-components';
import { useState } from 'react';
import IssueModal from './IssueModal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../redux/modalSlice';
import { today } from '../../date';

export const IssueTable = ({ issues = [], selectedItems, setSelectedItems }) => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const dispatch = useDispatch();
  const allSelected = issues.length > 0 && selectedItems.length === issues.length;
  const isModalOpen = useSelector((state) => state.modal.isOpen);

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
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() => {
                  if (allSelected) {
                    setSelectedItems([]);
                  } else {
                    setSelectedItems(issues.map((issue) => issue.id));
                  }
                }}
              ></input>
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
                  onChange={(e) => {
                    const selectedNumber = Number(e.target.value);
                    if (selectedItems.includes(selectedNumber)) {
                      setSelectedItems(selectedItems.filter((number) => number !== selectedNumber));
                    } else {
                      setSelectedItems([...selectedItems, selectedNumber]);
                    }
                  }}
                  value={issue.number}
                ></input>
              </SIssueBodyCheckBox>
              <SIssueBodyTableTitle>
                <a href={issue.html_url} onClick={(event) => event.stopPropagation()}>
                  {issue.title}
                </a>
              </SIssueBodyTableTitle>
              <SIssueBodyTableTitle>{issue.state}</SIssueBodyTableTitle>
              <SIssueBodyTableTitle>{issue.user.login}</SIssueBodyTableTitle>
              <SIssueBodyTableTitle>{today(issue.created_at)}</SIssueBodyTableTitle>
              <SIssueBodyTableTitle>{today(issue.updated_at)}</SIssueBodyTableTitle>
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
