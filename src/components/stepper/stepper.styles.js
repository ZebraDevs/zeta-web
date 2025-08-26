import { css } from "lit";
export default css`
  /*Counter Logic*/
  .steps {
    counter-reset: step;
  }

  .steps {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    width: fit-content;
  }

  /* Vertical orientation styles */
  :host([variant="vertical"]) {
    .steps {
      flex-direction: column;
    }
  }
`;
