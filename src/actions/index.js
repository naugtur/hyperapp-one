export default {
  add: (state, _, { target }) => {
    const { id } = target;
    return { [id]: { num: state[id].num + 1 } };
  },
  sub: (state, _, { target }) => {
    const { id } = target;
    return { [id]: { num: state[id].num - 1 } };
  },
};
