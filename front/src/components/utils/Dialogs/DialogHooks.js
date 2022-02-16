// import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  showDialogAction,
  hideDialogAction,
} from '../../../_actions/util_actions';

export default function useDialog() {
  const dispatch = useDispatch();

  // const UseBasicModalExample = () => {
  //   console.log('test');
  //   return useCallback(() => {
  //     console.log('test2');
  //     dispatch(
  //       showDialogAction({
  //         title: 'Test Modal',
  //         body: 'This is a basic action Modal',
  //         product: {
  //           productId: '61ed2030666c4718783be3bf',
  //           qty: 1,
  //         },
  //       }),
  //     );
  //   }, [dispatch]);
  // };

  const cartDupDialog = async product => {
    await dispatch(
      showDialogAction({
        title: '',
        body: '이미 장바구니에 있는 상품입니다. 추가 하시겠습니까?',
        product,
        type: 'confirm',
      }),
    );
  };

  const cartDialog = async () => {
    await dispatch(
      showDialogAction({
        title: '',
        body: '장바구니에 추가 되었습니다.',
        type: 'alert',
      }),
    );
  };

  const closeDialog = async () => {
    await dispatch(hideDialogAction());
  };

  return {
    cartDupDialog,
    cartDialog,
    closeDialog,
  };
}
