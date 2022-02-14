import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

// import { getCurrentModal } from 'components/ModalWrapper/modalWrapperSelectors';
import {
  showDialogAction,
  hideDialogAction,
} from '../../../_actions/util_actions';

export const useModal = () =>
  // Get modal params from store using reselect
  ({
    modal: useSelector(state => state.showDialog, shallowEqual),
  });

export const useShowModal = props => {
  const dispatch = useDispatch();
  return useCallback(
    (params = {}) => {
      dispatch(showDialogAction({ ...props, ...params }));
    },
    [dispatch],
  );
};

// export const useErrorModal = props => {
//   const dispatch = useDispatch();
//   return {
//     handleShowErrorModal: useCallback(
//       error => {
//         dispatch(showErrorModalAction({ ...props }));
//       },
//       [dispatch],
//     ),
//   };
// };

export const useConfirmationModal = () => ({
  // Create your reusable confirmation modal logic
});

export const useInfoModal = () => ({
  // Create your reusable info modal logic
});

export const useHideModal = () => {
  const dispatch = useDispatch();
  const handleOnClose = useCallback(() => {
    dispatch(hideDialogAction());
  }, [dispatch]);
  return {
    handleOnClose,
  };
};
