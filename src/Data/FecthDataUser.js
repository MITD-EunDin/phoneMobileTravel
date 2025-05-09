import { getUsersByRole } from '../api/Api';

export const fetchUsers = async () => {
  try {
    return await getUsersByRole('USER');
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw error;
  }
};

export const fetchStaffs = async () => {
  try {
    return await getUsersByRole('STAFF');
  } catch (error) {
    console.error('Error fetching staffs:', error.message);
    throw error;
  }
};