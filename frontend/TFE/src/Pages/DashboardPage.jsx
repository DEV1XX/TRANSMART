import React from 'react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../components/ui/resizable'
import {Chart as ChartJS} from 'chart.js/auto'
import {Bar, Doughnut, Line} from 'react-chartjs-2'

const DashboardPage = () => {
  return (
    <>
  <ResizablePanelGroup direction="horizontal">
  <ResizablePanel>
    <div>
        <Bar
        data = {{
            labels: ["A","B","C"],
            datasets: [
                {
                    label:"Revenue",
                    data: [200,300,400]
                },
                {
                    label:"loss",
                    data: [90,80,70]
                },
            ]
        }}
        className='h-3[vh]'/>
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Two</ResizablePanel>
  <ResizableHandle/>
  
  </ResizablePanelGroup>
    </>
  )
}

export default DashboardPage