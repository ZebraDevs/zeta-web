export default `<style>
    zeta-icon {
        --icon-color: var(--main-warning);
    }

    .example-container {
        color: var(--main-inverse)
    }
</style>


<div class="example-container">
    <zeta-dialog size="large" initialOpen centered title="Dialog Title">
        <zeta-icon slot="icon">warning</zeta-icon>

        Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusm od tempor incididunt ut labore et do lore
        magna aliqua.
        <zeta-button slot="confirm">Confirm</zeta-button>
        <zeta-button slot="cancel">Deny</zeta-button>
        <zeta-button slot="other" disabled>Learn more</zeta-button>
    </zeta-dialog>
</div>`;
