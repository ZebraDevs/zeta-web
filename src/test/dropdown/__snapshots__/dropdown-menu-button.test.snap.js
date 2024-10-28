/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["zeta-dropdown-menu-button renders the dropdown menu button correctly"] = `<zeta-button
  flavor="primary"
  id="anchor"
  rounded=""
  size="medium"
>
  <slot>
  </slot>
  <zeta-icon rounded="">
    chevron_left
  </zeta-icon>
</zeta-button>
<zeta-droppable
  rounded=""
  style="top: 48px; width: 145.406px;"
>
  <zeta-dropdown-menu-item rounded="">
    Auto Item
  </zeta-dropdown-menu-item>
</zeta-droppable>
<input
  aria-disabled="false"
  aria-required="false"
  hidden=""
  name="dropdown-menu"
  placeholder=""
  type="text-dropdown"
>
`;
/* end snapshot zeta-dropdown-menu-button renders the dropdown menu button correctly */

snapshots["zeta-dropdown-menu-button renders the dropdown menu items correctly"] = `<zeta-button
  flavor="primary"
  id="anchor"
  rounded=""
  size="medium"
>
  <slot>
  </slot>
  <zeta-icon rounded="">
    expand_more
  </zeta-icon>
</zeta-button>
<zeta-droppable
  open=""
  rounded=""
  style="top: 48px; width: 145.406px; left: 8px;"
>
  <zeta-dropdown-menu-item rounded="">
    Auto Item
  </zeta-dropdown-menu-item>
</zeta-droppable>
<input
  aria-disabled="false"
  aria-required="false"
  hidden=""
  name="dropdown-menu"
  placeholder=""
  type="text-dropdown"
>
`;
/* end snapshot zeta-dropdown-menu-button renders the dropdown menu items correctly */
snapshots["zeta-dropdown-menu-button Golden Tests renders the dropdown menu button correctly"] = 
`<zeta-button
  flavor="primary"
  id="anchor"
  rounded=""
  size="medium"
>
  <slot>
  </slot>
  <zeta-icon rounded="">
    chevron_left
  </zeta-icon>
</zeta-button>
<zeta-droppable
  rounded=""
  style="top: 168px; width: calc(173.406px);"
>
  <zeta-dropdown-menu-item rounded="">
    <zeta-icon
      rounded=""
      slot="icon"
    >
      star
    </zeta-icon>
    Auto Item
  </zeta-dropdown-menu-item>
</zeta-droppable>
<input
  aria-disabled="false"
  aria-required="false"
  hidden=""
  name="dropdown-menu"
  placeholder=""
  type="text-dropdown"
>
`;
/* end snapshot zeta-dropdown-menu-button Golden Tests renders the dropdown menu button correctly */

