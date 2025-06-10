import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store'; // Adjust the import path as necessary

interface ModalsState {
  resetFilter: boolean;
  completeTaskModal: boolean;
  closeCheckoutTask: boolean;  // Fixed typo (closesheckouttask -> closeCheckoutTask)
  duplicateTaskModal: boolean;
  duplicatedTaskModal: boolean; // Fixed duplicate modal name (duplicate TaskModal -> duplicatedTaskModal)
  switchMantMode: boolean;
  switchKioskMode: boolean;  // Fixed typo (switchkioskMode -> switchKioskMode)
  createTaskModal: boolean;
  updateTaskModal: boolean;
  updatedTaskModal: boolean;
  taskAddedModal: boolean;
  taskDuplicatedModal: boolean;
  taskEndConfirmModal: boolean;
  taskEndedModal: boolean;
  loading: boolean;
  taskDeleteConfirmModal: boolean;
  taskDeletedModal: boolean;
  hamburgerModal: boolean;
  confirmDeleteNoteModal: boolean; // Fixed typo (confirm DeleteNote Modal -> confirmDeleteNoteModal)
  deleteNoteSuccessModal: boolean;
  createCommunicationModal: boolean; // Fixed typo (createCommunication Modal -> createCommunicationModal)
  updateCommunicationModal: boolean;
  confirmDeleteMessageModal: boolean;
  deleteMessageSuccessModal: boolean;
  communicationAddedModal: boolean; // Fixed typo (communicationAddedModel -> communicationAddedModal)
  communicationUpdatedModal: boolean; // Fixed typo (communicationUpdatedModel -> communicationUpdatedModal)
  communicationMsgEndConfirmationModal: boolean;
  communicationMsgEndModal: boolean; // Fixed typo (communicationMsgEndModel -> communicationMsgEndModal)
  createNoteModal: boolean;
  noteCreatedModal: boolean;
  reportCommInfoModal: boolean; // Fixed typo (teredcomminfoModal -> reportCommInfoModal)
  successfullyReadMessage: boolean; // Fixed typo (SuccessFullyReadMessage -> successfullyReadMessage)
  duplicateMessageModal: boolean; // Fixed typo (duplicate MessageModal -> duplicateMessageModal)
  messageDuplicatedModal: boolean;
  timingsSavedModal: boolean;
  taskInfoModal:boolean // Fixed typo (timingsSavedModal -> timingsSavedModal)
}

interface InitialState {
  modals: ModalsState;
}

const initialState: InitialState = {
  modals: {
    resetFilter: false,
    completeTaskModal: false,
    closeCheckoutTask: false, // Fixed typo here
    duplicateTaskModal: false,
    duplicatedTaskModal: false,
    switchMantMode: false,
    switchKioskMode: false,
    createTaskModal: false,
    updateTaskModal: false,
    updatedTaskModal: false,
    taskAddedModal: false,
    taskDuplicatedModal: false,
    taskEndConfirmModal: false,
    taskEndedModal: false,
    loading: false,
    taskDeleteConfirmModal: false,
    taskDeletedModal: false,
    hamburgerModal: false,
    confirmDeleteNoteModal: false,
    deleteNoteSuccessModal: false,
    createCommunicationModal: false,
    updateCommunicationModal: false,
    confirmDeleteMessageModal: false,
    deleteMessageSuccessModal: false,
    communicationAddedModal: false,
    communicationUpdatedModal: false,
    communicationMsgEndConfirmationModal: false,
    communicationMsgEndModal: false,
    createNoteModal: false,
    noteCreatedModal: false,
    reportCommInfoModal: false, // Fixed typo here
    successfullyReadMessage: false, // Fixed typo here
    duplicateMessageModal: false, // Fixed typo here
    messageDuplicatedModal: false,
    timingsSavedModal: false,
    taskInfoModal:false,
  },
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<keyof ModalsState>) => {
      const modalName = action.payload;
      state.modals[modalName] = true;
    },
    closeModal: (state, action: PayloadAction<keyof ModalsState>) => {
      const modalName = action.payload;
      state.modals[modalName] = false;
    },
    toggleModal: (state, action: PayloadAction<keyof ModalsState>) => {
      const modalName = action.payload;
      state.modals[modalName] = !state.modals[modalName];
    },
  },
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;

export const selectModalState = (state: RootState) => state.modals.modals;

export const modalSliceReducer =  modalSlice.reducer;
