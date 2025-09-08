export default `<style>
    .row {
        align-items: start !important;
    }

    .placeholder {
        position: relative;
        height: 140px;
        max-width: 100%;
        max-height: 100%;
        border: 1px solid var(--main-subtle);
        background: none;
        overflow: hidden;
    }

    .placeholder-cross {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .placeholder-cross line {
        stroke: var(--main-subtle);
        stroke-width: 1px;
    }

    zeta-accordion {
        max-width: 328px;
        width: 328px;
    }

    .row-button {
        display: flex;
        gap: 8px;
        flex-direction: row;
    }
</style>
<div class="row">
    <zeta-accordion inCard>
        <zeta-accordion-item title='Scanner Configuration'>
            <div slot="header" class="row-button">
                <zeta-button flavor="outline-subtle">Action 1</zeta-button>
                <zeta-button flavor="outline-subtle">Action 2</zeta-button>
                <zeta-button flavor="outline-subtle">Action 3</zeta-button>
            </div>
            <div class="placeholder">
                <svg class="placeholder-cross" viewBox="0 0 400 240" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="400" y2="240" />
                    <line x1="400" y1="0" x2="0" y2="240" />
                </svg>
            </div>
        </zeta-accordion-item>
        <zeta-accordion-item title='Title'>
            <div class="placeholder">
                <svg class="placeholder-cross" viewBox="0 0 400 240" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="400" y2="240" />
                    <line x1="400" y1="0" x2="0" y2="240" />
                </svg>
            </div>
        </zeta-accordion-item>
        <zeta-accordion-item title='Title'>
            <div class="placeholder">
                <svg class="placeholder-cross" viewBox="0 0 400 240" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="400" y2="240" />
                    <line x1="400" y1="0" x2="0" y2="240" />
                </svg>
            </div>
        </zeta-accordion-item>
    </zeta-accordion>

    <zeta-accordion incard data-theme='dark'>
        <zeta-accordion-item title='Title' selectable selected>
            <div class="placeholder">
                <svg class="placeholder-cross" viewBox="0 0 400 240" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="400" y2="240" />
                    <line x1="400" y1="0" x2="0" y2="240" />
                </svg>
            </div>
        </zeta-accordion-item>
        <zeta-accordion-item title='Title' selectable>
            <div class="placeholder">
                <svg class="placeholder-cross" viewBox="0 0 400 240" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="400" y2="240" />
                    <line x1="400" y1="0" x2="0" y2="240" />
                </svg>
            </div>
        </zeta-accordion-item>
        <zeta-accordion-item title='Title'>
            <div class="placeholder">
                <svg class="placeholder-cross" viewBox="0 0 400 240" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="400" y2="240" />
                    <line x1="400" y1="0" x2="0" y2="240" />
                </svg>
            </div>
        </zeta-accordion-item>
    </zeta-accordion>

    <zeta-accordion incard>
        <zeta-accordion-item title="Title" navigation></zeta-accordion-item>
        <zeta-accordion-item title="Title" navigation></zeta-accordion-item>
        <zeta-accordion-item title="Title" navigation></zeta-accordion-item>
    </zeta-accordion>
</div>`;
