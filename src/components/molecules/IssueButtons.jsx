import styled from 'styled-components';
import Button from '../atoms/button/Index';
import IssueModal from '../organisms/IssueModal';
import { useDispatch, useSelector } from 'react-redux';
import { closeIssuesAsync } from '../../redux/issueSlice';
import { closeModal, openModal } from '../../redux/modalSlice';
import { NotificationManager } from 'react-notifications';

export const IssueButtons = ({ selectedItems, setSelectedItems }) => {
  const isModalOpen = useSelector((state) => state.modal.isOpen);
  const issueCloseCount = useSelector((state) => state.issues.closeCount);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleCloseIssue = async () => {
    if (selectedItems.length === 0) {
      NotificationManager.warning('issueが選択されていません', '警告', 10000);
      return;
    }
    const issueCount = selectedItems.length;
    const confirmMessage =
      issueCloseCount === 1
        ? '選択されたissueを本当に閉じますか？'
        : `選択された${issueCount}件のissueを本当に閉じますか？`;
    try {
      if (window.confirm(confirmMessage)) {
        await dispatch(closeIssuesAsync(selectedItems)).unwrap();
        NotificationManager.success(`Issueを${issueCloseCount}件closeしました`, '成功', 10000);
        setSelectedItems([]);
      }
    } catch (error) {
      console.error('エラー発生！', error);
      NotificationManager.error('Issueをclose出来ませんでした', '失敗', 10000);
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
