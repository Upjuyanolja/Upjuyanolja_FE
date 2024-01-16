import { useAddRoom } from '@queries/room';

export const postRoomData = useAddRoom({
  onSuccess: (response) => {
    console.log('postRoomData, hooks, success');
  },
});
