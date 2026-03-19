import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import About from '@/components/About'

describe('About Component', () => {
  it('renders the about section with correct content', () => {
    render(<About />)
    
    expect(screen.getByText('Introduction')).toBeInTheDocument()
    expect(screen.getByText('Overview.')).toBeInTheDocument()
    expect(screen.getByText(/Enterprise Software Engineer and AI Community of Practice Leader/)).toBeInTheDocument()
  })

  it('renders all four service cards', () => {
    render(<About />)
    
    const serviceTitles = [
      'AI-Powered iOS Development',
      'AI-Driven Mobile Architecture',
      'AI Enterprise Solutions',
      'AI Technical Leadership'
    ]
    
    serviceTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument()
    })
  })

  it('renders the correct number of service cards', () => {
    render(<About />)
    
    const serviceCards = screen.getAllByRole('heading', { level: 3 })
    expect(serviceCards).toHaveLength(4)
  })
})