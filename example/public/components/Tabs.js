export default `<style>
    zeta-tab-item {
        display: flex;
        gap: 8px
    }

    .column {
        align-items: center;
    }
</style>
<div class="column">
    <zeta-tab-bar>
        <zeta-tab-item active>Tab Item</zeta-tab-item>
        <zeta-tab-item>Tab Item</zeta-tab-item>
        <zeta-tab-item>Tab Item</zeta-tab-item>
        <zeta-tab-item>Tab Item</zeta-tab-item>
        <zeta-tab-item>Tab Item</zeta-tab-item>
    </zeta-tab-bar>
    <zeta-tab-bar>
        <zeta-tab-item active><zeta-icon>star</zeta-icon> Tab Item</zeta-tab-item>
        <zeta-tab-item><zeta-icon>star</zeta-icon> Tab Item</zeta-tab-item>
        <zeta-tab-item><zeta-icon>star</zeta-icon> Tab Item</zeta-tab-item>
        <zeta-tab-item><zeta-icon>star</zeta-icon> Tab Item</zeta-tab-item>
        <zeta-tab-item><zeta-icon>star</zeta-icon> Tab Item</zeta-tab-item>
    </zeta-tab-bar>
    <zeta-tab-bar>
        <zeta-tab-item disabled>Disabled</zeta-tab-item>
        <zeta-tab-item disabled>Disabled</zeta-tab-item>
        <zeta-tab-item disabled>Disabled</zeta-tab-item>
        <zeta-tab-item disabled>Disabled</zeta-tab-item>
        <zeta-tab-item disabled>Disabled</zeta-tab-item>
    </zeta-tab-bar>
</div>`;
