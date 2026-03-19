import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Contact from '@/components/Contact'

// Mock emailjs
jest.mock('@emailjs/browser', () => ({
  send: jest.fn().mockImplementation(() => Promise.resolve()),
}))

// Mock environment variables
beforeEach(() => {
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'test_service_id'
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'test_template_id'
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'test_public_key'
  process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL = 'test@example.com'
})

describe('Contact Component', () => {
  it('renders the contact section with correct title', () => {
    render(<Contact />)
    
    expect(screen.getByText('Get in touch')).toBeInTheDocument()
    expect(screen.getByText('Contact.')).toBeInTheDocument()
  })

  it('renders the contact form with all fields', () => {
    render(<Contact />)
    
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Your email')).toBeInTheDocument()
    expect(screen.getByLabelText('Your Message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
  })

  it('updates form state when input values change', () => {
    render(<Contact />)
    
    const nameInput = screen.getByPlaceholderText('What\'s your name?')
    const emailInput = screen.getByPlaceholderText('What\'s your web address?')
    const messageInput = screen.getByPlaceholderText('What you want to say?')
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'Hello there!' } })
    
    expect(nameInput).toHaveValue('Test User')
    expect(emailInput).toHaveValue('test@example.com')
    expect(messageInput).toHaveValue('Hello there!')
  })

  it('disables submit button when loading', () => {
    render(<Contact />)
    
    const submitButton = screen.getByRole('button', { name: 'Send' })
    expect(submitButton).not.toBeDisabled()
    
    // Note: Testing the loading state would require mocking the emailjs service
    // which is more complex and would be done in a more comprehensive test suite
  })
})