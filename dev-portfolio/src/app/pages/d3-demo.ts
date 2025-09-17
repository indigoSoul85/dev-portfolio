import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

interface TechnologyData {
  name: string;
  category: string;
  startYear: number;
  peakYear?: number;
  adoptionRate: number;
  color: string;
}

@Component({
  selector: 'app-d3-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1>Technology Adoption Timeline</h1>
        <p>Interactive visualization of technology adoption from 1900-2025 with D3.js</p>
      </header>
      
      <main class="page-content">
        <section class="demo-section">
          <div class="chart-controls">
            <button 
              class="control-btn"
              [class.active]="selectedCategory === 'all'"
              (click)="filterByCategory('all')"
            >
              All Technologies
            </button>
            <button 
              class="control-btn"
              [class.active]="selectedCategory === 'Communication'"
              (click)="filterByCategory('Communication')"
            >
              Communication
            </button>
            <button 
              class="control-btn"
              [class.active]="selectedCategory === 'Computing'"
              (click)="filterByCategory('Computing')"
            >
              Computing
            </button>
            <button 
              class="control-btn"
              [class.active]="selectedCategory === 'Internet'"
              (click)="filterByCategory('Internet')"
            >
              Internet
            </button>
            <button 
              class="control-btn"
              [class.active]="selectedCategory === 'Mobile'"
              (click)="filterByCategory('Mobile')"
            >
              Mobile
            </button>
          </div>
          
          <div class="chart-container">
            <div #chartContainer class="d3-chart"></div>
          </div>
          
          <div class="chart-legend">
            <h3>Technology Categories</h3>
            <div class="legend-items">
              <div class="legend-item" *ngFor="let category of categories">
                <div class="legend-color" [style.background-color]="getCategoryColor(category)"></div>
                <span>{{ category }}</span>
              </div>
            </div>
          </div>

          <div class="data-reference">
            <h4>Data Reference</h4>
            <p>
              Technology adoption data synthesized from multiple historical sources including:
              <a href="https://ourworldindata.org/technology-adoption" target="_blank" rel="noopener noreferrer">
                Our World in Data - Technology Adoption
              </a>
              and various industry reports from 1900-2025.
            </p>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      padding: 2rem;
      padding-top: 8rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .page-header {
      text-align: center;
      color: white;
      margin-bottom: 3rem;
    }

    .page-header h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .page-header p {
      font-size: 1.2rem;
      opacity: 0.9;
    }

    .page-content {
      max-width: 1400px;
      margin: 0 auto;
    }

    .demo-section {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .chart-controls {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .control-btn {
      padding: 0.5rem 1rem;
      border: 2px solid #667eea;
      background: transparent;
      color: #667eea;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .control-btn:hover,
    .control-btn.active {
      background: #667eea;
      color: white;
    }

    .chart-container {
      margin: 2rem 0;
    }

    .d3-chart {
      width: 100%;
      height: 600px;
      border-radius: 8px;
      background: #fafafa;
    }

    .chart-legend {
      margin-top: 2rem;
    }

    .chart-legend h3 {
      color: #333;
      margin-bottom: 1rem;
    }

    .legend-items {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .legend-color {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }

    .data-reference {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e0e0e0;
      text-align: center;
    }

    .data-reference h4 {
      color: #333;
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }

    .data-reference p {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0;
    }

    .data-reference a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .data-reference a:hover {
      color: #5a67d8;
      text-decoration: underline;
    }

    :global(.tooltip) {
      position: absolute;
      padding: 15px;
      background: rgba(211, 211, 211, 0.35);
      color: #333;
      border-radius: 10px;
      pointer-events: none;
      font-size: 13px;
      line-height: 1.6;
      z-index: 1000;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
      border: 1px solid grey;
      max-width: 250px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    :global(.tooltip .tooltip-title) {
      font-weight: 700;
      font-size: 15px;
      color: #667eea;
      margin-bottom: 8px;
      border-bottom: 1px solid #f0f0f0;
      padding-bottom: 5px;
    }

    :global(.tooltip .tooltip-category) {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      margin-bottom: 8px;
      color: white;
    }

    :global(.tooltip .tooltip-details) {
      margin-top: 8px;
    }

    :global(.tooltip .tooltip-detail-row) {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    :global(.tooltip .tooltip-label) {
      color: #666;
      font-weight: 500;
    }

    :global(.tooltip .tooltip-value) {
      font-weight: 600;
      color: #333;
    }

    :global(.technology-circle:hover) {
      stroke: #333;
      stroke-width: 2;
    }

    :global(.axis text) {
      font-size: 12px;
      fill: #666;
    }

    :global(.axis path .axis line) {
      fill: none;
      stroke: #ddd;
      shape-rendering: crispEdges;
    }

    :global(.tech-label) {
      font-size: 10px;
      font-weight: 600;
      fill: #333;
      text-anchor: middle;
      pointer-events: none;
      text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
    }

    :global(.tech-label.small-label) {
      font-size: 8px;
    }

    :global(.tech-label.large-label) {
      font-size: 11px;
      font-weight: 700;
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 1rem;
        padding-top: 6rem;
      }

      .page-header h1 {
        font-size: 2rem;
      }

      .demo-section {
        padding: 1.5rem;
      }

      .d3-chart {
        height: 400px;
      }

      .chart-controls {
        gap: 0.5rem;
      }

      .control-btn {
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
      }
    }
  `]
})
export class D3DemoComponent implements AfterViewInit {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  private platformId = inject(PLATFORM_ID);
  
  selectedCategory = 'all';
  categories = ['Communication', 'Computing', 'Internet', 'Mobile'];
  
  private svg: any;
  private tooltip: any;
  
  private technologyData: TechnologyData[] = [
    // Communication Technologies
    { name: 'Radio', category: 'Communication', startYear: 1901, peakYear: 1950, adoptionRate: 90, color: '#FF6B6B' },
    { name: 'Television', category: 'Communication', startYear: 1928, peakYear: 1970, adoptionRate: 95, color: '#FF8E8E' },
    { name: 'Telephone', category: 'Communication', startYear: 1900, peakYear: 1980, adoptionRate: 85, color: '#FFB3B3' },
    { name: 'Satellite TV', category: 'Communication', startYear: 1962, peakYear: 1995, adoptionRate: 70, color: '#FF9999' },
    
    // Computing Technologies
    { name: 'Mainframe Computers', category: 'Computing', startYear: 1940, peakYear: 1970, adoptionRate: 30, color: '#4ECDC4' },
    { name: 'Personal Computers', category: 'Computing', startYear: 1975, peakYear: 2000, adoptionRate: 80, color: '#45B7B8' },
    { name: 'Laptops', category: 'Computing', startYear: 1981, peakYear: 2010, adoptionRate: 75, color: '#26A69A' },
    { name: 'Tablets', category: 'Computing', startYear: 2010, peakYear: 2015, adoptionRate: 60, color: '#00897B' },
    { name: 'Cloud Computing', category: 'Computing', startYear: 2006, peakYear: 2020, adoptionRate: 85, color: '#006064' },
    
    // Internet Technologies
    { name: 'Internet', category: 'Internet', startYear: 1969, peakYear: 2000, adoptionRate: 95, color: '#6C5CE7' },
    { name: 'World Wide Web', category: 'Internet', startYear: 1991, peakYear: 2005, adoptionRate: 90, color: '#A29BFE' },
    { name: 'Email', category: 'Internet', startYear: 1971, peakYear: 1995, adoptionRate: 85, color: '#74B9FF' },
    { name: 'Social Media', category: 'Internet', startYear: 2004, peakYear: 2015, adoptionRate: 80, color: '#81ECEC' },
    { name: 'Video Streaming', category: 'Internet', startYear: 2005, peakYear: 2020, adoptionRate: 75, color: '#00CEC9' },
    { name: 'E-commerce', category: 'Internet', startYear: 1995, peakYear: 2010, adoptionRate: 70, color: '#55A3FF' },
    
    // Mobile Technologies
    { name: 'Mobile Phones', category: 'Mobile', startYear: 1973, peakYear: 2005, adoptionRate: 95, color: '#FDCB6E' },
    { name: 'SMS', category: 'Mobile', startYear: 1992, peakYear: 2008, adoptionRate: 90, color: '#F39C12' },
    { name: 'Smartphones', category: 'Mobile', startYear: 1994, peakYear: 2015, adoptionRate: 85, color: '#E67E22' },
    { name: '3G Networks', category: 'Mobile', startYear: 2001, peakYear: 2010, adoptionRate: 80, color: '#D63031' },
    { name: '4G/LTE', category: 'Mobile', startYear: 2009, peakYear: 2018, adoptionRate: 85, color: '#E17055' },
    { name: '5G Networks', category: 'Mobile', startYear: 2019, peakYear: 2025, adoptionRate: 40, color: '#A0522D' },
    { name: 'Mobile Apps', category: 'Mobile', startYear: 2008, peakYear: 2018, adoptionRate: 80, color: '#CD853F' },
    
    // Emerging Technologies
    { name: 'Artificial Intelligence', category: 'Computing', startYear: 2010, peakYear: 2024, adoptionRate: 45, color: '#9B59B6' },
    { name: 'IoT Devices', category: 'Internet', startYear: 2008, peakYear: 2022, adoptionRate: 50, color: '#3498DB' },
    { name: 'Virtual Reality', category: 'Computing', startYear: 2016, peakYear: 2025, adoptionRate: 25, color: '#E74C3C' },
    { name: 'Blockchain', category: 'Internet', startYear: 2009, peakYear: 2022, adoptionRate: 15, color: '#F39C12' }
  ];

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Add small delay to ensure DOM is fully rendered
      setTimeout(() => {
        this.createChart();
      }, 100);
    }
  }

  private createChart() {
    const margin = { top: 20, right: 20, bottom: 50, left: 60 };
    const container = this.chartContainer.nativeElement;
    const containerRect = container.getBoundingClientRect();
    let width = containerRect.width - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    
    // Fallback if container width is 0 or invalid
    if (width <= 0) {
      width = 1000; // Default width
    }

    // Clear any existing chart
    d3.select(container).selectAll('*').remove();

    // Create SVG
    this.svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create tooltip
    this.tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    // Set up scales
    const xScale = d3.scaleLinear()
      .domain([1900, 2025])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    // Create axes
    const xAxis = d3.axisBottom(xScale)
      .tickFormat((d: { toString: () => any; }) => d.toString())
      .ticks(10);

    const yAxis = d3.axisLeft(yScale)
      .tickFormat((d: any) => d + '%');

    this.svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .append('text')
      .attr('x', width / 2)
      .attr('y', 40)
      .style('text-anchor', 'middle')
      .style('fill', '#666')
      .style('font-size', '14px')
      .text('Year');

    this.svg.append('g')
      .attr('class', 'axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -height / 2)
      .style('text-anchor', 'middle')
      .style('fill', '#666')
      .style('font-size', '14px')
      .text('Adoption Rate (%)');

    this.updateChart();
  }

  private updateChart() {
    const filteredData = this.selectedCategory === 'all' 
      ? this.technologyData 
      : this.technologyData.filter(d => d.category === this.selectedCategory);

    const margin = { top: 20, right: 20, bottom: 50, left: 60 };
    const container = this.chartContainer.nativeElement;
    const containerRect = container.getBoundingClientRect();
    let width = containerRect.width - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    
    // Fallback if container width is 0 or invalid
    if (width <= 0) {
      width = 1000; // Default width
    }

    const xScale = d3.scaleLinear()
      .domain([1900, 2025])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    // Create technology bubbles
    const bubbles = this.svg.selectAll('.technology-circle')
      .data(filteredData, (d: any) => d.name);

    // Remove old bubbles
    bubbles.exit()
      .transition()
      .duration(500)
      .attr('r', 0)
      .style('opacity', 0)
      .remove();

    // Add new bubbles
    const newBubbles = bubbles.enter()
      .append('circle')
      .attr('class', 'technology-circle')
      .attr('cx', (d: { startYear: any; }) => xScale(d.startYear))
      .attr('cy', (d: { adoptionRate: any; }) => yScale(d.adoptionRate))
      .attr('r', 0)
      .style('fill', (d: { color: any; }) => d.color)
      .style('opacity', 0.7)
      .style('cursor', 'pointer');

    // Update all bubbles
    bubbles.merge(newBubbles)
      .transition()
      .duration(1000)
      .attr('cx', (d: { startYear: any; }) => xScale(d.startYear))
      .attr('cy', (d: { adoptionRate: any; }) => yScale(d.adoptionRate))
      .attr('r', (d: { adoptionRate: number; }) => Math.sqrt(d.adoptionRate) * 1.5)
      .style('fill', (d: { color: any; }) => d.color)
      .style('opacity', 0.7);

    // Add interaction
    this.svg.selectAll('.technology-circle')
      .on('mouseover', (event: any, d: any) => {
        this.tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        
        const categoryColor = this.getCategoryColor(d.category);
        
        this.tooltip.html(`
          <div class="tooltip-title">${d.name}</div>
          <div class="tooltip-category" style="background-color: ${categoryColor}">${d.category}</div>
          <div class="tooltip-details">
            <div class="tooltip-detail-row">
              <span class="tooltip-label">Start Year:</span>
              <span class="tooltip-value">${d.startYear}</span>
            </div>
            ${d.peakYear ? `
            <div class="tooltip-detail-row">
              <span class="tooltip-label">Peak Year:</span>
              <span class="tooltip-value">${d.peakYear}</span>
            </div>
            ` : ''}
            <div class="tooltip-detail-row">
              <span class="tooltip-label">Adoption Rate:</span>
              <span class="tooltip-value">${d.adoptionRate}%</span>
            </div>
          </div>
        `);
        
        // Get tooltip dimensions for better positioning
        const tooltipNode = this.tooltip.node();
        const tooltipRect = tooltipNode.getBoundingClientRect();
        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;
        
        // Calculate optimal position
        let left = event.pageX + 15;
        let top = event.pageY - 10;
        
        // Adjust if tooltip goes off right edge
        if (left + tooltipRect.width > pageWidth) {
          left = event.pageX - tooltipRect.width - 15;
        }
        
        // Adjust if tooltip goes off bottom edge
        if (top + tooltipRect.height > pageHeight) {
          top = event.pageY - tooltipRect.height - 10;
        }
        
        // Adjust if tooltip goes off top edge
        if (top < 0) {
          top = event.pageY + 15;
        }
        
        // Adjust if tooltip goes off left edge
        if (left < 0) {
          left = 10;
        }
        
        this.tooltip
          .style('color', '#fff')
          .style('background-color', 'rgba(99,99,102,.7)')
          .style('padding', '5px')
          .style('border', '1px solid gray')
          .style('border-radius', '6px')
          .style('left', left + 'px')
          .style('top', top + 'px')
          .style('position', 'absolute');
      })
      .on('mousemove', (event: any) => {
        // Update tooltip position on mouse move for better tracking
        const tooltipNode = this.tooltip.node();
        const tooltipRect = tooltipNode.getBoundingClientRect();
        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;
        
        let left = event.pageX + 15;
        let top = event.pageY - 10;
        
        // Adjust positioning as above
        if (left + tooltipRect.width > pageWidth) {
          left = event.pageX - tooltipRect.width - 15;
        }
        if (top + tooltipRect.height > pageHeight) {
          top = event.pageY - tooltipRect.height - 10;
        }
        if (top < 0) {
          top = event.pageY + 15;
        }
        if (left < 0) {
          left = 10;
        }
        
        this.tooltip
          .style('left', left + 'px')
          .style('top', top + 'px');
      })
      .on('mouseout', () => {
        this.tooltip.transition()
          .duration(300)
          .style('opacity', 0);
      });

    // Add technology labels for ALL data points
    const labels = this.svg.selectAll('.tech-label')
      .data(filteredData, (d: any) => d.name);

    labels.exit().remove();

    const newLabels = labels.enter()
      .append('text')
      .attr('class', 'tech-label')
      .style('text-anchor', 'middle')
      .style('font-size', '9px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .style('pointer-events', 'none');

    labels.merge(newLabels)
      .transition()
      .duration(1000)
      .attr('x', (d: { startYear: any; }) => xScale(d.startYear))
      .attr('y', (d: { adoptionRate: number; }) => {
        const bubbleRadius = Math.sqrt(d.adoptionRate) * 1.5;
        return yScale(d.adoptionRate) - bubbleRadius - 5;
      })
      .text((d: { name: any; }) => d.name);
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (isPlatformBrowser(this.platformId)) {
      this.updateChart();
    }
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'Communication': '#FF6B6B',
      'Computing': '#4ECDC4',
      'Internet': '#6C5CE7',
      'Mobile': '#FDCB6E'
    };
    return colors[category] || '#666';
  }
}