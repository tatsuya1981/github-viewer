import styled from 'styled-components';
import Button from '../atoms/button/Index';
import IssueModal from '../organisms/IssueModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteIssuesAsync } from '../../redux/issueSlice';
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

  const handleDeleteModal = () => {
    selectedItems.forEach((issueNumber) => dispatch(deleteIssuesAsync(issueNumber)));
    setSelectedItems([]);
  };

  return (
    <SContainer>
      <Button variant={'primary'} onClick={handleOpenModal}>
        New
      </Button>
      <Button variant={'danger'} onClick={handleDeleteModal}>
        Delete
      </Button>
      <IssueModal isOpen={isModalOpen} onClose={handleCloseModal} modalType={'new'} />
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
`;
