export default `<style>
    .container {
        align-items: center;
    }
</style>

<div class="column container">
    <zeta-button-group>
        <zeta-button-group-item> Label </zeta-button-group-item>
        <zeta-button-group-item> Label </zeta-button-group-item>
    </zeta-button-group>

    <zeta-button-group>
        <zeta-button-group-item>
            Label
            <zeta-icon slot="icon">star</zeta-icon>
        </zeta-button-group-item>
        <zeta-button-group-item showDropdown> Label 1 </zeta-button-group-item>
    </zeta-button-group>
    <zeta-button-group>
        <zeta-button-group-item flavor="inverse">
            Label
            <zeta-icon slot="icon">star</zeta-icon>
        </zeta-button-group-item>
        <zeta-button-group-item showDropdown flavor="inverse">
            Label 1
            <zeta-icon slot="icon">star</zeta-icon>
        </zeta-button-group-item>
        <zeta-button-group-item disabled flavor="inverse">
            Label 1
            <zeta-icon slot="icon">star</zeta-icon>
        </zeta-button-group-item>
    </zeta-button-group>
</div>`;
