import { useDispatch } from 'react-redux';
import {
  showCartDialogAction,
  hideCartDialogAction,
  showAlertDialogAction,
  closeAlertDialogAction,
} from '../../../_actions/util_actions';

export default function useDialog() {
  const dispatch = useDispatch();

  const cartDupDialog = async product => {
    await dispatch(
      showCartDialogAction({
        title: '',
        body: '이미 장바구니에 있는 상품입니다. 추가 하시겠습니까?',
        product,
        type: 'confirm',
      }),
    );
  };

  const cartDialog = async () => {
    await dispatch(
      showCartDialogAction({
        title: '',
        body: '장바구니에 추가 되었습니다.',
        type: 'alert',
      }),
    );
  };

  const cartCloseDialog = async () => {
    await dispatch(hideCartDialogAction());
  };

  const alertDialog = async data => {
    await dispatch(showAlertDialogAction(data));
  };

  const alertCloseDialog = async () => {
    await dispatch(closeAlertDialogAction());
  };

  return {
    cartDupDialog,
    cartDialog,
    cartCloseDialog,
    alertDialog,
    alertCloseDialog,
  };
}
