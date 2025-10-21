export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your learning dashboard</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Courses</p>
          <p className="text-3xl font-semibold text-foreground">0</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground mb-2">In Progress</p>
          <p className="text-3xl font-semibold text-foreground">0</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground mb-2">Completed</p>
          <p className="text-3xl font-semibold text-foreground">0</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground mb-2">Learning Time</p>
          <p className="text-3xl font-semibold text-foreground">0h</p>
        </div>
      </div>
    </div>
  );
}
