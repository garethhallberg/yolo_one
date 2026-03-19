import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Hero from '@/components/Hero'

describe('Hero Component', () => {
  it('renders the hero section with correct title', () => {
    render(<Hero />)
    
    expect(screen.getByText('AI & Enterprise')).toBeInTheDocument()
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('Building scalable solutions for complex business challenges')).toBeInTheDocument()
  })

  it('renders the scroll down indicator', () => {
    render(<Hero />)
    
    const scrollIndicator = screen.getByRole('link', { name: '' })
    expect(scrollIndicator).toBeInTheDocument()
    expect(scrollIndicator).toHaveAttribute('href', '#about')
  })

  it('has correct text shadow styling', () => {
    render(<Hero />)
    
    const titleElements = screen.getAllByText(/AI & Enterprise|Software Engineer/)
    titleElements.forEach(element => {
      expect(element).toHaveStyle('textShadow: 1px 1px 2px rgba(0,0,0,0.2)')
    })
  })
})