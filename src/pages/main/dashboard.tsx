export default function Dashboard() {
  const stats = [
    { label: "Total Courses", value: "0", icon: "📚", color: "from-blue-500 to-blue-600" },
    { label: "In Progress", value: "0", icon: "⏳", color: "from-yellow-500 to-yellow-600" },
    { label: "Completed", value: "0", icon: "✅", color: "from-green-500 to-green-600" },
    { label: "Learning Time", value: "0h", icon: "⏱️", color: "from-purple-500 to-purple-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">Dashboard</h1>
        <p className="text-lg text-muted-foreground">Welcome back! Here's your learning overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group bg-card rounded-2xl border border-border/50 p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 overflow-hidden relative"
          >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
                  <p className="text-4xl font-bold text-foreground mt-2 group-hover:text-primary transition-colors duration-200">{stat.value}</p>
                </div>
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
              </div>
              <div className="h-1 bg-gradient-to-r from-primary/20 to-indigo-600/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-indigo-600 w-0 group-hover:w-full transition-all duration-300"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border/50 p-8 shadow-md">
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-xl border border-blue-200/50">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl">📖</div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Start exploring courses</p>
                <p className="text-sm text-muted-foreground">Browse available courses and enhance your skills</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-transparent rounded-xl border border-green-200/50">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-xl">🎓</div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Enroll in a course</p>
                <p className="text-sm text-muted-foreground">Join courses to start your learning journey</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-transparent rounded-xl border border-purple-200/50">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-xl">🏆</div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Complete modules</p>
                <p className="text-sm text-muted-foreground">Finish course modules to earn certificates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-primary/5 to-indigo-600/5 rounded-2xl border border-border/50 p-8 shadow-md">
          <h3 className="text-xl font-bold text-foreground mb-6">Your Goals</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm font-medium text-foreground">Learning Streak</p>
                <p className="text-sm font-semibold text-primary">0 days</p>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-indigo-600 w-0"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm font-medium text-foreground">Courses to Complete</p>
                <p className="text-sm font-semibold text-primary">0 left</p>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-indigo-600 w-0"></div>
              </div>
            </div>
            <button className="w-full mt-6 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-primary-foreground font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95">
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
