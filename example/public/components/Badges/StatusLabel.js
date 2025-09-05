export default `<style>
    .container {
        gap: 0;
        width: 100%;
    }

    .container.column .row {
        justify-content: space-evenly;
        padding: 8px;
    }
</style>

<div class="container column">
    <div class="row">
        <zeta-status-label label="Label"></zeta-status-label>
        <zeta-status-label icon="star">Label</zeta-status-label>
    </div>
    <div class="row">
        <zeta-status-label status="info">Label</zeta-status-label>
        <zeta-status-label status="info" icon="star" label="Label"></zeta-status-label>
    </div>
    <div class="row">
        <zeta-status-label status="positive" label="Label"></zeta-status-label>
        <zeta-status-label status="positive" icon="star" label="Label"></zeta-status-label>
    </div>
    <div class="row">
        <zeta-status-label status="warning" label="Label"></zeta-status-label>
        <zeta-status-label status="warning" icon="star" label="Label"></zeta-status-label>
    </div>
    <div class="row">
        <zeta-status-label status="negative" label="Label"></zeta-status-label>
        <zeta-status-label status="negative" icon="star" label="Label"></zeta-status-label>
    </div>


</div>`;
