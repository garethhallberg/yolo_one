import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from '@/components/Navbar'

describe('Navbar Component', () => {
  it('renders the navbar with logo', () => {
    render(<Navbar />)
    
    expect(screen.getByText('GH')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Navbar />)
    
    const navLinks = ['Home', 'About', 'Work', 'Contact']
    navLinks.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument()
    })
  })

  it('renders LinkedIn icon', () => {
    render(<Navbar />)
    
    const linkedInLink = screen.getByRole('link', { name: '' })
    expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/gareth-hallberg-9285844/')
  })

  it('toggles mobile menu when hamburger is clicked', () => {
    render(<Navbar />)
    
    // Click hamburger menu (get the mobile hamburger button by its container)
    const hamburgerButton = screen.getByTestId('mobile-menu-button')
    fireEvent.click(hamburgerButton)
    
    // Mobile menu should now be visible - check for mobile menu specific elements
    const mobileMenu = screen.getByTestId('mobile-menu')
    expect(mobileMenu).toBeInTheDocument()
    expect(screen.getAllByText('Home')).toHaveLength(2) // Desktop + Mobile
    expect(screen.getAllByText('About')).toHaveLength(2) // Desktop + Mobile
  })

  it('renders dark mode toggle button', () => {
    render(<Navbar />)
    
    const darkModeButton = screen.getAllByRole('button')[1] // Second button is dark mode toggle
    expect(darkModeButton).toBeInTheDocument()
  })
})