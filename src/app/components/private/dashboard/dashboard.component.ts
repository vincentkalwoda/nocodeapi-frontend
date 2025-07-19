import {Component} from '@angular/core';
import {ChartModule} from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  imports: [
    ChartModule
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        borderColor: "#0127d7",
        tension: 0.4
      }
    ]
  };

  options = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#8b98b8"
        },
      },
      y: {
        ticks: {
          color: "#8b98b8"
        },
      }
    }
  };

  topApisData = {
    labels: ['Auth', 'User Info', 'Orders', 'Payments', 'Search'],
    datasets: [
      {
        label: 'Requests',
        data: [420, 300, 180, 130, 90],
        backgroundColor: '#0127d7'
      }
    ]
  };

  topApisOptions = {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: { color: '#8b98b8' }
      },
      y: {
        ticks: { color: '#8b98b8' }
      }
    }
  };

}
