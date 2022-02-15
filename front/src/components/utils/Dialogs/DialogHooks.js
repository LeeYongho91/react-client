import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { showDialogAction } from '../../../_actions/util_actions';

export const UseBasicModalExample = () => {
  console.log('test');
  const dispatch = useDispatch();
  return useCallback(() => {
    console.log('test2');
    dispatch(
      showDialogAction({
        title: 'Test Modal',
        body: 'This is a basic action Modal',
      }),
    );
  }, [dispatch]);
};

// export const UseBasicModalExample = async () => {
//   console.log('test');

//   const dispatch = useDispatch();
//   await dispatch(
//     showDialogAction({
//       title: 'Test Modal',
//       body: 'This is a basic action Modal',
//       // type: 'alert',
//       // withButtons: true,
//       // actionButton: 'Confirm',
//     }),
//   );
// };

// export const useDynamicModalExample = () => {
//   const dispatch = useDispatch();
//   return useCallback(() => {
//     dispatch(
//       showDialogAction({
//         title: 'Test Dynamic Modal',
//         type: 'standard',
//         componentPath: 'path/to/your/component',
//         componentProps: {},
//       }),
//     );
//   }, [dispatch]);
// };
