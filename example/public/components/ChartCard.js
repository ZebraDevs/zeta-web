export default `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-2xl); padding: var(--spacing-2xl); max-width: 1200px;">
    <zeta-chart-card title="Device Enrollment" subtitle="Tracks the total devices enrolled in Nucleus.">
        <div style="height: 200px; background: var(--surface-subtle); border-radius: var(--spacing-small); display: flex; align-items: center; justify-content: center; color: var(--main-subtle);">
            Chart Content
        </div>
        <zeta-button slot="footer" flavor="outline" size="small">View My Devices</zeta-button>
    </zeta-chart-card>

    <zeta-chart-card title="Battery Health" subtitle="See the battery health across all your devices.">
        <div style="height: 200px; background: var(--surface-subtle); border-radius: var(--spacing-small); display: flex; align-items: center; justify-content: center; color: var(--main-subtle);">
            Chart Content
        </div>
        <zeta-button slot="footer" flavor="outline" size="small">View My Devices</zeta-button>
    </zeta-chart-card>

    <zeta-chart-card title="Licenses" subtitle="Tracks the number of licenses you own and how many are in use.">
        <div style="height: 200px; background: var(--surface-subtle); border-radius: var(--spacing-small); display: flex; align-items: center; justify-content: center; color: var(--main-subtle);">
            Chart Content
        </div>
        <zeta-button slot="footer" flavor="outline" size="small">View Licenses</zeta-button>
    </zeta-chart-card>
</div>`;
