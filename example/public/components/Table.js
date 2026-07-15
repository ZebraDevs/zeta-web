export default `<style>
  .table-demo {
    width: 100%;
    padding: var(--spacing-large);
    box-sizing: border-box;
  }
  .table-demo h3 {
    margin: 0 0 var(--spacing-medium) 0;
    font: var(--title-medium);
    font-weight: 600;
    color: var(--main-default);
  }
  .table-demo p {
    margin: 0 0 var(--spacing-large);
    font: var(--body-x-small);
    color: var(--main-subtle);
  }
  zeta-table {
    --table-max-height: 480px;
  }
</style>

<div class="table-demo">
  <h3>Zeta Table - Full Featured Demo</h3>
  <p>Sort (click header), filter, resize columns, double-click header to auto-fit, click rows, expand rows, export, show/hide columns.</p>
  <zeta-table
    id="demo-table"
    selectable
    select-all
    expandable
    exportable
    column-configure
    show-data-count
    table-title="Summary"
    pagination-type="numbered"
    page-size="5"
  ></zeta-table>
</div>

<script>
  (() => {
    const table = document.getElementById("demo-table");
    if (!table) return;

    const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"];
    const roles = ["Manager", "Senior", "Junior", "Lead", "Director", "Intern"];
    const locations = ["New York", "San Francisco", "London", "Berlin", "Tokyo", "Mumbai"];

    table.columns = [
      { field: "id", title: "ID", width: 60, sortable: true, filterable: true, frozen: true, tooltip: true, resizable: true },
      { field: "name", title: "Name", width: 180, sortable: true, filterable: true, frozen: true, tooltip: true, resizable: true },
      { field: "email", title: "Email", width: 220, sortable: true, filterable: true, tooltip: true, resizable: true },
      { field: "department", title: "Department", width: 140, sortable: true, filterable: true, tooltip: true, resizable: true },
      { field: "role", title: "Role", width: 130, sortable: true, filterable: true, tooltip: true, resizable: true },
      { field: "salary", title: "Salary", width: 100, sortable: true, filterable: true, tooltip: false, resizable: true },
      { field: "location", title: "Location", width: 140, sortable: true, filterable: true, tooltip: true, resizable: true }
    ];

    const data = [];
    for (let i = 1; i <= 51; i++) {
      data.push({
        id: i,
        name: "Employee " + i,
        email: "employee" + i + "@company.com",
        department: departments[i % departments.length],
        role: roles[i % roles.length],
        salary: "$" + (50000 + i * 1500).toLocaleString(),
        location: locations[i % locations.length],
        _nested: i % 10 === 0
          ? [
              { id: i + "-a", name: "Sub-task A", email: "-", department: "-", role: "Task", salary: "-", location: "-" },
              { id: i + "-b", name: "Sub-task B", email: "-", department: "-", role: "Task", salary: "-", location: "-" }
            ]
          : undefined,
        _disabled: i === 7
      });
    }

    table.data = data;
    table.selectedRows = [1, 3];
    table.disabledRows = [7];
  })();
</script>`;
