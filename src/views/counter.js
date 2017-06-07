import { h } from 'hyperapp';

export default (state, actions, app) => (
  <div class="counter">
    <h1>hyperapp-{app}</h1>
    <p><em>With JSX and Webpack</em></p>
    <hr />
    <section>
      <button
        class="sub"
        id={app}
        onclick={actions.sub}
        disabled={state.num < 1}
      >
        -
      </button>
      <h1 class='count'>{state.num}</h1>
      <button
        class="add"
        id={app}
        onclick={actions.add}
      >
        +
      </button>
    </section>
  </div>
);
