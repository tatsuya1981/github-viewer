import styled from 'styled-components';
import Button from '../atoms/button/Index';
import IssueModal from '../organisms/IssueModal';
import { useDispatch, useSelector } from 'react-redux';
import { closeIssuesAsync, resetStatus } from '../../redux/issueSlice';
import { closeModal, openModal } from '../../redux/modalSlice';
import { NotificationManager } from 'react-notifications';
import { useEffect } from 'react';

export const IssueButtons = ({ selectedItems, setSelectedItems }) => {
  const isModalOpen = useSelector((state) => state.modal.isOpen);
  const issueStatus = useSelector((state) => state.issues.status);
  const issueLastAction = useSelector((state) => state.issues.lastAction);
  const issueCloseCount = useSelector((state) => state.issues.closeCount);

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleCloseIssue = () => {
    if (selectedItems.length === 0) {
      NotificationManager.warning('issueが選択されていません', '警告', 10000);
      return;
    }
    const issueCount = selectedItems.length;
    const confirmMessage =
      issueCloseCount === 1
        ? '選択されたissueを本当に閉じますか？'
        : `選択された${issueCount}件のissueを本当に閉じますか？`;

    if (window.confirm(confirmMessage)) {
      dispatch(closeIssuesAsync(selectedItems));
      setSelectedItems([]);
    }

    // if (issueStatus === 'failed') {
    //   if (issueLastAction === 'close')
    //     NotificationManager.error('issue の close に失敗しました', `${issueLastAction} 失敗`, 10000);
    // } else if (issueStatus === 'succeeded') {
    //   NotificationManager.success(`issue を${issueCloseCount} 件closeしました`, `${issueLastAction} 成功`, 10000);
    // }
  };

  useEffect(() => {
    const messages = {
      failed: {
        close: 'Issueをcloseできませんでした',
      },
      succeeded: {
        close: issueCloseCount === null ? 'Issueをcloseしました' : `Issueを${issueCloseCount} 件 closeしました`,
      },
    };
    if (issueStatus === 'failed') {
      if (issueLastAction === 'close') {
        NotificationManager.error(messages.failed[issueLastAction], `失敗`, 10000);
      }
    } else if (issueStatus === 'succeeded') {
      if (issueLastAction === 'close') {
        NotificationManager.success(messages.succeeded[issueLastAction], `成功`, 10000);
      }
    }
    return () => {
      dispatch(resetStatus());
    };
  }, [issueStatus, issueLastAction, issueCloseCount, dispatch]);

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
