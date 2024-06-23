import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addIssue, updateIssue } from '../../redux/issueSlice';
import Select from 'react-select';
import Button from '../atoms/button/Button';

const today = new Date()
  .toLocaleDateString('ja-JP', { day: '2-digit', month: '2-digit', year: 'numeric' })
  .replaceAll('/', '-');

const IssueModal = ({ isOpen, onClose, issue = {} }) => {
  const [title, setTitle] = useState(issue.id ? issue.title : '');
  const [description, setDescription] = useState(issue.id ? issue.description : '');
  const [errorMessage, setErrormessage] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const statusOptions = [
    { value: 'Open', label: 'Open' },
    { value: 'Close', label: 'Close' },
  ];
  const [selectedStatus, setSelectedStatus] = useState(issue.id ? { value: issue.status, label: issue.status } : null);

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
      status: issue.id ? selectedStatus.value : 'Open',
      description,
      updateDate: today,
    };

    if (issue.id) {
      newIssue.id = issue.id;
      newIssue.creationDate = issue.creationDate;
      dispatch(updateIssue(newIssue));
    } else {
      newIssue.id = Date.now();
      newIssue.user = user.userName;
      newIssue.creationDate = today;
      dispatch(addIssue(newIssue));
    }

    onClose();
    setTitle('');
    setDescription('');
    setErrormessage('');
  };

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
          <SModalTitle>{issue.id ? 'Issueを編集' : 'Issueを追加'}</SModalTitle>
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
            {issue.id && (
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
              {issue.id ? '更新' : '作成'}
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
