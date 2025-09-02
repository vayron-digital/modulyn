"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

// Sample data - replace with real data
const data = [
  {
    stage: "Leads",
    total: 1200,
    converted: 840,
    rate: "70%"
  },
  {
    stage: "Qualified",
    total: 840,
    converted: 588,
    rate: "70%"
  },
  {
    stage: "Proposal",
    total: 588,
    converted: 353,
    rate: "60%"
  },
  {
    stage: "Negotiation",
    total: 353,
    converted: 247,
    rate: "70%"
  },
  {
    stage: "Closed",
    total: 247,
    converted: 173,
    rate: "70%"
  }
]

export function LeadConversionChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#ccc5b9" 
          />
          <XAxis 
            dataKey="stage" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#403d39', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#403d39', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fffcf2',
              border: '1px solid #ccc5b9',
              borderRadius: '6px',
            }}
            cursor={{ fill: '#ccc5b9', opacity: 0.1 }}
          />
          <Legend />
          <Bar
            dataKey="total"
            fill="#ccc5b9"
            radius={[4, 4, 0, 0]}
            name="Total"
          />
          <Bar
            dataKey="converted"
            fill="#eb5e28"
            radius={[4, 4, 0, 0]}
            name="Converted"
          />
        </BarChart>
      </ResponsiveContainer>
      
      {/* Conversion Rates */}
      <div className="mt-4 grid grid-cols-5 gap-2">
        {data.map((item, index) => (
          <div 
            key={index}
            className="text-center"
          >
            <div className="text-sm font-medium text-black_olive">
              {item.rate}
            </div>
            <div className="text-xs text-black_olive/60">
              Conversion
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
