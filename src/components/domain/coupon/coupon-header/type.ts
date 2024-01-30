/* eslint-disable no-unused-vars */
export type CouponHeaderProps = {
  expiry: string;
  handleSelectStatus: (value: string) => void;
  handleDeleteButton: VoidFunction;
  handleChangeDate: (date: string) => void;
  handleEditButton: VoidFunction;
  handleModalOpen: VoidFunction;
};
