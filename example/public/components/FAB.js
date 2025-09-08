export default `<style>
    .row {
        display: flex;
        justify-content: space-evenly;
        align-items: start;
    }
</style>

<div class="column full">
    <div class="row">
        <zeta-fab size="small">add</zeta-fab>
        <zeta-fab size="small" extended label="Add">add</zeta-fab>
    </div>
    <div class="row">
        <zeta-fab size="medium" label="Edit" flavor="secondary" round="true">edit</zeta-fab>
        <zeta-fab size="medium" label="Edit" flavor="secondary" extended round="true">edit</zeta-fab>
    </div>
    <div class="row">
        <zeta-fab size="large" label="Share" flavor="inverse" round="false">share</zeta-fab>
        <zeta-fab size="large" label="Share" extended flavor="inverse" round="false">share</zeta-fab>
    </div>

</div>`;
