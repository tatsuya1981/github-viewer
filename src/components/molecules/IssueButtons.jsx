import styled from 'styled-components';
import Button from '../atoms/button/Index';
import IssueModal from '../organisms/IssueModal';
import { useDispatch, useSelector } from 'react-redux';
import { closeIssuesAsync } from '../../redux/issueSlice';
import { closeModal, openModal } from '../../redux/modalSlice';

export const IssueButtons = ({ selectedItems, setSelectedItems }) => {
  const isModalOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleCloseIssue = () => {
    if (selectedItems.length === 0) {
      alert('issueが選択されていません!');
      return;
    }
    const issueCount = selectedItems.length;
    const confirmMessage =
      issueCount === 1
        ? '選択されたissueを本当に削除しますか？'
        : `選択された${issueCount}件のissueを本当に削除しますか？`;

    if (window.confirm(confirmMessage)) {
      selectedItems.forEach((issueNumber) => dispatch(closeIssuesAsync(issueNumber)));
      setSelectedItems([]);
    }
  };

  return (
    <SContainer>
      <Button variant={'primary'} onClick={handleOpenModal}>
        New
      </Button>
      <Button variant={'danger'} onClick={handleCloseIssue}>
        Delete
      </Button>
      <IssueModal isOpen={isModalOpen} onClose={handleCloseModal} modalType={'new'} />
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
`;
