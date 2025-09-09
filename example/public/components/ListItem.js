export default `<style>
    zeta-list {
        width: 100%
    }
</style>

<zeta-list divide>
    <zeta-list-item headline="List Item">
        <zeta-icon slot="leading">star</zeta-icon>
    </zeta-list-item>
    <zeta-list-item headline="List Item">
        <zeta-icon slot="leading">server</zeta-icon>
        <zeta-icon slot="trailing">expand_more</zeta-icon>

    </zeta-list-item>


    <zeta-list-item headline="List Item">
        <zeta-avatar slot="leading" size="xxs">AZ</zeta-avatar>
        <zeta-checkbox slot="trailing"></zeta-checkbox>
    </zeta-list-item>

    <zeta-list-item headline="List Item">
        <zeta-switch slot="trailing"></zeta-switch>
    </zeta-list-item>
    <zeta-list-item headline="Radio Option 1">
        <zeta-radio-button slot="trailing"></zeta-radio-button>
    </zeta-list-item>
</zeta-list>`;
