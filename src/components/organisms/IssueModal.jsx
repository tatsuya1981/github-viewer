import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { createIssuesAsync, resetStatus, updateIssuesAsync } from '../../redux/issueSlice';
import Select from 'react-select';
import Button from '../atoms/button/Index';
import { formatDate } from '../../date';
import { NotificationManager } from 'react-notifications';

const statusOptions = [
  { value: 'Open', label: 'Open' },
  { value: 'Close', label: 'Close' },
];

const IssueModal = ({ isOpen, onClose, issue = {} }) => {
  const isEdit = issue.id;
  const [title, setTitle] = useState(isEdit ? issue.title : '');
  const [description, setDescription] = useState(isEdit ? issue.body : '');
  const [errorMessage, setErrormessage] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const issueStatus = useSelector((state) => state.issues.status);
  const issueLastAction = useSelector((state) => state.issues.lastAction);
  const [selectedStatus, setSelectedStatus] = useState(isEdit ? { value: issue.state, label: issue.state } : null);

  const handleSubmit = () => {
    if (!title) {
      setErrormessage('タイトルを入力して下さい');
      return;
    } else if (!description) {
      setErrormessage('説明文を入力して下さい');
      return;
    }

    const newIssue = {
      title,
      state: isEdit ? selectedStatus.value.toLowerCase() : 'Open',
      body: description,
      updatedAt: formatDate(issue.updated_at),
    };

    if (isEdit) {
      newIssue.id = isEdit;
      newIssue.createdAt = issue.createdAt;
      dispatch(updateIssuesAsync({ issueNumber: issue.number, updatedIssue: newIssue }));
    } else {
      newIssue.user = user.userName;
      newIssue.createdAt = formatDate(issue.created_at);
      dispatch(createIssuesAsync(newIssue));
    }

    onClose();
    setTitle('');
    setDescription('');
    setErrormessage('');
  };

  useEffect(() => {
    const messages = {
      failed: {
        create: 'issueを作成できませんでした',
        update: 'issueを更新できませんでした',
      },
      succeeded: {
        create: 'issueを作成しました',
        update: 'issueを更新しました',
      },
    };
    if (issueStatus === 'failed') {
      if (issueLastAction === 'create' || issueLastAction === 'update') {
        NotificationManager.error(messages.failed[issueLastAction], `失敗`, 10000);
      }
    } else if (issueStatus === 'succeeded') {
      if (issueLastAction === 'create' || issueLastAction === 'update') {
        NotificationManager.success(messages.succeeded[issueLastAction], `成功`, 10000);
      }
    }
    return () => {
      dispatch(resetStatus());
    };
  }, [issueStatus, issueLastAction, dispatch]);

  const modalClose = () => {
    onClose();
    setTitle('');
    setDescription('');
    setErrormessage('');
  };

  if (!isOpen) return null;

  return (
    <SModalOverLay>
      <SModalContent>
        <SModalContainer>
          <SModalTitle>{isEdit ? 'Issueを編集' : 'Issueを追加'}</SModalTitle>
          <STitleContainer>
            <STitleWrapper>
              <STitleLabel>タイトル</STitleLabel>
              <STitleInputWrapper>
                <STitleInput
                  type="input"
                  placeholder="タイトルを入力して下さい"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </STitleInputWrapper>
            </STitleWrapper>
            <STitleWrapper>
              <STitleLabel>説明</STitleLabel>
              <STitleInputWrapper>
                <STextarea
                  placeholder="説明文を入力して下さい"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></STextarea>
              </STitleInputWrapper>
            </STitleWrapper>
            {isEdit && (
              <SSelectTitleWrapper>
                <STitleLabel>ステータス</STitleLabel>
                <Select
                  value={selectedStatus}
                  onChange={(selectedOption) => setSelectedStatus(selectedOption)}
                  options={statusOptions}
                  isSearchable={false}
                  styles={selectStyles}
                  components={{ IndicatorSeparator: () => null }}
                  menuPortalTarget={document.body}
                />
              </SSelectTitleWrapper>
            )}
          </STitleContainer>
          <SModalError> {errorMessage && <SModalErrorMessage>{errorMessage}</SModalErrorMessage>} </SModalError>
          <SModalButtonWrapper>
            <Button variant={'create'} onClick={handleSubmit}>
              {isEdit ? '更新' : '作成'}
            </Button>
            <Button variant={'close'} onClick={modalClose}>
              閉じる
            </Button>
          </SModalButtonWrapper>
        </SModalContainer>
      </SModalContent>
    </SModalOverLay>
  );
};

const SModalOverLay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.75);
`;

const SModalContent = styled.div`
  position: absolute;
  inset: 40px;
  border: 1px solid rgb(204, 204, 204);
  background: rgb(255, 255, 255);
  overflow: auto;
  border-radius: 4px;
  outline: none;
  padding: 20px;
  margin: auto;
  width: 60%;
  @media (max-width: 576px) {
    width: 100%;
    right: 0px !important;
    left: 0px !important;
  }
`;

const SModalContainer = styled.div`
  max-width: 598px;
  margin: auto;
  text-align: left;
`;

const SModalTitle = styled.h2`
  padding: 0px 8px;
`;
const STitleContainer = styled.div`
  padding: 32px 0px 16px;
`;

const STitleWrapper = styled.div`
  padding: 16px;
`;

const STitleLabel = styled.label`
  display: block;
  padding: 8px 0px;
  font-weight: bold;
`;

const STitleInputWrapper = styled.div`
  border-radius: 6px;
  border: 1px solid rgb(225, 228, 232);
`;

const STitleInput = styled.input`
  padding: 8px;
  border: none;
  outline: none;
  background: none;
  font-size: 1rem;
  width: 100%;
`;

const STextarea = styled.textarea`
  max-width: 560px;
  min-height: 150px;
  padding: 8px;
  border: none;
  outline: none;
  background: none;
  font-size: 1rem;
  width: 100%;
`;

const SModalError = styled.div`
  padding: 16px;
  min-height: 100px;
`;

const SModalErrorMessage = styled.p`
  color: rgb(215, 58, 73);
  background: rgba(215, 58, 73, 0.35);
  padding: 8px;
  border-radius: 6px;
  margin: 0px;
`;

const SModalButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px;
`;

const SSelectTitleWrapper = styled.div`
  padding: 0px;
  margin: 0px;
`;

const selectStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: '6px',
    border: '1px solid rgb(225, 228, 232)',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid rgb(225, 228, 232)',
    },
    width: 'auto',
    maxWidth: '100px',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'rgb(225, 228, 232)' : 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: 'rgb(245, 245, 245)',
    },
  }),
};

export default IssueModal;
