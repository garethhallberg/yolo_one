import { textVariant, fadeIn, zoomIn, slideIn, staggerContainer } from '@/utils/motion'

describe('Motion Utility Functions', () => {
  describe('textVariant', () => {
    it('returns correct animation object with default delay', () => {
      const result = textVariant()
      expect(result).toHaveProperty('hidden')
      expect(result).toHaveProperty('show')
      expect(result.hidden).toEqual({
        y: -50,
        opacity: 0,
      })
      expect(result.show).toHaveProperty('transition')
    })

    it('returns correct animation object with custom delay', () => {
      const result = textVariant(0.5)
      expect(result.show.transition.delay).toBe(0.5)
    })
  })

  describe('fadeIn', () => {
    it('returns correct fade in animation for right direction', () => {
      const result = fadeIn('right', 'tween', 0.1, 1)
      expect(result.hidden).toEqual({
        x: -100,
        y: 0,
        opacity: 0,
      })
      expect(result.show).toEqual({
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: 'tween',
          delay: 0.1,
          duration: 1,
        },
      })
    })

    it('returns correct fade in animation for left direction', () => {
      const result = fadeIn('left', 'spring', 0.2, 0.5)
      expect(result.hidden).toEqual({
        x: 100,
        y: 0,
        opacity: 0,
      })
    })
  })

  describe('zoomIn', () => {
    it('returns correct zoom in animation with default parameters', () => {
      const result = zoomIn()
      expect(result.hidden).toEqual({
        scale: 0,
        opacity: 0,
      })
      expect(result.show).toEqual({
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          delay: 0,
          duration: 0.5,
        },
      })
    })

    it('returns correct zoom in animation with custom parameters', () => {
      const result = zoomIn(0.3, 0.8)
      expect(result.show.transition.delay).toBe(0.3)
      expect(result.show.transition.duration).toBe(0.8)
    })
  })

  describe('slideIn', () => {
    it('returns correct slide in animation for down direction', () => {
      const result = slideIn('down', 'tween', 0.1, 0.5)
      expect(result.hidden).toEqual({
        x: 0,
        y: '100%',
      })
    })

    it('returns correct slide in animation for up direction', () => {
      const result = slideIn('up', 'spring', 0.2, 0.8)
      expect(result.hidden).toEqual({
        x: 0,
        y: '-100%',
      })
    })
  })

  describe('staggerContainer', () => {
    it('returns correct stagger container animation with default parameters', () => {
      const result = staggerContainer()
      expect(result.hidden).toEqual({})
      expect(result.show.transition).toEqual({
        staggerChildren: 0.1,
        delayChildren: 0,
      })
    })

    it('returns correct stagger container animation with custom parameters', () => {
      const result = staggerContainer(0.2, 0.1)
      expect(result.show.transition).toEqual({
        staggerChildren: 0.2,
        delayChildren: 0.1,
      })
    })
  })
})