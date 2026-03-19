import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Experience from '@/components/Experience'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

describe('Experience Component', () => {
  it('renders the experience section with correct title', () => {
    render(<Experience />)
    
    expect(screen.getByText('What I have done so far')).toBeInTheDocument()
    expect(screen.getByText('Work Experience.')).toBeInTheDocument()
  })

  it('renders all six experience entries', () => {
    render(<Experience />)
    
    const experienceTitles = [
      'Lead Consultant & AI Community of Practice Leader',
      'Mobile Solutions Architect',
      'Lead Software Engineer',
      'Lead iOS Developer',
      'Senior iOS Programmer',
      'Director'
    ]
    
    experienceTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument()
    })
  })

  it('renders experience entries with correct company names', () => {
    render(<Experience />)
    
    const companyNames = [
      'Nimble Approach',
      'UnifiedRing',
      'Kanto Systems',
      'Myriad Group AG',
      'Userly',
      'Horseshoeshape'
    ]
    
    companyNames.forEach(company => {
      expect(screen.getByText(company)).toBeInTheDocument()
    })
  })

  it('renders experience entries with bullet points', () => {
    render(<Experience />)
    
    const listItems = screen.getAllByRole('listitem')
    expect(listItems.length).toBeGreaterThan(0)
    
    // Check for some specific bullet points
    expect(screen.getByText('Lead the AI Community of Practice, driving AI adoption and best practices across the organization')).toBeInTheDocument()
    expect(screen.getByText('Architected mobile productivity app enabling video calls with up to 100 participants')).toBeInTheDocument()
  })
})