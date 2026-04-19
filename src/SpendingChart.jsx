import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#fbbf24", "#fb7185", "#60a5fa", "#34d399", "#a78bfa", "#fb923c", "#22d3ee"];

function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) return null;

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#4b5563', fontFamily: 'Outfit', letterSpacing: '0.04em' }} axisLine={{ stroke: 'rgba(255,255,255,0.07)' }} tickLine={false} />
          <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 11, fill: '#4b5563', fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(value) => [`$${value}`, 'Amount']}
            contentStyle={{ background: '#0f1628', border: '1px solid rgba(255,255,255,0.13)', borderRadius: 0, fontFamily: 'Outfit', fontSize: 13, color: '#e8eaf0' }}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
          />
          <Bar dataKey="value" name="Amount">
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
