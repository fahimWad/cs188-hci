import React from 'react';

interface GraphDisplayProps {
    data: Array<{ x: number; y: number }>;
    width?: number;
    height?: number;
}

const Graph_Display: React.FC<GraphDisplayProps> = ({
    data,
    width = 400,
    height = 300,
}) => {
    if (!data || data.length === 0) {
        return <div>No data to display.</div>;
    }

    // Find min/max for scaling
    const xValues = data.map(point => point.x);
    const yValues = data.map(point => point.y);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    // Scale function
    const scaleX = (x: number) =>
        ((x - minX) / (maxX - minX || 1)) * (width - 40) + 20;
    const scaleY = (y: number) =>
        height - 20 - ((y - minY) / (maxY - minY || 1)) * (height - 40);

    // Create path
    const pathData = data
        .map((point, i) => {
            const x = scaleX(point.x);
            const y = scaleY(point.y);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        })
        .join(' ');

    return (
        <svg width={width} height={height} style={{ border: '1px solid #ccc' }}>
            <path
                d={pathData}
                fill="none"
                stroke="#1976d2"
                strokeWidth={2}
            />
            {data.map((point, i) => (
                <circle
                    key={i}
                    cx={scaleX(point.x)}
                    cy={scaleY(point.y)}
                    r={3}
                    fill="#1976d2"
                />
            ))}
        </svg>
    );
};

export default Graph_Display;