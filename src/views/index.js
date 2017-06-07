import { h } from 'hyperapp';
import Counter from './counter';

export default (state, actions) => {
  const { one, two } = state;

  return (
   <div>
     {Counter(one, actions, 'one')}
     {Counter(two, actions, 'two')}
   </div>
  );
};
